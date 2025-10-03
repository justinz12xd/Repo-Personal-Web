# 🖥 Práctica #2 - Arquitectura del Dominio con Métodos Asíncronos

## 🎯 Objetivo
Implementar una arquitectura robusta y escalable para el dominio del emprendimiento, aplicando:
- Patrones de diseño y principios de código limpio  
- Paradigmas de programación asíncrona en JavaScript/TypeScript para operaciones CRUD  
- Principios SOLID y arquitectura hexagonal  

Cada estudiante desarrolla el dominio completo de **una entidad**, implementando todas las operaciones CRUD con los paradigmas solicitados.

---

## 🛠 Tecnologías y Herramientas
- **Node.js** (v18+)
- **TypeScript**
- **ts-node**
- **UUID** (para generar identificadores únicos)
- **Chalk** (opcional, colorización de consola)
- **Visual Studio Code**
- **Git y GitHub**

---

## 📦 Arquitectura
El sistema se estructura en **4 capas** siguiendo principios de DDD y Clean Architecture:

1. **Domain** → Entidades, interfaces, objetos de valor  
2. **Infrastructure** → Repositorios (memoria, datos de prueba)  
3. **Application** → Servicios de aplicación, reglas de negocio  
4. **Presentation** → Punto de entrada (archivo `main.ts`) para pruebas y evidencias  

---

## ⚡ Paradigmas Asíncronos Requeridos
Cada operación CRUD debe usar un paradigma distinto:

- **CREATE (Inserción):** Callbacks  
- **UPDATE (Modificación):** Promises  
- **READ (Consulta):** Async/Await  
- **DELETE (Eliminación):** Async/Await  

---

## 🔄 Procedimiento
1. **Configurar proyecto base** con TypeScript y estructura de carpetas.  
2. **Diseñar el dominio**: entidades, interfaces y repositorios.  
3. **Implementar repositorios** en memoria con paradigmas asíncronos.  
4. **Crear servicios de aplicación** para orquestar la lógica.  
5. **Desarrollar `main.ts`** para pruebas de inserción, consulta, modificación y eliminación.  
6. **Integrar y probar en equipo**, documentando en este README.  

---

## 📊 Criterios de Evaluación
- Arquitectura y separación en capas → 20 pts  
- Implementación del dominio (entidades, interfaces, validaciones) → 20 pts  
- Paradigmas asíncronos → 20 pts  
- Datos de prueba y repositorios en memoria → 15 pts  
- Archivo main y pruebas → 10 pts  
- Trabajo colaborativo y documentación → 15 pts  
- **Total: 100 pts**

---

## ✅ Requisitos Mínimos
- Al menos 1 entidad completa por integrante  
- Mínimo 10 registros realistas por entidad  
- Manejo de errores y validaciones en CRUD  
- Implementación correcta de callbacks, promises y async/await  
- Pruebas funcionales desde `main.ts`  
- README.md con instrucciones y evidencias  

---

## 🚀 Instrucciones de Instalación
```bash
# Clonar repositorio
git clone <url-del-repo>
cd practica2

# Instalar dependencias
npm install

# Ejecutar proyecto con ts-node
npx ts-node src/main.ts
