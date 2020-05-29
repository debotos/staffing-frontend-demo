import React, { Component } from 'react'
import { Form, Select, Input, Button, Divider } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Row, Col } from 'styled-bootstrap-grid'

import { phoneValidationRegex, zipCodeValidationRegex } from '../../../../utils/helpers'
import { phoneTypes, relationshipTypes, states, genderTypes } from '../index'
import { randomString } from '../../../../utils/helpers'

const { Option } = Select

export class ContactAdd extends Component {
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
				<Divider style={{ margin: '0 0 5px 0' }}>Name</Divider>
				<Row>
					<Col md='3'>
						<Form.Item
							label='Relationship Type'
							name='relationshipType'
							rules={[{ whitespace: true, required: true, message: 'Select relationship type!' }]}
						>
							<Select allowClear={true} placeholder='Select relationship type'>
								{relationshipTypes.map((type) => {
									const { key, person, value } = type
									return (
										<Option key={key} value={value}>
											{person}
										</Option>
									)
								})}
							</Select>
						</Form.Item>
					</Col>

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

					<Col md='2'>
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

					<Col md='2'>
						<Form.Item
							label='Middle Initial'
							name='middleInitial'
							validateFirst={true}
							rules={[
								{ whitespace: true, required: false, message: 'Provide middle initial!' },
								{ max: 1, message: 'Max one character!' },
							]}
						>
							<Input allowClear={true} placeholder='Middle initial' />
						</Form.Item>
					</Col>

					<Col md='2'>
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

					<Col md='3'>
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

					<Col md='3'>
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
				</Row>

				<Divider style={{ margin: '15px 0 5px 0' }}>Phone</Divider>
				<Row>
					<Col md='3'>
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

export default ContactAdd
