import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AdminPage } from './AdminPage';
import { store } from '../../Store';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

configure({ adapter: new Adapter() });

/**
   * @Test
   * Component will mount
   */

it('Component Should Mount', () => {
    mount(
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <AdminPage />
            </Switch>
          </BrowserRouter>
        </Provider>
    )
})
