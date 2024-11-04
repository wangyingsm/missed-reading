import * as ls from "./list.ts"

type SortedSet<T> = ls.ListOrNull<T>;

export function contains<T>(val: T, s: SortedSet<T>): boolean {
    if (s == null) {
        return false;
    }
    if (ls.car(s) === val) {
        return true;
    }
    if (val < ls.car(s)) {
        return false;
    }
    return contains(val, ls.cdr(s));
}

export function add<T>(val: T, s: SortedSet<T>): SortedSet<T> {
    if (s == null) {
        return ls.list(val);
    }
    if (ls.car(s) === val) {
        return s;
    }
    if (val < ls.car(s)) {
        return ls.cons(val, s);
    }
    return ls.cons(ls.car(s), add(val, ls.cdr(s)));
}

export function intersect<T>(s1: SortedSet<T>, s2: SortedSet<T>): SortedSet<T> {
    if (s1 == null || s2 == null) {
        return null;
    }
    if (ls.car(s1) === ls.car(s2)) {
        return ls.cons(ls.car(s1), intersect(ls.cdr(s1), ls.cdr(s2)));
    }
    if (ls.car(s1) < ls.car(s2)) {
        return intersect(ls.cdr(s1), s2);
    }
    return intersect(s1, ls.cdr(s2));
}