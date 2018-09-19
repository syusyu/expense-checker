import React from 'react';
import  { configure, mount  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Error from 'Components/Error';

configure({ adapter: new Adapter() });

describe('<Error />', () => {
    it('Error contents', () => {
        const wrapper = mount(<Error classes={{}} error={{message: 'Some exception'}} closeError={() => {}} />);
        expect(wrapper.find('#message-id').text()).toEqual('Some exception');
    });
});
