# 🔄 n8n Workflows - Sistema de Adopción de Animales

## 📋 Tabla de Contenidos
- [Configuración Inicial](#configuración-inicial)
- [Workflows Implementados](#workflows-implementados)
- [Eventos del Dominio](#eventos-del-dominio)
- [Guía de Importación](#guía-de-importación)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Configuración Inicial

### 1. Iniciar n8n

```bash
cd n8n
docker compose up -d
```

Acceder a: **http://localhost:5678**

**Credenciales:**
- Usuario: `admin`
- Contraseña: `uleam2025`

### 2. Configurar Variables de Entorno

Las URLs de webhook ya están configuradas en:
- `ms-adoption/.env` → `WEBHOOK_N8N_URL=http://localhost:5678/webhook/adoption-workflow`
- `ms-animal/.env` → `WEBHOOK_N8N_URL=http://localhost:5678/webhook/animal-workflow`

### 3. Reiniciar Microservicios

```bash
# Terminal 1
cd ms-adoption
npm run start:dev

# Terminal 2
cd ms-animal
npm run start:dev
```

---

## 📊 Workflows Implementados

### ✅ Workflow 1: Notificación en Tiempo Real

**Archivo:** `workflows/1-notificacion-tiempo-real.json`

**Flujo:**
```
Webhook → Validar Datos → Normalizar → Gemini (Generar Mensaje) → Telegram → Responder
```

**Eventos que procesa:**
- `adoption.completed`
- `animal.registered`

**Configuración requerida:**
1. Importar workflow en n8n
2. Activar el workflow
3. Configurar credenciales de Telegram Bot
4. Reemplazar `TU_API_KEY_DE_GEMINI` con tu API key de Gemini
5. Reemplazar `TU_TELEGRAM_CHAT_ID` con tu chat ID

**Payload esperado:**
```json
{
  "event": "adoption.completed",
  "version": "1.0",
  "id": "uuid",
  "timestamp": "2026-01-11T...",
  "data": {
    "adoption_id": "uuid",
    "animal_id": "uuid",
    "adopter_name": "Juan Pérez"
  },
  "metadata": {
    "source": "ms-adoption",
    "correlation_id": "uuid"
  }
}
```

---

### ✅ Workflow 2: Sincronización con Google Sheets

**Archivo:** `workflows/2-sincronizacion-google-sheets.json`

**Flujo:**
```
Webhook → Estructurar Datos → Google Sheets (Append Row) → Responder
```

**Configuración requerida:**

1. **Crear Google Sheet:**
   - Crear nueva hoja llamada "Eventos"
   - Agregar encabezados en la primera fila:
     - A1: Fecha/Hora
     - B1: Tipo de Evento
     - C1: ID Registro
     - D1: Descripción
     - E1: Usuario
     - F1: Estado
     - G1: Animal ID
     - H1: Correlation ID

2. **Configurar Credenciales en n8n:**
   - Settings → Credentials → Add Credential
   - Seleccionar "Google Sheets OAuth2"
   - Completar autenticación

3. **Configurar el Workflow:**
   - Importar `2-sincronizacion-google-sheets.json`
   - Reemplazar `TU_GOOGLE_SHEET_ID` con el ID de tu Sheet
   - Activar workflow

**Ejemplo de registro en Sheet:**
| Fecha/Hora | Tipo Evento | ID Registro | Descripción | Usuario | Estado | Animal ID | Correlation ID |
|------------|-------------|-------------|-------------|---------|--------|-----------|----------------|
| 11/01/2026 18:30 | adoption.completed | abc-123 | Adopción completada por Juan | Juan Pérez | completed | xyz-789 | abc-123 |

---

### ✅ Workflow 3: Alertas Inteligentes

**Archivo:** `workflows/3-alertas-inteligentes.json`

**Flujo:**
```
Webhook → Detectar Crítico → Gemini (Clasificar) → Switch → [Telegram/Email/Log] → Responder
```

**Lógica de Clasificación:**

| Urgencia | Condiciones | Acción |
|----------|-------------|--------|
| **ALTA** | - Palabra "cancelad" en evento<br>- Stock = 0<br>- available = false | 🚨 Telegram inmediato |
| **MEDIA** | - Stock bajo (< 5)<br>- Actualizaciones masivas | 📧 Email a admin |
| **BAJA** | - Registros normales<br>- Consultas | 📝 Log simple |

**Configuración requerida:**
1. Configurar Telegram Bot (credenciales en n8n)
2. Configurar cuenta SMTP para emails
3. Reemplazar `TU_API_KEY_DE_GEMINI`
4. Reemplazar `TU_TELEGRAM_CHAT_ID`
5. Configurar email destino en `admin@tudominio.com`

**Ejemplo de clasificación por Gemini:**
```json
{
  "urgencia": "ALTA",
  "razon": "Adopción cancelada requiere atención inmediata"
}
```

---

## 🎯 Eventos del Dominio

### Eventos Actuales (RabbitMQ + Webhooks)

#### Microservicio: ms-adoption

| Evento | Descripción | Datos |
|--------|-------------|-------|
| `adoption.created` | Nueva adopción registrada | animal_id, adopter_name, status |
| `adoption.completed` | Adopción completada exitosamente | adoption_id, animal_id, adopter_name |
| `adoption.created.webhook` | Evento transformado para webhook | Incluye metadata y correlation_id |

#### Microservicio: ms-animal

| Evento | Descripción | Datos |
|--------|-------------|-------|
| `animal.create` | Solicitud de creación de animal | name, species |
| `animal.registered` | Animal registrado exitosamente | id, name, species, available |
| `animal.registered.webhook` | Evento transformado para webhook | Incluye metadata |
| `adoption.created` | Actualiza disponibilidad del animal | animal_id |

### Eventos Futuros Recomendados

```typescript
// Para implementar en futuras versiones
'animal.updated'           // Cambios en información del animal
'animal.removed'           // Animal eliminado del sistema
'adoption.cancelled'       // Adopción cancelada
'adoption.pending'         // Pre-aprobación de adopción
'adoption.reversed'        // Reversión de adopción
'animal.health.updated'    // Actualizaciones veterinarias
```

---

## 📥 Guía de Importación de Workflows

### Opción 1: Interfaz Web de n8n

1. Abrir n8n: http://localhost:5678
2. Click en "Workflows" → "Import from File"
3. Seleccionar archivo JSON (`1-notificacion-tiempo-real.json`, etc.)
4. Configurar credenciales según indicado arriba
5. Activar workflow

### Opción 2: API de n8n (Automatizado)

```bash
# Importar todos los workflows
./scripts/import-n8n-workflows.sh
```

### Verificar Webhooks Activos

En n8n, ve a cada workflow y copia la URL del webhook:
- Workflow 1: `http://localhost:5678/webhook/adoption-workflow`
- Workflow 2: `http://localhost:5678/webhook/sheets-sync-workflow`
- Workflow 3: `http://localhost:5678/webhook/smart-alerts-workflow`

Actualizar en `.env` si es necesario.

---

## 🧪 Testing

### Script de Prueba Manual

```bash
# Ejecutar script de prueba
./scripts/test-n8n-integration.sh
```

### Prueba Individual por Evento

#### 1. Crear un Animal
```bash
curl -X POST http://localhost:3000/animals \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Max",
    "species": "perro"
  }'
```

**Verificar:**
- ✅ Webhook recibido en n8n
- ✅ Registro en Google Sheets
- ✅ Log en consola de n8n

#### 2. Crear una Adopción (vía Chat MCP)
```bash
curl -X POST http://localhost:4000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Quiero adoptar a Max, mi nombre es Carlos López"
  }'
```

**Verificar:**
- ✅ Workflow 1 ejecutado (notificación Telegram)
- ✅ Workflow 2 ejecutado (registro en Sheets)
- ✅ Workflow 3 ejecutado (clasificación de urgencia)

#### 3. Verificar Logs de n8n

```bash
# Ver logs en tiempo real
docker logs -f n8n-n8n-1

# Ver ejecuciones en la UI
# http://localhost:5678 → Executions
```

---

## 🐛 Troubleshooting

### Problema: Webhook no se recibe en n8n

**Causas posibles:**
1. Workflow no está activo en n8n
2. URL de webhook incorrecta en `.env`
3. n8n no está corriendo

**Solución:**
```bash
# Verificar n8n está corriendo
docker ps | grep n8n

# Verificar logs del servicio
docker logs n8n-n8n-1

# Verificar URL en .env coincide con n8n
cat ms-adoption/.env | grep WEBHOOK_N8N_URL

# Reiniciar servicios
cd ms-adoption && npm run start:dev
```

---

### Problema: Error 401 en Gemini

**Causa:** API Key inválida o no configurada

**Solución:**
1. Obtener API key de Gemini: https://ai.google.dev/
2. Editar workflow en n8n
3. Buscar nodo "Gemini: Generar Mensaje"
4. Reemplazar `TU_API_KEY_DE_GEMINI` con la key real
5. Guardar y activar workflow

---

### Problema: No se envía notificación a Telegram

**Causa:** Bot o Chat ID no configurado

**Solución:**
1. Crear bot con @BotFather en Telegram
2. Obtener token del bot
3. En n8n: Settings → Credentials → Telegram
4. Agregar credencial con el token
5. Obtener Chat ID: https://api.telegram.org/bot<TOKEN>/getUpdates
6. Reemplazar `TU_TELEGRAM_CHAT_ID` en workflows

---

### Problema: Error al escribir en Google Sheets

**Causa:** Credenciales no configuradas o Sheet no compartido

**Solución:**
1. Verificar credenciales OAuth2 en n8n
2. Compartir Google Sheet con la cuenta de servicio
3. Verificar ID del Sheet es correcto
4. Probar conexión en el nodo de Google Sheets

---

## 📚 Referencias

- [Documentación n8n](https://docs.n8n.io/)
- [Gemini API](https://ai.google.dev/gemini-api/docs)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Google Sheets API](https://developers.google.com/sheets/api)

---

## 🎓 Taller 4 - Checklist de Cumplimiento

### ✅ Requisitos Base
- [x] Backend NestJS con CRUD funcionando
- [x] MCP Server con 3 tools implementados
- [x] API Gateway integrado con Gemini
- [x] Proyecto en repositorio con estructura Taller 3

### ✅ Modificaciones en Backend
- [x] WebhookService existente reutilizado
- [x] Soporte para múltiples destinos de webhook
- [x] Integración en servicios CRUD (ms-adoption, ms-animal)
- [x] Eventos emitidos después de operaciones principales

### ✅ Setup de n8n
- [x] Carpeta `/n8n` creada
- [x] `docker-compose.yml` con autenticación y volúmenes
- [x] Carpeta `/n8n/workflows/` con JSONs exportables

### ✅ Workflows Obligatorios
- [x] Workflow 1: Notificación en Tiempo Real (Webhook → IF → Set → Gemini → Telegram → Respond)
- [x] Workflow 2: Sincronización Google Sheets (Webhook → Set → Sheets → Respond)
- [x] Workflow 3: Alertas Inteligentes (Webhook → IF → Gemini → Switch → Telegram/Email/Log → Respond)

### ✅ Eventos del Dominio
- [x] `adoption.created` - Adopción registrada
- [x] `adoption.completed` - Adopción completada
- [x] `animal.registered` - Animal registrado
- [x] `animal.availability_changed` - Disponibilidad actualizada

---

**¡Implementación completa del Taller 4!** 🎉
