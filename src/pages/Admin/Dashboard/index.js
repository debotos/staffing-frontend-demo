import React, { Component } from 'react'

import Header from '../../../components/common/Header'
import DrawerNavigation from '../../../navigation'

export class Dashboard extends Component {
	render() {
		return (
			<>
				<Header />
				<div style={{ display: 'flex' }}>
					<DrawerNavigation adminNav />
					<div style={{ width: '100%' }}>
						<h1 style={{ margin: 20 }}> Admin Dashboard Page</h1>
					</div>
				</div>
			</>
		)
	}
}

export default Dashboard
