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

export const history = createHistory()

function AppRoutes() {
	return (
		<Router history={history}>
			<Switch>
				<PublicRoute exact path='/login' component={Login} />
				<PublicRoute exact path='/signup' component={SignUp} />

				<RecruiterRoute exact path='/recruiter/setting' component={RecruiterSetting} />
				<RecruiterRoute exact path='/recruiter/reports' component={RecruiterReports} />
				<RecruiterRoute exact path='/recruiter/interviews' component={RecruiterInterviews} />
				<RecruiterRoute exact path='/recruiter/messages' component={RecruiterMessages} />
				<RecruiterRoute exact path='/recruiter/candidates' component={RecruiterCandidates} />
				<RecruiterRoute exact path='/recruiter/jobs' component={RecruiterJobs} />
				<RecruiterRoute exact path='/recruiter' component={RecruiterDashboard} />

				<PrivateRoute exact path='/profile' component={Profile} />
				<PrivateRoute exact path='/apply' component={EmploymentApplication} />
				<PrivateRoute exact path='/dashboard' component={Dashboard} />

				<Route exact path='/' component={JobListing} />
			</Switch>
		</Router>
	)
}

export default AppRoutes
