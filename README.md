# Care Pine Home Health Client App

## Available Scripts

- `yarn install` [Install dependency]
- `yarn start` [Open [http://localhost:3000](http://localhost:3000) to view it in the browser.]
- `yarn test` [Launches the test runner in the interactive watch mode.]
- `yarn build` [Builds the app for production to the `build` folder.]
- `yarn eject` [**Note: this is a one-way operation. Once you `eject`, you can’t go back!**]

> **In local development install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) VS Code Extensions**

## Project Structure

<!-- prettier-ignore-start -->
```md
|-- Care Pine Home Health Client App
    |-- .eslintrc
    |-- .gitignore
    |-- .prettierrc
    |-- README.md
    |-- craco.config.js
    |-- package.json
    |-- yarn.lock
    |-- .vscode
    |   |-- settings.json
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- logo.png
    |   |-- logo192.png
    |   |-- logo512.png
    |   |-- manifest.json
    |   |-- robots.txt
    |-- src
        |-- .DS_Store
        |-- index.js
        |-- serviceWorker.js
        |-- setupTests.js
        |-- app
        |   |-- App.js
        |   |-- App.scss
        |   |-- App.test.js
        |   |-- AppRoutes.js
        |-- assets
        |   |-- .DS_Store
        |   |-- logo.png
        |   |-- signInBG.jpg
        |   |-- signUpBG.jpg
        |-- components
        |   |-- .DS_Store
        |   |-- ResponsiveTable
        |   |   |-- index.js
        |   |   |-- style.css
        |   |   |-- tableContext.js
        |   |-- UI
        |   |   |-- Button.js
        |   |   |-- TableUtils.js
        |   |   |-- Loading
        |   |   |   |-- LoadingCenter.js
        |   |   |   |-- Overlay.js
        |   |   |   |-- index.js
        |   |   |-- input
        |   |       |-- WorkHourInput.js
        |   |-- common
        |       |-- Device.js
        |       |-- Footer.js
        |       |-- Header.js
        |-- config
        |   |-- apiEndpoints.js
        |   |-- keys.js
        |   |-- vars.js
        |-- navigation
        |   |-- AuthenticateDrawer.js
        |   |-- Backdrop.js
        |   |-- CommonUI.js
        |   |-- NonAuthenticateDrawer.js
        |   |-- drawer-navigation.css
        |   |-- index.js
        |-- pages
        |   |-- Administration
        |   |   |-- index.js
        |   |-- Billing
        |   |   |-- index.js
        |   |-- Clinical
        |   |   |-- index.js
        |   |-- Dashboard
        |   |   |-- index.js
        |   |-- EmploymentApplication
        |   |   |-- AgreementInfoForm.js
        |   |   |-- index.js
        |   |   |-- EducationInfoForm
        |   |   |   |-- AddEducationInfo.js
        |   |   |   |-- EditEducationInfo.js
        |   |   |   |-- EducationInfoTable.js
        |   |   |   |-- index.js
        |   |   |-- EmploymentInfoForm
        |   |   |   |-- AddEmploymentInfo.js
        |   |   |   |-- EditEmploymentInfo.js
        |   |   |   |-- EmploymentInfoTable.js
        |   |   |   |-- index.js
        |   |   |-- PersonalInfoForm
        |   |   |   |-- index.js
        |   |   |   |-- EmergencyContact
        |   |   |       |-- EmergencyContactAdd.js
        |   |   |       |-- EmergencyContactEdit.js
        |   |   |       |-- EmergencyContactTable.js
        |   |   |-- ReferencesInfoForm
        |   |       |-- AddReferenceInfo.js
        |   |       |-- EditReferenceInfo.js
        |   |       |-- ReferenceInfoTable.js
        |   |       |-- index.js
        |   |-- HR
        |   |   |-- index.js
        |   |-- Intake
        |   |   |-- index.js
        |   |   |-- Clinical
        |   |   |   |-- index.js
        |   |   |   |-- AdvanceDirective
        |   |   |   |   |-- AddAdvanceDirective.js
        |   |   |   |   |-- AdvanceDirectiveTable.js
        |   |   |   |   |-- EditAdvanceDirective.js
        |   |   |   |-- Allergies
        |   |   |   |   |-- AddAllergies.js
        |   |   |   |   |-- AllergiesTable.js
        |   |   |   |   |-- EditAllergies.js
        |   |   |   |-- Diagnosis
        |   |   |   |   |-- AddDiagnosis.js
        |   |   |   |   |-- DiagnosisTable.js
        |   |   |   |   |-- EditDiagnosis.js
        |   |   |   |-- InpatientEvents
        |   |   |   |   |-- AddInpatientEvents.js
        |   |   |   |   |-- EditInpatientEvents.js
        |   |   |   |   |-- InpatientEventsTable.js
        |   |   |   |-- Physician
        |   |   |   |   |-- AddPhysician.js
        |   |   |   |   |-- EditPhysician.js
        |   |   |   |   |-- PhysicianTable.js
        |   |   |   |-- Vaccination
        |   |   |       |-- AddVaccination.js
        |   |   |       |-- EditVaccination.js
        |   |   |       |-- VaccinationTable.js
        |   |   |-- Demographics
        |   |   |   |-- index.js
        |   |   |   |-- Contact
        |   |   |   |   |-- ContactAdd.js
        |   |   |   |   |-- ContactEdit.js
        |   |   |   |   |-- ContactTable.js
        |   |   |   |-- ServiceLocation
        |   |   |       |-- ServiceLocationAdd.js
        |   |   |       |-- ServiceLocationEdit.js
        |   |   |       |-- ServiceLocationTable.js
        |   |   |-- PayorSource
        |   |   |   |-- index.js
        |   |   |   |-- PayorSource
        |   |   |       |-- AddPayorSource.js
        |   |   |       |-- EditPayorSource.js
        |   |   |       |-- PayorSourceTable.js
        |   |   |       |-- Authorization
        |   |   |           |-- AddAuthorization.js
        |   |   |           |-- AuthorizationTable.js
        |   |   |           |-- EditAuthorization.js
        |   |   |           |-- AuthorizationDetails
        |   |   |               |-- AuthorizationDetailsAdd.js
        |   |   |               |-- AuthorizationDetailsEdit.js
        |   |   |               |-- AuthorizationDetailsTable.js
        |   |   |-- Referral
        |   |   |   |-- index.js
        |   |   |   |-- ReferralSource
        |   |   |       |-- AddReferralSource.js
        |   |   |       |-- EditReferralSource.js
        |   |   |       |-- ReferralSourceTable.js
        |   |   |       |-- CaseManager
        |   |   |           |-- AddCaseManager.js
        |   |   |           |-- CaseManagerTable.js
        |   |   |           |-- EditCaseManager.js
        |   |   |-- Request
        |   |       |-- index.js
        |   |-- JobListing
        |   |   |-- index.js
        |   |-- Login
        |   |   |-- index.js
        |   |-- Marketing
        |   |   |-- index.js
        |   |-- PayRoll
        |   |   |-- index.js
        |   |-- Reports
        |   |   |-- index.js
        |   |-- Schedule
        |   |   |-- index.js
        |   |-- SignUp
        |   |   |-- index.js
        |   |-- Workflow
        |       |-- index.js
        |-- redux
        |   |-- actions
        |   |   |-- authActions.js
        |   |   |-- types.js
        |   |-- reducers
        |   |   |-- authReducer.js
        |   |   |-- index.js
        |   |-- store
        |       |-- index.js
        |-- semantic-ui
        |   |-- theme.config
        |   |-- site
        |       |-- collections
        |       |   |-- breadcrumb.overrides
        |       |   |-- breadcrumb.variables
        |       |   |-- form.overrides
        |       |   |-- form.variables
        |       |   |-- grid.overrides
        |       |   |-- grid.variables
        |       |   |-- menu.overrides
        |       |   |-- menu.variables
        |       |   |-- message.overrides
        |       |   |-- message.variables
        |       |   |-- table.overrides
        |       |   |-- table.variables
        |       |-- elements
        |       |   |-- button.overrides
        |       |   |-- button.variables
        |       |   |-- container.overrides
        |       |   |-- container.variables
        |       |   |-- divider.overrides
        |       |   |-- divider.variables
        |       |   |-- flag.overrides
        |       |   |-- flag.variables
        |       |   |-- header.overrides
        |       |   |-- header.variables
        |       |   |-- icon.overrides
        |       |   |-- icon.variables
        |       |   |-- image.overrides
        |       |   |-- image.variables
        |       |   |-- input.overrides
        |       |   |-- input.variables
        |       |   |-- label.overrides
        |       |   |-- label.variables
        |       |   |-- list.overrides
        |       |   |-- list.variables
        |       |   |-- loader.overrides
        |       |   |-- loader.variables
        |       |   |-- rail.overrides
        |       |   |-- rail.variables
        |       |   |-- reveal.overrides
        |       |   |-- reveal.variables
        |       |   |-- segment.overrides
        |       |   |-- segment.variables
        |       |   |-- step.overrides
        |       |   |-- step.variables
        |       |-- globals
        |       |   |-- reset.overrides
        |       |   |-- reset.variables
        |       |   |-- site.overrides
        |       |   |-- site.variables
        |       |-- modules
        |       |   |-- accordion.overrides
        |       |   |-- accordion.variables
        |       |   |-- chatroom.overrides
        |       |   |-- chatroom.variables
        |       |   |-- checkbox.overrides
        |       |   |-- checkbox.variables
        |       |   |-- dimmer.overrides
        |       |   |-- dimmer.variables
        |       |   |-- dropdown.overrides
        |       |   |-- dropdown.variables
        |       |   |-- embed.overrides
        |       |   |-- embed.variables
        |       |   |-- modal.overrides
        |       |   |-- modal.variables
        |       |   |-- nag.overrides
        |       |   |-- nag.variables
        |       |   |-- popup.overrides
        |       |   |-- popup.variables
        |       |   |-- progress.overrides
        |       |   |-- progress.variables
        |       |   |-- rating.overrides
        |       |   |-- rating.variables
        |       |   |-- search.overrides
        |       |   |-- search.variables
        |       |   |-- shape.overrides
        |       |   |-- shape.variables
        |       |   |-- sidebar.overrides
        |       |   |-- sidebar.variables
        |       |   |-- sticky.overrides
        |       |   |-- sticky.variables
        |       |   |-- tab.overrides
        |       |   |-- tab.variables
        |       |   |-- transition.overrides
        |       |   |-- transition.variables
        |       |-- views
        |           |-- ad.overrides
        |           |-- ad.variables
        |           |-- card.overrides
        |           |-- card.variables
        |           |-- comment.overrides
        |           |-- comment.variables
        |           |-- feed.overrides
        |           |-- feed.variables
        |           |-- item.overrides
        |           |-- item.variables
        |           |-- statistic.overrides
        |           |-- statistic.variables
        |-- utils
            |-- PrivateRoute.js
            |-- PublicRoute.js
            |-- helpers.js

```
<!-- prettier-ignore-end -->
