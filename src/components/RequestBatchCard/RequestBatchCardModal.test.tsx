import React from 'react'
import { shallow } from 'enzyme'
import RequestBatchCardModal from './RequestBatchCardModal'

test('Component Should Render', ()=> {
    const component = shallow(<RequestBatchCardModal />);
    expect(component.render()).toBeTruthy();
})

test('Button Text is \'X\'', ()=>{
    
    const component = shallow(<RequestBatchCardModal />);
    
    expect(component.text().includes('X')).toBe(true);
    
});

test('Modal Text is \'Request Sent Successfully\'', ()=> {
    const component = shallow(<RequestBatchCardModal />);

    expect(component.text().includes('Request Sent Successfully')).toBe(true);
});

test('component snapshot test', ()=>{
    const component = shallow(<RequestBatchCardModal/>);
    expect(component).toMatchSnapshot();
})
