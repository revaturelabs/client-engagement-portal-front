import React from 'react';
import Enzyme,{ EnzymeAdapter, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16'
import { BatchForms } from "./BatchForms";
import axios from 'axios';
import { promises } from 'dns';

Enzyme.configure({adapter: new Adapter() });
const wrapper=shallow(<BatchForms/>);

/**
 * @function
 * Testing the batch forms
 */
describe('BatchForms',()=>{
    /**
     * @function
     * testing to find the that the map batch button is rendering with correct text
     */
    it('should find map header on button',()=>{
        const text = wrapper.find('#map-batch');
        expect(text.text()).toBe('Map Batch To Client');
    });
    /**
     * @function
     * testing to find the that the unmap batch button is rendering with correct text
     */
    it('should find unmap header on button',()=>{
        const text = wrapper.find('#unmap-batch');
        expect(text.text()).toBe('Unmap Batch From Client');
    });
    /**
     * @function
     * testing to find ensure we have options
     */
    it('should find select batch options',()=>{
        const options = wrapper.find('#map-options')
        expect(options.length).toBe(1);
    })
})