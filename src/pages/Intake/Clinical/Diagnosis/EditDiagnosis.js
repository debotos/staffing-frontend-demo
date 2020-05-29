import React, { Component } from 'react'
import { Form, Select, Button, DatePicker, Input } from 'antd'
import { SaveOutlined, SearchOutlined } from '@ant-design/icons'

import { ICDCodes, exacerbationTypes, ratingItems } from './AddDiagnosis'

const { Option } = Select

export class EditDiagnosis extends Component {
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
					<Button icon={<SaveOutlined />} type='primary' htmlType='submit'>
						Update
					</Button>
				</div>
			</Form>
		)
	}
}

export default EditDiagnosis
