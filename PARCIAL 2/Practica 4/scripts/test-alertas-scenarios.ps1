# ============================================
# TEST: Escenarios de Alertas Inteligentes
# ============================================

Write-Host "`n🧪 TEST: Diferentes escenarios de alertas`n" -ForegroundColor Cyan

# ============================================
# ESCENARIO 1: ALERTA ALTA - Sin animales disponibles
# ============================================
Write-Host "`n🔴 ESCENARIO 1: ALERTA ALTA - Sin animales disponibles" -ForegroundColor Red

$alertaAlta = @{
    event = "adoption.alert.critical"
    version = "1.0"
    id = "alert-" + [guid]::NewGuid().ToString()
    timestamp = (Get-Date).ToString("o")
    data = @{
        adoption_id = "test-001"
        animal_id = "animal-001"
        adopter_name = "Sistema de Alertas"
        animal_name = "Múltiples"
        animal_species = "Gato"
        status = "alert"
        # ⚠️ Campos que activan ALERTA ALTA
        animales_disponibles = 0
        dias_pendiente = 3
        dias_restantes_prueba = 15
    }
    metadata = @{
        source = "test-script"
        environment = "development"
        correlation_id = [guid]::NewGuid().ToString()
    }
} | ConvertTo-Json -Depth 5

try {
    Write-Host "   Enviando a Workflow 3..." -ForegroundColor Gray
    $response = Invoke-RestMethod -Uri "http://localhost:5678/webhook/smart-alerts-workflow" -Method POST -ContentType "application/json" -Body $alertaAlta
    Write-Host "   ✅ Respuesta: $($response | ConvertTo-Json -Compress)" -ForegroundColor Green
    Write-Host "   📱 Debería enviarse Telegram (urgencia ALTA)" -ForegroundColor Yellow
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}

Start-Sleep -Seconds 2

# ============================================
# ESCENARIO 2: ALERTA MEDIA - Pocos animales
# ============================================
Write-Host "`n🟡 ESCENARIO 2: ALERTA MEDIA - Pocos animales disponibles" -ForegroundColor Yellow

$alertaMedia = @{
    event = "adoption.alert.warning"
    version = "1.0"
    id = "alert-" + [guid]::NewGuid().ToString()
    timestamp = (Get-Date).ToString("o")
    data = @{
        adoption_id = "test-002"
        animal_id = "animal-002"
        adopter_name = "Sistema de Alertas"
        animal_name = "Max"
        animal_species = "Perro"
        status = "pending"
        # ⚠️ Campos que activan ALERTA MEDIA
        animales_disponibles = 3
        dias_pendiente = 4
        dias_restantes_prueba = 2
    }
    metadata = @{
        source = "test-script"
        environment = "development"
        correlation_id = [guid]::NewGuid().ToString()
    }
} | ConvertTo-Json -Depth 5

try {
    Write-Host "   Enviando a Workflow 3..." -ForegroundColor Gray
    $response = Invoke-RestMethod -Uri "http://localhost:5678/webhook/smart-alerts-workflow" -Method POST -ContentType "application/json" -Body $alertaMedia
    Write-Host "   ✅ Respuesta: $($response | ConvertTo-Json -Compress)" -ForegroundColor Green
    Write-Host "   📧 Debería enviarse Email (urgencia MEDIA)" -ForegroundColor Yellow
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}

Start-Sleep -Seconds 2

# ============================================
# ESCENARIO 3: ALERTA BAJA - Condiciones normales
# ============================================
Write-Host "`n🟢 ESCENARIO 3: ALERTA BAJA - Condiciones normales" -ForegroundColor Green

$alertaBaja = @{
    event = "adoption.completed"
    version = "1.0"
    id = "alert-" + [guid]::NewGuid().ToString()
    timestamp = (Get-Date).ToString("o")
    data = @{
        adoption_id = "test-003"
        animal_id = "animal-003"
        adopter_name = "María González"
        animal_name = "Rocky"
        animal_species = "Perro"
        status = "completed"
        # ✅ Campos normales (no activan alerta)
        animales_disponibles = 15
        dias_pendiente = 1
        dias_restantes_prueba = 25
    }
    metadata = @{
        source = "test-script"
        environment = "development"
        correlation_id = [guid]::NewGuid().ToString()
    }
} | ConvertTo-Json -Depth 5

try {
    Write-Host "   Enviando a Workflow 3..." -ForegroundColor Gray
    $response = Invoke-RestMethod -Uri "http://localhost:5678/webhook/smart-alerts-workflow" -Method POST -ContentType "application/json" -Body $alertaBaja
    Write-Host "   ✅ Respuesta: $($response | ConvertTo-Json -Compress)" -ForegroundColor Green
    Write-Host "   📋 Solo se registra en log (urgencia BAJA)" -ForegroundColor Yellow
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}

Start-Sleep -Seconds 2

# ============================================
# ESCENARIO 4: ALERTA ALTA - Adopción pendiente >7 días
# ============================================
Write-Host "`n🔴 ESCENARIO 4: ALERTA ALTA - Adopción pendiente >7 días" -ForegroundColor Red

$alertaVencida = @{
    event = "adoption.alert.overdue"
    version = "1.0"
    id = "alert-" + [guid]::NewGuid().ToString()
    timestamp = (Get-Date).ToString("o")
    data = @{
        adoption_id = "test-004"
        animal_id = "animal-004"
        adopter_name = "Carlos Rodríguez"
        animal_name = "Michi"
        animal_species = "Gato"
        status = "pending"
        # ⚠️ Adopción vencida
        animales_disponibles = 8
        dias_pendiente = 10
        dias_restantes_prueba = 20
    }
    metadata = @{
        source = "test-script"
        environment = "development"
        correlation_id = [guid]::NewGuid().ToString()
    }
} | ConvertTo-Json -Depth 5

try {
    Write-Host "   Enviando a Workflow 3..." -ForegroundColor Gray
    $response = Invoke-RestMethod -Uri "http://localhost:5678/webhook/smart-alerts-workflow" -Method POST -ContentType "application/json" -Body $alertaVencida
    Write-Host "   ✅ Respuesta: $($response | ConvertTo-Json -Compress)" -ForegroundColor Green
    Write-Host "   📱 Debería enviarse Telegram (urgencia ALTA por >7 días)" -ForegroundColor Yellow
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}

# ============================================
# RESUMEN
# ============================================
Write-Host "`n✅ Test completado!" -ForegroundColor Green
Write-Host "`n📊 Resultados esperados:" -ForegroundColor Cyan
Write-Host "   🔴 Escenario 1: Telegram (animales = 0)" -ForegroundColor White
Write-Host "   🟡 Escenario 2: Email (animales < 5, prueba < 3 días)" -ForegroundColor White
Write-Host "   🟢 Escenario 3: Solo log (condiciones normales)" -ForegroundColor White
Write-Host "   🔴 Escenario 4: Telegram (días pendiente > 7)" -ForegroundColor White

Write-Host "`n🔍 Verificar en n8n: http://localhost:5678 → Executions`n" -ForegroundColor Yellow
