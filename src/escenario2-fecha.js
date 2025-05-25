/**
 * Escenario 2: Calculadora de Días del Mes
 * Determina la cantidad de días de un mes considerando años bisiestos
 */

class Fecha {
  /**
   * Obtiene el número de días de un mes específico
   * @param {number} mes - Mes (1-12)
   * @param {number} anio - Año
   * @returns {Object} Objeto con días, esBisiesto y nombreMes
   */
  obtenerDiasMes(mes, anio) {
    // Validación de entrada
    if (!Number.isInteger(mes) || mes < 1 || mes > 12) {
      throw new Error('El mes debe ser un número entero entre 1 y 12');
    }
    
    if (!Number.isInteger(anio) || anio <= 0) {
      throw new Error('El año debe ser un número entero positivo');
    }

    const esBisiesto = this.esAnioBisiesto(anio);
    let dias;

    // Determinar días según el mes
    if ([1, 3, 5, 7, 8, 10, 12].includes(mes)) {
      dias = 31;
    } else if ([4, 6, 9, 11].includes(mes)) {
      dias = 30;
    } else if (mes === 2) {
      dias = esBisiesto ? 29 : 28;
    }

    const nombresMeses = [
      '', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return {
      dias: dias,
      esBisiesto: esBisiesto,
      nombreMes: nombresMeses[mes],
      anio: anio
    };
  }

  /**
   * Determina si un año es bisiesto
   * @param {number} anio - Año a evaluar
   * @returns {boolean} True si es bisiesto, false si no
   */
  esAnioBisiesto(anio) {
    // Un año es bisiesto si:
    // - Es múltiplo de 4 Y no es múltiplo de 100, O
    // - Es múltiplo de 400
    return (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);
  }

  /**
   * Obtiene todos los meses con sus días para un año específico
   * @param {number} anio - Año
   * @returns {Array} Array con información de todos los meses
   */
  obtenerCalendarioAnual(anio) {
    const calendario = [];
    for (let mes = 1; mes <= 12; mes++) {
      calendario.push(this.obtenerDiasMes(mes, anio));
    }
    return calendario;
  }

  /**
   * Valida si una fecha es válida
   * @param {number} dia - Día
   * @param {number} mes - Mes
   * @param {number} anio - Año
   * @returns {boolean} True si la fecha es válida
   */
  esFechaValida(dia, mes, anio) {
    try {
      const infoMes = this.obtenerDiasMes(mes, anio);
      return dia >= 1 && dia <= infoMes.dias;
    } catch (error) {
      return false;
    }
  }
}

// Exportar para Node.js y navegador
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Fecha;
} else if (typeof window !== 'undefined') {
  window.Fecha = Fecha;
}
