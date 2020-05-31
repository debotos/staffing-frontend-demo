import React, { Component } from 'react'
import { Form, Select, Input, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { randomString } from '../../../../../utils/helpers'

export const qualificationTypes = [
	{ key: 1, name: 'Graduation', value: 'Graduation' },
	{ key: 2, name: 'Diploma', value: 'Diploma' },
	{ key: 3, name: 'Degree', value: 'Degree' },
]
const { Option } = Select

export class AddJobQualification extends Component {
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
					label='Education'
					name='education'
					rules={[{ whitespace: true, required: true, message: 'Select education!' }]}
				>
					<Select allowClear={true} placeholder='Select education'>
						{qualificationTypes.map((item) => {
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
					label='Course'
					name='course'
					validateFirst
					rules={[
						{ whitespace: true, required: true, message: 'Provide course!' },
						{ min: 2, message: 'Too short!' },
						{ max: 50, message: 'Too long!' },
					]}
				>
					<Input allowClear={true} placeholder='Course' />
				</Form.Item>

				<Form.Item
					label='Specialization'
					name='specialization'
					validateFirst
					rules={[
						{ whitespace: true, required: true, message: 'Provide specialization!' },
						{ min: 2, message: 'Too short!' },
						{ max: 50, message: 'Too long!' },
					]}
				>
					<Input allowClear={true} placeholder='Specialization' />
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

export default AddJobQualification
