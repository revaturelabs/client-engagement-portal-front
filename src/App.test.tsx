import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import { Route } from 'react-router-dom';

// Some trivial tests for now
it('renders without crashing', () => {
    shallow(<App />);
});

it("renders Provider", () => {
    const wrapper = shallow(<App />);

    const testRoute = <Route path="/login-admin" />;

    expect(wrapper.contains(testRoute)).toEqual(true);
});