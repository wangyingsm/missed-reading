const square = (x: number) => x * x;

export function sumOfSquares(x: number, y: number): number {
    return square(x) + square(y);
}

function abs(x: number): number {
    if (x > 0) {
        return x;
    } else if (x == 0) {
        return 0;
    } else {
        return -x;
    }
}

const Epsilon = 0.00001;

export function sqrtIter(guess: number, x: number): number {
    const goodEnough = (guess: number) => {
        return abs(x - square(guess)) < Epsilon;
    }
    const improve = (guess: number) => {
        return average(guess, x / guess);
    }
    if (goodEnough(guess)) {
        return guess;
    }
    return sqrtIter(improve(guess), x);
}

function average(x: number, y: number): number {
    return (x + y) / 2;
}

export function coinCount(amount: number): number {
    return cc(0, amount);
}

const Coins = [50, 25, 10, 5, 1];

function cc(kind: number, amount: number): number {
    if (amount == 0) {
        return 1;
    } else if (amount < 0 || kind >= 5) {
        return 0;
    }
    return cc(kind, amount - Coins[kind]) + cc(kind + 1, amount);
}

export function pascalTriangle(row: number, col: number): number {
    if (row <= 0 && col <= 0) {
        return 0;
    }
    if (col > row) {
        return 0;
    }
    if (row == 1 && col == 1) {
        return 1;
    }
    return pascalTriangle(row - 1, col - 1)
        + pascalTriangle(row - 1, col);
}