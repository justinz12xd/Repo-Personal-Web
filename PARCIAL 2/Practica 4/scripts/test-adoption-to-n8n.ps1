# ============================================
# TEST: Adopción completa → Workflows n8n
# ============================================
# Este script simula una adopción exitosa
# que activará los 3 workflows de n8n

Write-Host "`n🧪 TEST: Adopción → n8n Workflows`n" -ForegroundColor Cyan

# ============================================
# PASO 1: Crear un animal
# ============================================
Write-Host "📝 Paso 1: Crear animal..." -ForegroundColor Yellow

$animalBody = @{
    name = "Luna"
    species = "Gato"
    breed = "Siamés"
    age = 2
    available = $true
} | ConvertTo-Json

try {
    $animal = Invoke-RestMethod -Uri "http://localhost:3004/animal" -Method POST -ContentType "application/json" -Body $animalBody
    Write-Host "✅ Animal creado: $($animal.id) - $($animal.name)" -ForegroundColor Green
    $animalId = $animal.id
} catch {
    Write-Host "❌ Error creando animal: $_" -ForegroundColor Red
    exit 1
}

# ============================================
# PASO 2: Registrar adopción
# ============================================
Write-Host "`n📝 Paso 2: Registrar adopción..." -ForegroundColor Yellow

$adoptionBody = @{
    animal_id = $animalId
    adopter_name = "Juan Pérez"
    status = "completed"
} | ConvertTo-Json

try {
    $adoption = Invoke-RestMethod -Uri "http://localhost:3004/adoption" -Method POST -ContentType "application/json" -Body $adoptionBody
    Write-Host "✅ Adopción registrada: $($adoption.id)" -ForegroundColor Green
    Write-Host "   Animal ID: $($adoption.animal_id)" -ForegroundColor Gray
    Write-Host "   Adoptante: $($adoption.adopter_name)" -ForegroundColor Gray
    Write-Host "   Estado: $($adoption.status)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Error registrando adopción: $_" -ForegroundColor Red
    exit 1
}

# ============================================
# PASO 3: Verificar que se activaron los workflows
# ============================================
Write-Host "`n✅ Proceso completado!" -ForegroundColor Green
Write-Host "`n📊 Los siguientes workflows deberían haberse activado:" -ForegroundColor Cyan
Write-Host "   1️⃣  Workflow 1: Notificación Telegram enviada" -ForegroundColor White
Write-Host "   2️⃣  Workflow 2: Fila agregada a Google Sheets" -ForegroundColor White
Write-Host "   3️⃣  Workflow 3: Alerta clasificada y enviada" -ForegroundColor White

Write-Host "`n🔍 Verificar en:" -ForegroundColor Yellow
Write-Host "   • Telegram: Buscar mensaje de adopción" -ForegroundColor Gray
Write-Host "   • Google Sheets: https://docs.google.com/spreadsheets/d/tu_sheet_id" -ForegroundColor Gray
Write-Host "   • n8n: http://localhost:5678 → Executions" -ForegroundColor Gray
Write-Host "   • Logs de ms-adoption: Ver mensajes '📤 Enviando webhook'" -ForegroundColor Gray

Write-Host "`n✨ Test completado!`n" -ForegroundColor Cyan
