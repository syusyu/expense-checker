import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import Expense from '../src/Expense';
import FileUpload from '../src/FileUpload';
import  { configure, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<App />', () => {
    it('Existing child component (App)', () => {
        const wrapper = shallow(<App />);
        // expect(wrapper.find(FileUpload)).toBe(1);
    });
});

// describe('<Expense />', () => {
//     it('Existing child component (Expense)', () => {
//         const wrapper = shallow(
//             <Expense updateFiles={null} classes={{cardExpenditure: "foo"}}
//                                          expense={{sum:0, warnings:[], records:[{date:'2018/08', expenditure:3000, color:'red'}]}} />
//         );
//         // const tree = renderer.create(
//         //     <Expense updateFiles={null} classes={{cardExpenditure: "foo"}}
//         //              expense={{sum:0, warnings:[], records:[{date:'2018/08', expenditure:3000, color:'red'}]}} />
//         // ).toJSON();
//         console.log(`###div=${wrapper.find('div').childAt(0)}`)
//         expect(wrapper.find('div').childAt(0)).toBe(<div/>);
//     });
// });

// describe('<App />', () => {
    // it('this.state.textを更新した時にclass名に反映されること', () => {
    //     const wrapper = shallow(<App />);
    //     wrapper.setState({
    //         text: 'AAA',
    //     });
    //     expect(wrapper.find('.AAA').length).toBe(1);
    // });
    //
    // it('handleChangeを呼び出すと、setStateが呼び出されること', () => {
    //     const wrapper = shallow(<App />);
    //     const setStateSpy = jest.spyOn(App.prototype, 'setState');
    //     wrapper.instance().handleChange('BBB');
    //     expect(setStateSpy).toHaveBeenCalledWith({
    //         inputValue: 'BBB',
    //     });
    // });
    //
    // it('handleClickを呼び出すと、setStateが呼び出されること', () => {
    //     const wrapper = shallow(<App />);
    //     const setStateSpy = jest.spyOn(App.prototype, 'setState');
    //     wrapper.setState({
    //         inputValue: 'CCC',
    //     });
    //     wrapper.instance().handleClick();
    //     expect(setStateSpy).toHaveBeenCalledWith({
    //         text: 'CCC',
    //         inputValue: '',
    //     });
    // });
    //
    // test('<App />のスナップショット', () => {
    //     const tree = renderer
    //         .create(<App />)
    //         .toJSON();
    //     expect(tree).toMatchSnapshot();
    // });
// });
