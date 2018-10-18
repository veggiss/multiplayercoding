function setEnumerable(object) {
    let private = {};

    for (let key in object) {
        Object.defineProperty(private, key, {
            value: object[key],
            enumerable: false,
            writable: true
        });
    }

    return private;
}

let users = {
    'vegard': {
        password: 'password',
        level: 1,
        xp: 0,
        nextLevel: 100
    },
    'tonje': {
        password: 'password',
        level: 1,
        xp: 0,
        nextLevel: 100
    },
    'julie': {
        password: 'password',
        level: 1,
        xp: 0,
        nextLevel: 100
    },
    'kenneth': {
        password: 'password',
        level: 1,
        xp: 0,
        nextLevel: 100
    },
    'karen': {
        password: 'password',
        level: 1,
        xp: 0,
        nextLevel: 100
    },
    'jorgen': {
        password: 'password',
        level: 1,
        xp: 0,
        nextLevel: 100
    },
    'derek': {
        password: 'password',
        level: 1,
        xp: 0,
        nextLevel: 100
    },
    'einar': {
        password: 'password',
        level: 1,
        xp: 0,
        nextLevel: 100
    },

}

module.exports = {
	setEnumerable: setEnumerable
}