function HashMap() {
    const storageLimit = 4;
    let storage = [];

    this.print = () => {
        console.log(storage)
    };

    const hash = (string, max) => {
        let hashCode = 0;
        const primeNumber = 11;
        for (let i = 0; i < string.length; i++) {
            hashCode += primeNumber * hashCode + string.charCodeAt(i)
        }
        return hashCode % max;
    };

    const set = (key, value) => {
        let index = hash(key, storageLimit);
        if (storage[index] === undefined) {
            storage[index] = [
                [key, value]
            ]
        } else {
            let inserted = false;
            for (let i = 0; i < storage[index].length; i++) {
                if (storage[index][i][0] === key) {
                    storage[index][i][1] = value;
                    inserted = true;
                }
            }
            if (inserted === false) {
                storage[index].push([key, value]);
            }
        }  
    };

    const get = (key) => {
        let index = hash(key, storageLimit);
        if (storage[index] === undefined) {
            return undefined;
        } else {
            for (let i = 0; i < storage[index].length; i++) {
                if (storage[index][i][0] === key) {
                    return storage[index][i][1];
                }
            }
        }
    };

    const has = (key) => {
        let index = hash(key, storageLimit);
        if (storage[index] === undefined) {
            return false;
        } else {
            return true
        }
    };

    const remove = (key) => {
        let index = hash(key, storageLimit);
        if (storage[index].length === 1 && storage[index][0][0] === key) {
            delete storage[index];
        } else {
            for (let i = 0; i < storage[index]; i++) {
                if (storage[index][i][0] === key) {
                    delete storage[index][i];
                }
            }
        }
    };

    return {
        print,
        hash,
        set,
        get,
        has,
        remove
    }
}

const myHash = HashMap()
myHash.set('waldo', 'person')
myHash.set('fido', 'dog')
myHash.set('rex', 'dinosaur')
myHash.set('tux', 'penguin')
console.log(myHash.get('tux'))
myHash.print()