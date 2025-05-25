/**
 * Escenario 3: Encontrar el Número Mayor
 * Determina cuál es el mayor de tres números
 */

class Mayor {
  /**
   * Encuentra el mayor de tres números
   * @param {number} num1 - Primer número
   * @param {number} num2 - Segundo número
   * @param {number} num3 - Tercer número
   * @returns {Object} Objeto con el mayor y información adicional
   */
  calcularMayor(num1, num2, num3) {
    // Validación de entrada
    if (typeof num1 !== 'number' || typeof num2 !== 'number' || typeof num3 !== 'number') {
      throw new Error('Todos los valores deben ser números');
    }

    if (!Number.isFinite(num1) || !Number.isFinite(num2) || !Number.isFinite(num3)) {
      throw new Error('Los números deben ser finitos');
    }

    let mayor = num1;
    let posicion = 1;

    if (num2 > mayor) {
      mayor = num2;
      posicion = 2;
    }
    
    if (num3 > mayor) {
      mayor = num3;
      posicion = 3;
    }

    // Verificar si hay empates
    const numeros = [num1, num2, num3];
    const numerosIgualesAlMayor = numeros.filter(n => n === mayor).length;
    const todosIguales = numerosIgualesAlMayor === 3;
    const hayEmpate = numerosIgualesAlMayor > 1;

    return {
      mayor: mayor,
      posicion: posicion,
      numeros: [num1, num2, num3],
      todosIguales: todosIguales,
      hayEmpate: hayEmpate,
      cantidadEmpates: numerosIgualesAlMayor
    };
  }

  /**
   * Encuentra el mayor de un array de números
   * @param {Array<number>} numeros - Array de números
   * @returns {Object} Objeto con el mayor y su índice
   */
  calcularMayorArray(numeros) {
    if (!Array.isArray(numeros) || numeros.length === 0) {
      throw new Error('Debe proporcionar un array no vacío de números');
    }

    if (!numeros.every(n => typeof n === 'number' && Number.isFinite(n))) {
      throw new Error('Todos los elementos deben ser números finitos');
    }

    let mayor = numeros[0];
    let indice = 0;

    for (let i = 1; i < numeros.length; i++) {
      if (numeros[i] > mayor) {
        mayor = numeros[i];
        indice = i;
      }
    }

    return {
      mayor: mayor,
      indice: indice,
      numeros: [...numeros],
      cantidad: numeros.length
    };
  }

  /**
   * Encuentra el menor de tres números
   * @param {number} num1 - Primer número
   * @param {number} num2 - Segundo número
   * @param {number} num3 - Tercer número
   * @returns {number} El número menor
   */
  calcularMenor(num1, num2, num3) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number' || typeof num3 !== 'number') {
      throw new Error('Todos los valores deben ser números');
    }

    let menor = num1;
    if (num2 < menor) menor = num2;
    if (num3 < menor) menor = num3;
    
    return menor;
  }

  /**
   * Ordena tres números de mayor a menor
   * @param {number} num1 - Primer número
   * @param {number} num2 - Segundo número
   * @param {number} num3 - Tercer número
   * @returns {Array<number>} Array ordenado de mayor a menor
   */
  ordenarDescendente(num1, num2, num3) {
    return [num1, num2, num3].sort((a, b) => b - a);
  }
}

// Exportar para Node.js y navegador
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Mayor;
} else if (typeof window !== 'undefined') {
  window.Mayor = Mayor;
}
