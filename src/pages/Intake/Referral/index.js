import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import { clone } from 'ramda'
import { Form, Button, Modal, message, Select, Input } from 'antd'
import { Row, Col } from 'styled-bootstrap-grid'
import {
	PlusOutlined,
	LeftCircleOutlined,
	CloseCircleOutlined,
	SaveOutlined,
	SearchOutlined,
} from '@ant-design/icons'

import ReferralSourceTable from './ReferralSource/ReferralSourceTable'
import AddReferralSource from './ReferralSource/AddReferralSource'
import EditReferralSource from './ReferralSource/EditReferralSource'
import Btn from '../../../components/UI/Button'
import { sourceNames } from './ReferralSource/AddReferralSource'
import { phoneValidationRegex, faxValidationRegex } from '../../../utils/helpers'

export class Referral extends Component {
	componentWillUnmount() {
		this.mounted = false
	}

	componentDidMount() {
		this.mounted = true
	}

	handleClearAll = () => {
		this.setState({ referrals: [] })
		this.formRef.current.resetFields()
	}

	startProcessing = (saveAndContinue = false) => {
		const { referrals, caseManagers } = this.state
		this.mounted && this.setState({ formProcessing: true })
		const hide = message.loading('Processing form...', 0)
		const caseManagerErrorMsg = 'Please add case manager under all referrals!'

		// 1. Referral Validation
		if (referrals.length === 0) {
			message.error('Please add referral!')
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}

		// 2. CaseManagers Validation
		if (caseManagers.length < referrals.length) {
			message.error(caseManagerErrorMsg)
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}

		const referralData = clone(referrals).map((referral) => {
			referral['caseManagers'] = clone(caseManagers).filter((x) => x.referralId === referral.key)
			return referral
		})

		this.formRef.current
			.validateFields()
			.then((values) => {
				hide()
				this.mounted && this.setState({ formProcessing: false })

				const data = { referrals: referralData, ...values }
				// TODO: Adjust fields(like convert all date fields from moment to string)
				// TODO: Implement mechanism to save
				console.log('Success:', data)

				if (saveAndContinue) {
					this.props.goToNextTab(data)
				}
			})
			.catch((errorInfo) => {
				hide()
				message.error('Please fix the form errors!')
				this.mounted && this.setState({ formProcessing: false })
				console.log('Failed:', errorInfo)
			})
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
		this.formRef = React.createRef()
		this.state = {
			formProcessing: false,
			referralAddModal: false,
			referralEditModal: false,
			referrals: [],
			caseManagers: [],
			referralEditingData: null,
		}
	}

	render() {
		return (
			<>
				<Form
					onFinish={this.onFinish}
					onFinishFailed={this.onFinishFailed}
					ref={this.formRef}
					labelAlign='left'
				>
					{/* Referral Source */}
					<Segment>
						<h3 className='title'>Referral Source</h3>
						<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
							<Button
								icon={<PlusOutlined />}
								type='primary'
								htmlType='button'
								style={{ marginBottom: 5 }}
								onClick={() => this.setState({ referralAddModal: true })}
							>
								Add
							</Button>
						</div>
						<ReferralSourceTable
							data={this.state.referrals}
							handleDelete={(key) => {
								const referrals = this.state.referrals.filter((x) => x.key !== key)
								const caseManagers = this.state.caseManagers.filter((x) => x.referralId !== key)
								this.setState({ referrals, caseManagers })
							}}
							onEdit={(referralData) => {
								this.setState({ referralEditingData: referralData }, () =>
									this.setState({ referralEditModal: true })
								)
							}}
							/* To Handle Case Managers */
							caseManagers={this.state.caseManagers}
							setCaseManagers={(caseManagers) => this.setState({ caseManagers })}
							deleteCaseManager={(key) => {
								const update = this.state.caseManagers.filter((x) => x.key !== key)
								this.setState({ caseManagers: update })
							}}
							updateCaseManager={(data) => {
								const update = this.state.caseManagers.map((x) => {
									if (x.key === data.key) {
										return data
									} else {
										return x
									}
								})

								this.setState({ caseManagers: update })
							}}
						/>
						<Modal
							title='New Referral'
							visible={this.state.referralAddModal}
							footer={null}
							onCancel={() => this.setState({ referralAddModal: false })}
						>
							<AddReferralSource
								onAddSuccess={(data) => {
									const { referrals } = this.state
									this.setState({ referralAddModal: false, referrals: [data, ...referrals] })
								}}
							/>
						</Modal>
						<Modal
							destroyOnClose={true}
							title='Edit Referral'
							visible={this.state.referralEditModal}
							footer={null}
							onCancel={() =>
								this.setState({ referralEditModal: false, referralEditingData: null })
							}
						>
							<EditReferralSource
								onEditSuccess={(data) => {
									const { referrals } = this.state
									const update = referrals.map((x) => {
										if (x.key === data.key) {
											return data
										} else {
											return x
										}
									})
									this.setState({ referralEditModal: false, referrals: update })
								}}
								data={this.state.referralEditingData}
							/>
						</Modal>
					</Segment>

					{/* Marketing Representative */}
					<Segment>
						<h3 className='title'>Marketing Representative</h3>
						<Row>
							<Col md='3'>
								<Form.Item
									label='Name'
									name='marketingRepresentativeName'
									rules={[{ whitespace: true, required: true, message: 'Select name!' }]}
								>
									<Select
										allowClear
										placeholder='Search name'
										showSearch
										suffixIcon={<SearchOutlined />}
									>
										{sourceNames.map((person) => {
											const { key, name, value } = person
											return (
												<Select.Option key={key} value={value}>
													{name}
												</Select.Option>
											)
										})}
									</Select>
								</Form.Item>
							</Col>
							<Col md='3'>
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
							</Col>
							<Col md='3'>
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
							</Col>
							<Col md='3'>
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
							</Col>
						</Row>
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
				</Form>
			</>
		)
	}
}

export default Referral
