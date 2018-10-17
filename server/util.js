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

module.exports = {
	setEnumerable: setEnumerable
}