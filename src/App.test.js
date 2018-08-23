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

const paramSingleNormal = [
    [
        {date: '2018/08/01', expenditure: "1000", class: '', foo: 'bar'}, {date: '2018/07/01', expenditure: "3000", baz: 'qux' },
        {date: '2018/08/02', expenditure: "1,000", class: '', foo: 'bar'}, {date: '2018/07/02', expenditure: "3000", baz: 'qux' },
        {date: '2018/08/03', expenditure: "1,000", class: '', foo: 'bar'}, {date: '2018/07/03', expenditure: "3000", baz: 'qux' },
    ],
];
const expectedSingleNormal = [
    {date: '2018/8', expenditure: 3000}, {date: '2018/7', expenditure: 9000}
];

describe('Calculate expense', () => {
    it('Normal', () => {
        expect(app.calcExpense(paramSingleNormal)).toEqual(expectedSingleNormal);
    });
});
