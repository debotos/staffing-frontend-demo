import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import { Button, Modal, message } from 'antd'
import { Row, Col } from 'styled-bootstrap-grid'
import { clone } from 'ramda'
import {
	PlusOutlined,
	LeftCircleOutlined,
	CloseCircleOutlined,
	SaveOutlined,
} from '@ant-design/icons'

import RequestTable from './Request/RequestTable'
import AddRequest from './Request/AddRequest'
import EditRequest from './Request/EditRequest'
import Btn from '../../../components/UI/Button'
import { checkFormSectionMissing } from '../../../utils/checkFormSectionMissing'

export class Request extends Component {
	componentWillUnmount() {
		this.mounted = false
	}

	componentDidMount() {
		this.mounted = true
	}

	handleClearAll = () => {
		this.setState({ requests: [] })
	}

	startProcessing = (saveAndContinue = false) => {
		const { requests } = this.state

		// 1. Request Validation
		if (requests.length === 0) {
			message.error('Please add request!')
			return
		}

		// TODO: Adjust fields(like convert all date fields from moment to string)
		// TODO: Implement mechanism to save
		console.log('Success:', requests)

		/* Last Form Section | Special */
		const { tabs, id, formValues } = this.props
		const finalValues = { [id]: requests, ...clone(formValues) }
		const hasError = checkFormSectionMissing(finalValues, tabs)
		if (hasError) return

		// TODO: Adust and send it to backend via AJAX call
		this.props.onSuccessfulSubmit()
	}

	onFinish = (values) => {
		console.log('Success:', values)
		// Save & Continue
	}

	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	constructor(props) {
		super(props)
		this.state = {
			formProcessing: false,
			requests: [],
			requestAddModal: false,
			requestEditModal: false,
			requestEditingData: null,
		}
	}

	render() {
		return (
			<>
				{/* Request */}
				<Segment>
					<h3 className='title'>Request</h3>
					<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
						<Button
							icon={<PlusOutlined />}
							type='primary'
							htmlType='button'
							style={{ marginBottom: 5 }}
							onClick={() => this.setState({ requestAddModal: true })}
						>
							Add
						</Button>
					</div>
					<RequestTable
						data={this.state.requests}
						handleDelete={(key) => {
							const requests = this.state.requests.filter((x) => x.key !== key)
							this.setState({ requests })
						}}
						onEdit={(requestData) => {
							this.setState({ requestEditingData: requestData }, () =>
								this.setState({ requestEditModal: true })
							)
						}}
					/>
					<Modal
						title='New Request'
						visible={this.state.requestAddModal}
						footer={null}
						onCancel={() => this.setState({ requestAddModal: false })}
					>
						<AddRequest
							onAddSuccess={(data) => {
								const { requests } = this.state
								this.setState({
									requestAddModal: false,
									requests: [data, ...requests],
								})
							}}
						/>
					</Modal>
					<Modal
						destroyOnClose={true}
						title='Edit Request'
						visible={this.state.requestEditModal}
						footer={null}
						onCancel={() =>
							this.setState({
								requestEditModal: false,
								requestEditingData: null,
							})
						}
					>
						<EditRequest
							onEditSuccess={(data) => {
								const { requests } = this.state
								const update = requests.map((x) => {
									if (x.key === data.key) {
										return data
									} else {
										return x
									}
								})
								this.setState({ requestEditModal: false, requests: update })
							}}
							data={this.state.requestEditingData}
						/>
					</Modal>
				</Segment>

				<Row style={{ marginTop: 20 }}>
					<Col md='4' style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
						<Btn
							icon={<LeftCircleOutlined />}
							htmlType='button'
							disabled={this.state.formProcessing || !this.props.prevTabId}
							onClick={() => this.props.goToPrevTab()}
						>
							Previous
						</Btn>
					</Col>

					<Col md='4' style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
						<Btn
							icon={<CloseCircleOutlined />}
							htmlType='button'
							style={{ marginRight: 10 }}
							disabled={this.state.formProcessing}
							onClick={this.handleClearAll}
						>
							Clear All
						</Btn>
						<Btn
							icon={<SaveOutlined />}
							htmlType='button'
							disabled={this.state.formProcessing}
							onClick={() => this.startProcessing(false)} // 'false' for not to leave
						>
							Save for Later
						</Btn>
					</Col>

					<Col md='4' style={{ display: 'flex', justifyContent: 'center' }}>
						<Btn
							icon={<SaveOutlined />}
							htmlType='button'
							disabled={this.state.formProcessing}
							onClick={() => this.startProcessing(true)} // 'true' for continue next
						>
							Save and Continue
						</Btn>
					</Col>
				</Row>
			</>
		)
	}
}

export default Request
