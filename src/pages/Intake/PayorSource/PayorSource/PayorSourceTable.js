import React, { Component, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Popconfirm, Table, Button, Modal } from 'antd'
import { Segment } from 'semantic-ui-react'

import { Desktop, MobileOrTablet } from '../../../../components/common/Device'
import { MobileCell } from '../../../../components/UI/TableUtils'
import AuthorizationTable from './Authorization/AuthorizationTable'
import AddAuthorization from './Authorization/AddAuthorization'
import EditAuthorization from './Authorization/EditAuthorization'

export class PayorSourceTable extends Component {
	constructor(props) {
		super(props)
		this.columns = [
			{
				title: 'Payor Source',
				dataIndex: 'sourceName',
				key: 'sourceName',
			},
			{
				title: 'Payor Type	',
				dataIndex: 'sourceType',
				key: 'sourceType',
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

export default PayorSourceTable

const NestedTable = (props) => {
	const { record, authorizations } = props
	const DATA = authorizations.filter((x) => x.sourceId === record.key)

	const [addModal, setAddModal] = useState(false)
	const [editModal, setEditModal] = useState(false)
	const [editingItem, setEditingItem] = useState(null)

	return (
		<>
			{/* Authorization */}
			<Segment>
				<h3 className='title'>Authorization</h3>
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
				<AuthorizationTable
					data={DATA}
					handleDelete={(key) => {
						props.deleteAuthorization(key) /* Delete from form data */
					}}
					onEdit={(data) => {
						setEditingItem(data)
						setEditModal(true)
					}}
					sourceId={record.key}
					authorizationDetails={props.authorizationDetails}
					setAuthorizationDetails={props.setAuthorizationDetails}
					deleteAuthorizationDetailsItem={props.deleteAuthorizationDetailsItem}
					updateAuthorizationDetailsItem={props.updateAuthorizationDetailsItem}
				/>
				<Modal
					title='New Authorization'
					visible={addModal}
					footer={null}
					onCancel={() => setAddModal(false)}
				>
					<AddAuthorization
						onAddSuccess={(newData) => {
							const update = [{ sourceId: record.key, ...newData }, ...authorizations]
							// console.log(update)
							props.setAuthorizations(update)
							setAddModal(false)
						}}
					/>
				</Modal>
				<Modal
					destroyOnClose={true}
					title='Edit Authorization'
					visible={editModal}
					footer={null}
					onCancel={() => {
						setEditingItem(null)
						setEditModal(false)
					}}
				>
					<EditAuthorization
						onEditSuccess={(item) => {
							props.updateAuthorization(item)
							setEditModal(false)
						}}
						data={editingItem}
					/>
				</Modal>
			</Segment>
		</>
	)
}
