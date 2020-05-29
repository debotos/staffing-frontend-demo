import React, { Component } from 'react'
import { Form, Select, Input, Button } from 'antd'
import { SaveOutlined } from '@ant-design/icons'

import { phoneValidationRegex } from '../../../../utils/helpers'
import { phoneTypes, relationshipTypes } from '../index'

const { Option } = Select

export class EmergencyContactEdit extends Component {
	onFinish = (values) => {
		console.log('Success:', values)
		const { data } = this.props
		this.props.onEditSuccess({ key: data.key, ...values })
	}

	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	constructor(props) {
		super(props)
		this.formRef = React.createRef()
	}
	render() {
		const { data } = this.props
		return (
			<Form
				onFinish={this.onFinish}
				onFinishFailed={this.onFinishFailed}
				layout='vertical'
				ref={this.formRef}
				initialValues={data}
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
					<Button icon={<SaveOutlined />} type='primary' htmlType='submit'>
						Update
					</Button>
				</div>
			</Form>
		)
	}
}

export default EmergencyContactEdit
