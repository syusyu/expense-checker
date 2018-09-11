import React from 'react';
import  { configure, mount  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../src/Footer';

configure({ adapter: new Adapter() });

const dummyClasses = {};
const dummyUpdateFilesFunc = () => {};

describe('<Cover />', () => {
    it('Cover is shown', () => {
        const fileNames = ['foo.csv', 'bar.csv'];
        const wrapper = mount(<Footer classes={dummyClasses} fileNames={fileNames} updateFiles={dummyUpdateFilesFunc} />);
        expect(wrapper.find('FileUpload').length).toEqual(1);
        expect(wrapper.find('FileUpload').prop('isFileSelected')).toEqual(true);
        fileNames.forEach(fileName => {
            expect(wrapper.contains(<span key={fileName} color='#0000'>&lt;{fileName}&gt;&nbsp;&nbsp;</span>));
        });
    });
});
