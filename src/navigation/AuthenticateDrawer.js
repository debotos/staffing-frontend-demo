import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { MdHome, MdWork } from 'react-icons/md'
import { FiFileText } from 'react-icons/fi'
import { message, Tooltip } from 'antd'
import {
	FaClinicMedical,
	FaProjectDiagram,
	FaRegCalendarAlt,
	FaUserTie,
	FaFileInvoice,
	FaRegChartBar,
	FaReceipt,
	FaRegFileAlt,
	FaUserCog,
	FaTachometerAlt,
	FaUsers,
	FaRegEnvelope,
	FaCog,
} from 'react-icons/fa'

import { CloseButton, LogoffButton, NavArea, ActionContainer } from './CommonUI'
import { setCurrentUser } from '../redux/actions/authActions'
import variables from '../config/vars'

const { ADMIN_ROLE, USER_DATA } = variables

function AuthenticateDrawer({ closeDrawer, setUser, auth, desktop, adminNav = false }) {
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
				{getRoutes(auth.user, adminNav).map((link, index) => (
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

const getRoutes = (user, adminNav) => {
	const { role } = user
	const isAdmin = role === ADMIN_ROLE
	if (isAdmin && adminNav) {
		return adminRoutes
	} else {
		if (isAdmin) {
			return [...normalRoutes, { ...adminRoutes[0], label: 'Admin' }]
		} else {
			return normalRoutes
		}
	}
}

const normalRoutes = [
	{ icon: <MdHome />, to: '/', label: 'Dashboard' },
	{ icon: <FiFileText />, to: '/intake', label: 'Intake' },
	{ icon: <FaProjectDiagram />, to: '/workflow', label: 'Workflow' },
	{ icon: <FaRegCalendarAlt />, to: '/schedule', label: 'Schedule' },
	{ icon: <FaClinicMedical />, to: '/clinical', label: 'Clinical' },
	{ icon: <FaUserTie />, to: '/hr', label: 'HR' },
	{ icon: <FaFileInvoice />, to: '/pay-roll', label: 'Pay Roll' },
	{ icon: <FaRegChartBar />, to: '/marketing', label: 'Marketing' },
	{ icon: <FaReceipt />, to: '/billing', label: 'Billing' },
	{ icon: <FaRegFileAlt />, to: '/reports', label: 'Reports' },
	{ icon: <FaUserCog />, to: '/administration', label: 'Administration' },
	{ icon: <MdWork />, to: '/jobs', label: 'Jobs' },
]

const adminRoutes = [
	{ icon: <FaTachometerAlt />, to: '/admin', label: 'Dashboard' },
	{ icon: <MdWork />, to: '/admin/jobs', label: 'Jobs' },
	{ icon: <FaUsers />, to: '/admin/candidates', label: 'Candidates' },
	{ icon: <FaRegEnvelope />, to: '/admin/messages', label: 'Messages' },
	{ icon: <FaUserTie />, to: '/admin/interviews', label: 'Interviews' },
	{ icon: <FaRegFileAlt />, to: '/admin/reports', label: 'Reports' },
	{ icon: <FaCog />, to: '/admin/setting', label: 'Setting' },
]
