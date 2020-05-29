import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import { Form, Select, Input, Divider, Button, Modal, message } from 'antd'
import { Row, Col } from 'styled-bootstrap-grid'
import {
	PlusOutlined,
	LeftCircleOutlined,
	CloseCircleOutlined,
	SaveOutlined,
} from '@ant-design/icons'

import ContactTable from './Contact/ContactTable'
import ContactAdd from './Contact/ContactAdd'
import ContactEdit from './Contact/ContactEdit'
import ServiceLocationTable from './ServiceLocation/ServiceLocationTable'
import ServiceLocationAdd from './ServiceLocation/ServiceLocationAdd'
import ServiceLocationEdit from './ServiceLocation/ServiceLocationEdit'
import Btn from '../../../components/UI/Button'

const { Option } = Select

export const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DE', 'FL', 'GA'].map(
	(x, i) => ({
		key: i,
		name: x,
		value: x,
	})
)

export const genderTypes = [
	{ key: 1, name: 'Male', value: 'Male' },
	{ key: 2, name: 'Female', value: 'Female' },
]
export const raceTypes = [
	{ key: 1, name: 'White', value: 'White' },
	{ key: 2, name: 'Black', value: 'Black' },
	{ key: 3, name: 'Asian', value: 'Asian' },
]
export const religionTypes = [
	{ key: 1, name: 'Protestantism', value: 'Protestantism' },
	{ key: 2, name: 'Catholicism', value: 'Catholicism' },
	{ key: 3, name: 'Mormonism', value: 'Mormonism' },
	{ key: 4, name: 'Judaism', value: 'Judaism' },
	{ key: 5, name: 'Islam', value: 'Islam' },
	{ key: 6, name: 'Hindu', value: 'Hindu' },
	{ key: 7, name: 'No religion', value: 'No religion' },
]
export const phoneTypes = [
	{ key: 1, name: 'Home', value: 'Home' },
	{ key: 2, name: 'Work', value: 'Work' },
	{ key: 3, name: 'Cell', value: 'Cell' },
	{ key: 4, name: 'Pager', value: 'Pager' },
]
export const relationshipTypes = [
	{ key: 1, person: 'Father', value: 'Father' },
	{ key: 2, person: 'Mother', value: 'Mother' },
	{ key: 3, person: 'Brother', value: 'Brother' },
	{ key: 4, person: 'Sister', value: 'Sister' },
	{ key: 5, person: 'Uncle', value: 'Uncle' },
	{ key: 6, person: 'Aunt', value: 'Aunt' },
	{ key: 7, person: 'Cousin', value: 'Cousin' },
	{ key: 8, person: 'Friend', value: 'Friend' },
]
export const languages = [
	{ key: 1, name: 'English', value: 'English' },
	{ key: 2, name: 'Spanish', value: 'Spanish' },
	{ key: 3, name: 'Gujarati', value: 'Gujarati' },
]

export class Demographics extends Component {
	componentWillUnmount() {
		this.mounted = false
	}

	componentDidMount() {
		this.mounted = true
	}

	handleClearAll = () => {
		this.setState({ contacts: [], serviceLocations: [] })
		this.formRef.current.resetFields()
	}

	startProcessing = (saveAndContinue = false) => {
		const { contacts, serviceLocations } = this.state
		this.mounted && this.setState({ formProcessing: true })
		const hide = message.loading('Processing form...', 0)

		// 1. Service Location Validation
		if (serviceLocations.length === 0) {
			message.error('Please add service location!')
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}

		// 2. Contact Person Validation
		if (contacts.length === 0) {
			message.error('Please add contact person!')
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}

		this.formRef.current
			.validateFields()
			.then((values) => {
				hide()
				console.log('Success:', { ...values, contacts, serviceLocations })
				this.mounted && this.setState({ formProcessing: false })
				// TODO: Adjust fields(like convert all date fields from moment to string)
				// TODO: Implement mechanism to save
				if (saveAndContinue) {
					const data = { contacts, serviceLocations, ...values }
					this.props.goToNextTab(data)
				}
			})
			.catch((errorInfo) => {
				hide()
				message.error('Please fix the form errors!')
				this.mounted && this.setState({ formProcessing: false })
				console.log('Failed:', errorInfo)
			})
	}

