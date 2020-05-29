import React, { Component } from 'react'
import styled from 'styled-components'
import { StickyContainer, Sticky } from 'react-sticky'
import { Progress } from 'semantic-ui-react'
import { Tabs, message } from 'antd'
import { clone } from 'ramda'
import { Container } from 'styled-bootstrap-grid'
import { FaRegUser, FaLandmark, FaUserTie, FaRegFileAlt, FaRegHandshake } from 'react-icons/fa'

import Header from '../../components/common/Header'
import { limitNumberWithinRange } from '../../utils/helpers'
/* Forms */
import AgreementInfoForm from './AgreementInfoForm'
import EducationInfoForm from './EducationInfoForm'
import EmploymentInfoForm from './EmploymentInfoForm'
import PersonalInfoForm from './PersonalInfoForm'
import ReferencesInfoForm from './ReferencesInfoForm'
import { history } from '../../app/AppRoutes'
import Footer from '../../components/common/Footer'
import variables from '../../config/vars'

const { PRIMARY_COLOR, JOB_APPLYING_DATA } = variables
const { TabPane } = Tabs
const tabs = [
	{
		id: 'personal',
		title: 'Personal',
		icon: <FaRegUser />,
		component: (props) => <PersonalInfoForm {...props} />,
	},
	{
		id: 'education',
		title: 'Education',
		icon: <FaLandmark />,
		component: (props) => <EducationInfoForm {...props} />,
	},
	{
		id: 'employment',
		title: 'Employment',
		icon: <FaUserTie />,
		component: (props) => <EmploymentInfoForm {...props} />,
	},
	{
		id: 'references',
		title: 'References',
		icon: <FaRegFileAlt />,
		component: (props) => <ReferencesInfoForm {...props} />,
	},
	{
		id: 'agreement',
		title: 'Agreement',
		icon: <FaRegHandshake />,
		component: (props) => <AgreementInfoForm {...props} />,
	},
]

class EmploymentApplication extends Component {
	componentDidMount() {
		const jobError = (msg = 'Something went wrong. Please try again!') => {
			message.error(msg)
			history.replace('/')
		}
		try {
			const jobData = localStorage.getItem(JOB_APPLYING_DATA)
			if (!jobData) {
				jobError('No job selected. Please select a job!')
				return
			}
			const jobApplying = JSON.parse(jobData)
			this.setState({ jobApplying })
		} catch (error) {
			console.log(`Unable to parse '${JOB_APPLYING_DATA}' data.`, error)
			jobError()
		}
	}

	renderTabBar = (props, DefaultTabBar) => (
		<Sticky bottomOffset={80}>
			{({ style, isSticky }) => (
				<div style={{ ...style, zIndex: 9, backgroundColor: isSticky ? '#fff' : 'transparent' }}>
					<DefaultTabBar {...props} style={{ textAlign: 'center', backgroundColor: '#fff' }} />
					{this.getProgress()}
				</div>
			)}
		</Sticky>
	)

	getProgress = () => {
		return (
			<Container>
				<Progress progress='percent' percent={this.state.percent} success size='small' />
			</Container>
		)
	}

	onTabChange = (key) => {
		this.setState({ current: key })
	}

	isFormSectionComplete = (tabId) => Object.keys(this.state.formValues).includes(tabId)

	goToTab = (tabId, values = null, forward) => {
		const { percent, current: currentTabId } = this.state
		const eachTab = 100 / tabs.length
		const visited = this.isFormSectionComplete(currentTabId)

		if (forward && !visited) {
			// console.log(limitNumberWithinRange(percent + eachTab))
			this.setState({ percent: limitNumberWithinRange(percent + eachTab) })
		}

		if (values) {
			const formValues = clone(this.state.formValues)
			formValues[currentTabId] = values
			this.setState({ formValues })
		}

		this.setState({ current: tabId })
	}

	handleSuccessfulSubmit = () => {
		this.setState({ percent: 100 })
	}

	constructor(props) {
		super(props)
		this.state = {
			current: tabs[0].id,
			formValues: {},
			jobApplying: {},
			percent: 0,
		}
	}

	render() {
		const { current, jobApplying, formValues } = this.state

		return (
			<>
				<Header title='Application for Employment' />

				<StickyContainer>
					<Tabs
						tabPosition={'top'}
						renderTabBar={this.renderTabBar}
						animated={false}
						activeKey={current}
						onChange={this.onTabChange}
					>
						{tabs.map((tab, index) => {
							const totalTabs = tabs.length
							const currentTabPosition = index + 1
							const nextTabId = currentTabPosition < totalTabs ? tabs[index + 1].id : null
							const prevTabId = currentTabPosition !== 1 ? tabs[index - 1].id : null
							const { id, title, icon, component: ApplicationForm } = tab
							const done = this.isFormSectionComplete(id)
							const TabHead = (
								<TabHeadItem done={done.toString()}>
									<span>{icon}</span>
									<span>{title}</span>
								</TabHeadItem>
							)

							return (
								<TabPane tab={TabHead} key={id}>
									<Container style={{ paddingBottom: '25px', minHeight: '95vh' }}>
										<ApplicationForm
											tabs={tabs}
											id={id}
											nextTabId={nextTabId}
											prevTabId={prevTabId}
											goToNextTab={(values) => nextTabId && this.goToTab(nextTabId, values, true)}
											goToPrevTab={(values) => prevTabId && this.goToTab(prevTabId, values, false)}
											formValues={formValues}
											onSuccessfulSubmit={this.handleSuccessfulSubmit}
											jobApplying={jobApplying}
										/>
									</Container>
								</TabPane>
							)
						})}
					</Tabs>
				</StickyContainer>
				<Footer />
			</>
		)
	}
}

export default EmploymentApplication

const TabHeadItem = styled.span`
	display: flex;
	span {
		margin: 0 5px;
		color: ${(props) => props.done === 'true' && PRIMARY_COLOR};
		svg {
			font-weight: bold;
			font-size: 20px;
		}
	}
`
