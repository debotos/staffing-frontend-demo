import React, { Component } from 'react'
import { Form, Select, Button, DatePicker, Input } from 'antd'
import { SaveOutlined } from '@ant-design/icons'

import { serviceTypes, disciplines, schedulingAcuityList } from './AddRequest'

const { Option } = Select

export class EditRequest extends Component {
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
					<Button icon={<SaveOutlined />} type='primary' htmlType='submit'>
						Update
					</Button>
				</div>
			</Form>
		)
	}
}

export default EditRequest
