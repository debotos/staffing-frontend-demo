import React, { Component } from 'react'
import { Popconfirm, Table } from 'antd'

import { Desktop, MobileOrTablet } from '../../../../../../components/common/Device'
import { MobileCell } from '../../../../../../components/UI/TableUtils'

export class AuthorizationDetailsTable extends Component {
	constructor(props) {
		super(props)
		this.columns = [
			{
				title: 'Unit Type',
				dataIndex: 'unitType',
				key: 'unitType',
			},
			{
				title: 'Billing Code',
				dataIndex: 'billingCode',
				key: 'billingCode',
			},
			{
				title: 'Qty.',
				dataIndex: 'quantity',
				key: 'quantity',
			},
			{
				title: 'Duration',
				dataIndex: 'duration',
				key: 'duration',
			},
			{
				title: 'Actions',
				dataIndex: 'action',
				width: '100px',
				align: 'center',
				render: (text, record) => (
					<>
						<span
							style={{ color: 'teal', cursor: 'pointer', marginRight: '5px' }}
							onClick={() => this.props.onEdit(record)}
						>
							Edit
						</span>
						<Popconfirm
							title='Sure to delete?'
							onConfirm={() => this.props.handleDelete(record.key)}
						>
							<span style={{ color: 'tomato', cursor: 'pointer' }}>Delete</span>
						</Popconfirm>
					</>
				),
			},
		]
	}

	render() {
		const { data } = this.props
		// console.log(data)
		return (
			<>
				<Desktop>
					<Table
						bordered
						size='small'
						pagination={false}
						columns={this.columns}
						dataSource={data}
					/>
				</Desktop>
				<MobileOrTablet>
					<Table
						bordered
						size='small'
						pagination={false}
						columns={this.columns.map((col) => ({
							...col,
							onCell: (record) => ({ record, dataIndex: col.dataIndex, title: col.title }),
						}))}
						dataSource={data}
						components={{ body: { cell: MobileCell } }}
					/>
				</MobileOrTablet>
			</>
		)
	}
}

export default AuthorizationDetailsTable
