import React from 'react'

import Loading from './index'

/* props can be -> color, msg, msgColor, opacity */
function LoadingCenter(props) {
	return (
		<div
			style={{
				height: '100vh',
				width: '100vw',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: props.bgColor ? props.bgColor : 'transparent',
				zIndex: 999999,
			}}
		>
			<Loading {...props} />
		</div>
	)
}

export default LoadingCenter
