import React, { Component } from 'react'
import { Form, Select, Button, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { randomString, phoneValidationRegex, faxValidationRegex } from '../../../../utils/helpers'

const { Option } = Select

export const advanceDirectiveTypes = [
	{ key: 1, name: 'Primary', value: 'Primary' },
	{ key: 2, name: 'Secondary', value: 'Secondary' },
]

export class AddAdvanceDirective extends Component {
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
					label='Type'
					name='type'
					rules={[{ whitespace: true, required: true, message: 'Select type!' }]}
				>
					<Select allowClear placeholder='Select type'>
						{advanceDirectiveTypes.map((item) => {
							const { key, name, value } = item
							return (
								<Option key={key} value={value}>
									{name}
								</Option>
							)
						})}
					</Select>
				</Form.Item>

				<Form.Item
					label='Contact Name'
					name='name'
					validateFirst
					rules={[
						{ whitespace: true, required: true, message: 'Provide contact name!' },
						{ min: 2, message: 'Too short!' },
						{ max: 100, message: 'Too long!' },
					]}
				>
					<Input allowClear={true} placeholder='Contact name' />
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

				<Form.Item
					label='Fax Number'
					name='faxNumber'
					rules={[
						{ whitespace: true, required: true, message: 'Provide fax number!' },
						{ pattern: faxValidationRegex, message: 'Fax number is invalid!' },
					]}
				>
					<Input allowClear={true} placeholder='Fax number' />
				</Form.Item>

				<Form.Item
					label='Description'
					name='description'
					validateFirst={true}
					rules={[
						{ required: true, message: 'Please provide description!' },
						{ whitespace: true, message: 'Invalid input!' },
						{ min: 5, message: 'Too short!' },
					]}
				>
					<Input.TextArea rows={2} placeholder='Description...' />
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

export default AddAdvanceDirective
