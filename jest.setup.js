/**
 * Configuración global para Jest
 * Se ejecuta antes de cada archivo de prueba
 */

// Configurar timeout global para pruebas
jest.setTimeout(10000);

// Configurar matchers personalizados
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
  
  toBeValidNumber(received) {
    const pass = typeof received === 'number' && !isNaN(received) && isFinite(received);
    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid number`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid number`,
        pass: false,
      };
    }
  }
});

// Configurar variables globales para pruebas
global.testUtils = {
  // Función para generar números aleatorios para pruebas
  randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  
  // Función para redondear a 2 decimales
  round2: (num) => Math.round(num * 100) / 100,
  
  // Función para comparar arrays
  arraysEqual: (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
};

// Configurar mocks globales si es necesario
beforeEach(() => {
  // Limpiar mocks antes de cada prueba
  jest.clearAllMocks();
});

// Configurar cleanup después de cada prueba
afterEach(() => {
  // Cleanup si es necesario
});

// Configurar manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Configurar console para pruebas
const originalConsoleError = console.error;
console.error = (...args) => {
  if (args[0] && args[0].includes && args[0].includes('Warning:')) {
    return;
  }
  originalConsoleError.call(console, ...args);
};
