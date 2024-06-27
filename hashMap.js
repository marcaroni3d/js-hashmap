function HashMap() {
    let storageLimit = 4;
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

    const calculateLoadFactor = () => {
        const occupied = storage.reduce(
            (accumulated, current) =>
                current.length !== 0 ? accumulated + 1 : accumulated, 
        )
        return occupied
    };

    const loadFactorHandler = () => {
        if (calculateLoadFactor() < 0.8) {
            return;
        }

        const oldEntries = entries();
        storageLimit *= 2;
        const newStorage = Array(storageLimit)
            .fill(null)
            .map(() => []);
        storage = newStorage;
        oldEntries.forEach((element) => set(element.key, element.value))
    }

    const set = (key, value) => {
        let index = hash(key, storageLimit);
        loadFactorHandler();

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

    const length = () => {
        return storage.reduce((accumulated, current) => accumulated + current.length, 0);
    };

    const clear = () => {
        storage.forEach((element) => element.splice(0));
    };

    const keys = () => {
        let array = storage.reduce(
            (accumulated, current) =>
              accumulated.concat(
                current.reduce(
                  (accumulatedKeys, currentCell) =>
                    accumulatedKeys.concat(currentCell[0]),
                  []
                )
              ),
            []
        )
        return array
    };

    const values = () => {
        let array = storage.reduce(
            (accumulated, current) =>
              accumulated.concat(
                current.reduce(
                  (accumulatedValues, currentCell) =>
                    accumulatedValues.concat(currentCell[1]),
                  []
                )
              ),
            []
        )
        return array
    };

    const entries = () => {
        let array = storage.reduce(
            (accumulated, current) =>
              accumulated.concat(
                current.reduce(
                  (accumulatedEntries, currentCell) =>
                    accumulatedEntries.concat(currentCell),
                  []
                )
              ),
            []
        )
        return array
    };

    return {
        print,
        hash,
        calculateLoadFactor,
        loadFactorHandler,
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries
    }
}

const myHash = HashMap()
myHash.set('waldo', 'person')
myHash.set('fido', 'dog')
myHash.set('rex', 'dinosaur')
myHash.set('tux', 'penguin')

console.log(myHash.print())
