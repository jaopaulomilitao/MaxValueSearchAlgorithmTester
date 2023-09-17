// dataTable.js
function createDataTable() {
    const dataTable = [];

    function addDataToTable(size, result, executionTime, peakMemory) {
        dataTable.push({
            'Tamanho (Size)': size,
            'Resultado (Result)': result,
            'Tempo de Execução (ExecutionTime) (s)': executionTime,
            'Pico de Memória (PeakMemory) (MB)': peakMemory,
        });
    }

    return {
        addDataToTable,
        getTable: () => dataTable,
    };
}

module.exports = createDataTable;
