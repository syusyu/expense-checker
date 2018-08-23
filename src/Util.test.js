import {inverseObject, isEmpty} from './Util'


describe('Inverse object', () => {
    it('Normal', () => {
        const expected = {"bar": "foo", "qux": "baz"};
        const param = {"foo": "bar", "baz": "qux"};
        expect(inverseObject(param)).toEqual(expected);
    });
    it('Empty', () => {
        const expected = {};
        const param = {};
        expect(inverseObject(param)).toEqual(expected);
    });
});

describe('isEmpty', () => {
    it ('Null', () => {
        expect(isEmpty(null)).toEqual(true);
        expect(isEmpty([])).toEqual(true);
        expect(isEmpty({})).toEqual(true);
        expect(isEmpty(1)).toEqual(false);
        expect(isEmpty('')).toEqual(true);
        expect(isEmpty([1])).toEqual(false);
        expect(isEmpty({a: "a"})).toEqual(false);
    })
})
