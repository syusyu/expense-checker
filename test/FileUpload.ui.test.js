import React from 'react';
import  { configure, mount  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FileUpload from '../src/FileUpload';

configure({ adapter: new Adapter() });

const dummyClasses = {};
const dummyUpdateFilesFunc = () => {};

describe('<FileUpload />', () => {
    it('FileUpload input file field', () => {
        const isFileSelectedAry = [true, false];
        isFileSelectedAry.forEach(isFileSelected => {
            const wrapper = mount(<FileUpload classes={dummyClasses} isFileSelected={isFileSelected} updateFiles={dummyUpdateFilesFunc} />);
            expect(wrapper.find('input').prop('type')).toEqual('file');
        });
    });
});
