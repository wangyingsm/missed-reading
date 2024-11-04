import * as ls from "./list.ts"

type Set<T> = ls.ListOrNull<T>;

export function contains<T>(val: T, s: Set<T>): boolean {
    if (s == null) {
        return false;
    }
    if (val === ls.car(s)) {
        return true;
    }
    return contains(val, ls.cdr(s));
}

export function add<T>(val: T, s: Set<T>): Set<T> {
    if (contains(val, s)) {
        return s;
    }
    return ls.cons(val, s);
}

export function intersect<T>(s1: Set<T>, s2: Set<T>): Set<T> {
    if (s1 == null) {
        return null;
    }
    if (contains(ls.car(s1), s2)) {
        return ls.cons(ls.car(s1), intersect(ls.cdr(s1), s2));
    }
    return intersect(ls.cdr(s1), s2);
}