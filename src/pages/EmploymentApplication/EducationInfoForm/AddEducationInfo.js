import React, { Component } from 'react'
import { Form, Select, Input, Button, DatePicker } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { states } from '../../../utils/generateInputData'
import { randomString } from '../../../utils/helpers'

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
					label='Institution Type'
					name='type'
					rules={[
						{ whitespace: true, required: true, message: 'Provide institution type!' },
						{ min: 2, message: 'Too short!' },
						{ max: 50, message: 'Too long!' },
					]}
				>
					<Input allowClear={true} placeholder='Institution type' />
				</Form.Item>

				<Form.Item
					label='Institution Name'
					name='name'
					rules={[
						{ whitespace: true, required: true, message: 'Provide institution name!' },
						{ min: 2, message: 'Too short!' },
						{ max: 200, message: 'Too long!' },
					]}
				>
					<Input allowClear={true} placeholder='Institution name' />
				</Form.Item>

				<Form.Item
					label='Enter Your City'
					name='city'
					rules={[
						{ whitespace: true, required: true, message: 'Provide your city!' },
						{ min: 2, message: 'Too short!' },
						{ max: 100, message: 'Too long!' },
					]}
				>
					<Input allowClear={true} placeholder='Enter your city' />
				</Form.Item>

				<Form.Item
					label='Select State'
					name='state'
					rules={[{ whitespace: true, required: true, message: 'Select state!' }]}
				>
					<Select allowClear={true} placeholder='Select state'>
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
					label='Start Date'
					name='startDate'
					rules={[{ required: true, message: 'Select start date!' }]}
				>
					<DatePicker
						allowClear={true}
						format='MM-DD-YYYY'
						placeholder='Select start date'
						style={{ width: '100%' }}
						showToday={false}
						onChange={() => this.formRef.current.resetFields(['endDate'])}
					/>
				</Form.Item>

				<Form.Item
					label='Graduation/Projected Graduation Date'
					name='endDate'
					rules={[{ required: true, message: 'Select date!' }]}
				>
					<DatePicker
						allowClear={true}
						format='MM-DD-YYYY'
						placeholder='Select date'
						style={{ width: '100%' }}
						showToday={false}
						disabledDate={(current) => {
							const startDate = this.formRef.current.getFieldValue('startDate')
							return current && startDate && startDate.endOf('day').valueOf() >= current.valueOf()
						}}
					/>
				</Form.Item>

				<Form.Item
					label='Degree Awarded'
					name='degreeAwarded'
					rules={[
						{ whitespace: true, required: true, message: 'Provide degree!' },
						{ min: 2, message: 'Too short!' },
						{ max: 150, message: 'Too long!' },
					]}
				>
					<Input allowClear={true} placeholder='Enter degree' />
				</Form.Item>

				<Form.Item
					label='Major Field'
					name='majorField'
					rules={[
						{ whitespace: true, required: true, message: 'Provide major field!' },
						{ min: 2, message: 'Too short!' },
						{ max: 150, message: 'Too long!' },
					]}
				>
					<Input allowClear={true} placeholder='Enter major field' />
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
