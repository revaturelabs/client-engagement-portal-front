import { configure, mount, render, shallow } from 'enzyme';
import React, { useEffect } from 'react';
import Adapter from "enzyme-adapter-react-16";
import RouterGuard from '../../../components/RouterGuard/RouterGuard';
import { AdminPage } from '../../../views/AdminPage/AdminPage';
import { LoginPage } from '../../../views/LoginPage/LoginPage';
import { Route, Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { Auth } from 'aws-amplify';
import { act } from 'react-dom/test-utils';

configure({ adapter: new Adapter() });

describe('Testing endpoint guards', () => {

	// beforeEach(() => {
	// 	useEffect = jest.spyOn(React, 'useEffect');
	// })

	// const mockUseEffect = () => {
	// 	useEffect.mockImplementation(f => f());
	// }

	test('Can\'t access admin page if not admin/logged in',() => {
		//mock AWS Amplify Auth
		Auth.currentUserInfo = jest.fn().mockImplementation(() => {return {attributes: {"custom:userRole": null}}});
		
		//Trigger useEffect on first render

		//Allow Route testing
		const history = createBrowserHistory();
		history.push("/admin");

		let wrapper;
		//wrapper.setState({loaded: true});
		// wrapper.setProps({});
		act(() => {
			wrapper = shallow(
				<Router history={history}>
					<RouterGuard component={AdminPage} redirectPath="/" path="/admin" role={["admin"]}/>
				</Router>
			)
		})
		wrapper.update();
		wrapper.setProps({});
		console.log(wrapper.debug());
		expect(wrapper.find('AdminPage').length).toEqual(0);
		expect(wrapper.html()).toEqual(true);
	} );
})