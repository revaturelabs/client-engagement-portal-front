import { configure, mount, render, shallow } from 'enzyme';
import React from 'react';
import { Provider, useStore } from 'react-redux';
import { MemoryRouter } from 'react-router';
import App from '../App';
import { store } from '../Store';
import { PageNotFound } from '../views/PageNotFound/PageNotFound';
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe('Testing endpoint guards', () => {

	test('invalid path should redirect to page not found',() => {

		const wrapper = mount(
			<MemoryRouter initialEntries={['/random']}>
				<Provider store={store}>
					<App />
				</Provider>
			</MemoryRouter>
		)
		expect(wrapper.containsMatchingElement(<PageNotFound/>)).toEqual(true);
	} );
})