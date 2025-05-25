#!/bin/bash

# Script de configuración para el proyecto de Fundamentos de Programación
# Instala dependencias y configura el entorno de pruebas

echo "🚀 Configurando proyecto de Fundamentos de Programación..."
echo "=================================================="

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js primero."
    echo "   Descarga desde: https://nodejs.org/"
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Por favor instala npm primero."
    exit 1
fi

echo "✅ Node.js $(node --version) detectado"
echo "✅ npm $(npm --version) detectado"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencias instaladas correctamente"
else
    echo "❌ Error instalando dependencias"
    exit 1
fi

echo ""

# Crear directorios necesarios
echo "📁 Creando directorios..."
mkdir -p coverage
mkdir -p .jest-cache
echo "✅ Directorios creados"

echo ""

# Verificar estructura de archivos
echo "🔍 Verificando estructura de archivos..."

required_files=(
    "package.json"
    "README.md"
    "jest.config.js"
    "jest.setup.js"
    "src/escenario1-descuento.js"
    "src/escenario2-fecha.js"
    "src/escenario3-mayor.js"
    "__tests__/escenario1-descuento.test.js"
    "__tests__/escenario2-fecha.test.js"
    "__tests__/escenario3-mayor.test.js"
    "scripts/run-browser-tests.js"
    "scripts/validate-implementations.js"
    "scripts/serve.js"
)

missing_files=()

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - No encontrado"
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -gt 0 ]; then
    echo ""
    echo "⚠️  Faltan algunos archivos. El proyecto puede no funcionar correctamente."
    echo "   Archivos faltantes: ${missing_files[*]}"
else
    echo "✅ Todos los archivos requeridos están presentes"
fi

echo ""

# Hacer scripts ejecutables
echo "🔧 Configurando permisos de scripts..."
chmod +x scripts/*.js
chmod +x setup.sh
echo "✅ Permisos configurados"

echo ""

# Ejecutar pruebas de validación
echo "🧪 Ejecutando pruebas de validación..."
npm run validate

if [ $? -eq 0 ]; then
    echo "✅ Validación exitosa"
else
    echo "⚠️  Algunas validaciones fallaron, pero el proyecto está configurado"
fi

echo ""
echo "=================================================="
echo "🎉 ¡Configuración completada!"
echo ""
echo "📋 Comandos disponibles:"
echo "   npm test              - Ejecutar pruebas Jest"
echo "   npm run test:watch    - Ejecutar pruebas en modo watch"
echo "   npm run test:coverage - Ejecutar pruebas con cobertura"
echo "   npm run test:browser  - Ejecutar pruebas en navegador"
echo "   npm run test:all      - Ejecutar todas las pruebas"
echo "   npm run serve         - Iniciar servidor web"
echo "   npm run validate      - Validar implementaciones"
echo ""
echo "🌐 Para usar el servidor web:"
echo "   npm run serve"
echo "   Luego abre http://localhost:3000"
echo ""
echo "📖 Para más información, consulta el README.md"
echo "=================================================="
