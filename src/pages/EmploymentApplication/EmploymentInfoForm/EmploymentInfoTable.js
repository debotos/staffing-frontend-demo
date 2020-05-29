import React, { Component } from 'react'
import { Popconfirm, Table } from 'antd'
import moment from 'moment'

import { Desktop, MobileOrTablet } from '../../../components/common/Device'
import { MobileCell } from '../../../components/UI/TableUtils'

export class EmploymentInfoTable extends Component {
	constructor(props) {
		super(props)
		this.columns = [
			{
				title: 'Employer',
				dataIndex: 'employer',
				key: 'employer',
			},
			{
				title: 'City',
				dataIndex: 'city',
				key: 'city',
			},
			{
				title: 'State',
				dataIndex: 'state',
				key: 'state',
			},
			{
				title: 'Position Held',
				dataIndex: 'positionHeld',
				key: 'positionHeld',
			},
			{
				title: 'Phone',
				dataIndex: 'supervisorPhoneNumber',
				key: 'supervisorPhoneNumber',
			},
			{
				title: 'Start Date',
				dataIndex: 'startDate',
				key: 'startDate',
				render: (value, record) => moment(value).format('MM/DD/YYYY'),
			},
			{
				title: 'End Date',
				dataIndex: 'endDate',
				key: 'endDate',
				render: (value, record) => moment(value).format('MM/DD/YYYY'),
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

export default EmploymentInfoTable
