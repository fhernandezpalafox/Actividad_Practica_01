# Wiki - Actividad Práctica de Fundamentos de Programación

## 📋 Descripción General
Esta aplicación web contiene 7 ejercicios prácticos de programación implementados en JavaScript, con una interfaz HTML moderna usando Tailwind CSS. Cada ejercicio resuelve un problema algorítmico específico.

---

## 🏗️ Estructura HTML

### Encabezado del Documento
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Actividad Práctica - Fundamentos de Programación</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
```
- **DOCTYPE**: Define el documento como HTML5
- **lang="es"**: Especifica idioma español
- **charset="UTF-8"**: Codificación de caracteres UTF-8
- **viewport**: Configuración responsive para móviles
- **Tailwind CSS**: Framework CSS para estilos modernos

### Estructura del Body
```html
<body class="bg-gray-100 text-gray-800 font-sans p-8">
  <div class="max-w-3xl mx-auto space-y-12">
```
- **bg-gray-100**: Fondo gris claro
- **text-gray-800**: Texto gris oscuro
- **font-sans**: Fuente sans-serif
- **p-8**: Padding de 2rem en todos los lados
- **max-w-3xl**: Ancho máximo de 48rem
- **mx-auto**: Centrado horizontal
- **space-y-12**: Espaciado vertical de 3rem entre elementos

---

## 🎯 Escenarios/Ejercicios

### Escenario 1: Sistema de Descuentos por Cantidad

#### HTML
```html
<section class="bg-white p-6 rounded-xl shadow-md">
  <h1 class="text-2xl font-bold mb-4">Escenario 1: Descuento en tienda</h1>
  <div class="space-y-2">
    <input id="cantidad" type="number" placeholder="Cantidad" />
    <input id="precio" type="number" placeholder="Precio Unitario" />
    <button onclick="descuento.calcular()">Calcular</button>
    <div id="resultado1" class="mt-4 text-green-700 font-medium"></div>
  </div>
</section>
```

#### JavaScript - Clase Descuento
```javascript
class Descuento {
  calcular() {
    // Obtener valores de los campos de entrada
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const precio = parseFloat(document.getElementById('precio').value);

    // Validación de entrada
    if (isNaN(cantidad) || isNaN(precio) || cantidad <= 0 || precio <= 0) {
      document.getElementById('resultado1').textContent = 'Por favor ingrese valores válidos';
      return;
    }

    // Cálculo del subtotal
    const subtotal = cantidad * precio;
    let porcentajeDescuento = 0;

    // Lógica de descuentos por rangos
    if (cantidad > 100) {
      porcentajeDescuento = 0.40;    // 40% para más de 100
    } else if (cantidad >= 25) {
      porcentajeDescuento = 0.20;    // 20% para 25-100
    } else if (cantidad >= 10) {
      porcentajeDescuento = 0.10;    // 10% para 10-24
    }
    // 0% para menos de 10

    // Cálculos finales
    const descuento = subtotal * porcentajeDescuento;
    const total = subtotal - descuento;

    // Mostrar resultado formateado
    document.getElementById('resultado1').innerHTML = `...`;
  }
}
```

**Lógica**: Sistema de descuentos escalonado según cantidad comprada.

---

### Escenario 2: Días del Mes (con años bisiestos)

#### JavaScript - Clase Fecha
```javascript
class Fecha {
  obtenerDiasMes() {
    const mes = parseInt(document.getElementById('mes').value);
    const anio = parseInt(document.getElementById('anio').value);

    // Validación de entrada
    if (isNaN(mes) || isNaN(anio) || mes < 1 || mes > 12 || anio <= 0) {
      document.getElementById('resultado2').textContent = 'Por favor ingrese un mes válido (1-12) y un año válido';
      return;
    }

    // Determinar si es año bisiesto
    const esBisiesto = (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);
    let dias;

    // Determinar días según el mes
    if ([1, 3, 5, 7, 8, 10, 12].includes(mes)) {
      dias = 31;                    // Meses con 31 días
    } else if ([4, 6, 9, 11].includes(mes)) {
      dias = 30;                    // Meses con 30 días
    } else if (mes === 2) {
      dias = esBisiesto ? 29 : 28;  // Febrero: 29 si bisiesto, 28 si no
    }

    // Array con nombres de meses
    const nombresMeses = ['', 'Enero', 'Febrero', ...];

    // Mostrar resultado
    document.getElementById('resultado2').innerHTML = `...`;
  }
}
```

**Algoritmo de año bisiesto**:
- Divisible por 4 Y no por 100, O divisible por 400

---

### Escenario 3: Encontrar el Número Mayor

#### JavaScript - Clase Mayor
```javascript
class Mayor {
  calcularMayor() {
    // Obtener los tres números
    const num1 = parseInt(document.getElementById('n1').value);
    const num2 = parseInt(document.getElementById('n2').value);
    const num3 = parseInt(document.getElementById('n3').value);

    // Validación
    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
      document.getElementById('resultado3').textContent = 'Por favor ingrese tres números válidos';
      return;
    }

