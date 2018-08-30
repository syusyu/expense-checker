import React from 'react';
import ReactDOM from 'react-dom';
import  { configure, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Expense from '../src/Expense';

configure({ adapter: new Adapter() });

const dummyClasses = {};

describe('<Expense />', () => {
    it('Show expenditure', () => {
        const expense = {
            records: [
                {date: '2018-08-01', expenditure: 1000, color: '#EEEEEE'},
                {date: '2018-07-01', expenditure: 2000, color: '#EEEEEE'},
            ],
            sum: 3000,
        };

        const wrapper = mount(<Expense expense={expense} classes={dummyClasses} />);
        const months = wrapper.find('CardHeader span').map(node => node.text());
        const expenditures = wrapper.find('CardContent h1').map(node => node.text());
        expect(months).toEqual(['2018/08', '2018/07', 'Total']);
        expect(expenditures).toEqual(['JP¥ 1,000', 'JP¥ 2,000', 'JP¥ 3,000', ]);
    });
});
