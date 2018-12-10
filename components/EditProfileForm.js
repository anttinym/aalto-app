// @flow

import React from 'react'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar, UploadImage, StreamApp } from 'react-native-activity-feed'
import CoverImage from './CoverImage'
import FormField from './FormField'
import type { UserData, StreamAppCtx } from '../types'

type Props = {|
	registerSave: (saveFunc: () => any) => void
|}

export default function EditProfileForm(props: Props) {
	return (
		<StreamApp.Consumer>
			{appCtx => <EditProfileFormInner {...props} {...appCtx} />}
		</StreamApp.Consumer>
	)
}

type PropsInner = {| ...Props, ...StreamAppCtx |}

type State = UserData

class EditProfileFormInner extends React.Component<PropsInner, State> {
	constructor(props: PropsInner) {
		super(props)
		this.state = { ...props.user.data }
	}

	componentDidMount() {
		const { registerSave } = this.props
		registerSave(async () => {
			const { user, changedUserData } = this.props
			await user.update(this.state)
			changedUserData()
		})
	}

	_onUploadButtonPress() {}

	render() {
		const { name, url, desc, coverImage, profileImage } = this.state
		return (
			<KeyboardAwareScrollView
				style={{ flex: 1, backgroundColor: '#ffffff' }}
			>
				<CoverImage source={coverImage} size={150} />
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'flex-end',
						paddingRight: 15,
						paddingLeft: 15,
						height: 200
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: 100 + '%'
						}}
					>
						<Avatar
							source={profileImage}
							size={100}
							editButton
							onUploadButtonPress={this._onUploadButtonPress}
						/>
						<UploadImage
							onUploadButtonPress={this._onUploadButtonPress}
						/>
					</View>
				</View>
				<View style={{ padding: 15 }}>
					<FormField
						value={name}
						label="Name"
						onChangeText={text => this.setState({ name: text })}
					/>
					<FormField
						value={url}
						label="Website"
						onChangeText={text => this.setState({ url: text })}
					/>
					<FormField
						value={desc}
						label="Description"
						onChangeText={text => this.setState({ desc: text })}
						multiline
					/>
				</View>
			</KeyboardAwareScrollView>
		)
	}
}
