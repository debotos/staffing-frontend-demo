import React, { Component } from 'react'
import { Form, Select, Button, Input } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'

import { randomString, phoneValidationRegex, faxValidationRegex } from '../../../../utils/helpers'

const { Option } = Select

export const physicianNames = [
	{ key: 1, name: 'Eliud', value: 'Eliud' },
	{ key: 2, name: 'Deepak', value: 'Deepak' },
	{ key: 3, name: 'Debotos', value: 'Debotos' },
]
export const physicianTypes = [
	{ key: 1, name: 'Primary', value: 'Primary' },
	{ key: 2, name: 'Attending', value: 'Attending' },
]

export class AddPhysician extends Component {
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
					label='Physician'
					name='physician'
					rules={[{ whitespace: true, required: true, message: 'Select physician!' }]}
				>
					<Select
						allowClear={true}
						placeholder='Select physician'
						showSearch
						suffixIcon={<SearchOutlined />}
					>
						{physicianNames.map((item) => {
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
					label='Type'
					name='type'
					rules={[{ whitespace: true, required: true, message: 'Select type!' }]}
				>
					<Select allowClear placeholder='Select type'>
						{physicianTypes.map((item) => {
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
					label='Speciality'
					name='speciality'
					validateFirst
					rules={[
						{ whitespace: true, required: true, message: 'Provide speciality!' },
						{ min: 2, message: 'Too short!' },
						{ max: 150, message: 'Too long!' },
					]}
				>
					<Input allowClear={true} placeholder='Speciality' />
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

				<div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
					<Button icon={<PlusOutlined />} type='primary' htmlType='submit'>
						Add
					</Button>
				</div>
			</Form>
		)
	}
}

export default AddPhysician
