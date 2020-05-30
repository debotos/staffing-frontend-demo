import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory as createHistory } from 'history'

import PrivateRoute from '../utils/PrivateRoute'
import PublicRoute from '../utils/PublicRoute'
import RecruiterRoute from '../utils/RecruiterRoute'

import EmploymentApplication from '../pages/EmploymentApplication'
import JobListing from '../pages/JobListing'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Dashboard from '../pages/Dashboard'
// Recruiter
import RecruiterDashboard from '../pages/Recruiter/Dashboard'
import RecruiterJobs from '../pages/Recruiter/Jobs'
import RecruiterCandidates from '../pages/Recruiter/Candidates'
import RecruiterMessages from '../pages/Recruiter/Messages'
import RecruiterInterviews from '../pages/Recruiter/Interviews'
import RecruiterReports from '../pages/Recruiter/Reports'
import RecruiterSetting from '../pages/Recruiter/Setting'
// Others
import keys from '../config/keys'

const { ROUTES } = keys

export const history = createHistory()

function AppRoutes() {
	return (
		<Router history={history}>
			<Switch>
				<PublicRoute exact path={ROUTES.login} component={Login} />
				<PublicRoute exact path={ROUTES.signup} component={SignUp} />

				<RecruiterRoute exact path={ROUTES.RSetting} component={RecruiterSetting} />
				<RecruiterRoute exact path={ROUTES.RReports} component={RecruiterReports} />
				<RecruiterRoute exact path={ROUTES.RInterviews} component={RecruiterInterviews} />
				<RecruiterRoute exact path={ROUTES.RMessages} component={RecruiterMessages} />
				<RecruiterRoute exact path={ROUTES.RCandidates} component={RecruiterCandidates} />
				<RecruiterRoute exact path={ROUTES.RJobs} component={RecruiterJobs} />
				<RecruiterRoute exact path={ROUTES.RDashboard} component={RecruiterDashboard} />

				<PrivateRoute exact path={ROUTES.profile} component={Profile} />
				<PrivateRoute exact path={ROUTES.apply} component={EmploymentApplication} />
				<PrivateRoute exact path={ROUTES.ADashboard} component={Dashboard} />

				<Route exact path={ROUTES.home} component={JobListing} />
			</Switch>
		</Router>
	)
}

export default AppRoutes