	onFinish = (values) => {
		console.log('Success:', values)
		// Save & Continue
	}

	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	constructor(props) {
		super(props)
		this.formRef = React.createRef()
		this.state = {
			formProcessing: false,
			contactAddModal: false,
			contactEditModal: false,
			serviceLocationAddModal: false,
			serviceLocationEditModal: false,
			contacts: [],
			serviceLocations: [],
			contactEditingData: null,
			serviceLocationEditingData: null,
		}
	}

	render() {
		return (
			<>
				<Form
					onFinish={this.onFinish}
					onFinishFailed={this.onFinishFailed}
					ref={this.formRef}
					labelAlign='left'
				>
					{/* Patient Demographics */}
					<Segment>
						<h3 className='title'>Patient Demographics</h3>
						{/* Name Fields */}
						<Divider style={{ margin: '10px 0 5px 0' }}>Name</Divider>
						<Row>
							<Col md='3'>
								<Form.Item
									label='First'
									name='first'
									rules={[
										{ whitespace: true, required: true, message: 'Provide first name!' },
										{ min: 2, message: 'Too short!' },
										{ max: 30, message: 'Too long!' },
									]}
								>
									<Input allowClear={true} placeholder='First name' />
								</Form.Item>
							</Col>
							<Col md='3'>
								<Form.Item
									label='Middle Initial'
									name='middleInitial'
									validateFirst={true}
									rules={[
										{ whitespace: true, required: false, message: 'Provide middle initial!' },
										{ max: 1, message: 'Maximum one character!' },
									]}
								>
									<Input allowClear={true} placeholder='Middle initial' />
								</Form.Item>
							</Col>
							<Col md='3'>
								<Form.Item
									label='Last'
									name='last'
									rules={[
										{ whitespace: true, required: true, message: 'Provide last name!' },
										{ min: 2, message: 'Too short!' },
										{ max: 30, message: 'Too long!' },
									]}
								>
									<Input allowClear={true} placeholder='Last name' />
								</Form.Item>
							</Col>
							<Col md='3'>
								<Form.Item
									label='Gender'
									name='gender'
									rules={[{ whitespace: true, required: true, message: 'Select gender!' }]}
								>
									<Select showSearch allowClear={true} placeholder='Select gender'>
										{genderTypes.map((type) => {
											const { key, name, value } = type
											return (
												<Option key={key} value={value}>
													{name}
												</Option>
											)
										})}
									</Select>
								</Form.Item>
							</Col>
						</Row>

						<Divider style={{ margin: '15px 0 5px 0' }} />
						<Row>
							<Col md='4'>
								<Form.Item
									label='Race'
									name='race'
									rules={[{ whitespace: true, required: true, message: 'Select race!' }]}
								>
									<Select allowClear={true} placeholder='Select race'>
										{raceTypes.map((type) => {
											const { key, name, value } = type
											return (
												<Option key={key} value={value}>
													{name}
												</Option>
											)
										})}
									</Select>
								</Form.Item>
							</Col>
							<Col md='4'>
								<Form.Item
									label='Religion'
									name='religion'
									rules={[{ whitespace: true, required: true, message: 'Select religion!' }]}
								>
									<Select allowClear={true} placeholder='Select religion'>
										{religionTypes.map((type) => {
											const { key, name, value } = type
											return (
												<Option key={key} value={value}>
													{name}
												</Option>
											)
										})}
									</Select>
								</Form.Item>
							</Col>
							<Col md='4'>
								<Form.Item
									label='Email Address'
									name='email'
									rules={[
										{ whitespace: true, required: true, message: 'Provide email address!' },
										{ type: 'email', message: 'Invalid email address!' },
									]}
								>
									<Input allowClear={true} placeholder='Email address' />
								</Form.Item>
							</Col>
						</Row>
					</Segment>
					{/* Service Location */}
					<Segment>
						<h3 className='title'>Service Location</h3>
						<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
							<Button
								icon={<PlusOutlined />}
								type='primary'
								htmlType='button'
								style={{ marginBottom: 5 }}
								onClick={() => this.setState({ serviceLocationAddModal: true })}
							>
								Add
							</Button>
						</div>
						<ServiceLocationTable
							data={this.state.serviceLocations}
							handleDelete={(key) => {
								const update = this.state.serviceLocations.filter((x) => x.key !== key)
								this.setState({ serviceLocations: update })
							}}
							onEdit={(data) => {
								this.setState({ serviceLocationEditingData: data }, () =>
									this.setState({ serviceLocationEditModal: true })
								)
							}}
						/>
						<Modal
							title='New Service Location'
							visible={this.state.serviceLocationAddModal}
							footer={null}
							onCancel={() => this.setState({ serviceLocationAddModal: false })}
						>
							<ServiceLocationAdd
								onAddSuccess={(data) => {
									const { serviceLocations } = this.state
									this.setState({
										serviceLocationAddModal: false,
										serviceLocations: [data, ...serviceLocations],
									})
								}}
							/>
						</Modal>
						<Modal
							destroyOnClose={true}
							title='Edit Service Location'
							visible={this.state.serviceLocationEditModal}
							footer={null}
							onCancel={() =>
								this.setState({ serviceLocationEditModal: false, serviceLocationEditingData: null })
							}
						>
							<ServiceLocationEdit
								onEditSuccess={(data) => {
									const { serviceLocations } = this.state
									const update = serviceLocations.map((x) => {
										if (x.key === data.key) {
											return data
										} else {
											return x
										}
									})
									this.setState({ serviceLocationEditModal: false, serviceLocations: update })
								}}
								data={this.state.serviceLocationEditingData}
							/>
						</Modal>
					</Segment>
					{/* Contact Person */}
					<Segment>
						<h3 className='title'>Contact Person</h3>
						<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
							<Button
								icon={<PlusOutlined />}
								type='primary'
								htmlType='button'
								style={{ marginBottom: 5 }}
								onClick={() => this.setState({ contactAddModal: true })}
							>
								Add
							</Button>
						</div>
						<ContactTable
							data={this.state.contacts}
							handleDelete={(key) => {
								const update = this.state.contacts.filter((x) => x.key !== key)
								this.setState({ contacts: update })
							}}
							onEdit={(contactData) => {
								this.setState({ contactEditingData: contactData }, () =>
									this.setState({ contactEditModal: true })
								)
							}}
						/>
						<Modal
							title='New Contact Person'
							visible={this.state.contactAddModal}
							footer={null}
							onCancel={() => this.setState({ contactAddModal: false })}
							wrapClassName='antd-full-screen-modal'
						>
							<ContactAdd
								onAddSuccess={(data) => {
									const { contacts } = this.state
									this.setState({ contactAddModal: false, contacts: [data, ...contacts] })
								}}
							/>
						</Modal>
						<Modal
							destroyOnClose={true}
							title='Edit Contact Person'
							visible={this.state.contactEditModal}
							footer={null}
							onCancel={() => this.setState({ contactEditModal: false, contactEditingData: null })}
							wrapClassName='antd-full-screen-modal'
						>
							<ContactEdit
								onEditSuccess={(data) => {
									const { contacts } = this.state
									const update = contacts.map((x) => {
										if (x.key === data.key) {
											return data
										} else {
											return x
										}
									})
									this.setState({ contactEditModal: false, contacts: update })
								}}
								data={this.state.contactEditingData}
							/>
						</Modal>
					</Segment>

					<Row style={{ marginTop: 20 }}>
						<Col md='4' style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
							<Btn
								icon={<LeftCircleOutlined />}
								htmlType='button'
								disabled={this.state.formProcessing || !this.props.prevTabId}
								onClick={() => this.props.goToPrevTab()}
							>
								Previous
							</Btn>
						</Col>

						<Col md='4' style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
							<Btn
								icon={<CloseCircleOutlined />}
								htmlType='button'
								style={{ marginRight: 10 }}
								disabled={this.state.formProcessing}
								onClick={this.handleClearAll}
							>
								Clear All
							</Btn>
							<Btn
								icon={<SaveOutlined />}
								htmlType='button'
								disabled={this.state.formProcessing}
								onClick={() => this.startProcessing(false)} // 'false' for not to leave
							>
								Save for Later
							</Btn>
						</Col>

						<Col md='4' style={{ display: 'flex', justifyContent: 'center' }}>
							<Btn
								icon={<SaveOutlined />}
								htmlType='button'
								disabled={this.state.formProcessing}
								onClick={() => this.startProcessing(true)} // 'true' for continue next
							>
								Save and Continue
							</Btn>
						</Col>
					</Row>
				</Form>
			</>
		)
	}
}

export default Demographics
