import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Desktop, MobileOrTablet } from '../components/common/Device'
import NonAuthenticateDrawer from './NonAuthenticateDrawer'
import AuthenticateDrawer from './AuthenticateDrawer'
import './drawer-navigation.css'

const MobileDrawerContainer = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	height: 100%;
	width: 100%;
	overflow-y: scroll;
	scrollbar-width: none;
	/* Firefox */
	-ms-overflow-style: none;
	/* IE 10+ */
	&::-webkit-scrollbar {
		/* WebKit */
		width: 0;
		height: 0;
	}
`
const DesktopDrawerContainer = styled(MobileDrawerContainer)``

class sideDrawer extends Component {
	render() {
		const { show, auth, onlyDesktop = false, ...restProps } = this.props

		let drawerClasses = 'side-drawer'
		if (show) {
			drawerClasses = 'side-drawer open'
		}

		const { isAuthenticated, user } = auth

		const MobileUI = (
			<MobileOrTablet key='mobile'>
				<div className={drawerClasses}>
					<MobileDrawerContainer>
						{isAuthenticated ? (
							<AuthenticateDrawer user={user} desktop={false} {...restProps} />
						) : (
							<NonAuthenticateDrawer desktop={false} {...restProps} />
						)}
					</MobileDrawerContainer>
				</div>
			</MobileOrTablet>
		)

		const DesktopUI = (
			<Desktop key='desktop'>
				<div className='side-drawer-desktop'>
					<DesktopDrawerContainer>
						{isAuthenticated ? (
							<AuthenticateDrawer user={user} desktop={true} {...restProps} />
						) : (
							<NonAuthenticateDrawer desktop={true} {...restProps} />
						)}
					</DesktopDrawerContainer>
				</div>
			</Desktop>
		)

		const UI = [DesktopUI, MobileUI]

		if (onlyDesktop) {
			UI.pop()
		}

		return <>{UI}</>
	}
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, null)(sideDrawer)
