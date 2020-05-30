import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import keys from '../config/keys'

const { ROUTES } = keys

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			auth.isAuthenticated === true ? <Component {...props} /> : <Redirect to={ROUTES.login} />
		}
	/>
)

PrivateRoute.propTypes = { auth: PropTypes.object.isRequired }

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, null)(PrivateRoute)
