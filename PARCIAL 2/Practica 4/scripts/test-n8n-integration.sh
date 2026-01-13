#!/bin/bash

# ============================================================
# SCRIPT DE PRUEBA: Integración n8n con Sistema de Adopción
# ============================================================

echo "🧪 Iniciando pruebas de integración n8n..."
echo ""

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuración
API_GATEWAY="http://localhost:3000"
CHAT_GATEWAY="http://localhost:4000"
MS_ANIMAL="http://localhost:3001"
MS_ADOPTION="http://localhost:3002"

# ============================================================
# Función para verificar si un servicio está activo
# ============================================================
check_service() {
    local service_name=$1
    local service_url=$2
    
    echo -n "Verificando $service_name... "
    if curl -s --max-time 3 "$service_url" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ OK${NC}"
        return 0
    else
        echo -e "${RED}❌ OFFLINE${NC}"
        return 1
    fi
}

# ============================================================
# 1. VERIFICAR SERVICIOS
# ============================================================
echo "📡 Verificando servicios..."
echo ""

check_service "API Gateway" "$API_GATEWAY"
check_service "Chat Gateway (MCP)" "$CHAT_GATEWAY/health"
check_service "ms-animal" "$MS_ANIMAL"
check_service "ms-adoption" "$MS_ADOPTION"
check_service "n8n" "http://localhost:5678"

echo ""
read -p "¿Todos los servicios están activos? Presiona ENTER para continuar..."
echo ""

# ============================================================
# 2. CREAR ANIMAL DE PRUEBA
# ============================================================
echo "🐾 Creando animal de prueba..."

ANIMAL_RESPONSE=$(curl -s -X POST "$API_GATEWAY/animals" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Luna",
    "species": "gato"
  }')

echo "Respuesta: $ANIMAL_RESPONSE"
echo ""
echo -e "${YELLOW}⏳ Esperando 3 segundos para que se procese...${NC}"
sleep 3

# Obtener ID del animal creado
ANIMAL_ID=$(curl -s "$MS_ANIMAL/animals?name=Luna" | jq -r '.[0].id')

if [ -z "$ANIMAL_ID" ] || [ "$ANIMAL_ID" == "null" ]; then
    echo -e "${RED}❌ Error: No se pudo obtener el ID del animal${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Animal creado con ID: $ANIMAL_ID${NC}"
echo ""

# ============================================================
# 3. VERIFICAR WEBHOOK EN N8N (Workflow 1 y 2)
# ============================================================
echo "🔍 Verificar en n8n:"
echo "   → http://localhost:5678"
echo "   → Ir a 'Executions'"
echo "   → Deberías ver ejecuciones de:"
echo "     - Workflow 1: Notificación en Tiempo Real"
echo "     - Workflow 2: Sincronización Google Sheets"
echo ""
read -p "Presiona ENTER cuando hayas verificado..."
echo ""

# ============================================================
# 4. CREAR ADOPCIÓN VÍA CHAT MCP
# ============================================================
echo "💬 Creando adopción vía Chat (MCP)..."

CHAT_RESPONSE=$(curl -s -X POST "$CHAT_GATEWAY/chat" \
  -H "Content-Type: application/json" \
  -d "{
    \"message\": \"Quiero adoptar a Luna, mi nombre es Test User $(date +%s)\"
  }")

echo "Respuesta del Chat:"
echo "$CHAT_RESPONSE" | jq '.'
echo ""

echo -e "${YELLOW}⏳ Esperando 5 segundos para que se procesen los webhooks...${NC}"
sleep 5

# ============================================================
# 5. VERIFICAR ADOPCIÓN COMPLETADA
# ============================================================
echo "🔍 Verificando estado del animal después de la adopción..."

ANIMAL_STATUS=$(curl -s "$MS_ANIMAL/animals/$ANIMAL_ID/availability")
echo "$ANIMAL_STATUS" | jq '.'

AVAILABLE=$(echo "$ANIMAL_STATUS" | jq -r '.available')

if [ "$AVAILABLE" == "false" ]; then
    echo -e "${GREEN}✅ Animal marcado como NO disponible (adoptado)${NC}"
else
    echo -e "${RED}❌ Animal aún aparece como disponible${NC}"
fi

echo ""

# ============================================================
# 6. VERIFICAR WORKFLOWS EN N8N
# ============================================================
echo "📊 RESUMEN DE VERIFICACIÓN EN n8n:"
echo ""
echo "1. Workflow 1 - Notificación en Tiempo Real:"
echo "   ✅ Deberías haber recibido mensaje en Telegram"
echo "   ✅ Mensaje generado por Gemini"
echo ""
echo "2. Workflow 2 - Sincronización Google Sheets:"
echo "   ✅ Nueva fila agregada en Google Sheet"
echo "   ✅ Con datos de la adopción completada"
echo ""
echo "3. Workflow 3 - Alertas Inteligentes:"
echo "   ✅ Clasificación de urgencia realizada"
echo "   ✅ Acción tomada según nivel"
echo ""
echo "🔗 Ir a n8n para ver detalles:"
echo "   http://localhost:5678/workflows"
echo ""

# ============================================================
# 7. VERIFICAR LOGS DE MICROSERVICIOS
# ============================================================
echo "📝 Verificar logs de microservicios:"
echo ""
echo "ms-adoption logs (buscar 'Webhook enviado'):"
echo "   Deberías ver logs como:"
echo "   📤 Enviando webhook: adoption.completed"
echo "   ✅ Webhook enviado exitosamente (200)"
echo ""
echo "ms-animal logs:"
echo "   Deberías ver logs de eventos procesados"
echo ""

# ============================================================
# 8. TEST ADICIONAL: EVENTO DE URGENCIA ALTA
# ============================================================
echo ""
echo "🚨 TEST OPCIONAL: Simular evento de urgencia alta"
echo ""
read -p "¿Quieres probar el Workflow 3 con evento crítico? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Enviando evento crítico simulado a n8n..."
    
    curl -X POST "http://localhost:5678/webhook/smart-alerts-workflow" \
      -H "Content-Type: application/json" \
      -d '{
        "event": "adoption.cancelled",
        "id": "test-critical-event",
        "timestamp": "'$(date -Iseconds)'",
        "data": {
          "adoption_id": "test-123",
          "animal_id": "'$ANIMAL_ID'",
          "reason": "Cancelación por cliente",
          "available": false,
          "stock": 0
        },
        "metadata": {
          "source": "test-script",
          "environment": "development"
        }
      }'
    
    echo ""
    echo -e "${GREEN}✅ Evento crítico enviado${NC}"
    echo "Verifica que:"
    echo "  - Recibiste alerta en Telegram (urgencia ALTA)"
    echo "  - Workflow 3 clasificó correctamente"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "🎉 PRUEBAS COMPLETADAS"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "Próximos pasos:"
echo "1. Revisar ejecuciones en n8n: http://localhost:5678/executions"
echo "2. Verificar Google Sheets con los registros"
echo "3. Confirmar notificaciones de Telegram"
echo "4. Revisar logs de microservicios"
echo ""
echo "Para limpiar datos de prueba:"
echo "  - Detener servicios: Ctrl+C en cada terminal"
echo "  - Limpiar DB: docker compose down -v && docker compose up -d"
echo ""
