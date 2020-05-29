import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { MdHome, MdWork } from 'react-icons/md'
import { message, Tooltip } from 'antd'
import {
	FaUserTie,
	FaRegFileAlt,
	FaTachometerAlt,
	FaUsers,
	FaRegEnvelope,
	FaCog,
} from 'react-icons/fa'

import { CloseButton, LogoffButton, NavArea, ActionContainer } from './CommonUI'
import { setCurrentUser } from '../redux/actions/authActions'
import variables from '../config/vars'

const { RECRUITER_ROLE, USER_DATA } = variables

function AuthenticateDrawer({ closeDrawer, setUser, auth, desktop, recruiterNav }) {
	const handleLogoff = () => {
		const hide = message.loading('Logging off...', 0)
		/* Remove from server side via ajax call */
		// When ajax finished then do the followings -
		/* Remove data from local storage */
		localStorage.removeItem(USER_DATA)
		/* Remove from Redux, It will kick the user to Login page */
		setUser({}) // Empty User
		setTimeout(() => hide(), 2000)
	}

	const getRoutes = () => {
		const { role } = auth.user
		const isRecruiter = role === RECRUITER_ROLE

		if (isRecruiter && recruiterNav) {
			return recruiterRoutes
		} else {
			// if (isRecruiter) {
			// 	return [...normalRoutes, { ...recruiterRoutes[0], label: 'As Recruiter' }]
			// } else {
			// 	return normalRoutes
			// }
			return normalRoutes
		}
	}

	return (
		<NavArea>
			<ActionContainer>
				{desktop ? <div /> : <CloseButton onClick={closeDrawer} />}
				<Tooltip placement='right' title='Logout'>
					<div>
						<LogoffButton onClick={handleLogoff} />
					</div>
				</Tooltip>
			</ActionContainer>
			<ul>
				{getRoutes().map((link, index) => (
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

const mapStateToProps = (state) => ({ auth: state.auth })

const mapDispatchToProps = (dispatch) => ({ setUser: (user) => dispatch(setCurrentUser(user)) })

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateDrawer)

const normalRoutes = [
	{ icon: <MdWork />, to: '/', label: 'Jobs' },
	{ icon: <MdHome />, to: '/dashboard', label: 'Dashboard' },
]

const recruiterRoutes = [
	{ icon: <FaTachometerAlt />, to: '/recruiter', label: 'Dashboard' },
	{ icon: <MdWork />, to: '/recruiter/jobs', label: 'Jobs' },
	{ icon: <FaUsers />, to: '/recruiter/candidates', label: 'Candidates' },
	{ icon: <FaRegEnvelope />, to: '/recruiter/messages', label: 'Messages' },
	{ icon: <FaUserTie />, to: '/recruiter/interviews', label: 'Interviews' },
	{ icon: <FaRegFileAlt />, to: '/recruiter/reports', label: 'Reports' },
	{ icon: <FaCog />, to: '/recruiter/setting', label: 'Setting' },
]
