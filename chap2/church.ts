type F = (x: number) => number;
type Num = (f: F) => F;

export const ZERO: Num = (_f: F) => ((x: number) => x);

export function addOne(n: Num): Num {
    return (f: F) => (x) => f(n(f)(x)); 
}

export const ONE: Num = (f: F) => ((x) => f(x));
export const TWO: Num = (f: F) => ((x) => f(f(x)));
export const THREE: Num = (f: F) => ((x) => f(f(f(x))));

export function churchAdd(m: Num, n: Num): Num {
    return (f: F) => (x) => (m(f)(n(f)(x)));
}

export function churchMul(m: Num, n: Num): Num {
    return (f: F) => (x) => (m(n(f))(x));
}

export const countFromZero = (x: number) => x + 1;

console.log(ONE(countFromZero)(0)); // 1
console.log(TWO(countFromZero)(0)); // 2
console.log(THREE(countFromZero)(0)); // 3
console.log(churchAdd(TWO, THREE)(countFromZero)(0)); // 5
console.log(churchMul(TWO, THREE)(countFromZero)(0)); // 6
console.log(churchMul(ZERO, THREE)(countFromZero)(0)); // 0