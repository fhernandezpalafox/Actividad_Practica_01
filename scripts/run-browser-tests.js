#!/usr/bin/env node

/**
 * Script para ejecutar pruebas en el navegador usando Puppeteer
 * Automatiza la ejecución de los archivos test-escenarioX.html
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

class BrowserTestRunner {
  constructor() {
    this.browser = null;
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      scenarios: []
    };
  }

  async init() {
    console.log('🚀 Iniciando pruebas en navegador...\n');
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async runTestFile(filePath, scenarioName) {
    const page = await this.browser.newPage();
    
    try {
      console.log(`📋 Ejecutando ${scenarioName}...`);
      
      // Cargar el archivo HTML de prueba
      await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });
      
      // Esperar a que las pruebas se ejecuten
      await page.waitForTimeout(2000);
      
      // Extraer resultados de las pruebas
      const testResults = await page.evaluate(() => {
        const resumenElement = document.getElementById('resumen');
        if (!resumenElement) return null;
        
        const text = resumenElement.textContent;
        const match = text.match(/(\d+) pruebas pasadas, (\d+) pruebas fallidas de (\d+) totales/);
        
        if (match) {
          return {
            passed: parseInt(match[1]),
            failed: parseInt(match[2]),
            total: parseInt(match[3])
          };
        }
        return null;
      });

      if (testResults) {
        this.results.total += testResults.total;
        this.results.passed += testResults.passed;
        this.results.failed += testResults.failed;
        
        this.results.scenarios.push({
          name: scenarioName,
          ...testResults,
          status: testResults.failed === 0 ? 'PASS' : 'FAIL'
        });

        const status = testResults.failed === 0 ? '✅ PASS' : '❌ FAIL';
        console.log(`   ${status} - ${testResults.passed}/${testResults.total} pruebas pasadas`);
      } else {
        console.log(`   ❌ ERROR - No se pudieron extraer resultados`);
        this.results.scenarios.push({
          name: scenarioName,
          passed: 0,
          failed: 1,
          total: 1,
          status: 'ERROR'
        });
      }
      
    } catch (error) {
      console.log(`   ❌ ERROR - ${error.message}`);
      this.results.scenarios.push({
        name: scenarioName,
        passed: 0,
        failed: 1,
        total: 1,
        status: 'ERROR'
      });
    } finally {
      await page.close();
    }
  }

  async runAllTests() {
    const testFiles = [
      { file: 'test-escenario1.html', name: 'Escenario 1: Sistema de Descuentos' },
      { file: 'test-escenario2.html', name: 'Escenario 2: Días del Mes' },
      { file: 'test-escenario3.html', name: 'Escenario 3: Número Mayor' },
      { file: 'test-escenario4.html', name: 'Escenario 4: Generador de Listas' },
      { file: 'test-escenario5.html', name: 'Escenario 5: Factorial' },
      { file: 'test-escenario6.html', name: 'Escenario 6: MCD y MCM' },
      { file: 'test-escenario7.html', name: 'Escenario 7: Números Primos' }
    ];

    for (const testFile of testFiles) {
      const filePath = path.resolve(__dirname, '..', testFile.file);
      
      if (fs.existsSync(filePath)) {
        await this.runTestFile(filePath, testFile.name);
      } else {
        console.log(`   ⚠️  SKIP - Archivo ${testFile.file} no encontrado`);
      }
    }
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMEN DE PRUEBAS EN NAVEGADOR');
    console.log('='.repeat(60));
    
    this.results.scenarios.forEach(scenario => {
      const statusIcon = scenario.status === 'PASS' ? '✅' : 
                        scenario.status === 'FAIL' ? '❌' : '⚠️';
      console.log(`${statusIcon} ${scenario.name}: ${scenario.passed}/${scenario.total}`);
    });
    
    console.log('\n' + '-'.repeat(60));
    console.log(`Total: ${this.results.passed}/${this.results.total} pruebas pasadas`);
    console.log(`Éxito: ${this.results.failed === 0 ? '✅ TODAS LAS PRUEBAS PASARON' : '❌ HAY PRUEBAS FALLIDAS'}`);
    console.log('-'.repeat(60));
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async run() {
    try {
      await this.init();
      await this.runAllTests();
      this.printSummary();
      
      // Código de salida basado en resultados
      process.exit(this.results.failed === 0 ? 0 : 1);
      
    } catch (error) {
      console.error('❌ Error ejecutando pruebas:', error);
      process.exit(1);
    } finally {
      await this.cleanup();
    }
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  const runner = new BrowserTestRunner();
  runner.run();
}

module.exports = BrowserTestRunner;
