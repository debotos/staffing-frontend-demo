import React, { Component } from 'react'
import { clone } from 'ramda'
import { Segment, Label } from 'semantic-ui-react'
import {
	Form,
	Select,
	InputNumber,
	Input,
	Divider,
	Button,
	Modal,
	Transfer,
	DatePicker,
	Checkbox,
	Radio,
	message,
} from 'antd'
import { Row, Col } from 'styled-bootstrap-grid'
import {
	PlusOutlined,
	LeftCircleOutlined,
	CloseCircleOutlined,
	SaveOutlined,
} from '@ant-design/icons'

import { phoneValidationRegex, randomString, zipCodeValidationRegex } from '../../../utils/helpers'
import EmergencyContactTable from './EmergencyContact/EmergencyContactTable'
import EmergencyContactAdd from './EmergencyContact/EmergencyContactAdd'
import EmergencyContactEdit from './EmergencyContact/EmergencyContactEdit'
import WorkHourInput, {
	initialWorkingHourData,
	isWorkingHourProvided,
} from '../../../components/UI/input/WorkHourInput'
import { JobDetailsHighlight } from '../../JobListing'
import { history } from '../../../app/AppRoutes'
import Btn from '../../../components/UI/Button'
import { states } from '../../../utils/generateInputData'
import variables from '../../../config/vars'
import keys from '../../../config/keys'

const { PRIMARY_COLOR } = variables
const { ROUTES } = keys
const CheckboxGroup = Checkbox.Group
const { Option } = Select
const { TextArea } = Input

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
]
export const classificationPositionsData = [
	{ key: 1, title: `RN`, chosen: false },
	{ key: 2, title: `LPN`, chosen: false },
	{ key: 3, title: `PT`, chosen: false },
	{ key: 4, title: `OT`, chosen: false },
	{ key: 5, title: `CNA`, chosen: false },
]
export const salaryTypes = [
	{ key: 1, name: 'Per Visit', value: 'Per Visit' },
	{ key: 2, name: 'Hourly', value: 'Hourly' },
	{ key: 3, name: 'Monthly', value: 'Monthly' },
	{ key: 4, name: 'Yearly', value: 'Yearly' },
]

const FIELD_LICENSE_EVER_SUSPENDED = 'everLicenseSuspended'
const FIELD_HAVE_CAR_LICENSE = 'haveCarLicense'

const formInitialValues = { [FIELD_LICENSE_EVER_SUSPENDED]: false, [FIELD_HAVE_CAR_LICENSE]: false }

export class PersonalInfoForm extends Component {
	componentWillUnmount() {
		this.mounted = false
	}

	componentDidMount() {
		this.mounted = true
	}

	handleClearAll = () => {
		this.setState({ ...formInitialValues })
		this.formRef.current.resetFields()
		this.setState({
			reRenderKey: randomString(10), // Re-render the WorkHourInput component to reset
			workingHours: clone(initialWorkingHourData),
		})
	}

