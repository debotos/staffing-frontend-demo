import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdWork, MdLock, MdPersonAdd } from 'react-icons/md'

import { CloseButton, NavArea, ActionContainer } from './CommonUI'
import keys from '../config/keys'

const { ROUTES } = keys

function NonAuthenticateDrawer({ closeDrawer, desktop }) {
	return (
		<NavArea>
			<ActionContainer>
				<CloseButton onClick={closeDrawer} />
			</ActionContainer>
			<ul>
				{NavRoutes.map((link, index) => (
					<li key={`nav_link_${index}`}>
						<NavLink to={link.to} exact activeClassName='active'>
							<span className='nav-icon'>{link.icon}</span>
							<span>{link.label}</span>
						</NavLink>
					</li>
				))}
			</ul>
		</NavArea>
	)
}

export default NonAuthenticateDrawer

const NavRoutes = [
	{ icon: <MdWork />, to: ROUTES.home, label: 'Jobs' },
	{ icon: <MdLock />, to: ROUTES.login, label: 'Login' },
	{ icon: <MdPersonAdd />, to: ROUTES.signup, label: 'Signup' },
]
