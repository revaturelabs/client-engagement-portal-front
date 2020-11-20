import React from 'react';
import Enzyme,{ EnzymeAdapter, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16'
import { BatchForms } from "./BatchForms";
import axios from 'axios';

Enzyme.configure({adapter: new Adapter() });
const wrapper=shallow(<BatchForms/>);

describe('BatchForms',()=>{
    it('should find map header on button',()=>{
        const text = wrapper.find('#map-batch');
        expect(text.text()).toBe('Map Batch To Client');
    });
    it('should find unmap header on button',()=>{
        const text = wrapper.find('#unmap-batch');
        expect(text.text()).toBe('Unmap Batch From Client');
    });
    it('should populate select batch options',()=>{
        const options = wrapper.find('#map-options')
        expect(options.length).toBeGreaterThan(0);
    })
})