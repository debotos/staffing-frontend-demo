import React, { Component } from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import { Tabs } from 'antd'
import { Container } from 'styled-bootstrap-grid'
import { FaPencilAlt, FaRegListAlt } from 'react-icons/fa'

import Footer from '../../../components/common/Footer'
import { TabHeadItem } from '../../../components/UI/TabUtils'
import Header from '../../../components/common/Header'
import DrawerNavigation from '../../../navigation'
import CreateJob from './CreateJob'
import ViewJobs from './ViewJobs'

const { TabPane } = Tabs
const tabs = [
	{
		id: 'create',
		title: 'Create',
		icon: <FaPencilAlt />,
		component: (props) => <CreateJob {...props} />,
	},
	{
		id: 'view',
		title: 'View',
		icon: <FaRegListAlt />,
		component: (props) => <ViewJobs {...props} />,
	},
]

export class Jobs extends Component {
	renderTabBar = (props, DefaultTabBar) => (
		<Sticky bottomOffset={80}>
			{({ style }) => (
				<div style={{ ...style, zIndex: 9 }}>
					<div style={{ backgroundColor: '#fff' }}>
						<Container>
							<DefaultTabBar {...props} />
						</Container>
					</div>
				</div>
			)}
		</Sticky>
	)

	render() {
		return (
			<>
				<Header sideNavProps={{ recruiterNav: true }} />
				<div style={{ display: 'flex' }}>
					<DrawerNavigation recruiterNav={true} onlyDesktop />

					<StickyContainer style={{ width: '100%' }}>
						<Tabs tabPosition={'top'} renderTabBar={this.renderTabBar} animated={false}>
							{tabs.map((tab, index) => {
								const totalTabs = tabs.length
								const currentTabPosition = index + 1
								const nextTabId = currentTabPosition < totalTabs ? tabs[index + 1].id : null
								const prevTabId = currentTabPosition !== 1 ? tabs[index - 1].id : null
								const { id, title, icon, component: Component } = tab

								const TabHead = (
									<TabHeadItem>
										<span>{icon}</span>
										<span>{title}</span>
									</TabHeadItem>
								)

								return (
									<TabPane tab={TabHead} key={id}>
										<Container style={{ paddingBottom: '25px', minHeight: '95vh' }}>
											<Component
												tabs={tabs}
												id={id}
												nextTabId={nextTabId}
												prevTabId={prevTabId}
												goToNextTab={(values) => nextTabId && this.goToTab(nextTabId, values, true)}
												goToPrevTab={(values) =>
													prevTabId && this.goToTab(prevTabId, values, false)
												}
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

export default Jobs
