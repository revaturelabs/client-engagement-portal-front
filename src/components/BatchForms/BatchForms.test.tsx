import React from 'react';
import { shallow } from "enzyme";
import { BatchForms } from "./BatchForms";

describe('BatchForms',()=>{
    it('should be true',()=>{
        const foo =true;
        expect(foo).toBe(true);
    })

    it('should be false',()=>{
        const foo = false;
        expect(foo).toBe(false);
    })
});
