const Mayor = require('../src/escenario3-mayor');

describe('Escenario 3: Encontrar el Número Mayor', () => {
  let mayor;

  beforeEach(() => {
    mayor = new Mayor();
  });

  describe('Validación de entrada', () => {
    test('debe lanzar error con valores no numéricos', () => {
      expect(() => mayor.calcularMayor('5', 3, 8)).toThrow('Todos los valores deben ser números');
      expect(() => mayor.calcularMayor(5, null, 8)).toThrow('Todos los valores deben ser números');
      expect(() => mayor.calcularMayor(5, 3, undefined)).toThrow('Todos los valores deben ser números');
    });

    test('debe lanzar error con valores infinitos', () => {
      expect(() => mayor.calcularMayor(Infinity, 3, 8)).toThrow('Los números deben ser finitos');
      expect(() => mayor.calcularMayor(5, -Infinity, 8)).toThrow('Los números deben ser finitos');
      expect(() => mayor.calcularMayor(5, 3, NaN)).toThrow('Los números deben ser finitos');
    });
  });

  describe('Cálculo del mayor', () => {
    test('primer número es el mayor', () => {
      const resultado = mayor.calcularMayor(12, 8, 9);
      expect(resultado.mayor).toBe(12);
      expect(resultado.posicion).toBe(1);
      expect(resultado.numeros).toEqual([12, 8, 9]);
      expect(resultado.todosIguales).toBe(false);
      expect(resultado.hayEmpate).toBe(false);
    });

    test('segundo número es el mayor', () => {
      const resultado = mayor.calcularMayor(10, 15, 7);
      expect(resultado.mayor).toBe(15);
      expect(resultado.posicion).toBe(2);
      expect(resultado.numeros).toEqual([10, 15, 7]);
      expect(resultado.todosIguales).toBe(false);
      expect(resultado.hayEmpate).toBe(false);
    });

    test('tercer número es el mayor', () => {
      const resultado = mayor.calcularMayor(5, 3, 8);
      expect(resultado.mayor).toBe(8);
      expect(resultado.posicion).toBe(3);
      expect(resultado.numeros).toEqual([5, 3, 8]);
      expect(resultado.todosIguales).toBe(false);
      expect(resultado.hayEmpate).toBe(false);
    });
  });

  describe('Casos con números iguales', () => {
    test('todos los números iguales', () => {
      const resultado = mayor.calcularMayor(5, 5, 5);
      expect(resultado.mayor).toBe(5);
      expect(resultado.posicion).toBe(1);
      expect(resultado.todosIguales).toBe(true);
      expect(resultado.hayEmpate).toBe(true);
      expect(resultado.cantidadEmpates).toBe(3);
    });

    test('primero y segundo iguales (mayores)', () => {
      const resultado = mayor.calcularMayor(7, 7, 3);
      expect(resultado.mayor).toBe(7);
      expect(resultado.posicion).toBe(1);
      expect(resultado.todosIguales).toBe(false);
      expect(resultado.hayEmpate).toBe(true);
      expect(resultado.cantidadEmpates).toBe(2);
    });

    test('primero y tercero iguales (mayores)', () => {
      const resultado = mayor.calcularMayor(9, 4, 9);
      expect(resultado.mayor).toBe(9);
      expect(resultado.posicion).toBe(1);
      expect(resultado.todosIguales).toBe(false);
      expect(resultado.hayEmpate).toBe(true);
      expect(resultado.cantidadEmpates).toBe(2);
    });

    test('segundo y tercero iguales (mayores)', () => {
      const resultado = mayor.calcularMayor(2, 6, 6);
      expect(resultado.mayor).toBe(6);
      expect(resultado.posicion).toBe(2);
      expect(resultado.todosIguales).toBe(false);
      expect(resultado.hayEmpate).toBe(true);
      expect(resultado.cantidadEmpates).toBe(2);
    });
  });

  describe('Casos con números negativos', () => {
    test('todos negativos', () => {
      const resultado = mayor.calcularMayor(-5, -10, -3);
      expect(resultado.mayor).toBe(-3);
      expect(resultado.posicion).toBe(3);
    });

    test('mixto positivos y negativos', () => {
      const resultado = mayor.calcularMayor(-2, 0, 3);
      expect(resultado.mayor).toBe(3);
      expect(resultado.posicion).toBe(3);
    });

    test('con cero', () => {
      const resultado = mayor.calcularMayor(0, -1, 1);
      expect(resultado.mayor).toBe(1);
      expect(resultado.posicion).toBe(3);
    });
  });

  describe('Casos con decimales', () => {
    test('números decimales', () => {
      const resultado = mayor.calcularMayor(3.14, 2.71, 3.15);
      expect(resultado.mayor).toBe(3.15);
      expect(resultado.posicion).toBe(3);
    });

    test('decimales muy cercanos', () => {
      const resultado = mayor.calcularMayor(1.001, 1.002, 1.0015);
      expect(resultado.mayor).toBe(1.002);
      expect(resultado.posicion).toBe(2);
    });
  });

  describe('Funcionalidad adicional - Array', () => {
    test('debe encontrar mayor en array', () => {
      const resultado = mayor.calcularMayorArray([3, 7, 2, 9, 1]);
      expect(resultado.mayor).toBe(9);
      expect(resultado.indice).toBe(3);
      expect(resultado.cantidad).toBe(5);
    });

    test('debe lanzar error con array vacío', () => {
      expect(() => mayor.calcularMayorArray([])).toThrow('Debe proporcionar un array no vacío de números');
    });

    test('debe lanzar error con valores no numéricos en array', () => {
      expect(() => mayor.calcularMayorArray([1, 'a', 3])).toThrow('Todos los elementos deben ser números finitos');
    });
  });

  describe('Funcionalidad adicional - Menor', () => {
    test('debe encontrar el menor de tres números', () => {
      expect(mayor.calcularMenor(12, 8, 9)).toBe(8);
      expect(mayor.calcularMenor(10, 15, 7)).toBe(7);
      expect(mayor.calcularMenor(-5, -10, -3)).toBe(-10);
    });
  });

  describe('Funcionalidad adicional - Ordenamiento', () => {
    test('debe ordenar tres números descendentemente', () => {
      expect(mayor.ordenarDescendente(5, 3, 8)).toEqual([8, 5, 3]);
      expect(mayor.ordenarDescendente(10, 15, 7)).toEqual([15, 10, 7]);
      expect(mayor.ordenarDescendente(5, 5, 5)).toEqual([5, 5, 5]);
    });
  });
});
