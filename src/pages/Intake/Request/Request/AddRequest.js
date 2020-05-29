import React, { Component } from 'react'
import { Form, Select, Button, DatePicker, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { randomString } from '../../../../utils/helpers'

const { Option } = Select

export const serviceTypes = [
	{ key: 1, name: 'SOC', value: 'SOC' },
	{ key: 2, name: 'Evaluation', value: 'Evaluation' },
]
export const disciplines = [
	{ key: 1, name: 'RN', value: 'RN' },
	{ key: 2, name: 'PT', value: 'PT' },
	{ key: 3, name: 'ST', value: 'ST' },
	{ key: 4, name: 'OT', value: 'OT' },
]
export const schedulingAcuityList = [
	{ key: 1, name: '1', value: '1' },
	{ key: 2, name: '2', value: '2' },
	{ key: 3, name: '3', value: '3' },
	{ key: 4, name: '4', value: '4' },
]

export class AddRequest extends Component {
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
					label='Service Type'
					name='serviceType'
					rules={[{ whitespace: true, required: true, message: 'Select service type!' }]}
				>
					<Select allowClear placeholder='Select service type'>
						{serviceTypes.map((item) => {
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
					label='Discipline'
					name='discipline'
					rules={[{ whitespace: true, required: true, message: 'Select discipline!' }]}
				>
					<Select allowClear placeholder='Discipline'>
						{disciplines.map((item) => {
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
					label='Request Date'
					name='requestDate'
					rules={[{ required: true, message: 'Select request date!' }]}
				>
					<DatePicker
						allowClear={true}
						format='MM-DD-YYYY'
						placeholder='Select request date'
						style={{ width: '100%' }}
					/>
				</Form.Item>

				<Form.Item
					label='Scheduling Acuity'
					name='schedulingAcuity'
					rules={[{ whitespace: true, required: true, message: 'Select scheduling acuity!' }]}
				>
					<Select allowClear placeholder='Scheduling Acuity'>
						{schedulingAcuityList.map((item) => {
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

export default AddRequest
