# 🧪 Guía de Pruebas Automatizadas

Esta guía explica cómo usar el sistema de pruebas automatizadas implementado para el proyecto de Fundamentos de Programación.

## 📋 Tabla de Contenidos

1. [Configuración Inicial](#configuración-inicial)
2. [Tipos de Pruebas](#tipos-de-pruebas)
3. [Comandos Disponibles](#comandos-disponibles)
4. [Estructura de Pruebas](#estructura-de-pruebas)
5. [Interpretación de Resultados](#interpretación-de-resultados)
6. [Solución de Problemas](#solución-de-problemas)

---

## 🚀 Configuración Inicial

### Requisitos Previos
- Node.js 16+ instalado
- npm o yarn como gestor de paquetes

### Instalación Automática
```bash
# Ejecutar script de configuración
chmod +x setup.sh
./setup.sh
```

### Instalación Manual
```bash
# Instalar dependencias
npm install

# Verificar instalación
npm run validate
```

---

## 🔬 Tipos de Pruebas

### 1. Pruebas Unitarias (Jest)
- **Ubicación**: `__tests__/*.test.js`
- **Tecnología**: Jest
- **Propósito**: Validar lógica de negocio de cada módulo

### 2. Pruebas de Navegador (Puppeteer)
- **Ubicación**: `test-escenario*.html`
- **Tecnología**: Puppeteer + HTML/JavaScript
- **Propósito**: Validar interfaz de usuario y integración

### 3. Pruebas de Validación (Node.js)
- **Ubicación**: `scripts/validate-implementations.js`
- **Tecnología**: Node.js puro
- **Propósito**: Verificar que todas las implementaciones funcionen

---

## ⚡ Comandos Disponibles

### Pruebas Jest (Unitarias)
```bash
# Ejecutar todas las pruebas unitarias
npm test

# Ejecutar pruebas en modo watch (se re-ejecutan al cambiar archivos)
npm run test:watch

# Ejecutar pruebas con reporte de cobertura
npm run test:coverage

# Ejecutar pruebas con salida detallada
npm run test:verbose
```

### Pruebas de Navegador
```bash
# Ejecutar pruebas en navegador automatizadas
npm run test:browser

# Iniciar servidor web para pruebas manuales
npm run serve
# Luego abrir http://localhost:3000
```

### Pruebas Combinadas
```bash
# Ejecutar TODAS las pruebas (Jest + Navegador)
npm run test:all

# Validar implementaciones
npm run validate
```

---

## 📁 Estructura de Pruebas

```
proyecto/
├── __tests__/                     # Pruebas Jest
│   ├── escenario1-descuento.test.js
│   ├── escenario2-fecha.test.js
│   └── escenario3-mayor.test.js
├── src/                           # Código fuente
│   ├── escenario1-descuento.js
│   ├── escenario2-fecha.js
│   └── escenario3-mayor.js
├── scripts/                       # Scripts de automatización
│   ├── run-browser-tests.js       # Ejecutor de pruebas de navegador
│   ├── validate-implementations.js # Validador de implementaciones
│   └── serve.js                   # Servidor web
├── test-escenario*.html           # Pruebas de navegador
├── jest.config.js                 # Configuración de Jest
├── jest.setup.js                  # Setup global de Jest
└── package.json                   # Configuración del proyecto
```

---

## 📊 Interpretación de Resultados

### Salida de Jest
```
 PASS  __tests__/escenario1-descuento.test.js
  Escenario 1: Sistema de Descuentos
    ✓ sin descuento (menos de 10 unidades) (2 ms)
    ✓ descuento 10% (límite inferior) (1 ms)
    ✓ descuento 20% (rango medio) (1 ms)

Test Suites: 3 passed, 3 total
Tests:       45 passed, 45 total
Snapshots:   0 total
Time:        2.5 s
```

### Salida de Pruebas de Navegador
```
🚀 Iniciando pruebas en navegador...

📋 Ejecutando Escenario 1: Sistema de Descuentos...
   ✅ PASS - 8/8 pruebas pasadas

📋 Ejecutando Escenario 2: Días del Mes...
   ✅ PASS - 15/15 pruebas pasadas

📊 RESUMEN DE PRUEBAS EN NAVEGADOR
✅ Escenario 1: Sistema de Descuentos: 8/8
✅ Escenario 2: Días del Mes: 15/15
Total: 68/68 pruebas pasadas
✅ TODAS LAS PRUEBAS PASARON
```

### Reporte de Cobertura
```
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |                   
 escenario1-descuento.js |     100 |      100 |     100 |     100 |
 escenario2-fecha.js      |     100 |      100 |     100 |     100 |
 escenario3-mayor.js      |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------
```

---

## 🎯 Casos de Prueba Implementados

### Escenario 1: Sistema de Descuentos
- ✅ Validación de entrada (8 casos)
- ✅ Cálculos de descuento (9 casos)
- ✅ Precios decimales (2 casos)
- ✅ Descripciones (4 casos)
- **Total: 23 casos**

### Escenario 2: Días del Mes
- ✅ Validación de entrada (5 casos)
- ✅ Meses de 31 días (7 casos)
- ✅ Meses de 30 días (4 casos)
- ✅ Febrero normal/bisiesto (5 casos)
- ✅ Lógica años bisiestos (8 casos)
- ✅ Nombres de meses (12 casos)
- ✅ Validación de fechas (6 casos)
- **Total: 47 casos**

### Escenario 3: Número Mayor
- ✅ Validación de entrada (4 casos)
- ✅ Cálculo del mayor (3 casos)
- ✅ Números iguales (4 casos)
- ✅ Números negativos (3 casos)
- ✅ Números decimales (2 casos)
- ✅ Funcionalidad adicional (6 casos)
- **Total: 22 casos**

---

## 🌐 Servidor Web de Pruebas

El servidor web proporciona una interfaz gráfica para ejecutar pruebas:

```bash
npm run serve
```

### Características:
- **Puerto**: 3000 (configurable)
- **Índice de pruebas**: Lista todas las pruebas disponibles
- **Ejecutor automático**: Ejecuta todas las pruebas en una página
- **Aplicación principal**: Acceso directo a la aplicación

### URLs Disponibles:
- `http://localhost:3000/` - Índice principal
- `http://localhost:3000/run-all-tests` - Ejecutor automático
- `http://localhost:3000/Actividad_Practica_01.html` - Aplicación principal
- `http://localhost:3000/test-escenarioX.html` - Pruebas individuales

---

## 🔧 Solución de Problemas

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Permission denied"
```bash
# Dar permisos a scripts
chmod +x scripts/*.js
chmod +x setup.sh
```

### Pruebas de navegador fallan
```bash
# Verificar que Puppeteer esté instalado
npm list puppeteer

# Reinstalar Puppeteer si es necesario
npm install puppeteer --save-dev
```

### Puerto 3000 ocupado
```bash
# Usar puerto diferente
node scripts/serve.js 3001
```

### Cobertura baja
- Revisar archivos en `coverage/lcov-report/index.html`
- Agregar más casos de prueba para líneas no cubiertas
- Verificar que todas las ramas condicionales estén probadas

---

## 📈 Métricas de Calidad

### Objetivos de Cobertura
- **Líneas**: 80% mínimo
- **Ramas**: 80% mínimo  
- **Funciones**: 80% mínimo
- **Declaraciones**: 80% mínimo

### Criterios de Éxito
- ✅ Todas las pruebas Jest pasan
- ✅ Todas las pruebas de navegador pasan
- ✅ Cobertura > 80% en todas las métricas
- ✅ Validación de implementaciones exitosa
- ✅ Sin errores de linting

---

## 🚀 Integración Continua

Para integrar con CI/CD, usar:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run test:all
```

---

## 📞 Soporte

Si encuentras problemas:

1. Revisa esta documentación
2. Ejecuta `npm run validate` para diagnóstico
3. Revisa los logs de error detallados
4. Verifica que todas las dependencias estén instaladas

---

**¡Happy Testing! 🧪✨**
