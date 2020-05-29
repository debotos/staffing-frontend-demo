import React, { Component } from 'react'
import { Provider } from 'react-redux'

import './App.scss'
import AppRoutes from './AppRoutes'
import store from '../redux/store'
import { setCurrentUser } from '../redux/actions/authActions'
import LoadingCenter from '../components/UI/Loading/LoadingCenter'
import variables from '../config/vars'

const { USER_DATA } = variables

export class App extends Component {
	async componentDidMount() {
		let user = localStorage.getItem(USER_DATA)
		if (user) {
			user = JSON.parse(user)
			store.dispatch(setCurrentUser(user))
			setTimeout(() => this.setState({ loading: false }), 2000)
			return
		} else {
			setTimeout(() => this.setState({ loading: false }), 2000)
			return
		}

		// TODO:
		// Check for token validity
		// Set loading: false
	}

	constructor(props) {
		super(props)
		this.state = {
			loading: true,
		}
	}

	render() {
		const { loading } = this.state

		if (loading) return <LoadingCenter />

		return (
			<Provider store={store}>
				<AppRoutes />
			</Provider>
		)
	}
}

export default App
