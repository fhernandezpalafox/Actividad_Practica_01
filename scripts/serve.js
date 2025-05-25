#!/usr/bin/env node

/**
 * Servidor HTTP simple para servir los archivos HTML de prueba
 * Útil para ejecutar las pruebas en un entorno web real
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

class TestServer {
  constructor(port = 3000) {
    this.port = port;
    this.app = express();
    this.setupRoutes();
  }

  setupRoutes() {
    // Servir archivos estáticos desde el directorio raíz
    this.app.use(express.static(path.resolve(__dirname, '..')));

    // Ruta principal - mostrar índice de pruebas
    this.app.get('/', (req, res) => {
      const indexHtml = this.generateIndexPage();
      res.send(indexHtml);
    });

    // Ruta para ejecutar todas las pruebas
    this.app.get('/run-all-tests', (req, res) => {
      const testRunnerHtml = this.generateTestRunnerPage();
      res.send(testRunnerHtml);
    });

    // API para obtener lista de archivos de prueba
    this.app.get('/api/test-files', (req, res) => {
      const testFiles = this.getTestFiles();
      res.json(testFiles);
    });
  }

  getTestFiles() {
    const testFiles = [];
    const rootDir = path.resolve(__dirname, '..');
    
    for (let i = 1; i <= 7; i++) {
      const fileName = `test-escenario${i}.html`;
      const filePath = path.join(rootDir, fileName);
      
      if (fs.existsSync(filePath)) {
        testFiles.push({
          name: `Escenario ${i}`,
          file: fileName,
          url: `/${fileName}`
        });
      }
    }
    
    return testFiles;
  }

  generateIndexPage() {
    const testFiles = this.getTestFiles();
    
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Centro de Pruebas - Fundamentos de Programación</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center mb-8 text-blue-600">
            🧪 Centro de Pruebas Automatizadas
        </h1>
        
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-2xl font-semibold mb-4">📋 Pruebas Individuales</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${testFiles.map(test => `
                        <a href="${test.url}" 
                           class="block p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors">
                            <h3 class="font-semibold text-blue-600">${test.name}</h3>
                            <p class="text-sm text-gray-600">${test.file}</p>
                        </a>
                    `).join('')}
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-2xl font-semibold mb-4">🚀 Ejecutar Todas las Pruebas</h2>
                <div class="space-y-4">
                    <a href="/run-all-tests" 
                       class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        ▶️ Ejecutar Todas las Pruebas
                    </a>
                    <a href="/Actividad_Practica_01.html" 
                       class="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors ml-4">
                        🎯 Aplicación Principal
                    </a>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-semibold mb-4">📚 Documentación</h2>
                <div class="space-y-2">
                    <a href="/README.md" class="block text-blue-600 hover:underline">📖 README.md</a>
                    <a href="/package.json" class="block text-blue-600 hover:underline">📦 package.json</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  generateTestRunnerPage() {
    const testFiles = this.getTestFiles();
    
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejecutor de Pruebas - Fundamentos de Programación</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center mb-8 text-blue-600">
            🚀 Ejecutor de Pruebas Automatizadas
        </h1>
        
        <div class="max-w-6xl mx-auto">
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-semibold">Resultados de Pruebas</h2>
                    <button onclick="runAllTests()" 
                            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        🔄 Ejecutar Todas
                    </button>
                </div>
                <div id="results" class="space-y-4">
                    <p class="text-gray-600">Haz clic en "Ejecutar Todas" para comenzar...</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                ${testFiles.map(test => `
                    <div class="bg-white rounded-lg shadow-md p-4">
                        <h3 class="font-semibold mb-2">${test.name}</h3>
                        <iframe src="${test.url}" 
                                class="w-full h-64 border border-gray-200 rounded"
                                id="frame-${test.file}">
                        </iframe>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
    
    <script>
        async function runAllTests() {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '<p class="text-blue-600">🔄 Ejecutando pruebas...</p>';
            
            const testFiles = ${JSON.stringify(testFiles)};
            const results = [];
            
            for (const test of testFiles) {
                try {
                    const iframe = document.getElementById('frame-' + test.file);
                    iframe.src = iframe.src; // Recargar iframe
                    
                    // Esperar a que se cargue
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    results.push({
                        name: test.name,
                        status: 'completed',
                        message: 'Prueba ejecutada (ver iframe para detalles)'
                    });
                } catch (error) {
                    results.push({
                        name: test.name,
                        status: 'error',
                        message: error.message
                    });
                }
            }
            
            // Mostrar resultados
            resultsDiv.innerHTML = results.map(result => {
                const statusIcon = result.status === 'completed' ? '✅' : '❌';
                const statusColor = result.status === 'completed' ? 'text-green-600' : 'text-red-600';
                return \`
                    <div class="p-3 border border-gray-200 rounded">
                        <span class="\${statusColor}">\${statusIcon} \${result.name}</span>
                        <p class="text-sm text-gray-600">\${result.message}</p>
                    </div>
                \`;
            }).join('');
        }
    </script>
</body>
</html>`;
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`🌐 Servidor de pruebas iniciado en http://localhost:${this.port}`);
      console.log(`📋 Índice de pruebas: http://localhost:${this.port}`);
      console.log(`🚀 Ejecutor automático: http://localhost:${this.port}/run-all-tests`);
      console.log(`🎯 Aplicación principal: http://localhost:${this.port}/Actividad_Practica_01.html`);
      console.log('\n💡 Presiona Ctrl+C para detener el servidor');
    });
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  const port = process.argv[2] || 3000;
  const server = new TestServer(port);
  server.start();
}

module.exports = TestServer;
