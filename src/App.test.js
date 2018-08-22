import React from 'react';
import App from './App';


const app = new App();

//
// Incorrect date,
// No data
// Too many files
// Too many records
// Spread year
// Incorrect header
// Incorrect amount

const csvNormal = [
    [
        {date: '2018/08/01', amount: '1000', class: '', foo: 'bar'}, {date: '2018/07/01', amount: '3000', baz: 'qux' },
        {date: '2018/08/02', amount: '1000', class: '', foo: 'bar'}, {date: '2018/07/02', amount: '3000', baz: 'qux' },
        {date: '2018/08/03', amount: '1000', class: '', foo: 'bar'}, {date: '2018/07/03', amount: '3000', baz: 'qux' },
    ],
];
const expectedNormal = [
    {date: '2018/08', }

]
describe('Calculate expense', () => {
    it('Normal', () => {
        const expected = [{date: '2018/08', expenditure: '¥3,000'}];
        const param = [];
        expect(app.calcExpense(param)).toEqual(expected);
    });
});
