import React, { Component } from 'react'

import Header from '../../../components/common/Header'
import DrawerNavigation from '../../../navigation'

export class Dashboard extends Component {
	render() {
		return (
			<>
				<Header sideNavProps={{ recruiterNav: true }} />
				<div style={{ display: 'flex' }}>
					<DrawerNavigation recruiterNav={true} onlyDesktop />
					<div style={{ width: '100%' }}>
						<h1 style={{ margin: 20 }}> Recruiter Dashboard Page</h1>
					</div>
				</div>
			</>
		)
	}
}

export default Dashboard
