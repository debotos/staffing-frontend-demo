import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import { Form, Button, Modal, message, Select } from 'antd'
import { Row, Col } from 'styled-bootstrap-grid'
import {
	PlusOutlined,
	LeftCircleOutlined,
	CloseCircleOutlined,
	SaveOutlined,
	SearchOutlined,
} from '@ant-design/icons'

import InpatientEventsTable from './InpatientEvents/InpatientEventsTable'
import AddInpatientEvents from './InpatientEvents/AddInpatientEvents'
import EditInpatientEvents from './InpatientEvents/EditInpatientEvents'

import PhysicianTable from './Physician/PhysicianTable'
import AddPhysician from './Physician/AddPhysician'
import EditPhysician from './Physician/EditPhysician'
import DiagnosisTable from './Diagnosis/DiagnosisTable'
import AddDiagnosis from './Diagnosis/AddDiagnosis'
import EditDiagnosis from './Diagnosis/EditDiagnosis'
import AllergiesTable from './Allergies/AllergiesTable'
import AddAllergies from './Allergies/AddAllergies'
import EditAllergies from './Allergies/EditAllergies'
import AdvanceDirectiveTable from './AdvanceDirective/AdvanceDirectiveTable'
import AddAdvanceDirective from './AdvanceDirective/AddAdvanceDirective'
import EditAdvanceDirective from './AdvanceDirective/EditAdvanceDirective'
import VaccinationTable from './Vaccination/VaccinationTable'
import AddVaccination from './Vaccination/AddVaccination'
import EditVaccination from './Vaccination/EditVaccination'
import Btn from '../../../components/UI/Button'

export const evacuationLocations = [
	{ key: 1, name: 'Bangladesh', value: 'Bangladesh' },
	{ key: 2, name: 'India', value: 'India' },
	{ key: 3, name: 'UK', value: 'UK' },
]
export const acuityStatus = [
	{ key: 1, name: 'Same Day', value: 'Same Day' },
	{ key: 2, name: 'Within One Hour', value: 'Within One Hour' },
]
export const disasterStatus = [
	{ key: 1, name: 'Same Day', value: 'Same Day' },
	{ key: 2, name: 'Within One Hour', value: 'Within One Hour' },
]

export class Clinical extends Component {
	componentWillUnmount() {
		this.mounted = false
	}

	componentDidMount() {
		this.mounted = true
	}

	handleClearAll = () => {
		this.setState({
			inpatientEvents: [],
			physicians: [],
			diagnosisList: [],
			allergiesList: [],
			advanceDirectiveList: [],
			vaccinationList: [],
		})
		this.formRef.current.resetFields()
	}

