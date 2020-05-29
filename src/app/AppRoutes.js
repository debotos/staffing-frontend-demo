import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory as createHistory } from 'history'

import PrivateRoute from '../utils/PrivateRoute'
import PublicRoute from '../utils/PublicRoute'
import AdminRoute from '../utils/AdminRoute'

import EmploymentApplication from '../pages/EmploymentApplication'
import JobListing from '../pages/JobListing'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Dashboard from '../pages/Dashboard'
import Intake from '../pages/Intake'
import Workflow from '../pages/Workflow'
import Schedule from '../pages/Schedule'
import Clinical from '../pages/Clinical'
import HR from '../pages/HR'
import PayRoll from '../pages/PayRoll'
import Marketing from '../pages/Marketing'
import Billing from '../pages/Billing'
import Reports from '../pages/Reports'
import Administration from '../pages/Administration'
// Admin
import AdminDashboard from '../pages/Admin/Dashboard'
import AdminJobs from '../pages/Admin/Jobs'
import AdminCandidates from '../pages/Admin/Candidates'
import AdminMessages from '../pages/Admin/Messages'
import AdminInterviews from '../pages/Admin/Interviews'
import AdminReports from '../pages/Admin/Reports'
import AdminSetting from '../pages/Admin/Setting'

export const history = createHistory()

function AppRoutes() {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path='/jobs' component={JobListing} />

				<PublicRoute exact path='/login' component={Login} />
				<PublicRoute exact path='/signup' component={SignUp} />

				<AdminRoute exact path='/admin/setting' component={AdminSetting} />
				<AdminRoute exact path='/admin/reports' component={AdminReports} />
				<AdminRoute exact path='/admin/interviews' component={AdminInterviews} />
				<AdminRoute exact path='/admin/messages' component={AdminMessages} />
				<AdminRoute exact path='/admin/candidates' component={AdminCandidates} />
				<AdminRoute exact path='/admin/jobs' component={AdminJobs} />
				<AdminRoute exact path='/admin/' component={AdminDashboard} />

				<PrivateRoute exact path='/profile' component={Profile} />
				<PrivateRoute exact path='/intake' component={Intake} />
				<PrivateRoute exact path='/workflow' component={Workflow} />
				<PrivateRoute exact path='/schedule' component={Schedule} />
				<PrivateRoute exact path='/clinical' component={Clinical} />
				<PrivateRoute exact path='/hr' component={HR} />
				<PrivateRoute exact path='/pay-roll' component={PayRoll} />
				<PrivateRoute exact path='/marketing' component={Marketing} />
				<PrivateRoute exact path='/billing' component={Billing} />
				<PrivateRoute exact path='/reports' component={Reports} />
				<PrivateRoute exact path='/administration' component={Administration} />
				<PrivateRoute exact path='/apply' component={EmploymentApplication} />
				<PrivateRoute exact path='/' component={Dashboard} />
			</Switch>
		</Router>
	)
}

export default AppRoutes
