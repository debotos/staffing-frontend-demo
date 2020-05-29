import React from 'react'
import styled from 'styled-components'

const Backdrop = (props) => <DrawerBackdrop onClick={props.click} />

const DrawerBackdrop = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 199; /* Drawer has 200 */
`
export default Backdrop
