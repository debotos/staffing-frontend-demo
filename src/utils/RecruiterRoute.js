import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import variables from '../config/vars'

const { RECRUITER_ROLE } = variables

const RecruiterRoute = ({ component: Component, auth, ...rest }) => {
	const { isAuthenticated, user } = auth
	const isRecruiter = user.role === RECRUITER_ROLE
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated && isRecruiter ? <Component {...props} /> : <Redirect to='/login' />
			}
		/>
	)
}

RecruiterRoute.propTypes = { auth: PropTypes.object.isRequired }

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, null)(RecruiterRoute)
