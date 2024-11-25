import * as ls from "../chap2/list.ts";

export function extend<T>(l1: ls.ListOrNull<T>, l2: ls.ListOrNull<T>) {
    if (l1 == null) {
        l1 = l2;
        return;
    }
    while (l1.next != null) { l1 = l1?.next; }
    l1.next = l2;
}

export function reverse<T>(x: ls.ListOrNull<T>): ls.ListOrNull<T> {
    function loop<T>(x: ls.ListOrNull<T>, y: ls.ListOrNull<T>) {
        const temp = ls.cdr(x);
        if (x == null) {
            return y;
        }
        x.next = y;
        return loop(temp, x);
    }
    return loop(x, null);
}

export class Queue<T> {
    front: ls.ListOrNull<T>;
    rear: ls.ListOrNull<T>;
    constructor() {
        this.front = null;
        this.rear = null;
    }
    isEmpty() {
        return this.front == null;
    }
    peek() {
        return ls.car(this.front);
    }
    pushRear(item: T) {
        const node = {
            item,
            next: null,
        };
        if (this.isEmpty()) {
            this.front = node;
            this.rear = node;
        } else {
            if (this.rear != null) {
                this.rear.next = node;
            }
            this.rear = node;
        }
    }
    popFront() {
        const item = ls.car(this.front);
        if (this.front != null) {
            this.front = ls.cdr(this.front);
        }
        if (this.isEmpty()) {
            this.rear = null;
        }
        return item
    }
}

export enum QueueOp {
    isEmpty,
    peek,
    push,
    pop,
}

type FunctionQueue<T> = (op: QueueOp, item?: T) => boolean | T | undefined;

export function functionQueue<T>(): FunctionQueue<T> {
    let buffer: ls.ListOrNull<T> = null;
    let rear: ls.ListOrNull<T> = null;
    return (op, item?) => {
        switch (op) {
            case QueueOp.isEmpty:
                return buffer == null;
            case QueueOp.peek:
                return ls.car(buffer);
            case QueueOp.push: {
                if (item == undefined) {
                    throw Error("wrong push argument");
                }
                const node: ls.List<T> = {
                    item,
                    next: null
                };
                if (buffer == null) {
                    buffer = node;
                    rear = node;
                } else {
                    if (rear != null) {
                        rear.next = node;
                    }
                    rear = node;
                }
                return;
            }
            case QueueOp.pop: {
                const item = ls.car(buffer);
                if (buffer != null) {
                    buffer = ls.cdr(buffer);
                }
                if (buffer == null) {
                    rear = null;
                }
                return item;
            }
        }
    }
}

export function functionQueueIsEmpty<T>(q: FunctionQueue<T>): boolean | T | undefined {
    return q(QueueOp.isEmpty);
}

export function functionQueuePeek<T>(q: FunctionQueue<T>): boolean | T | undefined {
    return q(QueueOp.peek);
}

export function functionQueuePush<T>(q: FunctionQueue<T>, item: T) {
    return q(QueueOp.push, item);
}

export function functionQueuePop<T>(q: FunctionQueue<T>): boolean | T | undefined {
    return q(QueueOp.pop);
}