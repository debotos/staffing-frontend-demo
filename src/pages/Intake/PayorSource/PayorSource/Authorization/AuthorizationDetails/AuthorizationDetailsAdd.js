import React, { Component } from 'react'
import { Form, Button, Select, InputNumber } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { randomString } from '../../../../../../utils/helpers'

export const unitTypes = [
	{ key: 1, type: 'Visits', value: 'Visits' },
	{ key: 2, type: 'Hourly', value: 'Hourly' },
]
export const billingCodes = [
	{ key: 1, code: 'CE', value: 'CE' },
	{ key: 2, code: 'FD', value: 'FD' },
	{ key: 3, code: 'YD', value: 'YD' },
	{ key: 4, code: 'GH', value: 'GH' },
	{ key: 5, code: 'RD', value: 'RD' },
]
export const durations = [
	{ key: 1, name: 'Period', value: 'Period' },
	{ key: 2, name: 'Day', value: 'Day' },
	{ key: 3, name: 'Week', value: 'Week' },
	{ key: 4, name: 'Year', value: 'Year' },
]

export class AuthorizationDetailsAdd extends Component {
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
					label='Unit Type'
					name='unitType'
					rules={[{ whitespace: true, required: true, message: 'Select unit type!' }]}
				>
					<Select allowClear placeholder='Select unit type'>
						{unitTypes.map((item) => {
							const { key, type, value } = item
							return (
								<Select.Option key={key} value={value}>
									{type}
								</Select.Option>
							)
						})}
					</Select>
				</Form.Item>

				<Form.Item
					label='Billing Code'
					name='billingCode'
					rules={[{ whitespace: true, required: true, message: 'Select billing code!' }]}
				>
					<Select allowClear placeholder='Select billing code'>
						{billingCodes.map((item) => {
							const { key, code, value } = item
							return (
								<Select.Option key={key} value={value}>
									{code}
								</Select.Option>
							)
						})}
					</Select>
				</Form.Item>

				<Form.Item
					label='Quantity'
					name='quantity'
					validateFirst
					rules={[{ required: true, message: 'Provide quantity!' }]}
				>
					<InputNumber
						style={{ width: '100%' }}
						min={0}
						type='number'
						parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
					/>
				</Form.Item>

				<Form.Item
					label='Duration'
					name='duration'
					rules={[{ whitespace: true, required: true, message: 'Select duration!' }]}
				>
					<Select allowClear placeholder='Select duration'>
						{durations.map((item) => {
							const { key, name, value } = item
							return (
								<Select.Option key={key} value={value}>
									{name}
								</Select.Option>
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

export default AuthorizationDetailsAdd
