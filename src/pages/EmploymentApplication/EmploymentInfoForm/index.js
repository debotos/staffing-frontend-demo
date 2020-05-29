import React, { Component } from 'react'
import { Row, Col } from 'styled-bootstrap-grid'
import { Segment } from 'semantic-ui-react'
import { Button, Modal, message, Upload } from 'antd'
import {
	PlusOutlined,
	LeftCircleOutlined,
	CloseCircleOutlined,
	SaveOutlined,
	InboxOutlined,
} from '@ant-design/icons'

import AddEmploymentInfo from './AddEmploymentInfo'
import EditEmploymentInfo from './EditEmploymentInfo'
import EmploymentInfoTable from './EmploymentInfoTable'
import Btn from '../../../components/UI/Button'

export class EmploymentInfoForm extends Component {
	componentWillUnmount() {
		this.mounted = false
	}

	componentDidMount() {
		this.mounted = true
	}

	startProcessing = (saveAndContinue = false) => {
		// 1. Employment Validation
		if (this.state.employmentHistory.length === 0) {
			message.error('Please add employment history!')
			return
		}
		// 2. Resume Validation
		if (!this.state.resume) {
			message.error('Please upload your resume!')
			return
		}

		// TODO: Adjust fields(like convert all date fields from moment to string)
		// TODO: Implement mechanism to save
		if (saveAndContinue) {
			const { resume, employmentHistory } = this.state
			const data = { resume, employmentHistory }
			this.props.goToNextTab(data)
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			employmentAddModal: false,
			employmentEditModal: false,
			employmentEditingData: null,
			employmentHistory: [],
			resume: null,
		}
	}

	render() {
		return (
			<>
				<Segment>
					<h3 className='title'>Employment History</h3>
					<Upload.Dragger
						name='resume'
						accept='.jpg, .jpeg, .png, .doc, .docx, .pdf'
						style={{ marginTop: 14 }}
						multiple={false}
						fileList={this.state.resume ? [this.state.resume] : []}
						onRemove={() => this.setState({ resume: null })}
						beforeUpload={(file, fileList) => {
							this.setState({ resume: file })
							return false // To disable on the fly upload
						}}
					>
						<p className='ant-upload-drag-icon'>
							<InboxOutlined />
						</p>
						<p className='ant-upload-text'>Upload Your Resume</p>
						<p className='ant-upload-hint'>Click or drag resume to this area to upload</p>
					</Upload.Dragger>
					<h5 style={{ textAlign: 'center', marginTop: 14 }}>
						List below present and past employment, beginning with your most recent.
					</h5>
					<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
						<Button
							icon={<PlusOutlined />}
							type='primary'
							htmlType='button'
							style={{ marginBottom: 5 }}
							onClick={() => this.setState({ employmentAddModal: true })}
						>
							Add
						</Button>
					</div>
					<EmploymentInfoTable
						data={this.state.employmentHistory}
						handleDelete={(key) => {
							const update = this.state.employmentHistory.filter((x) => x.key !== key)
							this.setState({ employmentHistory: update })
						}}
						onEdit={(employmentData) => {
							this.setState({ employmentEditingData: employmentData }, () =>
								this.setState({ employmentEditModal: true })
							)
						}}
					/>
					<Modal
						title='Add Employment History'
						visible={this.state.employmentAddModal}
						footer={null}
						onCancel={() => this.setState({ employmentAddModal: false })}
						wrapClassName='antd-full-screen-modal'
					>
						<AddEmploymentInfo
							onAddSuccess={(data) => {
								const { employmentHistory } = this.state
								this.setState({
									employmentAddModal: false,
									employmentHistory: [data, ...employmentHistory],
								})
							}}
						/>
					</Modal>
					<Modal
						destroyOnClose={true}
						title='Edit Employment History'
						visible={this.state.employmentEditModal}
						footer={null}
						onCancel={() =>
							this.setState({ employmentEditModal: false, employmentEditingData: null })
						}
						wrapClassName='antd-full-screen-modal'
					>
						<EditEmploymentInfo
							onEditSuccess={(data) => {
								const { employmentHistory } = this.state
								const update = employmentHistory.map((x) => {
									if (x.key === data.key) {
										return data
									} else {
										return x
									}
								})
								this.setState({ employmentEditModal: false, employmentHistory: update })
							}}
							data={this.state.employmentEditingData}
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
							disabled={!this.state.resume && this.state.employmentHistory.length === 0}
							onClick={() => this.setState({ resume: null, employmentHistory: [] })}
						>
							Clear All
						</Btn>
						<Btn
							icon={<SaveOutlined />}
							htmlType='button'
							// disabled={this.state.employmentHistory.length === 0}
							onClick={() => this.startProcessing(false)} // 'false' for not to leave
						>
							Save for Later
						</Btn>
					</Col>

					<Col md='4' style={{ display: 'flex', justifyContent: 'center' }}>
						<Btn
							icon={<SaveOutlined />}
							htmlType='button'
							// disabled={this.state.employmentHistory.length === 0}
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

export default EmploymentInfoForm
