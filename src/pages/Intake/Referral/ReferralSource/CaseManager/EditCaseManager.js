import React, { Component } from 'react'
import { Form, Select, Button, Input } from 'antd'
import { SaveOutlined, SearchOutlined } from '@ant-design/icons'

import { sourceNames } from '../AddReferralSource'
import { faxValidationRegex, phoneValidationRegex } from '../../../../../utils/helpers'

const { Option } = Select

export class EditCaseManager extends Component {
	onFinish = (values) => {
		console.log('Success:', values)
		const { data } = this.props
		this.props.onEditSuccess({ ...data, ...values })
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
					label='Case Manager Name'
					name='caseManagerName'
					rules={[{ whitespace: true, required: true, message: 'Case manager name!' }]}
				>
					<Select
						allowClear
						placeholder='Case manager name'
						showSearch
						suffixIcon={<SearchOutlined />}
					>
						{sourceNames.map((person) => {
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

				<Form.Item
					label='Email Address'
					name='email'
					rules={[
						{ whitespace: true, required: true, message: 'Provide email address!' },
						{ type: 'email', message: 'Invalid email address!' },
					]}
				>
					<Input allowClear={true} placeholder='Email address' />
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

export default EditCaseManager
