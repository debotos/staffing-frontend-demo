import React, { Component } from 'react'
import { Form, Select, Button } from 'antd'
import { SaveOutlined, SearchOutlined } from '@ant-design/icons'

import { allergiesNames } from './AddAllergies'

const { Option } = Select

export class EditAllergies extends Component {
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
					<Button icon={<SaveOutlined />} type='primary' htmlType='submit'>
						Update
					</Button>
				</div>
			</Form>
		)
	}
}

export default EditAllergies
