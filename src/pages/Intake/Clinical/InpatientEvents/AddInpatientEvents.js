import React, { Component } from 'react'
import { Form, Select, Button, DatePicker, Input } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'

import { randomString } from '../../../../utils/helpers'

const { Option } = Select

export const inpatientTypes = [
	{ key: 1, name: 'Hospital', value: 'Hospital' },
	{ key: 2, name: 'Nursing Home', value: 'Nursing Home' },
	{ key: 3, name: 'Rehab Centers', value: 'Rehab Centers' },
]
export const inpatientFacilities = [
	{ key: 1, name: 'Free Food', value: 'Free Food' },
	{ key: 2, name: '24x7 Care', value: '24x7 Care' },
	{ key: 3, name: 'Good Environment', value: 'Good Environment' },
]

export class AddInpatientEvents extends Component {
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
					label='Inpatient Type'
					name='inpatientType'
					rules={[{ whitespace: true, required: true, message: 'Select inpatient type!' }]}
				>
					<Select allowClear={true} placeholder='Select inpatient type'>
						{inpatientTypes.map((type) => {
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
					label='Inpatient Facility'
					name='inpatientFacility'
					rules={[{ whitespace: true, required: true, message: 'Select inpatient facility!' }]}
				>
					<Select
						allowClear
						placeholder='Select inpatient facility'
						showSearch
						suffixIcon={<SearchOutlined />}
					>
						{inpatientFacilities.map((person) => {
							const { key, name, value } = person
							return (
								<Option key={key} value={value}>
									{name}
								</Option>
							)
						})}
					</Select>
				</Form.Item>

				<Form.Item
					label='Admit Date'
					name='admitDate'
					rules={[{ required: true, message: 'Select admit date!' }]}
				>
					<DatePicker
						allowClear={true}
						format='MM-DD-YYYY'
						placeholder='Select admit date'
						style={{ width: '100%' }}
						showToday={false}
						onChange={() => this.formRef.current.resetFields(['dischargeDate', 'surgeryDate'])}
					/>
				</Form.Item>

				<Form.Item
					label='Discharge Date'
					name='dischargeDate'
					rules={[{ required: true, message: 'Select discharge date!' }]}
				>
					<DatePicker
						allowClear={true}
						format='MM-DD-YYYY'
						placeholder='Select discharge date'
						style={{ width: '100%' }}
						showToday={false}
						onChange={() => this.formRef.current.resetFields(['surgeryDate'])}
						disabledDate={(current) => {
							const admitDate = this.formRef.current.getFieldValue('admitDate')
							return current && admitDate && admitDate.endOf('day').valueOf() >= current.valueOf()
						}}
					/>
				</Form.Item>

				<Form.Item
					label='Surgery Date'
					name='surgeryDate'
					rules={[{ required: true, message: 'Select surgery date!' }]}
				>
					<DatePicker
						allowClear={true}
						format='MM-DD-YYYY'
						placeholder='Select surgery date'
						style={{ width: '100%' }}
						showToday={false}
						disabledDate={(current) => {
							const admitDate = this.formRef.current.getFieldValue('admitDate')
							const dischargeDate = this.formRef.current.getFieldValue('dischargeDate')
							return (
								current &&
								admitDate &&
								dischargeDate &&
								(admitDate.endOf('day').valueOf() >= current.valueOf() ||
									dischargeDate.endOf('day').valueOf() <= current.valueOf())
							)
						}}
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

export default AddInpatientEvents
