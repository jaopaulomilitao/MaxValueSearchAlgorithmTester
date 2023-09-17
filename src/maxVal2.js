// maxVal2.js
function maxVal2(A, init, end) {
    if (init === end) {
        return A[init];
    } else {
        const m = Math.floor((init + end) / 2);

        const v1 = maxVal2(A, init, m);
        const v2 = maxVal2(A, m + 1, end);

        return Math.max(v1, v2);
    }
}

module.exports = maxVal2;