    // Algoritmo de comparación secuencial
    let mayor = num1;           // Asumir que el primero es el mayor
    if (num2 > mayor) {         // Comparar con el segundo
      mayor = num2;
    }
    if (num3 > mayor) {         // Comparar con el tercero
      mayor = num3;
    }

    // Mostrar resultado
    document.getElementById('resultado3').innerHTML = `...`;
  }
}
```

**Lógica**: Comparación secuencial para encontrar el máximo.

---

### Escenario 4: Generación de Listas por Rango

#### JavaScript - Clase Rango
```javascript
class Rango {
  generarListas() {
    const a = parseInt(document.getElementById('r1').value);
    const b = parseInt(document.getElementById('r2').value);
    
    // Determinar el rango correcto
    const menor = Math.min(a, b);
    const mayor = Math.max(a, b);

    // Lista ascendente (menor a mayor)
    const ascendente = [];
    for (let i = menor; i <= mayor; i++) {
      ascendente.push(i);
    }

    // Lista de pares descendente (mayor a menor)
    const pares = [];
    for (let i = mayor; i >= menor; i--) {
      if (i % 2 === 0) {          // Verificar si es par
        pares.push(i);
      }
    }

    // Lista de impares descendente
    const impares = [];
    for (let i = mayor; i >= menor; i--) {
      if (i % 2 !== 0) {          // Verificar si es impar
        impares.push(i);
      }
    }

    // Mostrar las tres listas
    document.getElementById('resultado4').textContent = `...`;
  }
}
```

**Algoritmos**:
- **Paridad**: `n % 2 === 0` para pares, `n % 2 !== 0` para impares
- **Bucles**: Ascendente con `i++`, descendente con `i--`

---

### Escenario 5: Cálculo de Factorial

#### JavaScript - Clase Factorial
```javascript
class Factorial {
  calcular() {
    const n = parseInt(document.getElementById('fact').value);
    
    // Algoritmo de factorial iterativo
    let resultado = 1;
    for (let i = 1; i <= n; i++) {
      resultado *= i;           // resultado = resultado * i
    }
    
    document.getElementById('resultado5').textContent = `El factorial de ${n} es ${resultado}`;
  }
}
```

**Factorial**: n! = 1 × 2 × 3 × ... × n
- 0! = 1 (por definición)
- 5! = 1 × 2 × 3 × 4 × 5 = 120

---

### Escenario 6: MCD y MCM (Máximo Común Divisor y Mínimo Común Múltiplo)

#### JavaScript - Clase McdMcm
```javascript
class McdMcm {
  calcular() {
    const a = parseInt(document.getElementById('mcd1').value);
    const b = parseInt(document.getElementById('mcd2').value);
    
    // Algoritmo de Euclides para MCD (recursivo)
    const mcd = (x, y) => y === 0 ? x : mcd(y, x % y);
    
    const resultadoMCD = mcd(a, b);
    
    // MCM usando la fórmula: MCM(a,b) = (a × b) / MCD(a,b)
    const resultadoMCM = (a * b) / resultadoMCD;
    
    document.getElementById('resultado6').textContent = `MCD: ${resultadoMCD}, MCM: ${resultadoMCM}`;
  }
}
```

**Algoritmo de Euclides**:
- MCD(a, 0) = a
- MCD(a, b) = MCD(b, a mod b)

**Ejemplo**: MCD(48, 18)
1. MCD(48, 18) = MCD(18, 12) [48 % 18 = 12]
2. MCD(18, 12) = MCD(12, 6) [18 % 12 = 6]
3. MCD(12, 6) = MCD(6, 0) [12 % 6 = 0]
4. MCD(6, 0) = 6

---

### Escenario 7: Números Primos

#### JavaScript - Clase Primos
```javascript
class Primos {
  calcular() {
    const n = parseInt(document.getElementById('primos').value);
    
    // Función para verificar si un número es primo
    const esPrimo = num => {
      if (num < 2) return false;        // 0 y 1 no son primos
      
      // Verificar divisibilidad hasta la raíz cuadrada
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {            // Si es divisible, no es primo
          return false;
        }
      }
      return true;                      // Si no encontró divisores, es primo
    };
    
