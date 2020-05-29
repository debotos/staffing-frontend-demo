import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, UserAddOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import signUpBG from '../../assets/signUpBG.jpg'
import Logo from '../../assets/logo.png'
import { passwordValidationRegex } from '../../utils/helpers'

export class SignUp extends Component {
	onFinish = (values) => {
		console.log('Success:', values)
		// TODO: Ajax req to send the data
		this.formRef.current.resetFields()
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
			<Container fluid bg={signUpBG}>
				<Box>
					<Image src={Logo} alt='Care Pine Home Health' />
					<h3 style={{ margin: '10px 0', display: 'flex' }}>Register</h3>
					<Form
						onFinish={this.onFinish}
						onFinishFailed={this.onFinishFailed}
						layout='vertical'
						ref={this.formRef}
						labelAlign='left'
					>
						<Form.Item
							label='First Name'
							name='firstName'
							hasFeedback
							validateFirst
							rules={[
								{ whitespace: true, required: true, message: 'Provide first name!' },
								{ min: 2, message: 'Too short!' },
								{ max: 30, message: 'Too long!' },
							]}
						>
							<Input prefix={<UserOutlined />} allowClear placeholder='First name' />
						</Form.Item>

						<Form.Item
							label='Last Name'
							name='lastName'
							hasFeedback
							validateFirst
							rules={[
								{ whitespace: true, required: true, message: 'Provide last name!' },
								{ min: 2, message: 'Too short!' },
								{ max: 30, message: 'Too long!' },
							]}
						>
							<Input prefix={<UserOutlined />} allowClear placeholder='Last name' />
						</Form.Item>

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
							rules={[
								{ whitespace: true, required: true, message: 'Please input your Password!' },
								{ min: 8, message: 'Password must be more than 8 characters! ' },
								{
									pattern: passwordValidationRegex,
									message:
										'Provide a strong password. Mix of Uppercase, Lowercase, Special Character and Number!',
								},
							]}
						>
							<Input.Password prefix={<LockOutlined />} placeholder='Password' allowClear />
						</Form.Item>

						<Form.Item
							label='Confirm Password'
							name='confirm'
							dependencies={['password']}
							hasFeedback
							rules={[
								{ required: true, message: 'Please confirm your password!' },
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve()
										}
										return Promise.reject("Passwords don't match!")
									},
								}),
							]}
						>
							<Input.Password prefix={<LockOutlined />} placeholder='Password' allowClear />
						</Form.Item>

						<div style={{ margin: '20px 0 10px 0', display: 'flex', justifyContent: 'center' }}>
							<Button icon={<UserAddOutlined />} type='primary' htmlType='submit'>
								Sign Up
							</Button>
						</div>

						<Link to='/login'>Sign In</Link>
					</Form>
				</Box>
			</Container>
		)
	}
}

export default SignUp

export const Container = styled.div`
	width: 100%;
	height: 100%;
	min-height: 100vh;
	background: ${(props) => `url(${props.bg}) no-repeat`};
	background-size: cover;
	background-attachment: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
`
export const Box = styled.div`
	width: 100%;
	height: 100%;
	max-width: 430px;
	background-color: rgba(255, 255, 255, 0.9);
	padding: 1rem;
	margin: 15px;
	border-radius: 3px;
	text-align: center;
`
export const Image = styled.img`
	max-width: 150px;
	height: auto;
`
