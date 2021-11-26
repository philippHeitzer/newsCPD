import React from 'react'
import { View, Text, TextInput, Switch } from 'react-native'
import { styles } from '../styles/styles'
import { useState } from 'react'
import { useEffect } from 'react'
import { getCity, getMetric, storeCity, storeMetric } from '../services/settings/Settings'

export default function SettingsScreen({ navigation }) {
	const [ metric, setMetric ] = useState(true)
	const [ city, setCity ] = useState("")
	const [ errorMessage, setErrorMessage ] = useState("")
	const [ save, setSave ] = useState(false)

	async function storeSettings() {
		setErrorMessage("")
		try {
			await storeCity(city)
			await storeMetric(metric)
		} catch(error) {
			console.log("Could not store settings: " + error)
			setErrorMessage("Could not store settings.")
		}
	}

	useEffect(() => {
		async function init() {
			setCity(await getCity())
			setMetric(await getMetric())
		}
		init()
	}, [])

	useEffect(() => {
		const unsubscribe = navigation.addListener('beforeRemove', async () => {
			setSave(true)
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		if (save)
			storeSettings()
	}, [save])
	return (
		<View style={styles.container}>
			{errorMessage.length > 0 ?
				<View style={styles.settingsContainer}>
					<Text style={styles.errorMessage}>{errorMessage}</Text>
				</View> :
				null
			}
			<View style={styles.settingsContainer}>
				<Text style={styles.settingsCaption}>City</Text>
				<TextInput style={styles.settingsValue} value={city} onChangeText={(value) => setCity(value) }/>
			</View>
			<View style={styles.settingsContainer}>
				<Text style={styles.settingsCaption}>Metric units</Text>
				<Text style={styles.settingsValue}>Use metric (enabled) or imperial (disabled) units.</Text>
				<Switch style={styles.settingsValue} value={metric} onValueChange={(value) => setMetric(value) }/>
			</View>
		</View>
	)
}
