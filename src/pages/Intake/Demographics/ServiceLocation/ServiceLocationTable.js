import React, { Component } from 'react'
import { Popconfirm, Table } from 'antd'

import { randomString } from '../../../../utils/helpers'
import { Desktop, MobileOrTablet } from '../../../../components/common/Device'
import { MobileCell } from '../../../../components/UI/TableUtils'

export class ServiceLocationTable extends Component {
	renderNestedTable = (record, index, indent, expanded) => {
		const data = []
		const { phoneType, phoneNumber, language } = record
		data.push({ key: randomString(), phoneType, phoneNumber, language })
		return <Table columns={this.nestedPortion} dataSource={data} pagination={false} />
	}

	constructor(props) {
		super(props)
		this.firstPortion = [
			{
				title: 'Street',
				dataIndex: 'street',
				key: 'street',
				width: '40%',
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
				title: 'Zip Code',
				dataIndex: 'zip',
				key: 'zip',
			},
		]

		this.nestedPortion = [
			{ title: 'Phone Type', dataIndex: 'phoneType', key: 'phoneType' },
			{ title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
			{ title: 'Language', dataIndex: 'language', key: 'language' },
		]

		this.lastPortion = [
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
						columns={[...this.firstPortion, ...this.lastPortion]}
						dataSource={data}
						expandable={{ expandedRowRender: this.renderNestedTable }}
					/>
				</Desktop>
				<MobileOrTablet>
					<Table
						bordered
						size='small'
						pagination={false}
						columns={[...this.firstPortion, ...this.nestedPortion, ...this.lastPortion].map(
							(col) => ({
								...col,
								onCell: (record) => ({ record, dataIndex: col.dataIndex, title: col.title }),
							})
						)}
						dataSource={data}
						components={{ body: { cell: MobileCell } }}
					/>
				</MobileOrTablet>
			</>
		)
	}
}

export default ServiceLocationTable
