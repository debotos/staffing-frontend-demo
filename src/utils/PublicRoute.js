import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import variables from '../config/vars'
import keys from '../config/keys'

const { RECRUITER_ROLE } = variables
const { ROUTES } = keys

export const PublicRoute = ({ auth, component: Component, ...restVars }) => {
	const { isAuthenticated, user } = auth
	const isRecruiter = user.role === RECRUITER_ROLE
	return (
		<Route
			{...restVars}
			component={(props) =>
				isAuthenticated ? (
					<Redirect to={isRecruiter ? ROUTES.RDashboard : ROUTES.home} />
				) : (
					<Component {...props} />
				)
			}
		/>
	)
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, null)(PublicRoute)
