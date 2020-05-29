import React, { Component } from 'react'
import { Form, Select, Button } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'

import { randomString } from '../../../../utils/helpers'

const { Option } = Select

export const sourceTypes = [
	{ key: 1, name: 'Primary', value: 'Primary' },
	{ key: 2, name: 'Secondary', value: 'Secondary' },
]

export const sourceNames = [
	{ key: 1, name: 'Debotos', value: 'Debotos' },
	{ key: 2, name: 'Ripon', value: 'Ripon' },
]

export class AddAuthorization extends Component {
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
					label='Source Name'
					name='sourceName'
					rules={[{ whitespace: true, required: true, message: 'Select source name!' }]}
				>
					<Select
						allowClear
						placeholder='Select source name'
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
					label='Source Type'
					name='sourceType'
					rules={[{ whitespace: true, required: true, message: 'Select source type!' }]}
				>
					<Select allowClear={true} placeholder='Select source type'>
						{sourceTypes.map((type) => {
							const { key, name, value } = type
							return (
								<Option key={key} value={value}>
									{name}
								</Option>
							)
						})}
					</Select>
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

export default AddAuthorization
