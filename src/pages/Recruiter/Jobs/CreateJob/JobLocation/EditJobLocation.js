import React, { Component } from 'react'
import { Form, Select, Input, Button } from 'antd'
import { SaveOutlined } from '@ant-design/icons'

import { states } from '../../../../../utils/generateInputData'

const { Option } = Select

export class EditJobLocation extends Component {
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
					label='City'
					name='city'
					validateFirst
					rules={[
						{ whitespace: true, required: true, message: 'Provide city!' },
						{ min: 2, message: 'Too short!' },
						{ max: 30, message: 'Too long!' },
					]}
				>
					<Input allowClear={true} placeholder='City' />
				</Form.Item>

				<Form.Item
					label='County'
					name='county'
					validateFirst
					rules={[
						{ whitespace: true, required: true, message: 'Provide county!' },
						{ min: 2, message: 'Too short!' },
						{ max: 30, message: 'Too long!' },
					]}
				>
					<Input allowClear={true} placeholder='County' />
				</Form.Item>

				<Form.Item
					label='State'
					name='state'
					rules={[{ whitespace: true, required: true, message: 'Select state!' }]}
				>
					<Select allowClear={true} placeholder='Select state'>
						{states.map((item) => {
							const { key, name, value } = item
							return (
								<Option key={key} value={value}>
									{name}
								</Option>
							)
						})}
					</Select>
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

export default EditJobLocation
