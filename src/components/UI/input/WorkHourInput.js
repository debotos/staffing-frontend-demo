import React, { Component } from 'react'
import { Collapse } from 'antd'
import styled from 'styled-components'
import { clone } from 'ramda'

import { Table, Thead, Tbody, Tr, Th, Td } from '../../ResponsiveTable'
import { Desktop, MobileOrTablet } from '../../common/Device'

const weekPart1 = { su: false, mo: false, tu: false, we: false }
const weekPart2 = { th: false, fr: false, sa: false }
export const initialWorkingHourData = [
	{ key: '12:00AM', time: '12:00AM', ...weekPart1, ...weekPart2 },
	{ key: '01:00AM', time: '01:00AM', ...weekPart1, ...weekPart2 },
	{ key: '02:00AM', time: '02:00AM', ...weekPart1, ...weekPart2 },
	{ key: '03:00AM', time: '03:00AM', ...weekPart1, ...weekPart2 },
	{ key: '04:00AM', time: '04:00AM', ...weekPart1, ...weekPart2 },
	{ key: '05:00AM', time: '05:00AM', ...weekPart1, ...weekPart2 },
	{ key: '06:00AM', time: '06:00AM', ...weekPart1, ...weekPart2 },
	{ key: '07:00AM', time: '07:00AM', ...weekPart1, ...weekPart2 },
	{ key: '08:00AM', time: '08:00AM', ...weekPart1, ...weekPart2 },
	{ key: '09:00AM', time: '09:00AM', ...weekPart1, ...weekPart2 },
	{ key: '10:00AM', time: '10:00AM', ...weekPart1, ...weekPart2 },
	{ key: '11:00AM', time: '11:00AM', ...weekPart1, ...weekPart2 },
	{ key: '12:00PM', time: '12:00PM', ...weekPart1, ...weekPart2 },
	{ key: '01:00PM', time: '01:00PM', ...weekPart1, ...weekPart2 },
	{ key: '02:00PM', time: '02:00PM', ...weekPart1, ...weekPart2 },
	{ key: '03:00PM', time: '03:00PM', ...weekPart1, ...weekPart2 },
	{ key: '04:00PM', time: '04:00PM', ...weekPart1, ...weekPart2 },
	{ key: '05:00PM', time: '05:00PM', ...weekPart1, ...weekPart2 },
	{ key: '06:00PM', time: '06:00PM', ...weekPart1, ...weekPart2 },
	{ key: '07:00PM', time: '07:00PM', ...weekPart1, ...weekPart2 },
	{ key: '08:00PM', time: '08:00PM', ...weekPart1, ...weekPart2 },
	{ key: '09:00PM', time: '09:00PM', ...weekPart1, ...weekPart2 },
	{ key: '10:00PM', time: '10:00PM', ...weekPart1, ...weekPart2 },
	{ key: '11:00PM', time: '11:00PM', ...weekPart1, ...weekPart2 },
]

export default function WorkHourInput(props) {
	return (
		<>
			<Desktop>
				<DesktopWorkHourInput {...props} />
			</Desktop>
			<MobileOrTablet>
				<MobileAndTabWorkHourInput {...props} />
			</MobileOrTablet>
		</>
	)
}

/* For Desktop */

export class DesktopWorkHourInput extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: clone(initialWorkingHourData),
		}
	}

	handleChange = (key, day, value, currentItem) => {
		currentItem[day] = value
		const updates = this.state.data.map((item) => {
			if (item.key === key) {
				return { ...item, ...currentItem }
			}
			return item
		})
		this.setState({ data: updates }, () => this.props.onWorkingHourChange(updates))
	}

	render() {
		const { data } = this.state

		return (
			<Table>
				<Thead>
					<Tr>
						<Th style={{ textAlign: 'center' }}>Time</Th>
						<Th style={{ textAlign: 'center' }}>Sunday</Th>
						<Th style={{ textAlign: 'center' }}>Monday</Th>
						<Th style={{ textAlign: 'center' }}>Tuesday</Th>
						<Th style={{ textAlign: 'center' }}>Wednesday</Th>
						<Th style={{ textAlign: 'center' }}>Thursday</Th>
						<Th style={{ textAlign: 'center' }}>Friday</Th>
						<Th style={{ textAlign: 'center' }}>Saturday</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data.map((currentItem) => {
						const { key, time, ...values } = currentItem
						return (
							<Tr key={key}>
								<Td style={{ textAlign: 'center' }}>{time}</Td>
								{Object.keys(values).map((day) => {
									const isChecked = currentItem[day]
									return (
										<DesktopClickableTd
											key={`${day}_${key}`}
											onClick={(e) => this.handleChange(key, day, !isChecked, currentItem)}
											checked={isChecked}
										/>
									)
								})}
							</Tr>
						)
					})}
				</Tbody>
			</Table>
		)
	}
}

