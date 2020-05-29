import React, { Component } from 'react'
import { Form, Button, Select, InputNumber } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import { unitTypes, billingCodes, durations } from './AuthorizationDetailsAdd'

export class AuthorizationDetailsEdit extends Component {
	onFinish = (values) => {
		console.log('Success:', values)
		const { data } = this.props
		this.props.onEditSuccess({ ...data, ...values })
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
					<Button icon={<SaveOutlined />} type='primary' htmlType='submit'>
						Update
					</Button>
				</div>
			</Form>
		)
	}
}

export default AuthorizationDetailsEdit
