import React, { Component } from 'react'
import { Form, Select, Button, DatePicker, Input } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'

import { randomString } from '../../../../utils/helpers'

const { Option } = Select

export const ICDCodes = [
	{ key: 1, name: 'M84.459A', value: 'M84.459A' },
	{ key: 2, name: 'M85.460B', value: 'M85.460B' },
	{ key: 3, name: 'M96.470C', value: 'M96.470C' },
]
export const exacerbationTypes = [
	{ key: 1, name: 'O', value: 'O' },
	{ key: 2, name: 'E', value: 'E' },
]
export const ratingItems = [
	{ key: 1, name: '1', value: '1' },
	{ key: 2, name: '2', value: '2' },
	{ key: 3, name: '3', value: '3' },
	{ key: 4, name: '4', value: '4' },
	{ key: 5, name: '5', value: '5' },
	{ key: 6, name: '6', value: '6' },
	{ key: 7, name: '7', value: '7' },
	{ key: 8, name: '8', value: '8' },
	{ key: 9, name: '9', value: '9' },
	{ key: 10, name: '10', value: '10' },
]

export class AddDiagnosis extends Component {
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
					label='ICD Code'
					name='code'
					rules={[{ whitespace: true, required: true, message: 'Select ICD code!' }]}
				>
					<Select
						allowClear
						placeholder='Select ICD code'
						showSearch
						suffixIcon={<SearchOutlined />}
					>
						{ICDCodes.map((type) => {
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
					label='Onset/Exacerbation'
					name='type'
					rules={[{ whitespace: true, required: true, message: 'Select type!' }]}
				>
					<Select allowClear placeholder='Select type'>
						{exacerbationTypes.map((item) => {
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
					label='O/E Date'
					name='date'
					rules={[{ required: true, message: 'Select date!' }]}
				>
					<DatePicker
						allowClear={true}
						format='MM-DD-YYYY'
						placeholder='Select date'
						style={{ width: '100%' }}
					/>
				</Form.Item>

				<Form.Item
					label='Symptom Control Rating'
					name='rating'
					rules={[{ whitespace: true, required: true, message: 'Select rating!' }]}
				>
					<Select allowClear placeholder='Select rating'>
						{ratingItems.map((item) => {
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
					label='Comorbidity'
					name='comorbidity'
					validateFirst
					rules={[
						{ whitespace: true, required: true, message: 'Provide comorbidity!' },
						{ min: 2, message: 'Too short!' },
						{ max: 150, message: 'Too long!' },
					]}
				>
					<Input allowClear={true} placeholder='Comorbidity' />
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

export default AddDiagnosis
