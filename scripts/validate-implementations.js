#!/usr/bin/env node

/**
 * Script para validar que todas las implementaciones funcionen correctamente
 * Ejecuta pruebas unitarias y de integración
 */

const fs = require('fs');
const path = require('path');

class ImplementationValidator {
  constructor() {
    this.results = {
      modules: [],
      totalTests: 0,
      passedTests: 0,
      failedTests: 0
    };
  }

  loadModule(modulePath) {
    try {
      delete require.cache[require.resolve(modulePath)];
      return require(modulePath);
    } catch (error) {
      throw new Error(`No se pudo cargar el módulo ${modulePath}: ${error.message}`);
    }
  }

  async validateEscenario1() {
    console.log('🧪 Validando Escenario 1: Sistema de Descuentos...');
    
    try {
      const Descuento = this.loadModule('../src/escenario1-descuento');
      const descuento = new Descuento();
      
      const tests = [
        { name: 'Sin descuento', input: [5, 10], expected: { total: 50, porcentaje: 0 } },
        { name: 'Descuento 10%', input: [15, 10], expected: { total: 135, porcentaje: 10 } },
        { name: 'Descuento 20%', input: [50, 10], expected: { total: 400, porcentaje: 20 } },
        { name: 'Descuento 40%', input: [150, 10], expected: { total: 900, porcentaje: 40 } }
      ];

      let passed = 0;
      let failed = 0;

      for (const test of tests) {
        try {
          const result = descuento.calcular(...test.input);
          if (result.total === test.expected.total && result.porcentaje === test.expected.porcentaje) {
            console.log(`   ✅ ${test.name}`);
            passed++;
          } else {
            console.log(`   ❌ ${test.name} - Esperado: ${test.expected.total}, Obtenido: ${result.total}`);
            failed++;
          }
        } catch (error) {
          console.log(`   ❌ ${test.name} - Error: ${error.message}`);
          failed++;
        }
      }

      this.results.modules.push({
        name: 'Escenario 1',
        passed,
        failed,
        total: passed + failed
      });

      this.results.totalTests += passed + failed;
      this.results.passedTests += passed;
      this.results.failedTests += failed;

    } catch (error) {
      console.log(`   ❌ Error cargando módulo: ${error.message}`);
      this.results.modules.push({
        name: 'Escenario 1',
        passed: 0,
        failed: 1,
        total: 1
      });
      this.results.totalTests += 1;
      this.results.failedTests += 1;
    }
  }

  async validateEscenario2() {
    console.log('🧪 Validando Escenario 2: Días del Mes...');
    
    try {
      const Fecha = this.loadModule('../src/escenario2-fecha');
      const fecha = new Fecha();
      
      const tests = [
        { name: 'Enero 31 días', input: [1, 2023], expected: 31 },
        { name: 'Febrero año normal', input: [2, 2023], expected: 28 },
        { name: 'Febrero año bisiesto', input: [2, 2024], expected: 29 },
        { name: 'Abril 30 días', input: [4, 2023], expected: 30 },
        { name: 'Año 2000 bisiesto', input: [2, 2000], expected: 29 },
        { name: 'Año 1900 no bisiesto', input: [2, 1900], expected: 28 }
      ];

      let passed = 0;
      let failed = 0;

      for (const test of tests) {
        try {
          const result = fecha.obtenerDiasMes(...test.input);
          if (result.dias === test.expected) {
            console.log(`   ✅ ${test.name}`);
            passed++;
          } else {
            console.log(`   ❌ ${test.name} - Esperado: ${test.expected}, Obtenido: ${result.dias}`);
            failed++;
          }
        } catch (error) {
          console.log(`   ❌ ${test.name} - Error: ${error.message}`);
          failed++;
        }
      }

      this.results.modules.push({
        name: 'Escenario 2',
        passed,
        failed,
        total: passed + failed
      });

      this.results.totalTests += passed + failed;
      this.results.passedTests += passed;
      this.results.failedTests += failed;

    } catch (error) {
      console.log(`   ❌ Error cargando módulo: ${error.message}`);
      this.results.modules.push({
        name: 'Escenario 2',
        passed: 0,
        failed: 1,
        total: 1
      });
      this.results.totalTests += 1;
      this.results.failedTests += 1;
    }
  }

