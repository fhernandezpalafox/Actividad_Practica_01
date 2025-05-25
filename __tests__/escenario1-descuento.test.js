const Descuento = require('../src/escenario1-descuento');

describe('Escenario 1: Sistema de Descuentos', () => {
  let descuento;

  beforeEach(() => {
    descuento = new Descuento();
  });

  describe('Validación de entrada', () => {
    test('debe lanzar error con cantidad no entera', () => {
      expect(() => descuento.calcular(5.5, 10)).toThrow('La cantidad debe ser un número entero positivo');
    });

    test('debe lanzar error con cantidad negativa', () => {
      expect(() => descuento.calcular(-5, 10)).toThrow('La cantidad debe ser un número entero positivo');
    });

    test('debe lanzar error con cantidad cero', () => {
      expect(() => descuento.calcular(0, 10)).toThrow('La cantidad debe ser un número entero positivo');
    });

    test('debe lanzar error con precio negativo', () => {
      expect(() => descuento.calcular(5, -10)).toThrow('El precio debe ser un número positivo');
    });

    test('debe lanzar error con precio cero', () => {
      expect(() => descuento.calcular(5, 0)).toThrow('El precio debe ser un número positivo');
    });
  });

  describe('Cálculos de descuento', () => {
    test('sin descuento (menos de 10 unidades)', () => {
      const resultado = descuento.calcular(5, 10);
      expect(resultado).toEqual({
        subtotal: 50,
        descuento: 0,
        total: 50,
        porcentaje: 0
      });
    });

    test('descuento 10% (límite inferior)', () => {
      const resultado = descuento.calcular(10, 10);
      expect(resultado).toEqual({
        subtotal: 100,
        descuento: 10,
        total: 90,
        porcentaje: 10
      });
    });

    test('descuento 10% (rango medio)', () => {
      const resultado = descuento.calcular(15, 10);
      expect(resultado).toEqual({
        subtotal: 150,
        descuento: 15,
        total: 135,
        porcentaje: 10
      });
    });

    test('descuento 10% (límite superior)', () => {
      const resultado = descuento.calcular(24, 10);
      expect(resultado).toEqual({
        subtotal: 240,
        descuento: 24,
        total: 216,
        porcentaje: 10
      });
    });

    test('descuento 20% (límite inferior)', () => {
      const resultado = descuento.calcular(25, 10);
      expect(resultado).toEqual({
        subtotal: 250,
        descuento: 50,
        total: 200,
        porcentaje: 20
      });
    });

    test('descuento 20% (rango medio)', () => {
      const resultado = descuento.calcular(50, 10);
      expect(resultado).toEqual({
        subtotal: 500,
        descuento: 100,
        total: 400,
        porcentaje: 20
      });
    });

    test('descuento 20% (límite superior)', () => {
      const resultado = descuento.calcular(100, 10);
      expect(resultado).toEqual({
        subtotal: 1000,
        descuento: 200,
        total: 800,
        porcentaje: 20
      });
    });

    test('descuento 40% (límite inferior)', () => {
      const resultado = descuento.calcular(101, 10);
      expect(resultado).toEqual({
        subtotal: 1010,
        descuento: 404,
        total: 606,
        porcentaje: 40
      });
    });

    test('descuento 40% (cantidad alta)', () => {
      const resultado = descuento.calcular(150, 10);
      expect(resultado).toEqual({
        subtotal: 1500,
        descuento: 600,
        total: 900,
        porcentaje: 40
      });
    });
  });

  describe('Casos con precios decimales', () => {
    test('precio decimal con descuento 20%', () => {
      const resultado = descuento.calcular(30, 15.50);
      expect(resultado).toEqual({
        subtotal: 465,
        descuento: 93,
        total: 372,
        porcentaje: 20
      });
    });

    test('precio decimal con redondeo', () => {
      const resultado = descuento.calcular(15, 3.33);
      expect(resultado.subtotal).toBe(49.95);
      expect(resultado.descuento).toBe(5);
      expect(resultado.total).toBe(44.95);
      expect(resultado.porcentaje).toBe(10);
    });
  });

  describe('Descripción de descuentos', () => {
    test('descripción sin descuento', () => {
      const descripcion = descuento.obtenerDescripcionDescuento(5);
      expect(descripcion).toBe('Sin descuento aplicado');
    });

    test('descripción descuento 10%', () => {
      const descripcion = descuento.obtenerDescripcionDescuento(15);
      expect(descripcion).toBe('Descuento del 10% por compra entre 10 y 24 unidades');
    });

    test('descripción descuento 20%', () => {
      const descripcion = descuento.obtenerDescripcionDescuento(50);
      expect(descripcion).toBe('Descuento del 20% por compra entre 25 y 100 unidades');
    });

    test('descripción descuento 40%', () => {
      const descripcion = descuento.obtenerDescripcionDescuento(150);
      expect(descripcion).toBe('Descuento del 40% por compra mayor a 100 unidades');
    });
  });
});
