import React, { Component } from 'react'
import { Form, Select, Input, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { phoneValidationRegex } from '../../../../utils/helpers'
import { phoneTypes, relationshipTypes } from '../index'
import { randomString } from '../../../../utils/helpers'

const { Option } = Select

export class EmergencyContactAdd extends Component {
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

				<div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
					<Button icon={<PlusOutlined />} type='primary' htmlType='submit'>
						Add
					</Button>
				</div>
			</Form>
		)
	}
}

export default EmergencyContactAdd
