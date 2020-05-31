import React, { Component } from 'react'
import { clone } from 'ramda'
import { message, Form, Input, Select, Checkbox, Modal, DatePicker } from 'antd'
import { Row, Col } from 'styled-bootstrap-grid'

import WorkHourInput, {
	initialWorkingHourData,
	isWorkingHourProvided,
} from '../../../../components/UI/input/WorkHourInput'
import { randomString } from '../../../../utils/helpers'
import JobLocationTable from './JobLocation/JobLocationTable'
import AddJobLocation from './JobLocation/AddJobLocation'
import EditJobLocation from './JobLocation/EditJobLocation'
import JobQualificationTable from './JobQualification/JobQualificationTable'
import AddJobQualification from './JobQualification/AddJobQualification'
import EditJobQualification from './JobQualification/EditJobQualification'
import { SaveOutlined, ScheduleOutlined } from '@ant-design/icons'
import Btn from '../../../../components/UI/Button'

export const buildTypes = [
	{ key: 1, name: 'Start from scratch', value: 'Start from scratch' },
	{ key: 2, name: 'Use a previous job as a template', value: 'Use a previous job as a template' },
]

export const templateTypes = [
	{ key: 1, name: 'RN', value: 'RN' },
	{ key: 2, name: 'SN', value: 'SN' },
	{ key: 3, name: 'TN', value: 'TN' },
]
export const disciplineTypes = [
	{ key: 1, name: 'RN', value: 'RN' },
	{ key: 2, name: 'Non RN', value: 'Non RN' },
]
export const experienceYears = [
	{ key: 1, name: '1', value: '1' },
	{ key: 2, name: '2', value: '2' },
	{ key: 3, name: '3', value: '3' },
	{ key: 4, name: '4', value: '4' },
	{ key: 5, name: '5', value: '5' },
	{ key: 6, name: '6', value: '6' },
	{ key: 7, name: '7', value: '7' },
	{ key: 8, name: '8', value: '8' },
	{ key: 9, name: '9', value: '9' },
	{ key: 10, name: '10', value: '10' },
	{ key: 11, name: '10+', value: '10+' },
]

export class CreateJob extends Component {
	componentWillUnmount() {
		this.mounted = false
	}

	componentDidMount() {
		this.mounted = true
	}

	handleClearAll = () => {
		this.formRef.current.resetFields()
		this.setState({
			reRenderKey: randomString(10), // Re-render the WorkHourInput component to reset
			workingHours: clone(initialWorkingHourData),
		})
	}

