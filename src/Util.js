
export const inverseObject = (obj) => {
    return Object.keys(obj).reduceRight((prev, key) => {
        return (prev[obj[key]] = key, prev);
    }, {});
}

