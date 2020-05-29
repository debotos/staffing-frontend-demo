import React, { Component, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Popconfirm, Table, Button, Modal } from 'antd'
import { Segment } from 'semantic-ui-react'
import moment from 'moment'

import { Desktop, MobileOrTablet } from '../../../../components/common/Device'
import { MobileCell } from '../../../../components/UI/TableUtils'
import CaseManagerTable from './CaseManager/CaseManagerTable'
import AddCaseManager from './CaseManager/AddCaseManager'
import EditCaseManager from './CaseManager/EditCaseManager'

export class ReferralSourceTable extends Component {
	constructor(props) {
		super(props)
		this.columns = [
			{
				title: 'Source Type	',
				dataIndex: 'sourceType',
				key: 'sourceType',
			},
			{
				title: 'Source Name',
				dataIndex: 'sourceName',
				key: 'sourceName',
			},
			{
				title: 'Taken By',
				dataIndex: 'takenBy',
				key: 'takenBy',
			},
			{
				title: 'Date',
				dataIndex: 'date',
				key: 'date',
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

export default ReferralSourceTable

const NestedTable = (props) => {
	const { record, caseManagers } = props
	const DATA = caseManagers.filter((x) => x.referralId === record.key)

	const [addModal, setAddModal] = useState(false)
	const [editModal, setEditModal] = useState(false)
	const [editingItem, setEditingItem] = useState(null)

	return (
		<>
			{/* Case Manager */}
			<Segment>
				<h3 className='title'>Case Manager</h3>
				<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
					<Button
						icon={<PlusOutlined />}
						type='primary'
						htmlType='button'
						style={{ marginBottom: 5 }}
						onClick={() => setAddModal(true)}
					>
						Add
					</Button>
				</div>
				<CaseManagerTable
					data={DATA}
					handleDelete={(key) => {
						props.deleteCaseManager(key) /* Delete from form data */
					}}
					onEdit={(data) => {
						setEditingItem(data)
						setEditModal(true)
					}}
				/>
				<Modal
					title='New Case Manager'
					visible={addModal}
					footer={null}
					onCancel={() => setAddModal(false)}
				>
					<AddCaseManager
						onAddSuccess={(newData) => {
							const update = [{ referralId: record.key, ...newData }, ...caseManagers]
							props.setCaseManagers(update)
							setAddModal(false)
						}}
					/>
				</Modal>
				<Modal
					destroyOnClose={true}
					title='Edit Case Manager'
					visible={editModal}
					footer={null}
					onCancel={() => {
						setEditingItem(null)
						setEditModal(false)
					}}
				>
					<EditCaseManager
						onEditSuccess={(item) => {
							props.updateCaseManager(item)
							setEditModal(false)
						}}
						data={editingItem}
					/>
				</Modal>
			</Segment>
		</>
	)
}
