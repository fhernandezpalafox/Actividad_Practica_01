# Actividad Práctica - Fundamentos de Programación

Este repositorio contiene la implementación de 7 ejercicios fundamentales de programación que cubren conceptos básicos como estructuras condicionales, bucles, operaciones matemáticas y algoritmos.

## Tabla de Contenidos

1. [Escenario 1: Sistema de Descuentos en Tienda](#escenario-1-sistema-de-descuentos-en-tienda)
2. [Escenario 2: Calculadora de Días del Mes](#escenario-2-calculadora-de-días-del-mes)
3. [Escenario 3: Encontrar el Número Mayor](#escenario-3-encontrar-el-número-mayor)
4. [Escenario 4: Generador de Listas (Rango, Pares e Impares)](#escenario-4-generador-de-listas-rango-pares-e-impares)
5. [Escenario 5: Calculadora de Factorial](#escenario-5-calculadora-de-factorial)
6. [Escenario 6: Máximo Común Divisor y Mínimo Común Múltiplo](#escenario-6-máximo-común-divisor-y-mínimo-común-múltiplo)
7. [Escenario 7: Generador de Números Primos](#escenario-7-generador-de-números-primos)
8. [Casos de Prueba](#casos-de-prueba)
9. [Cómo Ejecutar](#cómo-ejecutar)

---

## Escenario 1: Sistema de Descuentos en Tienda

### Descripción del Problema
Desarrollar una aplicación para calcular el desglose del pago de un cliente en una tienda de abarrotes, aplicando descuentos según la cantidad de unidades compradas.

### Análisis de Requerimientos
- **Entrada**: Cantidad de unidades (entero positivo) y precio unitario (número)
- **Proceso**: Calcular subtotal, aplicar descuento según reglas, calcular total
- **Salida**: Subtotal, descuento aplicado, total a pagar

### Reglas de Descuento
- **Más de 100 unidades**: 40% de descuento
- **Entre 25 y 100 unidades**: 20% de descuento
- **Entre 10 y 24 unidades**: 10% de descuento
- **Menos de 10 unidades**: Sin descuento

### Variables Utilizadas
- `cantidad`: Número de unidades a comprar
- `precio`: Precio unitario del producto
- `subtotal`: Cantidad × precio
- `porcentajeDescuento`: Porcentaje a aplicar según reglas
- `descuento`: Monto del descuento
- `total`: Subtotal - descuento

### Estructuras Condicionales
```javascript
if (cantidad > 100) {
    porcentajeDescuento = 0.40;
} else if (cantidad >= 25) {
    porcentajeDescuento = 0.20;
} else if (cantidad >= 10) {
    porcentajeDescuento = 0.10;
} else {
    porcentajeDescuento = 0;
}
```

### Casos de Prueba
| Cantidad | Precio | Subtotal | Descuento | Total | Porcentaje |
|----------|--------|----------|-----------|-------|------------|
| 5        | 10     | 50       | 0         | 50    | 0%         |
| 15       | 10     | 150      | 15        | 135   | 10%        |
| 50       | 10     | 500      | 100       | 400   | 20%        |
| 150      | 10     | 1500     | 600       | 900   | 40%        |

---

## Escenario 2: Calculadora de Días del Mes

### Descripción del Problema
Crear una aplicación que determine la cantidad de días de un mes específico en un año dado, considerando años bisiestos.

### Análisis de Requerimientos
- **Entrada**: Mes (1-12) y año (entero positivo)
- **Proceso**: Determinar días del mes considerando años bisiestos
- **Salida**: Número de días del mes

### Reglas para Días del Mes
- **31 días**: Enero(1), Marzo(3), Mayo(5), Julio(7), Agosto(8), Octubre(10), Diciembre(12)
- **30 días**: Abril(4), Junio(6), Septiembre(9), Noviembre(11)
- **Febrero**: 28 días (29 en año bisiesto)

### Reglas para Año Bisiesto
Un año es bisiesto cuando:
- Es múltiplo de 4 Y no es múltiplo de 100, O
- Es múltiplo de 400

### Variables Utilizadas
- `mes`: Número del mes (1-12)
- `anio`: Año a evaluar
- `esBisiesto`: Boolean que indica si el año es bisiesto
- `dias`: Número de días del mes

### Estructuras Condicionales
```javascript
const esBisiesto = (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);

if ([1, 3, 5, 7, 8, 10, 12].includes(mes)) {
    dias = 31;
} else if ([4, 6, 9, 11].includes(mes)) {
    dias = 30;
} else if (mes === 2) {
    dias = esBisiesto ? 29 : 28;
}
```

### Casos de Prueba
| Mes | Año  | Días | Observación |
|-----|------|------|-------------|
| 2   | 2020 | 29   | Año bisiesto |
| 2   | 2021 | 28   | Año normal |
| 2   | 2000 | 29   | Múltiplo de 400 |
| 2   | 1900 | 28   | Múltiplo de 100 pero no de 400 |
| 4   | 2023 | 30   | Abril |
| 7   | 2023 | 31   | Julio |

---

## Escenario 3: Encontrar el Número Mayor

### Descripción del Problema
Desarrollar una aplicación que determine cuál es el mayor de tres números enteros positivos ingresados por el usuario.

### Análisis de Requerimientos
- **Entrada**: Tres números enteros positivos
- **Proceso**: Comparar los tres números para encontrar el mayor
- **Salida**: El número mayor de los tres

### Variables Utilizadas
- `num1`, `num2`, `num3`: Los tres números a comparar
- `mayor`: El número mayor encontrado

### Estructuras Condicionales
```javascript
let mayor = num1;
if (num2 > mayor) {
    mayor = num2;
}
if (num3 > mayor) {
    mayor = num3;
}
```

### Casos de Prueba
| Número 1 | Número 2 | Número 3 | Mayor | Observación |
|----------|----------|----------|-------|-------------|
| 5        | 3        | 8        | 8     | Tercero es mayor |
| 10       | 15       | 7        | 15    | Segundo es mayor |
| 12       | 8        | 9        | 12    | Primero es mayor |
| 5        | 5        | 5        | 5     | Todos iguales |
| 1        | 100      | 50       | 100   | Diferencia grande |

---

## Escenario 4: Generador de Listas (Rango, Pares e Impares)

### Descripción del Problema
Crear una aplicación que genere tres listas diferentes a partir de dos números enteros: una lista ascendente con todos los números del rango, una lista descendente con números pares, y otra descendente con números impares.

### Análisis de Requerimientos
- **Entrada**: Dos números enteros positivos
- **Proceso**: Generar tres listas según especificaciones
- **Salida**: Lista ascendente completa, lista descendente de pares, lista descendente de impares

### Variables Utilizadas
- `a`, `b`: Los dos números de entrada
- `menor`, `mayor`: Límites del rango ordenados
- `ascendente`: Array con todos los números del menor al mayor
- `pares`: Array con números pares del mayor al menor
- `impares`: Array con números impares del mayor al menor

### Estructuras de Repetición
```javascript
// Lista ascendente completa
for (let i = menor; i <= mayor; i++) {
    ascendente.push(i);
}

// Lista descendente de pares
for (let i = mayor; i >= menor; i--) {
    if (i % 2 === 0) pares.push(i);
}

// Lista descendente de impares
for (let i = mayor; i >= menor; i--) {
    if (i % 2 !== 0) impares.push(i);
}
```

### Casos de Prueba
| Número A | Número B | Ascendente | Pares Desc. | Impares Desc. |
|----------|----------|------------|-------------|---------------|
| 3        | 8        | 3,4,5,6,7,8 | 8,6,4      | 7,5,3         |
| 10       | 15       | 10,11,12,13,14,15 | 14,12,10 | 15,13,11    |
| 1        | 5        | 1,2,3,4,5  | 4,2        | 5,3,1         |

---

## Escenario 5: Calculadora de Factorial

### Descripción del Problema
Desarrollar una aplicación que calcule el factorial de un número entero positivo usando la fórmula n! = n × (n-1) × (n-2) × ... × 1.

### Análisis de Requerimientos
- **Entrada**: Un número entero positivo
- **Proceso**: Calcular el factorial usando bucle iterativo
- **Salida**: El factorial del número

### Variables Utilizadas
- `n`: Número del cual calcular el factorial
- `resultado`: Acumulador para el cálculo del factorial

### Estructura de Repetición
```javascript
let resultado = 1;
for (let i = 1; i <= n; i++) {
    resultado *= i;
}
```

### Casos de Prueba
| Número | Factorial | Cálculo |
|--------|-----------|---------|
| 0      | 1         | 1 (por definición) |
| 1      | 1         | 1 |
| 5      | 120       | 5×4×3×2×1 |
| 7      | 5040      | 7×6×5×4×3×2×1 |
| 10     | 3628800   | 10×9×8×7×6×5×4×3×2×1 |

---

## Escenario 6: Máximo Común Divisor y Mínimo Común Múltiplo

### Descripción del Problema
Crear una aplicación que calcule el MCD (Máximo Común Divisor) y MCM (Mínimo Común Múltiplo) de dos números enteros positivos.

### Análisis de Requerimientos
- **Entrada**: Dos números enteros positivos
- **Proceso**: Calcular MCD usando algoritmo de Euclides, luego MCM usando la relación MCM = (a×b)/MCD
- **Salida**: MCD y MCM de los dos números

### Variables Utilizadas
- `a`, `b`: Los dos números de entrada
- `mcd`: Máximo Común Divisor
- `mcm`: Mínimo Común Múltiplo

### Algoritmo de Euclides (Recursivo)
```javascript
const mcd = (x, y) => y === 0 ? x : mcd(y, x % y);
const mcm = (a * b) / mcd;
```

### Casos de Prueba
| Número A | Número B | MCD | MCM | Observación |
|----------|----------|-----|-----|-------------|
| 12       | 18       | 6   | 36  | Números con factores comunes |
| 15       | 25       | 5   | 75  | Múltiplos de 5 |
| 7        | 13       | 1   | 91  | Números primos |
| 24       | 36       | 12  | 72  | Uno múltiplo del otro |

---

## Escenario 7: Generador de Números Primos

### Descripción del Problema
Desarrollar una aplicación que genere una lista de todos los números primos desde 1 hasta un número límite especificado por el usuario.

### Análisis de Requerimientos
- **Entrada**: Un número entero positivo (límite superior)
- **Proceso**: Verificar cada número para determinar si es primo
- **Salida**: Lista de números primos hasta el límite

### Variables Utilizadas
- `n`: Número límite
- `lista`: Array para almacenar números primos encontrados
- `esPrimo`: Función para verificar si un número es primo

### Algoritmo de Verificación de Primos
```javascript
const esPrimo = num => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};
```

### Casos de Prueba
| Límite | Números Primos | Cantidad |
|--------|----------------|----------|
| 10     | 2, 3, 5, 7     | 4        |
| 20     | 2, 3, 5, 7, 11, 13, 17, 19 | 8 |
| 30     | 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 | 10 |
| 50     | 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47 | 15 |

---

## 🧪 Sistema de Pruebas Automatizadas

Este proyecto incluye un **sistema completo de pruebas automatizadas** con múltiples niveles de testing:

### 🎯 Tipos de Pruebas Implementadas

#### 1. **Pruebas Unitarias con Jest**
- **Ubicación**: `__tests__/*.test.js`
- **Tecnología**: Jest + Node.js
- **Cobertura**: 92 casos de prueba
- **Características**:
  - Validación exhaustiva de lógica de negocio
  - Manejo de casos límite y errores
  - Reportes de cobertura de código
  - Ejecución rápida y confiable

#### 2. **Pruebas de Navegador con Puppeteer**
- **Ubicación**: `test-escenario*.html`
- **Tecnología**: Puppeteer + HTML/JavaScript
- **Cobertura**: 68 casos de prueba
- **Características**:
  - Pruebas de interfaz de usuario
  - Validación de integración completa
  - Ejecución automatizada en navegador
  - Reportes visuales en tiempo real

#### 3. **Pruebas de Validación Rápida**
- **Ubicación**: `scripts/validate-implementations.js`
- **Tecnología**: Node.js puro
- **Cobertura**: 15 casos críticos
- **Características**:
  - Validación rápida sin dependencias
  - Verificación de estructura de archivos
  - Pruebas de humo (smoke tests)

### 🚀 Comandos de Pruebas

```bash
# Configuración inicial (solo una vez)
chmod +x setup.sh && ./setup.sh

# Pruebas Jest (unitarias)
npm test                    # Ejecutar todas las pruebas
npm run test:watch         # Modo watch (re-ejecuta al cambiar)
npm run test:coverage      # Con reporte de cobertura
npm run test:verbose       # Salida detallada

# Pruebas de navegador
npm run test:browser       # Automatizadas con Puppeteer
npm run serve              # Servidor web para pruebas manuales

# Pruebas combinadas
npm run test:all           # TODAS las pruebas (Jest + Navegador)
npm run validate           # Validación rápida sin dependencias
```

### 📊 Estadísticas de Pruebas

| Escenario | Jest | Navegador | Total | Estado |
|-----------|------|-----------|-------|--------|
| 1. Descuentos | 23 casos | 8 casos | 31 | ✅ |
| 2. Días del Mes | 47 casos | 15 casos | 62 | ✅ |
| 3. Número Mayor | 22 casos | 12 casos | 34 | ✅ |
| 4. Listas | - | 8 casos | 8 | ✅ |
| 5. Factorial | - | 12 casos | 12 | ✅ |
| 6. MCD y MCM | - | 12 casos | 12 | ✅ |
| 7. Números Primos | - | 11 casos | 11 | ✅ |
| **TOTAL** | **92** | **78** | **170** | **✅** |

### 🎨 Servidor Web de Pruebas

El proyecto incluye un servidor web completo para ejecutar pruebas:

```bash
npm run serve
# Abre http://localhost:3000
```

**Características del servidor:**
- 🏠 **Página principal**: Índice de todas las pruebas
- 🚀 **Ejecutor automático**: Ejecuta todas las pruebas en una página
- 🎯 **Aplicación principal**: Acceso directo a los ejercicios
- 📱 **Diseño responsivo**: Funciona en móviles y tablets
- ⚡ **Tiempo real**: Resultados instantáneos

### 🔧 Estructura de Archivos de Prueba

```
📁 Pruebas HTML (Navegador)
├── test-escenario1.html    # Sistema de descuentos
├── test-escenario2.html    # Días del mes
├── test-escenario3.html    # Número mayor
├── test-escenario4.html    # Generador de listas
├── test-escenario5.html    # Factorial
├── test-escenario6.html    # MCD y MCM
└── test-escenario7.html    # Números primos

📁 Pruebas Jest (Node.js)
├── __tests__/escenario1-descuento.test.js
├── __tests__/escenario2-fecha.test.js
└── __tests__/escenario3-mayor.test.js

📁 Módulos JavaScript
├── src/escenario1-descuento.js
├── src/escenario2-fecha.js
└── src/escenario3-mayor.js

📁 Scripts de Automatización
├── scripts/run-browser-tests.js      # Puppeteer automation
├── scripts/validate-implementations.js # Quick validation
└── scripts/serve.js                  # Web server
```

### 📈 Metodología de Pruebas

Cada conjunto de pruebas incluye:

1. **✅ Casos Normales**: Valores típicos de entrada
2. **🔥 Casos Límite**: Valores en bordes de condiciones
3. **⚡ Casos Extremos**: Valores mínimos, máximos, negativos
4. **🛡️ Validación de Errores**: Manejo de entradas inválidas
5. **🎯 Casos Especiales**: Situaciones únicas por escenario

### 🎪 Ejecución Visual

Los archivos HTML ejecutan automáticamente y muestran:
- ✅ **Resultado esperado vs obtenido**
- ❌ **Fallos con descripción detallada**
- 📊 **Resumen de pruebas pasadas/fallidas**
- 🎨 **Interfaz colorida y fácil de leer**
- ⚡ **Ejecución instantánea al cargar**

---

## 🚀 Cómo Ejecutar

### 📋 Requisitos

#### Opción 1: Solo Navegador (Básico)
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No se requieren dependencias adicionales

#### Opción 2: Completo con Automatización
- Node.js 16+ instalado
- npm como gestor de paquetes

### ⚡ Inicio Rápido

#### 🎯 Solo usar la aplicación
```bash
# Abrir directamente en navegador
open Actividad_Practica_01.html
```

#### 🧪 Configurar sistema completo de pruebas
```bash
# Configuración automática (recomendado)
chmod +x setup.sh && ./setup.sh

# O configuración manual
npm install
npm run validate
```

### 🎮 Modos de Ejecución

#### 1. **Aplicación Principal**
```bash
# Opción A: Abrir archivo directamente
open Actividad_Practica_01.html

# Opción B: Usar servidor web
npm run serve
# Luego abrir http://localhost:3000/Actividad_Practica_01.html
```

#### 2. **Pruebas Individuales**
```bash
# Abrir pruebas específicas
open test-escenario1.html    # Sistema de descuentos
open test-escenario2.html    # Días del mes
open test-escenario3.html    # Número mayor
# ... etc
```

#### 3. **Pruebas Automatizadas**
```bash
# Validación rápida (sin dependencias)
node scripts/validate-implementations.js

# Pruebas Jest completas
npm test

# Pruebas de navegador automatizadas
npm run test:browser

# TODAS las pruebas
npm run test:all
```

#### 4. **Servidor Web Completo**
```bash
npm run serve
```
Luego abrir http://localhost:3000 para acceder a:
- 🏠 Índice de todas las pruebas
- 🚀 Ejecutor automático de pruebas
- 🎯 Aplicación principal
- 📊 Reportes de cobertura

### 📁 Estructura Completa del Proyecto

```
Actividad Practica/
├── 📖 Documentación
│   ├── README.md                    # Documentación principal
│   └── TESTING.md                   # Guía de pruebas
├── 🎯 Aplicación Principal
│   └── Actividad_Practica_01.html   # Interfaz web principal
├── 🧪 Pruebas HTML (Navegador)
│   ├── test-escenario1.html         # Descuentos
│   ├── test-escenario2.html         # Días del mes
│   ├── test-escenario3.html         # Número mayor
│   ├── test-escenario4.html         # Listas
│   ├── test-escenario5.html         # Factorial
│   ├── test-escenario6.html         # MCD y MCM
│   └── test-escenario7.html         # Números primos
├── 🔧 Código Fuente
│   ├── src/
│   │   ├── escenario1-descuento.js
│   │   ├── escenario2-fecha.js
│   │   └── escenario3-mayor.js
│   └── __tests__/
│       ├── escenario1-descuento.test.js
│       ├── escenario2-fecha.test.js
│       └── escenario3-mayor.test.js
├── 🤖 Automatización
│   ├── scripts/
│   │   ├── run-browser-tests.js     # Puppeteer
│   │   ├── validate-implementations.js # Validación
│   │   └── serve.js                 # Servidor web
│   ├── package.json                 # Configuración npm
│   ├── jest.config.js              # Configuración Jest
│   └── setup.sh                    # Script de instalación
└── 📊 Reportes
    └── coverage/                    # Reportes de cobertura
```

### 🎪 Flujo de Trabajo Recomendado

1. **🚀 Configuración inicial** (solo una vez):
   ```bash
   ./setup.sh
   ```

2. **🎯 Desarrollo y pruebas**:
   ```bash
   # Ejecutar aplicación
   npm run serve

   # Ejecutar pruebas en modo watch
   npm run test:watch
   ```

3. **✅ Validación final**:
   ```bash
   npm run test:all
   ```

---

## Tecnologías Utilizadas

- **HTML5**: Estructura de las páginas web
- **CSS3**: Estilos (Tailwind CSS para diseño responsivo)
- **JavaScript ES6+**: Lógica de programación y algoritmos
- **Programación Orientada a Objetos**: Organización del código en clases

---

## Conceptos de Programación Aplicados

### Estructuras de Control
- **Condicionales**: `if`, `else if`, `else`
- **Bucles**: `for`, `while`
- **Operadores lógicos**: `&&`, `||`, `!`
- **Operadores de comparación**: `>`, `<`, `>=`, `<=`, `===`, `!==`

### Estructuras de Datos
- **Arrays**: Para almacenar listas de números
- **Variables primitivas**: `number`, `string`, `boolean`
- **Funciones**: Modularización del código

### Algoritmos Implementados
- **Algoritmo de Euclides**: Para cálculo de MCD
- **Criba de Eratóstenes** (optimizada): Para números primos
- **Cálculo iterativo**: Para factorial
- **Búsqueda de máximo**: Para comparación de números

---

## Autor

**Actividad Práctica - Fundamentos de Programación**
Implementación de ejercicios básicos de programación con JavaScript

---