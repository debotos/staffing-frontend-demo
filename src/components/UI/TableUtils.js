import React from 'react'

export const MobileCell = ({ title, children, dataIndex, record, ...restProps }) => {
	return (
		<td {...restProps}>
			{dataIndex !== 'action' && title ? <b>{title}: </b> : null}
			{children}
		</td>
	)
}
