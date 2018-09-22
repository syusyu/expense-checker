import React from 'react';
import  { configure, mount, shallow  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FileUpload from 'Components/FileUpload';

configure({ adapter: new Adapter() });

describe('<FileUpload />', () => {
    it('FileUpload input file field', () => {
        const isFileSelectedAry = [true, false];
        isFileSelectedAry.forEach(isFileSelected => {
            const wrapper = mount(<FileUpload classes={{}} isFileSelected={isFileSelected} updateFiles={() => {}} />);
            expect(wrapper.find('input').prop('type')).toEqual('file');
        });
    });
});
