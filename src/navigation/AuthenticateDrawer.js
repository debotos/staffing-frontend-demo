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
import keys from '../config/keys'

const { RECRUITER_ROLE, USER_DATA } = variables
const { ROUTES } = keys

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
	{ icon: <MdWork />, to: ROUTES.home, label: 'Jobs' },
	{ icon: <MdHome />, to: ROUTES.ADashboard, label: 'Dashboard' },
]

const recruiterRoutes = [
	{ icon: <FaTachometerAlt />, to: ROUTES.RDashboard, label: 'Dashboard' },
	{ icon: <MdWork />, to: ROUTES.RJobs, label: 'Jobs' },
	{ icon: <FaUsers />, to: ROUTES.RCandidates, label: 'Candidates' },
	{ icon: <FaRegEnvelope />, to: ROUTES.RMessages, label: 'Messages' },
	{ icon: <FaUserTie />, to: ROUTES.RInterviews, label: 'Interviews' },
	{ icon: <FaRegFileAlt />, to: ROUTES.RReports, label: 'Reports' },
	{ icon: <FaCog />, to: ROUTES.RSetting, label: 'Setting' },
]
