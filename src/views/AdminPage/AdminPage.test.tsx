import React from 'react';
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { AdminPage } from './AdminPage'
import { Container } from 'reactstrap';
import { store } from '../../Store'
import { Provider } from 'react-redux';
configure({ adapter: new Adapter() });

/**
   * @Test
   * Component will mount
   */

it('Component Should Mount', () => {
    const wrapper = mount(
        <Provider store={store}>
            <AdminPage />
        </Provider>
    )
})
