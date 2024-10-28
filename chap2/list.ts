
export interface List<T> {
    item: T,
    next: List<T> | null,
}

type ListOrNull<T> = List<T> | null;

export function list<T>(a: T, ...b: Array<T>): List<T> {
    const l: List<T> = {
        item: a,
        next: null,
    };
    let last = l;
    for (const i of b) {
        const n: List<T> = {
            item: i,
            next: null,
        }
        last.next = n;
        last = n;
    }
    return l;
}

export function cons<T>(item: T, list: ListOrNull<T>): List<T> {
    const n: List<T> = {
        item,
        next: list
    };
    return n;
}

export function car<T>(list: ListOrNull<T>): T {
    if (list == null) {
        throw Error("list is empty");
    }
    return list.item;
}

export function cdr<T>(list: ListOrNull<T>): ListOrNull<T> {
    if (list == null) {
        return null;
    }
    return list.next;
}

export function length<T>(list: ListOrNull<T>): number {
    if (list == null) {
        return 0;
    }
    return 1 + length(cdr(list));
}

export function append<T>(list1: ListOrNull<T>, list2: ListOrNull<T>): ListOrNull<T> {
    if (list1 == null) {
        return list2;
    }
    return cons(car(list1), append(cdr(list1), list2));
}

export function map<T, U>(proc: (x: T) => U, list: ListOrNull<T>): ListOrNull<U> {
    if (list == null) {
        return null;
    }
    return cons(proc(car(list)), map(proc, cdr(list)));
}

export function filter<T>(predicate: (x: T) => boolean, list: ListOrNull<T>):
    ListOrNull<T> {
    if (list == null) {
        return null;
    }
    if (predicate(car(list))) {
        return cons(car(list), filter(predicate, cdr(list)));
    }
    return filter(predicate, cdr(list));
}

export function accumulate<T, U>(op: (x: U, y: T) => U, initial: U, list: ListOrNull<T>): U {
    if (list == null) {
        return initial;
    }
    return accumulate(op, op(initial, car(list)), cdr(list));
}
