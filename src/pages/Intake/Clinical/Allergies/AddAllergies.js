import React, { Component } from 'react'
import { Form, Select, Button } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'

import { randomString } from '../../../../utils/helpers'

const { Option } = Select

export const allergiesNames = [
	{ key: 1, name: 'Skin Allergy', value: 'Skin Allergy' },
	{ key: 2, name: 'Food Allergy', value: 'Food Allergy' },
	{ key: 3, name: 'Drug Allergy', value: 'Drug Allergy' },
]

export class AddAllergies extends Component {
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
					label='Name'
					name='name'
					rules={[{ whitespace: true, required: true, message: 'Select name!' }]}
				>
					<Select
						allowClear={true}
						placeholder='Select name'
						showSearch
						suffixIcon={<SearchOutlined />}
					>
						{allergiesNames.map((item) => {
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
					<Button icon={<PlusOutlined />} type='primary' htmlType='submit'>
						Add
					</Button>
				</div>
			</Form>
		)
	}
}

export default AddAllergies
