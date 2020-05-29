import React, { Component } from 'react'
import { Form, Select, Input, Button, DatePicker, Divider, InputNumber, Radio } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Row, Col } from 'styled-bootstrap-grid'

import { states, phoneTypes, salaryTypes } from '../PersonalInfoForm'
import { randomString, phoneValidationRegex, zipCodeValidationRegex } from '../../../utils/helpers'

const { Option } = Select
export const MAY_WE_CONTACT = 'mayWeContact'
export const LeavingReasons = [
	{ key: 1, name: 'Salary Issue', value: 'Salary Issue' },
	{ key: 2, name: 'Timing', value: 'Timing' },
	{ key: 3, name: 'Holidays', value: 'Holidays' },
	{ key: 4, name: 'Office Distance', value: 'Office Distance' },
	{ key: 5, name: 'Personal Problem', value: 'Personal Problem' },
]
const formInitialValues = { [MAY_WE_CONTACT]: true }

export class AddEmploymentInfo extends Component {
	onFinish = (values) => {
		console.log('Success:', values)
		this.props.onAddSuccess({ key: randomString(10), ...values })
		this.formRef.current.resetFields()
	}

	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	constructor(props) {
		super(props)
		this.formRef = React.createRef()
		this.state = { ...formInitialValues }
	}

	render() {
		return (
			<Form
				onFinish={this.onFinish}
				onFinishFailed={this.onFinishFailed}
				layout='vertical'
				ref={this.formRef}
				labelAlign='left'
				initialValues={formInitialValues}
			>
				<Row>
					<Col md='12'>
						<Form.Item
							label='Employer'
							name='employer'
							rules={[
								{ whitespace: true, required: true, message: 'Provide employer!' },
								{ min: 2, message: 'Too short!' },
								{ max: 200, message: 'Too long!' },
							]}
						>
							<Input allowClear={true} placeholder='Employer' />
						</Form.Item>
					</Col>
				</Row>
				<Divider style={{ margin: 0 }}>Address</Divider>
				<Row>
					<Col md='4'>
						<Form.Item
							label='Street'
							name='street'
							rules={[
								{ whitespace: true, required: true, message: 'Provide street!' },
								{ min: 2, message: 'Too short!' },
								{ max: 200, message: 'Too long!' },
							]}
						>
							<Input allowClear={true} placeholder='Street' />
						</Form.Item>
					</Col>
					<Col md='2'>
						<Form.Item
							label='City'
							name='city'
							rules={[
								{ whitespace: true, required: true, message: 'Provide city!' },
								{ min: 2, message: 'Too short!' },
								{ max: 100, message: 'Too long!' },
							]}
						>
							<Input allowClear={true} placeholder='City' />
						</Form.Item>
					</Col>
					<Col md='2'>
						<Form.Item
							label='Select State'
							name='state'
							rules={[{ whitespace: true, required: true, message: 'Select state!' }]}
						>
							<Select allowClear={true} placeholder='Select state'>
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
				<Divider style={{ margin: 0 }}>Phone</Divider>
				<Row>
					<Col md='6'>
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
					<Col md='6'>
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
				</Row>
				<Divider style={{ margin: 0 }}>Employment Dates</Divider>
				<Row>
					<Col md='6'>
						<Form.Item
							label='From'
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
					<Col md='6'>
						<Form.Item
							label='To'
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
				<Row>
					<Col md='4'>
						<Form.Item
							label='Position Held'
							name='positionHeld'
							rules={[
								{ whitespace: true, required: true, message: 'Provide position!' },
								{ min: 2, message: 'Too short!' },
								{ max: 150, message: 'Too long!' },
							]}
						>
							<Input allowClear={true} placeholder='Position held' />
						</Form.Item>
					</Col>
					<Col md='2'>
						<Form.Item
							label='Starting Pay Rate'
							name='startPayRate'
							rules={[{ required: true, message: 'Provide pay rate!' }]}
						>
							<InputNumber
								style={{ width: '100%' }}
								min={1}
								step={100}
								placeholder='Pay rate'
								formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
							/>
						</Form.Item>
					</Col>
					<Col md='2'>
						<Form.Item
							label='Starting Pay Type'
							name='startPayType'
							rules={[{ whitespace: true, required: true, message: 'Select pay type!' }]}
						>
							<Select allowClear={true} placeholder='Select pay type'>
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
					<Col md='2'>
						<Form.Item
							label='Ending Pay Rate'
							name='endPayRate'
							rules={[{ required: true, message: 'Provide pay rate!' }]}
						>
							<InputNumber
								style={{ width: '100%' }}
								min={1}
								step={100}
								placeholder='Pay rate'
								formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
							/>
						</Form.Item>
					</Col>
					<Col md='2'>
						<Form.Item
							label='Ending Pay Type'
							name='endPayType'
							rules={[{ whitespace: true, required: true, message: 'Select pay type!' }]}
						>
							<Select allowClear={true} placeholder='Select pay type'>
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
				</Row>
				<Row>
					<Col md='12'>
						<Form.Item
							label='Describe Job Duties'
							name='jobDuties'
							validateFirst={true}
							rules={[
								{ required: true, message: 'Please describe job duties!' },
								{ whitespace: true, message: 'Invalid input!' },
								{ min: 10, message: 'Too short!' },
								{ max: 250, message: 'Too long!' },
							]}
						>
							<Input.TextArea rows={2} placeholder='Describe job duties...' />
						</Form.Item>
					</Col>
				</Row>
				<Divider style={{ margin: 0 }}>Supervisor</Divider>
				<Row>
					<Col md='4'>
						<Form.Item
							label='First'
							name='supervisorFirstName'
							rules={[
								{ whitespace: true, required: true, message: 'Provide first name!' },
								{ min: 2, message: 'Too short!' },
								{ max: 30, message: 'Too long!' },
							]}
						>
							<Input allowClear={true} placeholder='First name' />
						</Form.Item>
					</Col>
					<Col md='4'>
						<Form.Item
							label='Last'
							name='supervisorLastName'
							rules={[
								{ whitespace: true, required: true, message: 'Provide last name!' },
								{ min: 2, message: 'Too short!' },
								{ max: 30, message: 'Too long!' },
							]}
						>
							<Input allowClear={true} placeholder='Last name' />
						</Form.Item>
					</Col>
					<Col md='4'>
						<Form.Item
							label='Phone Number'
							name='supervisorPhoneNumber'
							rules={[
								{ whitespace: true, required: true, message: 'Provide phone number!' },
								{ pattern: phoneValidationRegex, message: 'Phone number is invalid!' },
							]}
						>
							<Input allowClear={true} placeholder='Phone number' />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col md='3'>
						<Form.Item
							label='Reason for Leaving'
							name='reasonForLeaving'
							rules={[{ whitespace: true, required: true, message: 'Select reason!' }]}
						>
							<Select allowClear={true} placeholder='Select reason'>
								{LeavingReasons.map((type) => {
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
					<Col md='3'>
						<Form.Item label='May we contact?' name={MAY_WE_CONTACT}>
							<Radio.Group onChange={(e) => this.setState({ [MAY_WE_CONTACT]: e.target.value })}>
								<Radio value={true}>Yes</Radio>
								<Radio value={false}>No</Radio>
							</Radio.Group>
						</Form.Item>
					</Col>
				</Row>

				<div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
					<Button icon={<PlusOutlined />} type='primary' htmlType='submit'>
						Add
					</Button>
				</div>
			</Form>
		)
	}
}

export default AddEmploymentInfo
