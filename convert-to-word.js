#!/usr/bin/env node

/**
 * Script para convertir el archivo HTML a formato Word
 * Utiliza puppeteer para generar un PDF que luego se puede convertir a Word
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class HTMLToWordConverter {
    constructor() {
        this.inputFile = 'Respuestas_Fundamentos_Programacion.html';
        this.outputFile = 'Respuestas_Fundamentos_Programacion.pdf';
    }

    async convertToPDF() {
        console.log('🔄 Iniciando conversión HTML a PDF...');
        
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        
        // Cargar el archivo HTML
        const htmlPath = path.resolve(__dirname, this.inputFile);
        await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
        
        // Configurar el PDF para que se vea como un documento de Word
        await page.pdf({
            path: this.outputFile,
            format: 'A4',
            margin: {
                top: '2cm',
                right: '2cm',
                bottom: '2cm',
                left: '2cm'
            },
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: `
                <div style="font-size: 10px; width: 100%; text-align: center; color: #666;">
                    Fundamentos de Programación - Respuestas Completas
                </div>
            `,
            footerTemplate: `
                <div style="font-size: 10px; width: 100%; text-align: center; color: #666;">
                    Página <span class="pageNumber"></span> de <span class="totalPages"></span>
                </div>
            `
        });

        await browser.close();
        
        console.log(`✅ PDF generado exitosamente: ${this.outputFile}`);
        console.log('📝 Para convertir a Word:');
        console.log('   1. Abre el PDF en cualquier visor');
        console.log('   2. Usa un convertidor online como SmallPDF, ILovePDF, o Adobe');
        console.log('   3. O abre el PDF en Word directamente (Word 2013+)');
    }

    generateWordInstructions() {
        const instructions = `
# Instrucciones para Convertir a Word

## Opción 1: Convertir PDF a Word Online
1. Abre el archivo "${this.outputFile}" generado
2. Ve a uno de estos sitios web:
   - https://smallpdf.com/pdf-to-word
   - https://www.ilovepdf.com/pdf_to_word
   - https://www.adobe.com/acrobat/online/pdf-to-word.html
3. Sube el PDF y descarga el archivo Word

## Opción 2: Usar Microsoft Word
1. Abre Microsoft Word (2013 o superior)
2. Ve a Archivo > Abrir
3. Selecciona el archivo "${this.outputFile}"
4. Word convertirá automáticamente el PDF
5. Guarda como .docx

## Opción 3: Usar el HTML directamente
1. Abre el archivo "${this.inputFile}" en Word
2. Word puede importar HTML directamente
3. Guarda como .docx

## Opción 4: Copiar y Pegar
1. Abre el archivo "${this.inputFile}" en un navegador
2. Selecciona todo el contenido (Ctrl+A)
3. Copia (Ctrl+C)
4. Pega en un documento nuevo de Word (Ctrl+V)
5. Ajusta el formato si es necesario

## Contenido del Documento
El documento incluye respuestas completas para todos los 7 escenarios:

1. ✅ Escenario 1: Sistema de Descuentos en Tienda
2. ✅ Escenario 2: Calculadora de Días del Mes
3. ✅ Escenario 3: Encontrar el Número Mayor
4. ✅ Escenario 4: Generador de Listas (Rango, Pares e Impares)
5. ✅ Escenario 5: Calculadora de Factorial
6. ✅ Escenario 6: MCD y MCM
7. ✅ Escenario 7: Generador de Números Primos

Cada escenario incluye:
- Análisis detallado de requerimientos
- Variables utilizadas con ejemplos
- Código fuente completo y comentado
- Casos de prueba exhaustivos
- Explicación de algoritmos
- Placeholders para capturas de pantalla
`;

        fs.writeFileSync('INSTRUCCIONES_CONVERSION.md', instructions);
        console.log('📋 Instrucciones de conversión guardadas en: INSTRUCCIONES_CONVERSION.md');
    }

    async run() {
        try {
            // Verificar que el archivo HTML existe
            if (!fs.existsSync(this.inputFile)) {
                console.error(`❌ Error: No se encontró el archivo ${this.inputFile}`);
                process.exit(1);
            }

            // Generar PDF
            await this.convertToPDF();
            
            // Generar instrucciones
            this.generateWordInstructions();
            
            console.log('\n🎉 Conversión completada exitosamente!');
            console.log(`📄 Archivo PDF: ${this.outputFile}`);
            console.log(`📋 Instrucciones: INSTRUCCIONES_CONVERSION.md`);
            console.log('\n💡 El PDF está optimizado para conversión a Word y mantiene el formato original.');
            
        } catch (error) {
            console.error('❌ Error durante la conversión:', error.message);
            
            // Si falla la conversión con Puppeteer, dar alternativas
            console.log('\n🔄 Alternativas sin dependencias:');
            console.log('1. Abre Respuestas_Fundamentos_Programacion.html en tu navegador');
            console.log('2. Imprime a PDF desde el navegador');
            console.log('3. Convierte el PDF a Word usando herramientas online');
            
            this.generateWordInstructions();
        }
    }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    const converter = new HTMLToWordConverter();
    converter.run();
}

module.exports = HTMLToWordConverter;
