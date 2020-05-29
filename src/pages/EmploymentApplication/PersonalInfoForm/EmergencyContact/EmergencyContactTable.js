import React, { Component } from 'react'
import { Popconfirm, Table } from 'antd'

import { Desktop, MobileOrTablet } from '../../../../components/common/Device'
import { MobileCell } from '../../../../components/UI/TableUtils'

export class EmergencyContactTable extends Component {
	constructor(props) {
		super(props)
		this.columns = [
			{
				title: 'Relationship Type',
				dataIndex: 'relationshipType',
				key: 'relationshipType',
			},
			{
				title: 'First Name',
				dataIndex: 'first',
				key: 'first',
			},
			{
				title: 'Last Name',
				dataIndex: 'last',
				key: 'last',
			},
			{
				title: 'Phone Type',
				dataIndex: 'phoneType',
				key: 'phoneType',
			},
			{
				title: 'Phone',
				dataIndex: 'phoneNumber',
				key: 'phoneNumber',
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

export default EmergencyContactTable