  async validateEscenario3() {
    console.log('🧪 Validando Escenario 3: Número Mayor...');
    
    try {
      const Mayor = this.loadModule('../src/escenario3-mayor');
      const mayor = new Mayor();
      
      const tests = [
        { name: 'Primero mayor', input: [12, 8, 9], expected: 12 },
        { name: 'Segundo mayor', input: [10, 15, 7], expected: 15 },
        { name: 'Tercero mayor', input: [5, 3, 8], expected: 8 },
        { name: 'Todos iguales', input: [5, 5, 5], expected: 5 },
        { name: 'Números negativos', input: [-5, -10, -3], expected: -3 }
      ];

      let passed = 0;
      let failed = 0;

      for (const test of tests) {
        try {
          const result = mayor.calcularMayor(...test.input);
          if (result.mayor === test.expected) {
            console.log(`   ✅ ${test.name}`);
            passed++;
          } else {
            console.log(`   ❌ ${test.name} - Esperado: ${test.expected}, Obtenido: ${result.mayor}`);
            failed++;
          }
        } catch (error) {
          console.log(`   ❌ ${test.name} - Error: ${error.message}`);
          failed++;
        }
      }

      this.results.modules.push({
        name: 'Escenario 3',
        passed,
        failed,
        total: passed + failed
      });

      this.results.totalTests += passed + failed;
      this.results.passedTests += passed;
      this.results.failedTests += failed;

    } catch (error) {
      console.log(`   ❌ Error cargando módulo: ${error.message}`);
      this.results.modules.push({
        name: 'Escenario 3',
        passed: 0,
        failed: 1,
        total: 1
      });
      this.results.totalTests += 1;
      this.results.failedTests += 1;
    }
  }

  checkFileStructure() {
    console.log('📁 Verificando estructura de archivos...');
    
    const requiredFiles = [
      'package.json',
      'README.md',
      'Actividad_Practica_01.html',
      'src/escenario1-descuento.js',
      'src/escenario2-fecha.js',
      'src/escenario3-mayor.js',
      '__tests__/escenario1-descuento.test.js',
      '__tests__/escenario2-fecha.test.js',
      '__tests__/escenario3-mayor.test.js'
    ];

    let allFilesExist = true;

    for (const file of requiredFiles) {
      const filePath = path.resolve(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        console.log(`   ✅ ${file}`);
      } else {
        console.log(`   ❌ ${file} - No encontrado`);
        allFilesExist = false;
      }
    }

    return allFilesExist;
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMEN DE VALIDACIÓN');
    console.log('='.repeat(60));
    
    this.results.modules.forEach(module => {
      const status = module.failed === 0 ? '✅' : '❌';
      console.log(`${status} ${module.name}: ${module.passed}/${module.total} pruebas pasadas`);
    });
    
    console.log('\n' + '-'.repeat(60));
    console.log(`Total: ${this.results.passedTests}/${this.results.totalTests} pruebas pasadas`);
    
    if (this.results.failedTests === 0) {
      console.log('✅ TODAS LAS VALIDACIONES PASARON');
    } else {
      console.log(`❌ ${this.results.failedTests} VALIDACIONES FALLARON`);
    }
    console.log('-'.repeat(60));
  }

  async run() {
    console.log('🔍 Iniciando validación de implementaciones...\n');
    
    // Verificar estructura de archivos
    const filesOk = this.checkFileStructure();
    console.log('');
    
    if (!filesOk) {
      console.log('❌ Faltan archivos requeridos. Abortando validación.');
      process.exit(1);
    }

    // Validar cada escenario
    await this.validateEscenario1();
    await this.validateEscenario2();
    await this.validateEscenario3();
    
    // Mostrar resumen
    this.printSummary();
    
    // Código de salida
    process.exit(this.results.failedTests === 0 ? 0 : 1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  const validator = new ImplementationValidator();
  validator.run();
}

module.exports = ImplementationValidator;
