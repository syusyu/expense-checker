
export const inverseObject = (obj) => {
    return Object.keys(obj).reduceRight((prev, key) => {
        return (prev[obj[key]] = key, prev);
    }, {});
}

export const isEmpty = (obj) => {
    if (!obj) {
        return true;
    }
    if (Array.isArray(obj)) {
        return obj.length < 1;
    }
    if (typeof obj === 'object') {
        return Object.keys(obj).length < 1;
    }
    return false;
}

