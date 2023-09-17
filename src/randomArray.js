// randomArray.js
function generateUniqueRandomArray(size, min, max) {
    if (size > (max - min + 1)) {
        throw new Error('Impossível gerar um vetor único com esses parâmetros.');
    }

    const uniqueArray = [];
    const allPossibleNumbers = [];

    for (let i = min; i <= max; i++) {
        allPossibleNumbers.push(i);
    }

    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * allPossibleNumbers.length);
        const selectedNumber = allPossibleNumbers.splice(randomIndex, 1)[0];
        uniqueArray.push(selectedNumber);
    }

    return uniqueArray;
}

module.exports = generateUniqueRandomArray;
