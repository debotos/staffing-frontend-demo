import React, { Component } from 'react'
import { Form, Select, Button, DatePicker, Input } from 'antd'
import { SaveOutlined, SearchOutlined } from '@ant-design/icons'

import { inpatientTypes, inpatientFacilities } from './AddInpatientEvents'

const { Option } = Select

export class EditInpatientEvents extends Component {
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
					<Button icon={<SaveOutlined />} type='primary' htmlType='submit'>
						Update
					</Button>
				</div>
			</Form>
		)
	}
}

export default EditInpatientEvents
