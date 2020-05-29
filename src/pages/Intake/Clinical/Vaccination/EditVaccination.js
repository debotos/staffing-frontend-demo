import React, { Component } from 'react'
import { Form, Select, Button, DatePicker, Input } from 'antd'
import { SaveOutlined, SearchOutlined } from '@ant-design/icons'

import { vaccines, administrators } from './AddVaccination'

const { Option } = Select

export class EditVaccination extends Component {
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
					<Button icon={<SaveOutlined />} type='primary' htmlType='submit'>
						Update
					</Button>
				</div>
			</Form>
		)
	}
}

export default EditVaccination
