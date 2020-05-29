import React, { Component } from 'react'
import { Form, Button, Input, Radio, DatePicker } from 'antd'
import { SaveOutlined } from '@ant-design/icons'

import { ACTIVE_OR_NOT } from './AddAuthorization'

export class EditAuthorization extends Component {
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
					label='Authorization Number'
					name='authorizationNumber'
					validateFirst
					rules={[
						{ whitespace: true, required: true, message: 'Provide authorization number!' },
						{ min: 2, message: 'Too short!' },
						{ max: 150, message: 'Too long!' },
					]}
				>
					<Input allowClear={true} placeholder='Authorization number' />
				</Form.Item>

				<Form.Item
					label='From'
					name='startDate'
					rules={[{ required: true, message: 'Select start date!' }]}
				>
					<DatePicker
						allowClear={true}
						format='MM-DD-YYYY'
						placeholder='Select start date'
						style={{ width: '100%' }}
						showToday={false}
						onChange={() => this.formRef.current.resetFields(['endDate'])}
					/>
				</Form.Item>

				<Form.Item
					label='To'
					name='endDate'
					rules={[{ required: true, message: 'Select end date!' }]}
				>
					<DatePicker
						allowClear={true}
						format='MM-DD-YYYY'
						placeholder='Select end date'
						style={{ width: '100%' }}
						showToday={false}
						disabledDate={(current) => {
							const startDate = this.formRef.current.getFieldValue('startDate')
							return current && startDate && startDate.endOf('day').valueOf() >= current.valueOf()
						}}
					/>
				</Form.Item>

				<Form.Item
					label='Authorized By'
					name='authorizedBy'
					validateFirst
					rules={[
						{ whitespace: true, required: true, message: 'Provide authorizer!' },
						{ min: 2, message: 'Too short!' },
						{ max: 150, message: 'Too long!' },
					]}
				>
					<Input allowClear={true} placeholder='Authorized by' />
				</Form.Item>

				<Form.Item label='Active?' name={ACTIVE_OR_NOT}>
					<Radio.Group onChange={(e) => this.setState({ [ACTIVE_OR_NOT]: e.target.value })}>
						<Radio value={true}>Yes</Radio>
						<Radio value={false}>No</Radio>
					</Radio.Group>
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

export default EditAuthorization
