import React, { Component } from 'react'
import { Popconfirm, Table, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { Desktop, MobileOrTablet } from '../../../../../components/common/Device'
import { MobileCell } from '../../../../../components/UI/TableUtils'

export class JobLocationTable extends Component {
	constructor(props) {
		super(props)
		this.columns = [
			{
				title: 'City',
				dataIndex: 'city',
				key: 'city',
			},
			{
				title: 'County',
				dataIndex: 'county',
				key: 'county',
			},
			{
				title: 'State',
				dataIndex: 'state',
				key: 'state',
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
		const { data, onAddBtnClick } = this.props
		// console.log(data)
		const AddButton = (
			<Button size='small' icon={<PlusOutlined />} type='link' onClick={onAddBtnClick}>
				ADD LOCATION
			</Button>
		)
		return (
			<div style={{ margin: '10px 0' }}>
				<Desktop>
					<Table
						bordered
						size='small'
						pagination={false}
						columns={this.columns}
						dataSource={data}
						title={() => AddButton}
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
						title={() => AddButton}
					/>
				</MobileOrTablet>
			</div>
		)
	}
}

export default JobLocationTable
