import React from 'react'
import styled from 'styled-components'
import media from 'styled-media-query'
import { FiXCircle, FiLogOut } from 'react-icons/fi'

import variables from '../config/vars'

const { PRIMARY_COLOR } = variables

// UI elements to create side navigation

/* 1 */
const CloseBtn = styled(FiXCircle)`
	color: #47525d;
	opacity: 0.5;
	font-size: 1.8rem;
	cursor: pointer;
	border-radius: 50%;
	&:active,
	&:hover {
		opacity: 1;
	}
	${media.lessThan('medium')`
    /* screen width is less than 768px (medium) */
    font-size: 1.6rem;
	`}
`
export const CloseButton = ({ onClick }) => <CloseBtn onClick={() => onClick()} />

/* 2 */
const LogoffBtn = styled(FiLogOut)`
	color: #47525d;
	opacity: 0.5;
	font-size: 1.8rem;
	cursor: pointer;
	border-radius: 50%;
	&:active,
	&:hover {
		opacity: 1;
	}
	${media.lessThan('medium')`
    /* screen width is less than 768px (medium) */
    font-size: 1.6rem;
	`}
`
export const LogoffButton = ({ onClick }) => <LogoffBtn onClick={() => onClick()} />

/* 3 */
export const NavArea = styled.div`
	position: relative;
	display: flex;
	height: 100%;
	flex: 1;
	flex-direction: column;
	padding: 50px 0 0 0;
	background-color: #f8f9fa;

	/* For ScrollBar */
	overflow-y: scroll;
	::-webkit-scrollbar {
		/* WebKit */
		width: 0;
		height: 0;
	}
	/* Firefox */
	scrollbar-width: none;
	/* IE 10+ */
	-ms-overflow-style: none;
	ul {
		margin: 0;
		padding: 0;
		height: 100%;
		list-style: none;
		display: flex;
		flex-direction: column;
		li {
			a {
				border-left: 3px solid transparent;
				color: #47525d;
				text-decoration: none;
				font-size: 16px;
				font-weight: 600;
				width: 100%;
				display: inline-block;
				padding: 10px 20px;
				display: flex;
				align-items: center;
				.nav-icon {
					margin-right: 10px;
					display: flex;
					align-items: center;
					svg {
						font-size: 1.3rem;
					}
				}
				&:hover {
					color: ${PRIMARY_COLOR};
					border-left-color: ${PRIMARY_COLOR};
				}
			}
			a.active {
				background-color: #fff;
				color: ${PRIMARY_COLOR};
				box-shadow: 0 5px 5px -5px #c1c1c1, 0 -5px 5px -5px #c1c1c1;
				border-left-color: ${PRIMARY_COLOR};
			}
		}
		li:last-child {
			margin-bottom: 20px;
		}
	}
	${media.lessThan('medium')`
		/* screen width is less than 768px (medium) */
		padding: 45px 0 0 0;
		ul li {
			a {
				font-size: 15px;
				padding: 8px 20px;
				.nav-icon {
					margin-right: 8px;
				}
			}
		}
	`}
`

/* 4 */
export const ActionContainer = styled.div`
	position: absolute;
	top: 5px;
	left: 0;
	right: 0;
	height: 40px;
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
	align-items: center;
	padding: 0 22px;
`