	startProcessing = (saveAndContinue = false) => {
		const {
			inpatientEvents,
			physicians,
			diagnosisList,
			allergiesList,
			advanceDirectiveList,
			vaccinationList,
		} = this.state
		this.mounted && this.setState({ formProcessing: true })
		const hide = message.loading('Processing form...', 0)

		// 1. Inpatient Events Validation
		if (inpatientEvents.length === 0) {
			message.error('Please add inpatient events!')
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}
		// 2. Physicians Validation
		if (physicians.length === 0) {
			message.error('Please add physicians!')
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}
		// 3. Diagnosis Validation
		if (diagnosisList.length === 0) {
			message.error('Please add diagnosis!')
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}
		// 4. Allergies Validation
		if (allergiesList.length === 0) {
			message.error('Please add allergies!')
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}
		// 5. Advance Directive Validation
		if (advanceDirectiveList.length === 0) {
			message.error('Please add advance directives!')
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}
		// 6. Vaccination Validation
		if (vaccinationList.length === 0) {
			message.error('Please add vaccination!')
			hide()
			this.mounted && this.setState({ formProcessing: false })
			return
		}

		this.formRef.current
			.validateFields()
			.then((values) => {
				hide()
				this.mounted && this.setState({ formProcessing: false })

				const data = {
					inpatientEvents,
					physicians,
					diagnosis: diagnosisList,
					allergies: allergiesList,
					advanceDirective: advanceDirectiveList,
					vaccination: vaccinationList,
					...values,
				}

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
			inpatientEvents: [],
			inpatientEventAddModal: false,
			inpatientEventEditModal: false,
			inpatientEventEditingData: null,
			physicians: [],
			physicianAddModal: false,
			physicianEditModal: false,
			physicianEditingData: null,
			diagnosisList: [],
			diagnosisAddModal: false,
			diagnosisEditModal: false,
			diagnosisEditingData: null,
			allergiesList: [],
			allergiesAddModal: false,
			allergiesEditModal: false,
			allergiesEditingData: null,
			advanceDirectiveList: [],
			advanceDirectiveAddModal: false,
			advanceDirectiveEditModal: false,
			advanceDirectiveEditingData: null,
			vaccinationList: [],
			vaccinationAddModal: false,
			vaccinationEditModal: false,
			vaccinationEditingData: null,
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
					{/* Inpatient Events */}
					<Segment>
						<h3 className='title'>Inpatient Events</h3>
						<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
							<Button
								icon={<PlusOutlined />}
								type='primary'
								htmlType='button'
								style={{ marginBottom: 5 }}
								onClick={() => this.setState({ inpatientEventAddModal: true })}
							>
								Add
							</Button>
						</div>
						<InpatientEventsTable
							data={this.state.inpatientEvents}
							handleDelete={(key) => {
								const inpatientEvents = this.state.inpatientEvents.filter((x) => x.key !== key)
								this.setState({ inpatientEvents })
							}}
							onEdit={(inpatientEventData) => {
								this.setState({ inpatientEventEditingData: inpatientEventData }, () =>
									this.setState({ inpatientEventEditModal: true })
								)
							}}
						/>
						<Modal
							title='New Inpatient Event'
							visible={this.state.inpatientEventAddModal}
							footer={null}
							onCancel={() => this.setState({ inpatientEventAddModal: false })}
						>
							<AddInpatientEvents
								onAddSuccess={(data) => {
									const { inpatientEvents } = this.state
									this.setState({
										inpatientEventAddModal: false,
										inpatientEvents: [data, ...inpatientEvents],
									})
								}}
							/>
						</Modal>
						<Modal
							destroyOnClose={true}
							title='Edit Inpatient Event'
							visible={this.state.inpatientEventEditModal}
							footer={null}
							onCancel={() =>
								this.setState({ inpatientEventEditModal: false, inpatientEventEditingData: null })
							}
						>
							<EditInpatientEvents
								onEditSuccess={(data) => {
									const { inpatientEvents } = this.state
									const update = inpatientEvents.map((x) => {
										if (x.key === data.key) {
											return data
										} else {
											return x
										}
									})
									this.setState({ inpatientEventEditModal: false, inpatientEvents: update })
								}}
								data={this.state.inpatientEventEditingData}
							/>
						</Modal>
					</Segment>

					{/* Physician */}
					<Segment>
						<h3 className='title'>Physician</h3>
						<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
							<Button
								icon={<PlusOutlined />}
								type='primary'
								htmlType='button'
								style={{ marginBottom: 5 }}
								onClick={() => this.setState({ physicianAddModal: true })}
							>
								Add
							</Button>
						</div>
						<PhysicianTable
							data={this.state.physicians}
							handleDelete={(key) => {
								const physicians = this.state.physicians.filter((x) => x.key !== key)
								this.setState({ physicians })
							}}
							onEdit={(physicianData) => {
								this.setState({ physicianEditingData: physicianData }, () =>
									this.setState({ physicianEditModal: true })
								)
							}}
						/>
						<Modal
							title='New Physician'
							visible={this.state.physicianAddModal}
							footer={null}
							onCancel={() => this.setState({ physicianAddModal: false })}
						>
							<AddPhysician
								onAddSuccess={(data) => {
									const { physicians } = this.state
									this.setState({
										physicianAddModal: false,
										physicians: [data, ...physicians],
									})
								}}
							/>
						</Modal>
						<Modal
							destroyOnClose={true}
							title='Edit Physician'
							visible={this.state.physicianEditModal}
							footer={null}
							onCancel={() =>
								this.setState({ physicianEditModal: false, physicianEditingData: null })
							}
						>
							<EditPhysician
								onEditSuccess={(data) => {
									const { physicians } = this.state
									const update = physicians.map((x) => {
										if (x.key === data.key) {
											return data
										} else {
											return x
										}
									})
									this.setState({ physicianEditModal: false, physicians: update })
								}}
								data={this.state.physicianEditingData}
							/>
						</Modal>
					</Segment>

					{/* Diagnosis */}
					<Segment>
						<h3 className='title'>Diagnosis</h3>
						<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
							<Button
								icon={<PlusOutlined />}
								type='primary'
								htmlType='button'
								style={{ marginBottom: 5 }}
								onClick={() => this.setState({ diagnosisAddModal: true })}
							>
								Add
							</Button>
						</div>
						<DiagnosisTable
							data={this.state.diagnosisList}
							handleDelete={(key) => {
								const diagnosisList = this.state.diagnosisList.filter((x) => x.key !== key)
								this.setState({ diagnosisList })
							}}
							onEdit={(diagnosisData) => {
								this.setState({ diagnosisEditingData: diagnosisData }, () =>
									this.setState({ diagnosisEditModal: true })
								)
							}}
						/>
						<Modal
							title='New Diagnosis'
							visible={this.state.diagnosisAddModal}
							footer={null}
							onCancel={() => this.setState({ diagnosisAddModal: false })}
						>
							<AddDiagnosis
								onAddSuccess={(data) => {
									const { diagnosisList } = this.state
									this.setState({
										diagnosisAddModal: false,
										diagnosisList: [data, ...diagnosisList],
									})
								}}
							/>
						</Modal>
						<Modal
							destroyOnClose={true}
							title='Edit Diagnosis'
							visible={this.state.diagnosisEditModal}
							footer={null}
							onCancel={() =>
								this.setState({ diagnosisEditModal: false, diagnosisEditingData: null })
							}
						>
							<EditDiagnosis
								onEditSuccess={(data) => {
									const { diagnosisList } = this.state
									const update = diagnosisList.map((x) => {
										if (x.key === data.key) {
											return data
										} else {
											return x
										}
									})
									this.setState({ diagnosisEditModal: false, diagnosisList: update })
								}}
								data={this.state.diagnosisEditingData}
							/>
						</Modal>
					</Segment>

					{/* Allergies */}
					<Segment>
						<h3 className='title'>Allergies</h3>
						<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
							<Button
								icon={<PlusOutlined />}
								type='primary'
								htmlType='button'
								style={{ marginBottom: 5 }}
								onClick={() => this.setState({ allergiesAddModal: true })}
							>
								Add
							</Button>
						</div>
						<AllergiesTable
							data={this.state.allergiesList}
							handleDelete={(key) => {
								const allergiesList = this.state.allergiesList.filter((x) => x.key !== key)
								this.setState({ allergiesList })
							}}
							onEdit={(allergiesData) => {
								this.setState({ allergiesEditingData: allergiesData }, () =>
									this.setState({ allergiesEditModal: true })
								)
							}}
						/>
						<Modal
							title='New Allergies'
							visible={this.state.allergiesAddModal}
							footer={null}
							onCancel={() => this.setState({ allergiesAddModal: false })}
						>
							<AddAllergies
								onAddSuccess={(data) => {
									const { allergiesList } = this.state
									this.setState({
										allergiesAddModal: false,
										allergiesList: [data, ...allergiesList],
									})
								}}
							/>
						</Modal>
						<Modal
							destroyOnClose={true}
							title='Edit Allergies'
							visible={this.state.allergiesEditModal}
							footer={null}
							onCancel={() =>
								this.setState({ allergiesEditModal: false, allergiesEditingData: null })
							}
						>
							<EditAllergies
								onEditSuccess={(data) => {
									const { allergiesList } = this.state
									const update = allergiesList.map((x) => {
										if (x.key === data.key) {
											return data
										} else {
											return x
										}
									})
									this.setState({ allergiesEditModal: false, allergiesList: update })
								}}
								data={this.state.allergiesEditingData}
							/>
						</Modal>
					</Segment>

					{/* Emergency Planning */}
					<Segment>
						<h3 className='title'>Emergency Planning</h3>
						<Row>
							<Col md='4'>
								<Form.Item
									label='Evacuation Location'
									name='evacuationLocation'
									rules={[
										{ whitespace: true, required: true, message: 'Select evacuation location!' },
									]}
								>
									<Select
										allowClear={true}
										placeholder='Select evacuation location'
										showSearch
										suffixIcon={<SearchOutlined />}
									>
										{evacuationLocations.map((item) => {
											const { key, name, value } = item
											return (
												<Select.Option key={key} value={value}>
													{name}
												</Select.Option>
											)
										})}
									</Select>
								</Form.Item>
							</Col>
							<Col md='4'>
								<Form.Item
									label='Acuity Status'
									name='acuityStatus'
									rules={[{ whitespace: true, required: true, message: 'Select acuity status!' }]}
								>
									<Select allowClear={true} placeholder='Select acuity status'>
										{acuityStatus.map((item) => {
											const { key, name, value } = item
											return (
												<Select.Option key={key} value={value}>
													{name}
												</Select.Option>
											)
										})}
									</Select>
								</Form.Item>
							</Col>
							<Col md='4'>
								<Form.Item
									label='Disaster Status'
									name='disasterStatus'
									rules={[{ whitespace: true, required: true, message: 'Select disaster status!' }]}
								>
									<Select allowClear={true} placeholder='Select disaster status'>
										{disasterStatus.map((item) => {
											const { key, name, value } = item
											return (
												<Select.Option key={key} value={value}>
													{name}
												</Select.Option>
											)
										})}
									</Select>
								</Form.Item>
							</Col>
						</Row>
					</Segment>

					{/* Advance Directive */}
					<Segment>
						<h3 className='title'>Advance Directive</h3>
						<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
							<Button
								icon={<PlusOutlined />}
								type='primary'
								htmlType='button'
								style={{ marginBottom: 5 }}
								onClick={() => this.setState({ advanceDirectiveAddModal: true })}
							>
								Add
							</Button>
						</div>
						<AdvanceDirectiveTable
							data={this.state.advanceDirectiveList}
							handleDelete={(key) => {
								const advanceDirectiveList = this.state.advanceDirectiveList.filter(
									(x) => x.key !== key
								)
								this.setState({ advanceDirectiveList })
							}}
							onEdit={(advanceDirectiveData) => {
								this.setState({ advanceDirectiveEditingData: advanceDirectiveData }, () =>
									this.setState({ advanceDirectiveEditModal: true })
								)
							}}
						/>
						<Modal
							title='New Advance Directive'
							visible={this.state.advanceDirectiveAddModal}
							footer={null}
							onCancel={() => this.setState({ advanceDirectiveAddModal: false })}
						>
							<AddAdvanceDirective
								onAddSuccess={(data) => {
									const { advanceDirectiveList } = this.state
									this.setState({
										advanceDirectiveAddModal: false,
										advanceDirectiveList: [data, ...advanceDirectiveList],
									})
								}}
							/>
						</Modal>
						<Modal
							destroyOnClose={true}
							title='Edit Advance Directive'
							visible={this.state.advanceDirectiveEditModal}
							footer={null}
							onCancel={() =>
								this.setState({
									advanceDirectiveEditModal: false,
									advanceDirectiveEditingData: null,
								})
							}
						>
							<EditAdvanceDirective
								onEditSuccess={(data) => {
									const { advanceDirectiveList } = this.state
									const update = advanceDirectiveList.map((x) => {
										if (x.key === data.key) {
											return data
										} else {
											return x
										}
									})
									this.setState({ advanceDirectiveEditModal: false, advanceDirectiveList: update })
								}}
								data={this.state.advanceDirectiveEditingData}
							/>
						</Modal>
					</Segment>

					{/* Vaccination */}
					<Segment>
						<h3 className='title'>Vaccination</h3>
						<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
							<Button
								icon={<PlusOutlined />}
								type='primary'
								htmlType='button'
								style={{ marginBottom: 5 }}
								onClick={() => this.setState({ vaccinationAddModal: true })}
							>
								Add
							</Button>
						</div>
						<VaccinationTable
							data={this.state.vaccinationList}
							handleDelete={(key) => {
								const vaccinationList = this.state.vaccinationList.filter((x) => x.key !== key)
								this.setState({ vaccinationList })
							}}
							onEdit={(vaccinationData) => {
								this.setState({ vaccinationEditingData: vaccinationData }, () =>
									this.setState({ vaccinationEditModal: true })
								)
							}}
						/>
						<Modal
							title='New Vaccination'
							visible={this.state.vaccinationAddModal}
							footer={null}
							onCancel={() => this.setState({ vaccinationAddModal: false })}
						>
							<AddVaccination
								onAddSuccess={(data) => {
									const { vaccinationList } = this.state
									this.setState({
										vaccinationAddModal: false,
										vaccinationList: [data, ...vaccinationList],
									})
								}}
							/>
						</Modal>
						<Modal
							destroyOnClose={true}
							title='Edit Vaccination'
							visible={this.state.vaccinationEditModal}
							footer={null}
							onCancel={() =>
								this.setState({
									vaccinationEditModal: false,
									vaccinationEditingData: null,
								})
							}
						>
							<EditVaccination
								onEditSuccess={(data) => {
									const { vaccinationList } = this.state
									const update = vaccinationList.map((x) => {
										if (x.key === data.key) {
											return data
										} else {
											return x
										}
									})
									this.setState({ vaccinationEditModal: false, vaccinationList: update })
								}}
								data={this.state.vaccinationEditingData}
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
				</Form>
			</>
		)
	}
}

export default Clinical