    // Generar lista de primos hasta n
    const lista = [];
    for (let i = 1; i <= n; i++) {
      if (esPrimo(i)) {
        lista.push(i);
      }
    }
    
    document.getElementById('resultado7').textContent = `Primos hasta ${n}:\n${lista.join(', ')}`;
  }
}
```

**Algoritmo de primalidad**:
- Números < 2 no son primos
- Solo necesita verificar divisores hasta √n
- Si encuentra un divisor, no es primo

---

## 🔧 Inicialización Global

```javascript
// Crear instancias globales para acceso desde HTML
window.descuento = new Descuento();
window.fecha = new Fecha();
window.mayor = new Mayor();
window.rango = new Rango();
window.factorial = new Factorial();
window.mcdmcm = new McdMcm();
window.primos = new Primos();
```

Estas líneas hacen que las clases sean accesibles desde los botones HTML mediante `onclick`.

---

## 🎨 Características de Diseño

### Tailwind CSS Classes Utilizadas:
- **Layout**: `max-w-3xl`, `mx-auto`, `space-y-12`, `space-y-2`
- **Colores**: `bg-gray-100`, `text-gray-800`, `text-green-700`, `bg-blue-600`
- **Tipografía**: `text-2xl`, `font-bold`, `font-medium`
- **Espaciado**: `p-6`, `p-2`, `px-4`, `py-2`, `mb-4`, `mt-4`
- **Bordes**: `rounded-xl`, `rounded`, `border`
- **Efectos**: `shadow-md`, `hover:bg-blue-700`
- **Utilidades**: `w-full`, `whitespace-pre-wrap`

### Patrones de Interacción:
1. **Entrada**: Inputs tipo `number` con placeholders descriptivos
2. **Procesamiento**: Clases JavaScript con métodos específicos
3. **Salida**: Divs con resultados formateados y estilizados
4. **Validación**: Verificación de entradas antes del procesamiento

---

## 🧮 Conceptos Algorítmicos Cubiertos

1. **Estructuras condicionales** (if/else if/else)
2. **Bucles** (for, while implícito en recursión)
3. **Operadores aritméticos y de comparación**
4. **Validación de datos**
5. **Algoritmos matemáticos** (factorial, MCD, primalidad)
6. **Manipulación de arrays**
7. **Recursión** (MCD de Euclides)
8. **Optimización** (√n para primos)
9. **Formateo de salida**
10. **Programación orientada a objetos** (clases y métodos)

Esta aplicación es una excelente herramienta educativa que combina conceptos fundamentales de programación con una interfaz moderna y funcional.