const Fecha = require('../src/escenario2-fecha');

describe('Escenario 2: Calculadora de Días del Mes', () => {
  let fecha;

  beforeEach(() => {
    fecha = new Fecha();
  });

  describe('Validación de entrada', () => {
    test('debe lanzar error con mes inválido (0)', () => {
      expect(() => fecha.obtenerDiasMes(0, 2023)).toThrow('El mes debe ser un número entero entre 1 y 12');
    });

    test('debe lanzar error con mes inválido (13)', () => {
      expect(() => fecha.obtenerDiasMes(13, 2023)).toThrow('El mes debe ser un número entero entre 1 y 12');
    });

    test('debe lanzar error con mes decimal', () => {
      expect(() => fecha.obtenerDiasMes(1.5, 2023)).toThrow('El mes debe ser un número entero entre 1 y 12');
    });

    test('debe lanzar error con año negativo', () => {
      expect(() => fecha.obtenerDiasMes(1, -2023)).toThrow('El año debe ser un número entero positivo');
    });

    test('debe lanzar error con año cero', () => {
      expect(() => fecha.obtenerDiasMes(1, 0)).toThrow('El año debe ser un número entero positivo');
    });
  });

  describe('Meses de 31 días', () => {
    const mesesDe31 = [1, 3, 5, 7, 8, 10, 12];
    
    test.each(mesesDe31)('mes %i debe tener 31 días', (mes) => {
      const resultado = fecha.obtenerDiasMes(mes, 2023);
      expect(resultado.dias).toBe(31);
      expect(resultado.esBisiesto).toBe(false);
    });
  });

  describe('Meses de 30 días', () => {
    const mesesDe30 = [4, 6, 9, 11];
    
    test.each(mesesDe30)('mes %i debe tener 30 días', (mes) => {
      const resultado = fecha.obtenerDiasMes(mes, 2023);
      expect(resultado.dias).toBe(30);
      expect(resultado.esBisiesto).toBe(false);
    });
  });

  describe('Febrero en años normales', () => {
    test('febrero 2023 debe tener 28 días', () => {
      const resultado = fecha.obtenerDiasMes(2, 2023);
      expect(resultado.dias).toBe(28);
      expect(resultado.esBisiesto).toBe(false);
      expect(resultado.nombreMes).toBe('Febrero');
    });

    test('febrero 2021 debe tener 28 días', () => {
      const resultado = fecha.obtenerDiasMes(2, 2021);
      expect(resultado.dias).toBe(28);
      expect(resultado.esBisiesto).toBe(false);
    });
  });

  describe('Febrero en años bisiestos', () => {
    test('febrero 2024 debe tener 29 días (múltiplo de 4)', () => {
      const resultado = fecha.obtenerDiasMes(2, 2024);
      expect(resultado.dias).toBe(29);
      expect(resultado.esBisiesto).toBe(true);
    });

    test('febrero 2000 debe tener 29 días (múltiplo de 400)', () => {
      const resultado = fecha.obtenerDiasMes(2, 2000);
      expect(resultado.dias).toBe(29);
      expect(resultado.esBisiesto).toBe(true);
    });

    test('febrero 1900 debe tener 28 días (múltiplo de 100 pero no 400)', () => {
      const resultado = fecha.obtenerDiasMes(2, 1900);
      expect(resultado.dias).toBe(28);
      expect(resultado.esBisiesto).toBe(false);
    });
  });

  describe('Lógica de años bisiestos', () => {
    test('año múltiplo de 4 pero no de 100 es bisiesto', () => {
      expect(fecha.esAnioBisiesto(2024)).toBe(true);
      expect(fecha.esAnioBisiesto(2020)).toBe(true);
      expect(fecha.esAnioBisiesto(2016)).toBe(true);
    });

    test('año múltiplo de 100 pero no de 400 no es bisiesto', () => {
      expect(fecha.esAnioBisiesto(1900)).toBe(false);
      expect(fecha.esAnioBisiesto(1800)).toBe(false);
      expect(fecha.esAnioBisiesto(2100)).toBe(false);
    });

    test('año múltiplo de 400 es bisiesto', () => {
      expect(fecha.esAnioBisiesto(2000)).toBe(true);
      expect(fecha.esAnioBisiesto(1600)).toBe(true);
      expect(fecha.esAnioBisiesto(2400)).toBe(true);
    });

    test('año no múltiplo de 4 no es bisiesto', () => {
      expect(fecha.esAnioBisiesto(2023)).toBe(false);
      expect(fecha.esAnioBisiesto(2021)).toBe(false);
      expect(fecha.esAnioBisiesto(2019)).toBe(false);
    });
  });

  describe('Nombres de meses', () => {
    const nombresMeses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    test.each(nombresMeses.map((nombre, index) => [index + 1, nombre]))(
      'mes %i debe llamarse %s', (mes, nombreEsperado) => {
        const resultado = fecha.obtenerDiasMes(mes, 2023);
        expect(resultado.nombreMes).toBe(nombreEsperado);
      }
    );
  });

  describe('Calendario anual', () => {
    test('debe generar calendario completo para año normal', () => {
      const calendario = fecha.obtenerCalendarioAnual(2023);
      expect(calendario).toHaveLength(12);
      expect(calendario[1].dias).toBe(28); // Febrero
      expect(calendario[1].esBisiesto).toBe(false);
    });

    test('debe generar calendario completo para año bisiesto', () => {
      const calendario = fecha.obtenerCalendarioAnual(2024);
      expect(calendario).toHaveLength(12);
      expect(calendario[1].dias).toBe(29); // Febrero
      expect(calendario[1].esBisiesto).toBe(true);
    });
  });

  describe('Validación de fechas', () => {
    test('fecha válida debe retornar true', () => {
      expect(fecha.esFechaValida(15, 6, 2023)).toBe(true);
      expect(fecha.esFechaValida(29, 2, 2024)).toBe(true); // Bisiesto
      expect(fecha.esFechaValida(31, 12, 2023)).toBe(true);
    });

    test('fecha inválida debe retornar false', () => {
      expect(fecha.esFechaValida(29, 2, 2023)).toBe(false); // No bisiesto
      expect(fecha.esFechaValida(31, 4, 2023)).toBe(false); // Abril tiene 30 días
      expect(fecha.esFechaValida(32, 1, 2023)).toBe(false); // Día inexistente
      expect(fecha.esFechaValida(0, 1, 2023)).toBe(false); // Día cero
    });
  });
});
