const fs = require('fs');
const path = require('path');
const performance = require('performance-now');
const maxVal1 = require('./src/maxVal1');
const maxVal2 = require('./src/maxVal2');
const generateUniqueRandomArray = require('./src/randomArray');
const createDataTable = require('./src/dataTable');
const XLSX = require('xlsx');

// Função de teste para medir o tempo e o pico de memória de maxVal1

async function testFunctionMaxVal1(A, repetitions) {
    const executionTimes = [];
    let peakMemory = 0;
    let result;

    for (let i = 0; i < repetitions; i++) {
        const startTime = performance();
        result = maxVal1(A, A.length);
        const endTime = performance();
        executionTimes.push(endTime - startTime);

        // Obtenha informações sobre o uso de memória
        const memoryUsage = process.memoryUsage();
        const currentMemory = parseFloat((memoryUsage.heapUsed / (1024 * 1024)).toFixed(5));
        if (currentMemory > peakMemory) {
            peakMemory = currentMemory;
        }
    }

    const averageExecutionTime = parseFloat((executionTimes.reduce((a, b) => a + b, 0) / repetitions).toFixed(5));
    peakMemory = parseFloat(peakMemory.toFixed(5));

    return { result, executionTime: averageExecutionTime, peakMemory };
}

// Função de teste para medir o tempo e o pico de memória de maxVal2
async function testFunctionMaxVal2(A, repetitions) {
    const executionTimes = [];
    let peakMemory = 0;
    let result;

    for (let i = 0; i < repetitions; i++) {
        const startTime = performance();
        result = maxVal2(A, 0, A.length - 1);
        const endTime = performance();
        executionTimes.push(endTime - startTime);

        // Obtenha informações sobre o uso de memória
        const memoryUsage = process.memoryUsage();
        const currentMemory = parseFloat((memoryUsage.heapUsed / (1024 * 1024)).toFixed(5));
        if (currentMemory > peakMemory) {
            peakMemory = currentMemory;
        }
    }

    const averageExecutionTime = parseFloat((executionTimes.reduce((a, b) => a + b, 0) / repetitions).toFixed(5));
    peakMemory = parseFloat(peakMemory.toFixed(5));

    return { result, executionTime: averageExecutionTime, peakMemory };
}

// Resto do código de teste aqui...

// Realize testes para vetores de diferentes tamanhos
const sizes = [100, 200, 1000, 2000, 5000, 10000, 50000];

// Crie duas tabelas, uma para maxVal1 e outra para maxVal2
const dataTableMaxVal1 = createDataTable();
const dataTableMaxVal2 = createDataTable();

async function runTests() {
    const repetitions = 5; // Defina o número de repetições desejado
    const resultTablesDir = 'resultTables'; // Nome do diretório de resultados

    // Certifique-se de que o diretório de resultados exista, se não, crie-o
    if (!fs.existsSync(resultTablesDir)) {
        fs.mkdirSync(resultTablesDir);
    }

    for (const size of sizes) {
        const min = 1; // Valor mínimo permitido
        const max = size * 2; // Valor máximo permitido, ajuste conforme necessário
        const testArray = generateUniqueRandomArray(size, min, max);
        console.log(`Tamanho do vetor: ${size}`);

        // Teste da função maxVal1
        const maxVal1Result = await testFunctionMaxVal1(testArray, repetitions);
        console.log('Resultado maxVal1:', maxVal1Result.result);
        console.log('Tempo de execução maxVal1 (ms):', maxVal1Result.executionTime);
        console.log('Pico de memória maxVal1 (MB):', maxVal1Result.peakMemory);

        // Adicione os resultados à tabela de maxVal1
        dataTableMaxVal1.addDataToTable(
            size,
            maxVal1Result.result,
            maxVal1Result.executionTime,
            maxVal1Result.peakMemory
        );

        // Imprima e salve a tabela de maxVal1 após cada nova linha
        console.log('Tabela de Dados para maxVal1:');
        console.table(dataTableMaxVal1.getTable());
        const workbookMaxVal1 = XLSX.utils.book_new();
        const worksheetMaxVal1 = XLSX.utils.json_to_sheet(dataTableMaxVal1.getTable());
        XLSX.utils.book_append_sheet(workbookMaxVal1, worksheetMaxVal1, 'Tabela MaxVal1');
        const maxVal1TablePath = path.join(resultTablesDir, `tabela_maxval1_${size}.xlsx`);
        XLSX.writeFile(workbookMaxVal1, maxVal1TablePath);

        console.log('-------------------------');

        // Teste da função maxVal2
        const maxVal2Result = await testFunctionMaxVal2(testArray, repetitions);
        console.log('Resultado maxVal2:', maxVal2Result.result);
        console.log('Tempo de execução maxVal2 (ms):', maxVal2Result.executionTime);
        console.log('Pico de memória maxVal2 (MB):', maxVal2Result.peakMemory);

        // Adicione os resultados à tabela de maxVal2
        dataTableMaxVal2.addDataToTable(
            size,
            maxVal2Result.result,
            maxVal2Result.executionTime,
            maxVal2Result.peakMemory
        );

        // Imprima e salve a tabela de maxVal2 após cada nova linha
        console.log('Tabela de Dados para maxVal2:');
        console.table(dataTableMaxVal2.getTable());
        const workbookMaxVal2 = XLSX.utils.book_new();
        const worksheetMaxVal2 = XLSX.utils.json_to_sheet(dataTableMaxVal2.getTable());
        XLSX.utils.book_append_sheet(workbookMaxVal2, worksheetMaxVal2, 'Tabela MaxVal2');
        const maxVal2TablePath = path.join(resultTablesDir, `tabela_maxval2_${size}.xlsx`);
        XLSX.writeFile(workbookMaxVal2, maxVal2TablePath);

        console.log('-------------------------');
    }

    console.log('Tabelas salvas e impressas no console.');
}

runTests();
