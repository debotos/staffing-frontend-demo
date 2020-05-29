import React from 'react'
import styled from 'styled-components'

export default function Footer({ background, content, children }) {
	return (
		<footer style={{ background: background ? background : '#ececec' }}>
			{children ? (
				children
			) : (
				<div style={{ textAlign: 'center', padding: 10 }}>
					<DefaultInfo>
						© Copyright {new Date().getFullYear()} Care Pine Home Health. All right reserved.
					</DefaultInfo>
				</div>
			)}
		</footer>
	)
}

const DefaultInfo = styled.span`
	opacity: 0.7;
	@media screen and (max-width: 767px) {
		font-size: 10px;
	}
`
