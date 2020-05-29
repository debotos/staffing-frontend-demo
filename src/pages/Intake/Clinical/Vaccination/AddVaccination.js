import React, { Component } from 'react'
import { Form, Select, Button, DatePicker, Input } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'

import { randomString } from '../../../../utils/helpers'

const { Option } = Select

export const vaccines = [
	{ key: 1, name: 'Asprin', value: 'Asprin' },
	{ key: 2, name: 'Corona', value: 'Corona' },
]
export const administrators = [
	{ key: 1, name: 'Hospital', value: 'Hospital' },
	{ key: 2, name: 'Clinic', value: 'Clinic' },
]

export class AddVaccination extends Component {
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
					label='Vaccine Name'
					name='name'
					rules={[{ whitespace: true, required: true, message: 'Select vaccine name!' }]}
				>
					<Select
						allowClear
						placeholder='Select vaccine name'
						showSearch
						suffixIcon={<SearchOutlined />}
					>
						{vaccines.map((item) => {
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
					label='Administered By'
					name='administeredBy'
					rules={[{ whitespace: true, required: true, message: 'Select who administered!' }]}
				>
					<Select allowClear placeholder='Administered by'>
						{administrators.map((item) => {
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
					label='Date Administered'
					name='date'
					rules={[{ required: true, message: 'Select date administered!' }]}
				>
					<DatePicker
						allowClear={true}
						format='MM-DD-YYYY'
						placeholder='Select date administered'
						style={{ width: '100%' }}
					/>
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

export default AddVaccination
