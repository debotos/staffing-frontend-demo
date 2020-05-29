import React, { Component, useState } from 'react'
import { Popconfirm, Table, Button, Modal } from 'antd'
import moment from 'moment'
import { Segment } from 'semantic-ui-react'
import { PlusOutlined } from '@ant-design/icons'

import { Desktop, MobileOrTablet } from '../../../../../components/common/Device'
import { MobileCell } from '../../../../../components/UI/TableUtils'
import { ACTIVE_OR_NOT } from './AddAuthorization'
import AuthorizationDetailsAdd from './AuthorizationDetails/AuthorizationDetailsAdd'
import AuthorizationDetailsEdit from './AuthorizationDetails/AuthorizationDetailsEdit'
import AuthorizationDetailsTable from './AuthorizationDetails/AuthorizationDetailsTable'

export class AuthorizationTable extends Component {
	constructor(props) {
		super(props)
		this.columns = [
			{
				title: 'Authorization Number',
				dataIndex: 'authorizationNumber',
				key: 'authorizationNumber',
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
				title: 'Authorized By',
				dataIndex: 'authorizedBy',
				key: 'authorizedBy',
			},
			{
				title: 'Active',
				dataIndex: ACTIVE_OR_NOT,
				key: ACTIVE_OR_NOT,
				render: (value, record) => (value ? 'Yes' : 'No'),
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

export default AuthorizationTable

const NestedTable = (props) => {
	const { record, authorizationDetails } = props
	const DATA = authorizationDetails.filter(
		(x) => x.authorizationId === record.key && x.sourceId === props.sourceId
	)

	const [addModal, setAddModal] = useState(false)
	const [editModal, setEditModal] = useState(false)
	const [editingItem, setEditingItem] = useState(null)

	return (
		<>
			{/* Authorization Details */}
			<Segment>
				<h3 className='title'>Authorization Details</h3>
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
				<AuthorizationDetailsTable
					data={DATA}
					handleDelete={(key) => {
						props.deleteAuthorizationDetailsItem(key) /* Delete from form data */
					}}
					onEdit={(data) => {
						setEditingItem(data)
						setEditModal(true)
					}}
				/>
				<Modal
					title='New Authorization Details'
					visible={addModal}
					footer={null}
					onCancel={() => setAddModal(false)}
				>
					<AuthorizationDetailsAdd
						onAddSuccess={(newData) => {
							const update = [
								{ authorizationId: record.key, sourceId: props.sourceId, ...newData },
								...authorizationDetails,
							]
							// console.log(update)
							props.setAuthorizationDetails(update)
							setAddModal(false)
						}}
					/>
				</Modal>
				<Modal
					destroyOnClose={true}
					title='Edit Authorization Details'
					visible={editModal}
					footer={null}
					onCancel={() => {
						setEditingItem(null)
						setEditModal(false)
					}}
				>
					<AuthorizationDetailsEdit
						onEditSuccess={(item) => {
							props.updateAuthorizationDetailsItem(item)
							setEditModal(false)
						}}
						data={editingItem}
					/>
				</Modal>
			</Segment>
		</>
	)
}
