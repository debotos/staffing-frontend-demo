import React, { Component } from 'react'
import { Popconfirm, Table } from 'antd'
import moment from 'moment'

import { Desktop, MobileOrTablet } from '../../../../components/common/Device'
import { MobileCell } from '../../../../components/UI/TableUtils'

export class DiagnosisTable extends Component {
	constructor(props) {
		super(props)
		this.columns = [
			{
				title: 'ICD Code',
				dataIndex: 'code',
				key: 'code',
			},
			{
				title: 'Onset/Exacerbation',
				dataIndex: 'type',
				key: 'type',
			},
			{
				title: 'O/E Date',
				dataIndex: 'date',
				key: 'date',
				render: (value, record) => moment(value).format('MM/DD/YYYY'),
			},
			{
				title: 'Symptom Control Rating',
				dataIndex: 'rating',
				key: 'rating',
			},
			{
				title: 'Comorbidity',
				dataIndex: 'comorbidity',
				key: 'comorbidity',
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
						expandable={{
							expandedRowRender: (record, index, indent, expanded) => (
								<NestedTable record={record} {...this.props} />
							),
						}}
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
						expandable={{
							expandedRowRender: (record, index, indent, expanded) => (
								<NestedTable record={record} {...this.props} />
							),
						}}
					/>
				</MobileOrTablet>
			</>
		)
	}
}

export default DiagnosisTable

const NestedTable = (props) => {
	const { record } = props

	return (
		<div>
			<b style={{ marginBottom: 10 }}>Description:</b>
			<br />
			{record.description}
		</div>
	)
}
