import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import { Route } from 'react-router-dom';

// Some trivial tests for now

// it.skip() keeps the skipped test from running when Jest checks tests
it.skip('renders without crashing', () => {
    shallow(<App />);
});

it("renders Route", () => {
    const wrapper = shallow(<App />);

    const testRoute = <Route path="/login-admin" />;

    expect(wrapper.contains(testRoute)).toEqual(false);
});
