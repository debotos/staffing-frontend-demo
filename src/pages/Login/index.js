import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { LockOutlined, MailOutlined, UserAddOutlined, LoginOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { history } from '../../app/AppRoutes'
import signInBG from '../../assets/signInBG.jpg'
import Logo from '../../assets/logo.png'
import { Container, Image, Box } from '../SignUp'
import { setCurrentUser } from '../../redux/actions/authActions'
import variables from '../../config/vars'
import keys from '../../config/keys'

const { USER_DATA, JOB_APPLYING_DATA } = variables
const { ROUTES } = keys

export class Login extends Component {
	onFinish = (values) => {
		console.log('Success:', values)
		// TODO: Ajax req to send the data | pass res to redux
		this.formRef.current.resetFields()
		localStorage.setItem(USER_DATA, JSON.stringify(values))
		/* Save to Redux for app use*/
		/* Also it will instantly redirect the user to Dashboard page */
		this.props.setUser(values)
		/* If they came to this page via selecting a job then redirect to apply */
		if (localStorage[JOB_APPLYING_DATA]) {
			history.push(ROUTES.apply)
		}
	}

	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	constructor(props) {
		super(props)
		this.formRef = React.createRef()
	}

	render() {
		return (
			<Container fluid bg={signInBG}>
				<Box>
					<Image src={Logo} alt='Care Pine Home Health' />
					<h3 style={{ margin: '10px 0' }}>Caring Nurses and Therapists to Your Home, Today!</h3>
					<h5 style={{ margin: '10px 0' }}>Welcome Back, Please login to you account</h5>
					<Form
						onFinish={this.onFinish}
						onFinishFailed={this.onFinishFailed}
						layout='vertical'
						ref={this.formRef}
						labelAlign='left'
						initialValues={{ remember: true }}
					>
						<Form.Item
							label='Email Address'
							name='email'
							hasFeedback
							validateFirst
							rules={[
								{ whitespace: true, required: true, message: 'Provide email address!' },
								{ type: 'email', message: 'Invalid email address!' },
							]}
						>
							<Input prefix={<MailOutlined />} allowClear placeholder='Email address' />
						</Form.Item>

						<Form.Item
							label='Password'
							name='password'
							hasFeedback
							validateFirst
							rules={[{ whitespace: true, required: true, message: 'Please input your Password!' }]}
						>
							<Input.Password prefix={<LockOutlined />} placeholder='Password' allowClear />
						</Form.Item>

						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<Form.Item name='remember' valuePropName='checked'>
								<Checkbox>Remember me</Checkbox>
							</Form.Item>

							<Link to='/forget-password'>Forget Password</Link>
						</div>

						<div style={{ margin: '5px 0', display: 'flex', justifyContent: 'space-between' }}>
							<Button icon={<LoginOutlined />} type='primary' htmlType='submit'>
								Sign In
							</Button>
							<Button
								icon={<UserAddOutlined />}
								type='dashed'
								htmlType='button'
								onClick={() => history.push(ROUTES.signup)}
							>
								Sign Up
							</Button>
						</div>
					</Form>
				</Box>
			</Container>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	setUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(null, mapDispatchToProps)(Login)
