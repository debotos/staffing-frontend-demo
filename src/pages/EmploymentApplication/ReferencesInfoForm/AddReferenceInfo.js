import React, { Component } from 'react'
import { Form, Select, Input, Button, Divider } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Row, Col } from 'styled-bootstrap-grid'

import { states, phoneTypes } from '../PersonalInfoForm'
import { randomString, phoneValidationRegex, zipCodeValidationRegex } from '../../../utils/helpers'

const { Option } = Select
export const yearsKnown = [
	{ key: 1, title: '1', value: '1' },
	{ key: 2, title: '2', value: '2' },
	{ key: 3, title: '3', value: '3' },
	{ key: 4, title: '4', value: '4' },
	{ key: 5, title: '5', value: '5' },
	{ key: 6, title: '6', value: '6' },
	{ key: 7, title: '7', value: '7' },
	{ key: 8, title: '8', value: '8' },
	{ key: 9, title: '9', value: '9' },
	{ key: 10, title: '10+', value: '10+' },
]

export class AddReferenceInfo extends Component {
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
	}

	render() {
		return (
			<Form
				onFinish={this.onFinish}
				onFinishFailed={this.onFinishFailed}
				layout='vertical'
				ref={this.formRef}
				labelAlign='left'
			>
				{/* Name Fields */}
				<Divider style={{ margin: '0 0 5px 0' }}>Name</Divider>
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
					<Col md='2'>
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
					<Col md='3'>
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
							label='Occupation'
							name='occupation'
							rules={[
								{ whitespace: true, required: true, message: 'Provide occupation!' },
								{ min: 2, message: 'Too short!' },
								{ max: 100, message: 'Too long!' },
							]}
						>
							<Input allowClear={true} placeholder='Occupation' />
						</Form.Item>
					</Col>
					<Col md='3'>
						<Form.Item
							label='How long have you known?'
							name='knownYear'
							rules={[{ whitespace: true, required: true, message: 'Select how long!' }]}
						>
							<Select allowClear={true} placeholder='Select how long'>
								{yearsKnown.map((type) => {
									const { key, title, value } = type
									return (
										<Option key={key} value={value}>
											{title}
										</Option>
									)
								})}
							</Select>
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

export default AddReferenceInfo
