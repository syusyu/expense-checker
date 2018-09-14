import React from 'react';
import App from '../src/components/App';
import  { configure, mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('[UI] <App />', () => {
    it('Initial state', () => {
        const wrapper = mount(<App />);
        expect(wrapper.find('h1').text()).toEqual('Put your expenditure files');
    });

    it('Set state', () => {
        const expense = {
            records: [
                {date: '2018-08-01', expenditure: 1000, color: '#EEEEEE'},
                {date: '2018-07-01', expenditure: 2000, color: '#EEEEEE'},
            ],
            sum: 3000,
        };
        const wrapper = mount(<App />);
        wrapper.setState({expense: expense, fileNames: ['foo']});
        const months = wrapper.find('CardHeader span').map(node => node.text());
        const expenditures = wrapper.find('CardContent h1').map(node => node.text());
        expect(months).toEqual(['2018/08', '2018/07', 'Total']);
        expect(expenditures).toEqual(['JP¥ 1,000', 'JP¥ 2,000', 'JP¥ 3,000', ]);
    });

});


const app = new App();

describe('[Logic] Calculate expense', () => {
    it('Single Normal', () => {
        const param = [
            [
                {date: '2018/08/01', expenditure: "1000", class: '', foo: 'bar'}, {date: '2018/07/01', expenditure: "3000", baz: 'qux' },
                {date: '2018/08/02', expenditure: "1,000", class: '', foo: 'bar'}, {date: '2018/07/02', expenditure: "3000", baz: 'qux' },
                {date: '2018/08/03', expenditure: "1,000", class: '', foo: 'bar'}, {date: '2018/07/03', expenditure: "3000", baz: 'qux' },
            ],
        ];
        const expected = [
            {date: '2018-08', expenditure: 3000, color: '#EEEEEE'}, {date: '2018-07', expenditure: 9000, color: '#EEEEEE'}
        ];
        const actual = app.calcExpense(param);
        expect(actual.records).toEqual(expected);
        expect(actual.warnings).toEqual([]);
        expect(actual.sum).toEqual(12000);
    });

    it('Multi Normal', () => {
        const param = [
            [
                {date: '2018/08/01', expenditure: "1000", class: '', foo: 'bar'}, {date: '2018/07/01', expenditure: "3000", baz: 'qux' },
                {date: '2018/08/02', expenditure: "1,000", class: '', foo: 'bar'}, {date: '2018/07/02', expenditure: "3000", baz: 'qux' },
                {date: '2018/08/03', expenditure: "1,000", class: '', foo: 'bar'}, {date: '2018/07/03', expenditure: "3000", baz: 'qux' },
            ],
            [
                {date: '2018/08/01', expenditure: "1000", class: '', foo: 'bar'}, {date: '2018/07/01', expenditure: "3000", baz: 'qux' },
                {date: '2018/08/02', expenditure: "1,000", class: '', foo: 'bar'}, {date: '2018/07/02', expenditure: "3000", baz: 'qux' },
                {date: '2018/08/03', expenditure: "1,000", class: '', foo: 'bar'}, {date: '2018/07/03', expenditure: "3000", baz: 'qux' },
            ],
        ];
        const expected = [
            {date: '2018-08', expenditure: 6000, color: '#EEEEEE'}, {date: '2018-07', expenditure: 18000, color: '#EEEEEE'}
        ];
        const actual = app.calcExpense(param);
        expect(actual.records).toEqual(expected);
        expect(actual.warnings).toEqual([]);
        expect(actual.sum).toEqual(24000);
    });

    it('Incorrect data', () => {
        const param = [[{date: '2018/08/32', expenditure: "1000", class: '', foo: 'bar'}]];
        const actual = app.calcExpense(param);
        expect(actual.records).toEqual([]);
        expect(actual.warnings).toEqual([{index: 1, date: '2018/08/32', expenditure: '1000'}]);
        expect(actual.sum).toEqual(0);
    });

    it('Filter1', () => {
        CONFIG.FILTER_TERMS = ['exclude'];
        const param = [
            [
                {date: '2018/08/01', expenditure: "1000", content: 'exclude'}, {date: '2018/07/01', expenditure: "3000", content: 'exclude' },
                {date: '2018/08/02', expenditure: "1,000", content: 'exclude'}, {date: '2018/07/02', expenditure: "3000", baz: 'qux' },
                {date: '2018/08/03', expenditure: "1,000", content: 'exclude'}, {date: '2018/07/03', expenditure: "3000", content: '' },
            ],
        ];
        const expected = [
            {date: '2018-07', expenditure: 6000, color: '#EEEEEE'}
        ];
        const actual = app.calcExpense(param);
        expect(actual.records).toEqual(expected);
        expect(actual.warnings).toEqual([]);
        expect(actual.sum).toEqual(6000);
    });

    it('Filter2', () => {
        CONFIG.FILTER_TERMS = null;
        const param = [
            [
                {date: '2018/08/01', expenditure: "1000", content: 'exclude'}, {date: '2018/07/01', expenditure: "3000", content: 'exclude' },
                {date: '2018/08/02', expenditure: "1,000", content: 'exclude'}, {date: '2018/07/02', expenditure: "3000", baz: 'qux' },
                {date: '2018/08/03', expenditure: "1,000", content: 'exclude'}, {date: '2018/07/03', expenditure: "3000", content: '' },
            ],
        ];
        const expected = [
            {date: '2018-08', expenditure: 3000, color: '#EEEEEE'}, {date: '2018-07', expenditure: 9000, color: '#EEEEEE'}
        ];
        const actual = app.calcExpense(param);
        expect(actual.records).toEqual(expected);
        expect(actual.warnings).toEqual([]);
        expect(actual.sum).toEqual(12000);
    });

    it('Sort', () => {
        const param = [
            [
                {date: '2017/12/01', expenditure: "1000"}, {date: '2017/11/11', expenditure: "1000"},
                {date: '2017/09/01', expenditure: "1000"}, {date: '2018/07/01', expenditure: "1000"},
                {date: '2018/01/01', expenditure: "1000"}, {date: '2017/10/01', expenditure: "1000"},
                {date: '2018/04/12', expenditure: "1000"}, {date: '2018/04/01', expenditure: "1000"},
                {date: '2018/08/01', expenditure: "1000"}, {date: '2018/07/01', expenditure: "1000"},
            ],
        ];
        const expected = [
            {date: '2018-08', expenditure: 1000, color: '#EEEEEE'},  {date: '2018-07', expenditure: 2000, color: '#EEEEEE'},
            {date: '2018-04', expenditure: 2000, color: '#EEEEEE'},  {date: '2018-01', expenditure: 1000, color: '#EEEEEE'},
            {date: '2017-12', expenditure: 1000, color: '#EEEEEE'}, {date: '2017-11', expenditure: 1000, color: '#EEEEEE'},
            {date: '2017-10', expenditure: 1000, color: '#EEEEEE'},  {date: '2017-09', expenditure: 1000, color: '#EEEEEE'},
        ];
        const actual = app.calcExpense(param);
        expect(actual.records).toEqual(expected);
        expect(actual.warnings).toEqual([]);
        expect(actual.sum).toEqual(10000);
    });

});
