import {inverseObject} from './Util'


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
