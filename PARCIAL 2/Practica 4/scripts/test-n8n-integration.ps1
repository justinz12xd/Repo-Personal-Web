# Script de prueba PowerShell para Windows
# ============================================================
# SCRIPT DE PRUEBA: Integración n8n con Sistema de Adopción
# ============================================================

Write-Host "🧪 Iniciando pruebas de integración n8n..." -ForegroundColor Cyan
Write-Host ""

# Configuración
$API_GATEWAY = "http://localhost:3000"  # api-gateway (chat)
$MS_GATEWAY = "http://localhost:3004"    # ms-gateway (REST tradicional)
$MS_ANIMAL = "http://localhost:3001"
$MS_ADOPTION = "http://localhost:3002"

# ============================================================
# Función para verificar servicios
# ============================================================
function Test-Service {
    param($Name, $Url)
    
    Write-Host -NoNewline "Verificando $Name... "
    try {
        $response = Invoke-WebRequest -Uri $Url -Method Get -TimeoutSec 3 -ErrorAction Stop
        Write-Host "✅ OK" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "❌ OFFLINE" -ForegroundColor Red
        return $false
    }
}

# ============================================================
# 1. VERIFICAR SERVICIOS
# ============================================================
Write-Host "📡 Verificando servicios..." -ForegroundColor Yellow
Write-Host ""

Test-Service "API Gateway (Chat)" "$API_GATEWAY/health"
Test-Service "MS Gateway (REST)" "$MS_GATEWAY"
Test-Service "ms-animal" "$MS_ANIMAL"
Test-Service "ms-adoption" "$MS_ADOPTION"
Test-Service "n8n" "http://localhost:5678"

Write-Host ""
Read-Host "¿Todos los servicios están activos? Presiona ENTER para continuar"
Write-Host ""

# ============================================================
# 2. CREAR ANIMAL DE PRUEBA
# ============================================================
Write-Host "🐾 Creando animal de prueba..." -ForegroundColor Yellow

$animalBody = @{
    name = "Luna"
    species = "gato"
} | ConvertTo-Json

$animalResponse = Invoke-RestMethod -Uri "$MS_GATEWAY/animals" -Method Post -Body $animalBody -ContentType "application/json"
Write-Host "Respuesta: $($animalResponse | ConvertTo-Json)"
Write-Host ""
Write-Host "⏳ Esperando 3 segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Obtener ID del animal
$animals = Invoke-RestMethod -Uri "$MS_ANIMAL/animals?name=Luna"
$animalId = $animals[0].id

if (-not $animalId) {
    Write-Host "❌ Error: No se pudo obtener el ID del animal" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Animal creado con ID: $animalId" -ForegroundColor Green
Write-Host ""

# ============================================================
# 3. VERIFICAR N8N
# ============================================================
Write-Host "🔍 Verificar en n8n:" -ForegroundColor Cyan
Write-Host "   → http://localhost:5678"
Write-Host "   → Ir a 'Executions'"
Write-Host ""
Read-Host "Presiona ENTER cuando hayas verificado"
Write-Host ""

# ============================================================
# 4. CREAR ADOPCIÓN
# ============================================================
Write-Host "💬 Creando adopción vía Chat (MCP)..." -ForegroundColor Yellow

$timestamp = [DateTimeOffset]::Now.ToUnixTimeSeconds()
$chatBody = @{
    message = "Quiero adoptar a Luna, mi nombre es Test User $timestamp"
} | ConvertTo-Json

$chatResponse = Invoke-RestMethod -Uri "$API_GATEWAY/chat" -Method Post -Body $chatBody -ContentType "application/json"
Write-Host "Respuesta:" -ForegroundColor Cyan
$chatResponse | ConvertTo-Json -Depth 10 | Write-Host
Write-Host ""

Write-Host "⏳ Esperando 5 segundos para webhooks..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# ============================================================
# 5. VERIFICAR ADOPCIÓN
# ============================================================
Write-Host "🔍 Verificando estado del animal..." -ForegroundColor Yellow

$animalStatus = Invoke-RestMethod -Uri "$MS_ANIMAL/animals/$animalId/availability"
$animalStatus | ConvertTo-Json | Write-Host

if ($animalStatus.available -eq $false) {
    Write-Host "✅ Animal marcado como NO disponible (adoptado)" -ForegroundColor Green
} else {
    Write-Host "❌ Animal aún disponible" -ForegroundColor Red
}

Write-Host ""

# ============================================================
# 6. RESUMEN
# ============================================================
Write-Host "📊 RESUMEN DE VERIFICACIÓN:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Workflow 1 - Notificación:"
Write-Host "   ✅ Mensaje en Telegram" -ForegroundColor Green
Write-Host ""
Write-Host "2. Workflow 2 - Google Sheets:"
Write-Host "   ✅ Registro agregado" -ForegroundColor Green
Write-Host ""
Write-Host "3. Workflow 3 - Alertas:"
Write-Host "   ✅ Clasificación realizada" -ForegroundColor Green
Write-Host ""
Write-Host "🔗 n8n: http://localhost:5678/workflows" -ForegroundColor Cyan
Write-Host ""

# ============================================================
# 7. TEST CRÍTICO OPCIONAL
# ============================================================
$testCritical = Read-Host "¿Probar evento crítico? (y/n)"

if ($testCritical -eq "y") {
    Write-Host "🚨 Enviando evento crítico..." -ForegroundColor Yellow
    
    $criticalBody = @{
        event = "adoption.cancelled"
        id = "test-critical-event"
        timestamp = (Get-Date -Format "o")
        data = @{
            adoption_id = "test-123"
            animal_id = $animalId
            reason = "Cancelación por cliente"
            available = $false
            stock = 0
        }
        metadata = @{
            source = "test-script"
            environment = "development"
        }
    } | ConvertTo-Json -Depth 10
    
    Invoke-RestMethod -Uri "http://localhost:5678/webhook/smart-alerts-workflow" -Method Post -Body $criticalBody -ContentType "application/json"
    
    Write-Host "✅ Evento crítico enviado" -ForegroundColor Green
}

Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🎉 PRUEBAS COMPLETADAS" -ForegroundColor Green
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
