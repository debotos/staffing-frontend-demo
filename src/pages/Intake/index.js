import React, { Component } from 'react'
import styled from 'styled-components'
import { StickyContainer, Sticky } from 'react-sticky'
import { Progress } from 'semantic-ui-react'
import { Tabs } from 'antd'
import { clone } from 'ramda'
import { Container } from 'styled-bootstrap-grid'
import { FaCheckCircle } from 'react-icons/fa'

import Header from '../../components/common/Header'
import { limitNumberWithinRange } from '../../utils/helpers'
/* Forms */
import Request from './Request'
import Referral from './Referral'
import PayorSource from './PayorSource'
import Demographics from './Demographics'
import Clinical from './Clinical'
import Footer from '../../components/common/Footer'
import DrawerNavigation from '../../navigation'
import variables from '../../config/vars'

const { PRIMARY_COLOR } = variables
const { TabPane } = Tabs
const tabs = [
	{
		id: 'demographics',
		title: 'Demographics',
		icon: <FaCheckCircle />,
		component: (props) => <Demographics {...props} />,
	},
	{
		id: 'referral',
		title: 'Referral',
		icon: <FaCheckCircle />,
		component: (props) => <Referral {...props} />,
	},
	{
		id: 'payor-source',
		title: 'Payor Source',
		icon: <FaCheckCircle />,
		component: (props) => <PayorSource {...props} />,
	},
	{
		id: 'clinical',
		title: 'Clinical',
		icon: <FaCheckCircle />,
		component: (props) => <Clinical {...props} />,
	},
	{
		id: 'request',
		title: 'Request',
		icon: <FaCheckCircle />,
		component: (props) => <Request {...props} />,
	},
]

class EmploymentApplication extends Component {
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
			percent: 0,
		}
	}

	render() {
		const { current, formValues } = this.state

		return (
			<>
				<Header title='Patient Details' />
				<div style={{ display: 'flex' }}>
					<DrawerNavigation />

					<StickyContainer style={{ width: '100%' }}>
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
												goToPrevTab={(values) =>
													prevTabId && this.goToTab(prevTabId, values, false)
												}
												formValues={formValues}
												onSuccessfulSubmit={this.handleSuccessfulSubmit}
											/>
										</Container>
									</TabPane>
								)
							})}
						</Tabs>
					</StickyContainer>
				</div>
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
