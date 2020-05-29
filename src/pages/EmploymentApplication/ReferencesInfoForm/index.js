import React, { Component } from 'react'
import { Row, Col } from 'styled-bootstrap-grid'
import { Segment } from 'semantic-ui-react'
import { Button, Modal, message } from 'antd'
import {
	PlusOutlined,
	LeftCircleOutlined,
	CloseCircleOutlined,
	SaveOutlined,
} from '@ant-design/icons'

import AddReferenceInfo from './AddReferenceInfo'
import EditReferenceInfo from './EditReferenceInfo'
import ReferenceInfoTable from './ReferenceInfoTable'
import Btn from '../../../components/UI/Button'

export class ReferenceInfoForm extends Component {
	componentWillUnmount() {
		this.mounted = false
	}

	componentDidMount() {
		this.mounted = true
	}

	startProcessing = (saveAndContinue = false) => {
		// 1. Reference Validation
		if (this.state.references.length === 0) {
			message.error('Please add reference!')
			return
		}

		// TODO: Adjust fields(like convert all date fields from moment to string)
		// TODO: Implement mechanism to save
		if (saveAndContinue) {
			this.props.goToNextTab(this.state.references)
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			referenceAddModal: false,
			referenceEditModal: false,
			referenceEditingData: null,
			references: [],
		}
	}

	render() {
		return (
			<>
				<Segment>
					<h3 className='title'>References(Do not list relatives)</h3>
					<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
						<Button
							icon={<PlusOutlined />}
							type='primary'
							htmlType='button'
							style={{ marginBottom: 5 }}
							onClick={() => this.setState({ referenceAddModal: true })}
						>
							Add
						</Button>
					</div>
					<ReferenceInfoTable
						data={this.state.references}
						handleDelete={(key) => {
							const update = this.state.references.filter((x) => x.key !== key)
							this.setState({ references: update })
						}}
						onEdit={(referenceData) => {
							this.setState({ referenceEditingData: referenceData }, () =>
								this.setState({ referenceEditModal: true })
							)
						}}
					/>
					<Modal
						title='Add Reference'
						visible={this.state.referenceAddModal}
						footer={null}
						onCancel={() => this.setState({ referenceAddModal: false })}
						wrapClassName='antd-full-screen-modal'
					>
						<AddReferenceInfo
							onAddSuccess={(data) => {
								const { references } = this.state
								this.setState({ referenceAddModal: false, references: [data, ...references] })
							}}
						/>
					</Modal>
					<Modal
						destroyOnClose={true}
						title='Edit Reference'
						visible={this.state.referenceEditModal}
						footer={null}
						onCancel={() =>
							this.setState({ referenceEditModal: false, referenceEditingData: null })
						}
						wrapClassName='antd-full-screen-modal'
					>
						<EditReferenceInfo
							onEditSuccess={(data) => {
								const { references } = this.state
								const update = references.map((x) => {
									if (x.key === data.key) {
										return data
									} else {
										return x
									}
								})
								this.setState({ referenceEditModal: false, references: update })
							}}
							data={this.state.referenceEditingData}
						/>
					</Modal>
				</Segment>

				<Row style={{ marginTop: 20 }}>
					<Col md='4' style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
						<Btn
							icon={<LeftCircleOutlined />}
							htmlType='button'
							disabled={!this.props.prevTabId}
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
							disabled={this.state.references.length === 0}
							onClick={() => this.setState({ references: [] })}
						>
							Clear All
						</Btn>
						<Btn
							icon={<SaveOutlined />}
							htmlType='button'
							// disabled={this.state.references.length === 0}
							onClick={() => this.startProcessing(false)} // 'false' for not to leave
						>
							Save for Later
						</Btn>
					</Col>

					<Col md='4' style={{ display: 'flex', justifyContent: 'center' }}>
						<Btn
							icon={<SaveOutlined />}
							htmlType='button'
							// disabled={this.state.references.length === 0}
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

export default ReferenceInfoForm