	startProcessing = (saveAndContinue = false) => {
		this.mounted && this.setState({ formProcessing: true })
		const hide = message.loading('Processing form...', 0)

		// 1. Working Hours Validation
		const workingHourProvided = isWorkingHourProvided(this.state.workingHours)
		// console.log(workingHourProvided)
		if (!workingHourProvided) {
			message.error('Please select working hours!')
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}

		// 2. Emergency Contact Validation
		if (this.state.contacts.length === 0) {
			message.error('Please add emergency contacts!')
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}

		this.formRef.current
			.validateFields()
			.then((values) => {
				hide()
				const { contacts, workingHours } = this.state
				console.log('Success:', { ...values, contacts, workingHours })
				this.mounted && this.setState({ formProcessing: false })
				// TODO: Adjust fields(like convert all date fields from moment to string)
				// TODO: Implement mechanism to save
				if (saveAndContinue) {
					const data = { contacts, workingHours, ...values }
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
			reRenderKey: randomString(10),
			formProcessing: false,
			contactAddModal: false,
			contactEditModal: false,
			contacts: [],
			contactEditingData: null,
			targetKeys: [],
			workingHours: clone(initialWorkingHourData),
			...formInitialValues,
		}
	}

	render() {
		const { jobApplying } = this.props
		return (
			<>
				{/* Job info */}
				<Segment>
					<Label attached='top' style={{ display: 'flex', justifyContent: 'space-between' }}>
						<span>Job You're Applying</span>
						<span
							style={{ cursor: 'pointer', color: PRIMARY_COLOR }}
							onClick={() => history.replace(ROUTES.home)}
						>
							<LeftCircleOutlined /> Select Another
						</span>
					</Label>
					<JobDetailsHighlight data={jobApplying} />
				</Segment>
				<Form
					onFinish={this.onFinish}
					onFinishFailed={this.onFinishFailed}
					ref={this.formRef}
					labelAlign='left'
					initialValues={formInitialValues}
				>
					{/* Personal */}
					<Segment>
						<h3 className='title'>Personal</h3>
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
									label='Maiden'
									name='maiden'
									rules={[
										{ whitespace: true, required: false, message: 'Provide maiden name!' },
										{ min: 2, message: 'Too short!' },
										{ max: 30, message: 'Too long!' },
									]}
								>
									<Input allowClear={true} placeholder='Maiden name' />
								</Form.Item>
							</Col>
						</Row>

						{/* Address Fields */}
						<Divider style={{ margin: '15px 0 5px 0' }}>Address</Divider>
						<Row>
							<Col md='4'>
								<Form.Item
									label='Street'
									name='street'
									rules={[
										{ whitespace: true, required: true, message: 'Provide street address!' },
										{ min: 5, message: 'Too short!' },
										{ max: 150, message: 'Too long!' },
									]}
								>
									<Input allowClear={true} placeholder='Street address' />
								</Form.Item>
							</Col>
							<Col md='2'>
								<Form.Item
									label='City'
									name='city'
									rules={[
										{ whitespace: true, required: true, message: 'Provide city name!' },
										{ min: 2, message: 'Too short!' },
										{ max: 50, message: 'Too long!' },
									]}
								>
									<Input allowClear={true} placeholder='City name' />
								</Form.Item>
							</Col>
							<Col md='2'>
								<Form.Item
									label='State'
									name='state'
									rules={[{ whitespace: true, required: true, message: 'Select your state!' }]}
								>
									<Select showSearch allowClear={true} placeholder='Select state'>
										{states.map((type) => {
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
							<Col md='2'>
								<Form.Item
									label='Zip code'
									name='zip'
									validateFirst={true}
									rules={[
										{ whitespace: true, required: true, message: 'Provide zip code!' },
										{ pattern: zipCodeValidationRegex, message: 'Invalid zip code!' },
									]}
								>
									<Input allowClear={true} placeholder='Zip code' />
								</Form.Item>
							</Col>
							<Col md='2'>
								<Form.Item
									label='County'
									name='county'
									rules={[
										{ whitespace: true, required: true, message: 'Provide county!' },
										{ min: 2, message: 'Too short!' },
										{ max: 50, message: 'Too long!' },
									]}
								>
									<Input allowClear={true} placeholder='County name' />
								</Form.Item>
							</Col>
						</Row>

						{/* Contact Fields */}
						<Divider style={{ margin: '15px 0 5px 0' }}>Contact</Divider>
						<Row>
							<Col md='4'>
								<Form.Item
									label='Phone Type'
									name='phoneType'
									rules={[{ whitespace: true, required: true, message: 'Select phone type!' }]}
								>
									<Select allowClear={true} placeholder='Select phone type'>
										{phoneTypes.map((type) => {
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
									label='Phone Number'
									name='phoneNumber'
									rules={[
										{ whitespace: true, required: true, message: 'Provide phone number!' },
										{ pattern: phoneValidationRegex, message: 'Phone number is invalid!' },
									]}
								>
									<Input allowClear={true} placeholder='Phone number' />
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
					{/* Emergency Contact/Relationship */}
					<Segment>
						<h3 className='title'>Emergency Contact/Relationship</h3>
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
						<EmergencyContactTable
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
							title='New Emergency Contact/Relationship'
							visible={this.state.contactAddModal}
							footer={null}
							onCancel={() => this.setState({ contactAddModal: false })}
						>
							<EmergencyContactAdd
								onAddSuccess={(data) => {
									const { contacts } = this.state
									this.setState({ contactAddModal: false, contacts: [data, ...contacts] })
								}}
							/>
						</Modal>
						<Modal
							destroyOnClose={true}
							title='Edit Emergency Contact/Relationship'
							visible={this.state.contactEditModal}
							footer={null}
							onCancel={() => this.setState({ contactEditModal: false, contactEditingData: null })}
						>
							<EmergencyContactEdit
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
					{/* Classification */}
					<Segment>
						<h3 className='title'>Classification</h3>
						{/* Positions (Transfer Input) */}
						<Row style={{ marginTop: '10px' }}>
							<Col
								md='12'
								style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
							>
								<Form.Item
									label='Select Positions'
									name='positions'
									rules={[{ required: true, message: 'Please select positions!' }]}
								>
									<Transfer
										dataSource={classificationPositionsData}
										titles={['Positions', 'Selected']}
										targetKeys={this.state.targetKeys}
										onChange={(targetKeys) => this.setState({ targetKeys })}
										showSearch
										filterOption={(inputValue, option) =>
											option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
										}
										render={(item) => item.title}
										listStyle={{ minWidth: 240, minHeight: 270 }}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row style={{ marginTop: '10px' }}>
							<Col md='4'>
								<Form.Item
									label='License/Certification'
									name='license'
									rules={[
										{ whitespace: true, required: true, message: 'Provide license/certification!' },
										{ min: 3, message: 'Too short!' },
										{ max: 200, message: 'Too long!' },
									]}
								>
									<Input allowClear={true} placeholder='License/Certification' />
								</Form.Item>
							</Col>
							<Col md='4'>
								<Form.Item
									label='State Issued'
									name='stateIssued'
									rules={[{ whitespace: true, required: true, message: 'Select issued state!' }]}
								>
									<Select showSearch allowClear={true} placeholder='Select issued state'>
										{states.map((type) => {
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
									label='Expiration Date'
									name='expirationDate'
									rules={[{ required: true, message: 'Select expiration date!' }]}
								>
									<DatePicker
										allowClear={true}
										format='MM-DD-YYYY'
										placeholder='Select expiration date'
										style={{ width: '100%' }}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row style={{ marginTop: '10px' }}>
							<Col md='12' style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
								<span style={{ marginRight: 10, marginBottom: 5 }}>
									Has your license ever been suspended or revoked?
								</span>
								<Form.Item name={FIELD_LICENSE_EVER_SUSPENDED}>
									<Radio.Group
										onChange={(e) =>
											this.setState({ [FIELD_LICENSE_EVER_SUSPENDED]: e.target.value })
										}
									>
										<Radio value={true}>Yes</Radio>
										<Radio value={false}>No</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>
						{this.state[FIELD_LICENSE_EVER_SUSPENDED] && (
							<Row>
								<Col md='12'>
									<Form.Item
										label='Please explain'
										name='explainLicenseSuspend'
										validateFirst={true}
										rules={[
											{
												required: this.state[FIELD_LICENSE_EVER_SUSPENDED],
												message: 'Please explain why suspended!',
											},
											{ whitespace: true, message: 'Invalid input!' },
											{ min: 10, message: 'Too short!' },
											{ max: 250, message: 'Too long!' },
										]}
									>
										<TextArea rows={2} placeholder='Explain...' />
									</Form.Item>
								</Col>
							</Row>
						)}
						<Row style={{ marginTop: '10px', marginBottom: '10px' }}>
							<Col md='4'>
								<Form.Item
									label='Salary Requirements'
									name='salary'
									rules={[{ required: true, message: 'Provide salary requirement!' }]}
								>
									<InputNumber
										style={{ width: '100%' }}
										min={1}
										step={100}
										placeholder='Salary requirement'
										formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
										parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
									/>
								</Form.Item>
							</Col>
							<Col md='4'>
								<Form.Item
									label='Select Type'
									name='salaryType'
									rules={[{ whitespace: true, required: true, message: 'Select salary type!' }]}
								>
									<Select allowClear={true} placeholder='Select salary type'>
										{salaryTypes.map((type) => {
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
									label='Are you available to work'
									name='availableToWork'
									rules={[{ required: true, message: 'Select availability!' }]}
								>
									<CheckboxGroup options={['Full Time', 'Part Time', 'Per Diem']} />
								</Form.Item>
							</Col>
						</Row>
						{/* Specify days / hours you may be available */}
						<h3 className='title'>Specify days / hours you may be available</h3>
						<Row style={{ marginTop: '10px' }}>
							<Col md='12'>
								<WorkHourInput
									key={this.state.reRenderKey}
									onWorkingHourChange={(workingHours) => this.setState({ workingHours })}
								/>
							</Col>
						</Row>
						<Row style={{ marginTop: '10px' }}>
							<Col md='5'>
								<Form.Item
									label='Do you have a current driver’s license?'
									name={FIELD_HAVE_CAR_LICENSE}
								>
									<Radio.Group
										onChange={(e) => this.setState({ [FIELD_HAVE_CAR_LICENSE]: e.target.value })}
									>
										<Radio value={true}>Yes</Radio>
										<Radio value={false}>No</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
							{this.state[FIELD_HAVE_CAR_LICENSE] && (
								<>
									<Col md='3'>
										<Form.Item
											label='Select state'
											name='drivingLicenseIssuedState'
											rules={[
												{
													required: this.state[FIELD_HAVE_CAR_LICENSE],
													message: 'Select issued state!',
												},
												{ whitespace: true, message: 'Select issued state!' },
											]}
										>
											<Select showSearch allowClear={true} placeholder='Select issued state'>
												{states.map((type) => {
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
											label='License'
											name='drivingLicense'
											validateFirst={true}
											rules={[
												{
													required: this.state[FIELD_HAVE_CAR_LICENSE],
													message: 'Provide license!',
												},
												{ whitespace: true, message: 'Invalid driving license!' },
												{ min: 5, message: 'Too short!' },
												{ max: 250, message: 'Too long!' },
											]}
										>
											<Input allowClear={true} placeholder='License' />
										</Form.Item>
									</Col>
								</>
							)}
						</Row>
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

export default PersonalInfoForm
