import React, { Component } from 'react'
import { clone } from 'ramda'
import { Segment } from 'semantic-ui-react'
import { Button, Modal, message } from 'antd'
import { Row, Col } from 'styled-bootstrap-grid'
import {
	PlusOutlined,
	LeftCircleOutlined,
	CloseCircleOutlined,
	SaveOutlined,
} from '@ant-design/icons'

import PayorSourceTable from './PayorSource/PayorSourceTable'
import AddPayorSource from './PayorSource/AddPayorSource'
import EditPayorSource from './PayorSource/EditPayorSource'
import Btn from '../../../components/UI/Button'

export class PayorSource extends Component {
	componentWillUnmount() {
		this.mounted = false
	}

	componentDidMount() {
		this.mounted = true
	}

	handleClearAll = () => {
		this.setState({ sources: [], authorizations: [], authorizationDetails: [] })
	}

	startProcessing = (saveAndContinue = false) => {
		const { sources, authorizations, authorizationDetails } = this.state

		// 1. Sources Validation
		if (sources.length === 0) {
			message.error('Please add payor source!')
			return
		}

		// 2. Authorizations Validation
		if (authorizations.length < sources.length) {
			message.error('Please add authorization under all sources!')
			return
		}

		// 2. Authorization Details Validation
		if (authorizationDetails.length < authorizations.length) {
			message.error('Please add details under all authorizations!')
			return
		}

		// TODO: Adjust fields(like convert all date fields from moment to string)
		// TODO: Implement mechanism to save
		const data = clone(sources).map((source) => {
			source['authorizations'] = clone(authorizations)
				.filter((x) => x.sourceId === source.key)
				.map((authorization) => {
					authorization['details'] = clone(authorizationDetails).filter(
						(y) => y.authorizationId === authorization.key
					)
					return authorization
				})

			return source
		})

		if (saveAndContinue) {
			this.props.goToNextTab(data)
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			sourceAddModal: false,
			sourceEditModal: false,
			sources: [],
			authorizations: [],
			authorizationDetails: [],
			sourceEditingData: null,
		}
	}

	render() {
		return (
			<>
				{/* Payor Source */}
				<Segment>
					<h3 className='title'>Payor Source</h3>
					<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
						<Button
							icon={<PlusOutlined />}
							type='primary'
							htmlType='button'
							style={{ marginBottom: 5 }}
							onClick={() => this.setState({ sourceAddModal: true })}
						>
							Add
						</Button>
					</div>
					<PayorSourceTable
						data={this.state.sources}
						handleDelete={(key) => {
							const sources = this.state.sources.filter((x) => x.key !== key)
							const authorizations = this.state.authorizations.filter((x) => x.sourceId !== key)
							const authorizationDetails = this.state.authorizationDetails.filter(
								(x) => x.sourceId !== key
							)
							this.setState({ sources, authorizations, authorizationDetails })
						}}
						onEdit={(sourceData) => {
							this.setState({ sourceEditingData: sourceData }, () =>
								this.setState({ sourceEditModal: true })
							)
						}}
						/* To Handle Authorization */
						authorizations={this.state.authorizations}
						setAuthorizations={(authorizations) => this.setState({ authorizations })}
						deleteAuthorization={(key) => {
							const authorizations = this.state.authorizations.filter((x) => x.key !== key)
							const authorizationDetails = this.state.authorizationDetails.filter(
								(x) => x.authorizationId !== key
							)
							this.setState({ authorizations, authorizationDetails })
						}}
						updateAuthorization={(data) => {
							const update = this.state.authorizations.map((x) => {
								if (x.key === data.key) {
									return data
								} else {
									return x
								}
							})
							this.setState({ authorizations: update })
						}}
						/* To Handle Authorization Details */
						authorizationDetails={this.state.authorizationDetails}
						setAuthorizationDetails={(authorizationDetails) =>
							this.setState({ authorizationDetails })
						}
						deleteAuthorizationDetailsItem={(key) => {
							const update = this.state.authorizationDetails.filter((x) => x.key !== key)
							this.setState({ authorizationDetails: update })
						}}
						updateAuthorizationDetailsItem={(data) => {
							const update = this.state.authorizationDetails.map((x) => {
								if (x.key === data.key) {
									return data
								} else {
									return x
								}
							})
							this.setState({ authorizationDetails: update })
						}}
					/>
					<Modal
						title='New Payor Source'
						visible={this.state.sourceAddModal}
						footer={null}
						onCancel={() => this.setState({ sourceAddModal: false })}
					>
						<AddPayorSource
							onAddSuccess={(data) => {
								const { sources } = this.state
								this.setState({ sourceAddModal: false, sources: [data, ...sources] })
							}}
						/>
					</Modal>
					<Modal
						destroyOnClose={true}
						title='Edit Payor Source'
						visible={this.state.sourceEditModal}
						footer={null}
						onCancel={() => this.setState({ sourceEditModal: false, sourceEditingData: null })}
					>
						<EditPayorSource
							onEditSuccess={(data) => {
								const { sources } = this.state
								const update = sources.map((x) => {
									if (x.key === data.key) {
										return data
									} else {
										return x
									}
								})
								this.setState({ sourceEditModal: false, sources: update })
							}}
							data={this.state.sourceEditingData}
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

export default PayorSource
