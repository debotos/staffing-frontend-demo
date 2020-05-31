import React, { Component } from 'react'
import { Popconfirm, Table, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { Desktop, MobileOrTablet } from '../../../../../components/common/Device'
import { MobileCell } from '../../../../../components/UI/TableUtils'

export class JobQualificationTable extends Component {
	constructor(props) {
		super(props)
		this.columns = [
			{
				title: 'Education',
				dataIndex: 'education',
				key: 'education',
			},
			{
				title: 'Course',
				dataIndex: 'course',
				key: 'course',
			},
			{
				title: 'Specialization',
				dataIndex: 'specialization',
				key: 'specialization',
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
				ADD QUALIFICATION AND SKILLS
			</Button>
		)
		return (
			<div style={{ margin: '15px 0' }}>
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

export default JobQualificationTable
