import React, { Component } from 'react'
import { Popconfirm, Table } from 'antd'

import { Desktop, MobileOrTablet } from '../../../../components/common/Device'
import { MobileCell } from '../../../../components/UI/TableUtils'

export class PhysicianTable extends Component {
	constructor(props) {
		super(props)
		this.columns = [
			{
				title: 'Physician',
				dataIndex: 'physician',
				key: 'physician',
			},
			{
				title: 'Type',
				dataIndex: 'type',
				key: 'type',
			},
			{
				title: 'Speciality',
				dataIndex: 'speciality',
				key: 'speciality',
			},
			{
				title: 'Phone',
				dataIndex: 'phoneNumber',
				key: 'phoneNumber',
			},
			{
				title: 'Fax',
				dataIndex: 'faxNumber',
				key: 'faxNumber',
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

export default PhysicianTable
