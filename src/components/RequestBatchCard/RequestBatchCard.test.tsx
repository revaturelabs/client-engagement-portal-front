import React from 'react'
import RequestBatchCard from './RequestBatchCard'
import { shallow } from 'enzyme'

const setUp = () => {
    const component = shallow(<RequestBatchCard />);
    return component;
}

describe('RequestBatchCard Component', () => {

    let component: any;
    beforeEach(() => {
        component = setUp();
    });

    it('Should Render To The Screen', ()=>{
        expect(component.render()).toBeTruthy();
    });

    it('Should Contain Text', ()=>{
        const componentText = "No batches have been selected for you just yet. Our administrators will assign you one soon. In the meantime, you’re welcome to click the button below to notify one of our administrators.";
        expect(component.text().includes(componentText)).toBe(true);
    })

    it('Should have button text', ()=>{
        expect(component.text().includes("Request Batch")).toBe(true);
    })

    it('Should Match the Snapshot', ()=>{
        expect(component).toMatchSnapshot();
    })

});
