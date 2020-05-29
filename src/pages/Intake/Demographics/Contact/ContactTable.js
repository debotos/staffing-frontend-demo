import React, { Component } from 'react'
import { Popconfirm, Table } from 'antd'

import { Desktop, MobileOrTablet } from '../../../../components/common/Device'
import { MobileCell } from '../../../../components/UI/TableUtils'
import { randomString } from '../../../../utils/helpers'

export class ContactTable extends Component {
	renderNestedTable = (record, index, indent, expanded) => {
		const data = []
		const { street, city, state, zip, phoneType, phoneNumber } = record
		data.push({ key: randomString(), street, city, state, zip, phoneType, phoneNumber })
		return <Table columns={this.nestedPortion} dataSource={data} pagination={false} />
	}

	constructor(props) {
		super(props)
		this.firstPortion = [
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
				title: 'Middle Initial',
				dataIndex: 'middleInitial',
				key: 'middleInitial',
			},
			{
				title: 'Last Name',
				dataIndex: 'last',
				key: 'last',
			},
			{
				title: 'Gender',
				dataIndex: 'gender',
				key: 'gender',
			},
		]
		this.nestedPortion = [
			{ title: 'Street', dataIndex: 'street', key: 'street', width: '35%' },
			{ title: 'City', dataIndex: 'city', key: 'city' },
			{ title: 'State', dataIndex: 'state', key: 'state' },
			{ title: 'Zip Code', dataIndex: 'zip', key: 'zip' },
			{ title: 'Phone Type', dataIndex: 'phoneType', key: 'phoneType' },
			{ title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
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

export default ContactTable
