import React, { Component } from 'react'
import { Form, Select, Input, Button } from 'antd'
import { SaveOutlined } from '@ant-design/icons'

import { qualificationTypes } from './AddJobQualification'

const { Option } = Select

export class EditJobQualification extends Component {
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
					<Button icon={<SaveOutlined />} type='primary' htmlType='submit'>
						Update
					</Button>
				</div>
			</Form>
		)
	}
}

export default EditJobQualification
