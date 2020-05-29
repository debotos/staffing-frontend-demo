import React from 'react'
import { Label } from 'semantic-ui-react'
import { Modal } from 'antd'

export const checkFormSectionMissing = (
	finalValues,
	tabs,
	title = 'Missing required form fields!'
) => {
	console.log('Final values =>', finalValues)
	const sectionIds = Object.keys(finalValues)
	const errorInSections = []
	tabs.forEach((tab) => {
		const flag = sectionIds.includes(tab.id)
		if (!flag) errorInSections.push(tab.title)
	})
	if (errorInSections.length > 0) {
		const config = {
			title,
			content: (
				<div>
					<h4>
						Check the following tab{errorInSections.length > 0 ? 's' : ''} and fill the required
						fields then press 'Save and Continue' button.
					</h4>
					{errorInSections.map((section) => (
						<Label color={'red'} key={section} style={{ margin: 5 }}>
							{section}
						</Label>
					))}
				</div>
			),
		}
		Modal.error(config)
		return true
	} else {
		return false
	}
}
