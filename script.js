const fs = require('fs');

function decodeBaseValue(base, value) {
    return BigInt(parseInt(value, parseInt(base)));
}

function lagrangeInterpolation(points, k) {
    let constant_term = BigInt(0);

    for (let i = 0; i < k; i++) {
        const [si, ki] = points[i];
        let Numerator = BigInt(1);
        let Denominator = BigInt(1);

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                const [sj] = points[j];
                Numerator *= sj;
                Denominator *= (sj - si);
            }
        }

        constant_term += ki * Numerator / Denominator;
    }

    return constant_term;
}

function findSecretConstant(jsonFilePath) {
    const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    const k = data.keys.k;

    const points = Object.keys(data)
        .filter(key => !isNaN(key))
        .map(key => [BigInt(key), decodeBaseValue(data[key].base, data[key].value)])
        .sort((a, b) => (a[0] > b[0] ? 1 : -1));

console.log(For the input file "${jsonFilePath}", the calculated constant term of the polynomial is: ${lagrangeInterpolation(points, k)});

}

findSecretConstant('testcase1.json');
findSecretConstant('testcase2.json');
