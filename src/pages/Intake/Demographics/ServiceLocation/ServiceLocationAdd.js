import React, { Component } from 'react'
import { Form, Select, Input, Button, Divider } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { phoneTypes, states, languages } from '../index'
import {
	phoneValidationRegex,
	randomString,
	zipCodeValidationRegex,
} from '../../../../utils/helpers'

const { Option } = Select

export class ServiceLocationAdd extends Component {
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
				{/* Address Fields */}
				<Divider style={{ margin: '0 0 5px 0' }}>Address</Divider>

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

				<Divider style={{ margin: '15px 0 5px 0' }} />

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

				<Form.Item
					label='Language'
					name='language'
					rules={[{ whitespace: true, required: true, message: 'Select language!' }]}
				>
					<Select allowClear={true} placeholder='Select language'>
						{languages.map((type) => {
							const { key, name, value } = type
							return (
								<Option key={key} value={value}>
									{name}
								</Option>
							)
						})}
					</Select>
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

export default ServiceLocationAdd
