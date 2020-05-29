import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import variables from '../config/vars'

const { RECRUITER_ROLE } = variables

export const PublicRoute = ({ auth, component: Component, ...restVars }) => {
	const { isAuthenticated, user } = auth
	const isRecruiter = user.role === RECRUITER_ROLE
	return (
		<Route
			{...restVars}
			component={(props) =>
				isAuthenticated ? (
					<Redirect to={isRecruiter ? '/recruiter' : '/'} />
				) : (
					<Component {...props} />
				)
			}
		/>
	)
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, null)(PublicRoute)
