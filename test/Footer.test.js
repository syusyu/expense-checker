import React from 'react';
import  { configure, mount  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../src/Footer';

configure({ adapter: new Adapter() });

const dummyClasses = {};
const dummyUpdateFilesFunc = () => {};

describe('<Footer />', () => {
    it('Footer input file field', () => {
        const fileNames = [];
        const wrapper = mount(<Footer classes={dummyClasses} fileNames={fileNames} updateFiles={dummyUpdateFilesFunc} />);
        expect(wrapper.html()).toEqual(null);
        expect(wrapper.exists('div')).toEqual(false);
        expect(wrapper.exists('FileUpload')).toEqual(false);
    });
});
