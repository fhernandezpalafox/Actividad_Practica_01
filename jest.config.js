module.exports = {
  // Entorno de prueba
  testEnvironment: 'node',
  
  // Patrones de archivos de prueba
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // Directorios a ignorar
  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/'
  ],
  
  // Configuración de cobertura
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/index.js'
  ],
  
  // Directorio de cobertura
  coverageDirectory: 'coverage',
  
  // Reportes de cobertura
  coverageReporters: [
    'text',
    'text-summary',
    'lcov',
    'html'
  ],
  
  // Umbrales de cobertura
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Configuración de reportes
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './coverage',
      filename: 'jest-report.html',
      expand: true
    }]
  ],
  
  // Configuración de setup
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Verbose output
  verbose: true,
  
  // Configuración de transformación
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  
  // Configuración de módulos
  moduleFileExtensions: ['js', 'json'],
  
  // Configuración de timeout
  testTimeout: 10000,
  
  // Configuración de watch
  watchman: true,
  
  // Configuración de cache
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache'
};
