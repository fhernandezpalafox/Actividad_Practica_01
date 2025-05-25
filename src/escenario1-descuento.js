/**
 * Escenario 1: Sistema de Descuentos en Tienda
 * Calcula el desglose del pago aplicando descuentos según la cantidad
 */

class Descuento {
  /**
   * Calcula el desglose del pago con descuentos
   * @param {number} cantidad - Número de unidades a comprar
   * @param {number} precio - Precio unitario del producto
   * @returns {Object} Objeto con subtotal, descuento, total y porcentaje
   */
  calcular(cantidad, precio) {
    // Validación de entrada
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error('La cantidad debe ser un número entero positivo');
    }
    
    if (typeof precio !== 'number' || precio <= 0) {
      throw new Error('El precio debe ser un número positivo');
    }

    const subtotal = cantidad * precio;
    let porcentajeDescuento = 0;

    // Aplicar reglas de descuento
    if (cantidad > 100) {
      porcentajeDescuento = 0.40; // 40%
    } else if (cantidad >= 25) {
      porcentajeDescuento = 0.20; // 20%
    } else if (cantidad >= 10) {
      porcentajeDescuento = 0.10; // 10%
    }
    // Si cantidad < 10, no hay descuento (0%)

    const descuento = subtotal * porcentajeDescuento;
    const total = subtotal - descuento;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      descuento: Math.round(descuento * 100) / 100,
      total: Math.round(total * 100) / 100,
      porcentaje: porcentajeDescuento * 100
    };
  }

  /**
   * Obtiene la descripción del descuento aplicado
   * @param {number} cantidad - Número de unidades
   * @returns {string} Descripción del descuento
   */
  obtenerDescripcionDescuento(cantidad) {
    if (cantidad > 100) {
      return 'Descuento del 40% por compra mayor a 100 unidades';
    } else if (cantidad >= 25) {
      return 'Descuento del 20% por compra entre 25 y 100 unidades';
    } else if (cantidad >= 10) {
      return 'Descuento del 10% por compra entre 10 y 24 unidades';
    } else {
      return 'Sin descuento aplicado';
    }
  }
}

// Exportar para Node.js y navegador
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Descuento;
} else if (typeof window !== 'undefined') {
  window.Descuento = Descuento;
}
