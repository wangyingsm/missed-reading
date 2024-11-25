export function withdraw(): (amount: number) => number {
    let balance = 100;
    return (amount) => {
        if (balance >= amount) {
            balance -= amount;
            return balance;
        }
        throw Error("insufficient funds");
    }
}

export function accumulator(init: number): (n: number) => number {
    let sum = init;
    return (n) => {
        sum += n;
        return sum;
    }
}

export function funcMonitor(f: (x: number) => number): (arg: number | string) => number {
    let counter = 0;
    return (arg) => {
        if (arg === 'how-many-calls?') {
            return counter;
        }
        if (typeof arg == "number") {
            counter++;
            return f(arg);
        }
        throw Error("wrong argument type");
    }
}