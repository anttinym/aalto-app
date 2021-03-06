/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

import { connect } from 'react-redux'

import { authenticate, confirmUserLogin } from '../actions/actions'
import { fonts } from '../theme'

import Input from '../components/Input'
import Button from '../components/AuthButton'

class SignIn extends Component {
	state = {
		username: '',
		password: ''
	}

	onChangeText = (key, value) => {
		this.setState({
			[key]: value
		})
	}

	signIn() {
		const { username, password } = this.state
		const { dispatchAuthenticate } = this.props
		dispatchAuthenticate(username, password)
	}

	confirm() {
		const { authCode } = this.state
		const { dispatchConfirmUserLogin } = this.props
		dispatchConfirmUserLogin(authCode)
	}

	render() {
		// eslint-disable-next-line no-unused-vars
		const { fontsLoaded } = this.state
		const {
			auth: {
				signInErrorMessage,
				isAuthenticating,
				signInError,
				showSignInConfirmationModal
			}
		} = this.props
		const { username, password } = this.state
		return (
			<View style={styles.container}>
				<View style={styles.heading}>
					<Image
						source={require('../assets/shape.png')}
						style={styles.headingImage}
						resizeMode="contain"
					/>
				</View>
				<Text style={[styles.greeting]}>Welcome back,</Text>
				<Text style={[styles.greeting2]}>sign in to continue</Text>
				<View style={styles.inputContainer}>
					<Input
						placeholder="User Name"
						type="username"
						textAlign="left"
						onChangeText={this.onChangeText}
						value={username}
					/>
					<Input
						placeholder="Password"
						type="password"
						textAlign="left"
						onChangeText={this.onChangeText}
						value={password}
						secureTextEntry
					/>
				</View>

				<Button
					isLoading={isAuthenticating}
					title="Sign In"
					// eslint-disable-next-line react/jsx-no-bind
					onPress={this.signIn.bind(this)}
				/>
				<Text
					style={[
						styles.errorMessage,
						signInError && { color: 'black' }
					]}
				>
					Error logging in. Please try again.
				</Text>
				<Text
					style={[
						styles.errorMessage,
						signInError && { color: 'black' }
					]}
				>
					{signInErrorMessage}
				</Text>
				{showSignInConfirmationModal}
			</View>
		)
	}
}

const mapDispatchToProps = {
	dispatchConfirmUserLogin: authCode => confirmUserLogin(authCode),
	dispatchAuthenticate: (username, password) =>
		authenticate(username, password)
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignIn)

const styles = StyleSheet.create({
	modal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	heading: {
		flexDirection: 'row'
	},
	headingImage: {
		width: 38,
		height: 38
	},
	errorMessage: {
		fontSize: 12,
		marginTop: 10,
		color: 'transparent',
		fontFamily: fonts.base
	},
	inputContainer: {
		marginTop: 20
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 40
	},
	greeting: {
		marginTop: 20,
		fontSize: 24,
		fontFamily: fonts.light
	},
	greeting2: {
		color: '#666',
		fontSize: 24,
		marginTop: 5,
		fontFamily: fonts.light
	}
})