	startProcessing = () => {
		const { workingHours, locations, qualifications } = this.state
		this.mounted && this.setState({ formProcessing: true })
		const hide = message.loading('Processing form...', 0)

		// 1. Working Hours Validation
		const workingHourProvided = isWorkingHourProvided(workingHours)
		// console.log(workingHourProvided)
		if (!workingHourProvided) {
			message.error('Please select working hours!')
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}
		// 2. Location Validation
		if (locations.length === 0) {
			message.error('Please add location!')
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}
		// 3. Qualification Validation
		if (qualifications.length === 0) {
			message.error('Please add qualification!')
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}

		this.formRef.current
			.validateFields()
			.then((values) => {
				hide()
				const data = { workingHours, locations, qualifications, ...values }
				console.log('Success:', data)
				this.mounted && this.setState({ formProcessing: false })
				// TODO: Adjust fields(like convert all date fields from moment to string)
				// TODO: AJAX req to send
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
			workingHours: clone(initialWorkingHourData),
			locationAddModal: false,
			locationEditModal: false,
			locations: [],
			locationEditingData: null,
			qualificationAddModal: false,
			qualificationEditModal: false,
			qualifications: [],
			qualificationEditingData: null,
		}
	}

	render() {
		return (
			<Form
				onFinish={this.onFinish}
				onFinishFailed={this.onFinishFailed}
				ref={this.formRef}
				labelAlign='left'
			>
				<h3 className='title'>Introduction</h3>

				<Row>
					<Col md='6'>
						<Form.Item
							label='How would you like to build your post?'
							name='buildType'
							rules={[{ whitespace: true, required: true, message: 'Select build type!' }]}
						>
							<Select allowClear={true} placeholder='Select build type'>
								{buildTypes.map((item) => {
									const { key, name, value } = item
									return (
										<Select.Option key={key} value={value}>
											{name}
										</Select.Option>
									)
								})}
							</Select>
						</Form.Item>
					</Col>
					<Col md='6'>
						<Form.Item
							label='Job Template'
							name='templateType'
							rules={[{ whitespace: true, required: true, message: 'Select template!' }]}
						>
							<Select allowClear={true} placeholder='Select template'>
								{templateTypes.map((item) => {
									const { key, name, value } = item
									return (
										<Select.Option key={key} value={value}>
											{name}
										</Select.Option>
									)
								})}
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col md='4'>
						<Form.Item
							label='Job Title'
							name='title'
							validateFirst
							rules={[
								{ whitespace: true, required: true, message: 'Provide job title!' },
								{ min: 2, message: 'Too short!' },
								{ max: 250, message: 'Too long!' },
							]}
						>
							<Input allowClear={true} placeholder='Job title' />
						</Form.Item>
					</Col>
					<Col md='2'>
						<Form.Item
							label='Discipline'
							name='discipline'
							rules={[{ whitespace: true, required: true, message: 'Select discipline!' }]}
						>
							<Select allowClear={true} placeholder='Select discipline'>
								{disciplineTypes.map((item) => {
									const { key, name, value } = item
									return (
										<Select.Option key={key} value={value}>
											{name}
										</Select.Option>
									)
								})}
							</Select>
						</Form.Item>
					</Col>
					<Col md='6'>
						<Form.Item
							label='Type'
							name='type'
							rules={[{ required: true, message: 'Select type!' }]}
						>
							<Checkbox.Group options={['Full Time', 'Part Time', 'Per Diem', 'Seasonal']} />
						</Form.Item>
					</Col>
				</Row>
				<h3 className='title'>Schedule</h3>
				<Row>
					<Col md='12'>
						<WorkHourInput
							key={this.state.reRenderKey}
							onWorkingHourChange={(workingHours) => this.setState({ workingHours })}
						/>
					</Col>
				</Row>

				<JobLocationTable
					data={this.state.locations}
					onAddBtnClick={() => this.setState({ locationAddModal: true })}
					handleDelete={(key) => {
						const update = this.state.locations.filter((x) => x.key !== key)
						this.setState({ locations: update })
					}}
					onEdit={(locationData) => {
						this.setState({ locationEditingData: locationData }, () =>
							this.setState({ locationEditModal: true })
						)
					}}
				/>
				<Modal
					title='New Location'
					visible={this.state.locationAddModal}
					footer={null}
					onCancel={() => this.setState({ locationAddModal: false })}
				>
					<AddJobLocation
						onAddSuccess={(data) => {
							const { locations } = this.state
							this.setState({ locationAddModal: false, locations: [data, ...locations] })
						}}
					/>
				</Modal>
				<Modal
					destroyOnClose={true}
					title='Edit Location'
					visible={this.state.locationEditModal}
					footer={null}
					onCancel={() => this.setState({ locationEditModal: false, locationEditingData: null })}
				>
					<EditJobLocation
						onEditSuccess={(data) => {
							const { locations } = this.state
							const update = locations.map((x) => {
								if (x.key === data.key) {
									return data
								} else {
									return x
								}
							})
							this.setState({ locationEditModal: false, locations: update })
						}}
						data={this.state.locationEditingData}
					/>
				</Modal>

				<Row>
					<Col md='3'>
						<Form.Item
							label='Experience(Year)'
							name='experience'
							rules={[{ whitespace: true, required: true, message: 'Select experience(year)!' }]}
						>
							<Select allowClear={true} placeholder='Select experience'>
								{experienceYears.map((item) => {
									const { key, name, value } = item
									return (
										<Select.Option key={key} value={value}>
											{name}
										</Select.Option>
									)
								})}
							</Select>
						</Form.Item>
					</Col>
				</Row>

				<Row>
					<Col md='12'>
						<Form.Item
							label='Job Description'
							name='description'
							validateFirst
							rules={[
								{ required: true, message: 'Please provide description!' },
								{ whitespace: true, message: 'Invalid input!' },
								{ min: 10, message: 'Too short!' },
								{ max: 1000, message: 'Too long!' },
							]}
						>
							<Input.TextArea rows={5} placeholder='Job description here...' />
						</Form.Item>
					</Col>
				</Row>

				<h3 className='title'>Qualifications and Skills</h3>

				<JobQualificationTable
					data={this.state.qualifications}
					onAddBtnClick={() => this.setState({ qualificationAddModal: true })}
					handleDelete={(key) => {
						const update = this.state.qualifications.filter((x) => x.key !== key)
						this.setState({ qualifications: update })
					}}
					onEdit={(qualificationData) => {
						this.setState({ qualificationEditingData: qualificationData }, () =>
							this.setState({ qualificationEditModal: true })
						)
					}}
				/>
				<Modal
					title='New Qualifications and Skills'
					visible={this.state.qualificationAddModal}
					footer={null}
					onCancel={() => this.setState({ qualificationAddModal: false })}
				>
					<AddJobQualification
						onAddSuccess={(data) => {
							const { qualifications } = this.state
							this.setState({
								qualificationAddModal: false,
								qualifications: [data, ...qualifications],
							})
						}}
					/>
				</Modal>
				<Modal
					destroyOnClose={true}
					title='Edit Qualifications and Skills'
					visible={this.state.qualificationEditModal}
					footer={null}
					onCancel={() =>
						this.setState({ qualificationEditModal: false, qualificationEditingData: null })
					}
				>
					<EditJobQualification
						onEditSuccess={(data) => {
							const { qualifications } = this.state
							const update = qualifications.map((x) => {
								if (x.key === data.key) {
									return data
								} else {
									return x
								}
							})
							this.setState({ qualificationEditModal: false, qualifications: update })
						}}
						data={this.state.qualificationEditingData}
					/>
				</Modal>

				<Row>
					<Col md='4'>
						<Form.Item
							label='Job Posting Start'
							name='startDate'
							rules={[{ required: true, message: 'Select start date!' }]}
						>
							<DatePicker
								allowClear={true}
								format='MM-DD-YYYY'
								placeholder='Select start date'
								style={{ width: '100%' }}
								showToday={false}
								onChange={() => this.formRef.current.resetFields(['endDate'])}
							/>
						</Form.Item>
					</Col>
					<Col md='4'>
						<Form.Item
							label='Job Posting End'
							name='endDate'
							rules={[{ required: true, message: 'Select end date!' }]}
						>
							<DatePicker
								allowClear={true}
								format='MM-DD-YYYY'
								placeholder='Select end date'
								style={{ width: '100%' }}
								showToday={false}
								disabledDate={(current) => {
									const startDate = this.formRef.current.getFieldValue('startDate')
									return (
										current && startDate && startDate.endOf('day').valueOf() >= current.valueOf()
									)
								}}
							/>
						</Form.Item>
					</Col>
				</Row>

				<Row style={{ marginTop: 20 }} justifyContent='center' lgJustifyContent='between'>
					<Col auto>
						<Btn
							icon={<ScheduleOutlined />}
							htmlType='button'
							disabled={this.state.formProcessing}
							onClick={() => {}}
							style={{ marginTop: 5 }}
						>
							Save as Template
						</Btn>
					</Col>
					<Col auto>
						<Btn
							icon={<SaveOutlined />}
							htmlType='button'
							disabled={this.state.formProcessing}
							onClick={this.startProcessing}
							style={{ marginTop: 5 }}
						>
							Submit
						</Btn>
					</Col>
				</Row>
			</Form>
		)
	}
}

export default CreateJob