const DesktopClickableTd = styled(Td)`
	cursor: pointer;
	min-width: 75px;
	text-align: center;
	background-color: ${(props) => (props.checked ? '#677b8c' : '#fff')};
	border-bottom: ${(props) => props.checked && 'none !important'};
	border-top: ${(props) => props.checked && 'none !important'};
`

/* For Mobile & Tab */

export class MobileAndTabWorkHourInput extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: clone(initialWorkingHourData),
		}
	}

	handleChange = (key, day, value, currentItem) => {
		currentItem[day] = value
		const updates = this.state.data.map((item) => {
			if (item.key === key) {
				return { ...item, ...currentItem }
			}
			return item
		})
		this.setState({ data: updates }, () => this.props.onWorkingHourChange(updates))
	}

	render() {
		const { data } = this.state
		const PanelOneData = Object.keys(weekPart1)
		const PanelTwo = Object.keys(weekPart2)

		return (
			<Collapse className='mobile-working-hour-input-collapse'>
				<Collapse.Panel header='Sunday - Wednesday' key='1' style={{ padding: 0 }}>
					<div className='hide-native-scrollbar' style={{ overflowX: 'auto' }}>
						<table className='customTable'>
							<thead>
								<tr>
									<th style={{ textAlign: 'center' }}>Time</th>
									<th style={{ textAlign: 'center' }}>Sun</th>
									<th style={{ textAlign: 'center' }}>Mon</th>
									<th style={{ textAlign: 'center' }}>Tue</th>
									<th style={{ textAlign: 'center' }}>Wed</th>
								</tr>
							</thead>
							<tbody>
								{data.map((currentItem) => {
									const { key, time, ...values } = currentItem
									return (
										<tr key={key}>
											<td>{time}</td>
											{Object.keys(values).map((day) => {
												if (!PanelOneData.includes(day)) return null
												const isChecked = currentItem[day]
												return (
													<MobileClickableTd
														key={`${day}_${key}`}
														onClick={(e) => this.handleChange(key, day, !isChecked, currentItem)}
														checked={isChecked}
													/>
												)
											})}
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				</Collapse.Panel>
				<Collapse.Panel header='Thursday - Saturday' key='2'>
					<div className='hide-native-scrollbar' style={{ overflowX: 'auto' }}>
						<table className='customTable'>
							<thead>
								<tr>
									<th style={{ textAlign: 'center' }}>Time</th>
									<th style={{ textAlign: 'center' }}>Thu</th>
									<th style={{ textAlign: 'center' }}>Fri</th>
									<th style={{ textAlign: 'center' }}>Sat</th>
								</tr>
							</thead>
							<tbody>
								{data.map((currentItem) => {
									const { key, time, ...values } = currentItem
									return (
										<tr key={key}>
											<td>{time}</td>
											{Object.keys(values).map((day) => {
												if (!PanelTwo.includes(day)) return null
												const isChecked = currentItem[day]
												return (
													<MobileClickableTd
														key={`${day}_${key}`}
														onClick={(e) => this.handleChange(key, day, !isChecked, currentItem)}
														style={{ width: '30%' }}
														checked={isChecked}
													/>
												)
											})}
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				</Collapse.Panel>
			</Collapse>
		)
	}
}

const MobileClickableTd = styled.td`
	cursor: pointer;
	text-align: center;
	width: 25%;
	background-color: ${(props) => (props.checked ? '#677b8c' : '#fff')};
	border-bottom: ${(props) => props.checked && 'none !important'};
	border-top: ${(props) => props.checked && 'none !important'};
`

export const isWorkingHourProvided = (workingHours) => {
	const workingHoursValueList = new Set(
		clone(workingHours)
			.map((y) => {
				const values = []
				Object.keys(y).forEach((item) => {
					if (typeof y[item] === 'boolean') {
						values.push(y[item].toString())
					}
				})
				return values
			})
			.flat()
	)
	// console.log(workingHoursValueList)
	if (workingHoursValueList.size === 1 && workingHoursValueList.has('false')) {
		return false
	} else {
		return true
	}
}
