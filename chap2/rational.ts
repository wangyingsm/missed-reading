export function cons(x: any, y: any): Array<any> {
    return [x, y];
}

export function car(c: Array<any>): any {
    return c[0];
}

export function cdr(c: Array<any>): any {
    return c[1];
}

type Rational = Array<number>;

export function rational(x: number, y: number): Rational {
    return cons(x, y);
}

export function numer(r: Rational): number {
    return car(r);
}

export function denom(r: Rational): number {
    return cdr(r);
}

export function rationalAdd(r1: Rational, r2: Rational): Rational {
    return rational(numer(r1) * denom(r2) + numer(r2) * denom(r1), denom(r1) * denom(r2));
}