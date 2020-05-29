import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import variables from '../config/vars'

const { ADMIN_ROLE } = variables

const AdminRoute = ({ component: Component, auth, ...rest }) => {
	const { isAuthenticated, user } = auth
	const isAdmin = user.role === ADMIN_ROLE
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated && isAdmin ? <Component {...props} /> : <Redirect to='/login' />
			}
		/>
	)
}

AdminRoute.propTypes = { auth: PropTypes.object.isRequired }

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, null)(AdminRoute)
