import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';
import { useNavigation } from '@react-navigation/native';

function GiveClasses() {
	const { goBack } = useNavigation();

	const navigateBack = () => {
		goBack()
	}

	return (
		<View style={styles.container}>
			<ImageBackground 
				source={giveClassesBgImage}
				resizeMode='contain'
				style={styles.content}
			>
				<Text style={styles.title}>Quer ser um Proffy?</Text>
				<Text style={styles.description}>Para começar, você precisa se cadastrar como professor na nossa plataforma web.</Text>
			</ImageBackground>

			<RectButton
				style={styles.okButton}
				onPress={navigateBack}
			>
				<Text style={styles.okButtonText}>Tudo bem</Text>
			</RectButton>
		</View>
	)
}

export default GiveClasses;