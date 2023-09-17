// maxVal1.js
function maxVal1(A, n) {
    let max = A[0];
    for (let i = 1; i < n; i++) {
        if (A[i] > max) {
            max = A[i];
        }
    }
    return max;
}

module.exports = maxVal1;
