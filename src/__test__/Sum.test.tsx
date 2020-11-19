import React from 'react';
import {MySum} from '../MySum'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})



describe('<Sum />', () => {
    it('renders', ()=> {
        const wrapper = shallow(<MySum {...{a:1, b:2}}/>);
        expect(wrapper).toBeDefined();
    })
})