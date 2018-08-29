import React from 'react';
import  { configure, mount  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../src/Footer';

configure({ adapter: new Adapter() });

const dummyClasses = {};
const dummyUpdateFilesFunc = () => {};

describe('<Footer />', () => {
    it('Footer input file field', () => {
        const fileNames = null;
        const wrapper = mount(<Footer classes={dummyClasses} isFileSelected={isFileSelected} updateFiles={dummyUpdateFilesFunc} />);
        expect(wrapper.find('input').prop('type')).toEqual('file');
    });
});
