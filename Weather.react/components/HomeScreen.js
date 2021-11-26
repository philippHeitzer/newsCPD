import React from 'react'
import { Image, View, FlatList, Text, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native'
import { styles } from '../styles/styles'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLayoutEffect } from 'react'
import cacheWeatherData from '../services/data/OpenWeatherMapService'
import { getCity, getMetric, getLastCity, storeLastCity } from '../services/settings/Settings'
import repository from '../database/Repository';
import * as BackgroundFetch from 'expo-background-fetch';



var errorMessageState= {}
var fetchingState ={}
var settingsState = {}
var metricsState = {}



export async function onLoadData(clear) {
	fetchingState.setFetching(true)
	try {
		errorMessageState.setErrorMessage('')
		const city = settingsState.settings['city']
		await cacheWeatherData(city, clear)
		metricsState.setOldMetric(settingsState.settings['metric'])
		settingsState.settings['lastCity'] = city
		await storeLastCity(city)
	} catch (error) {
		console.log('Fetch error: ' + error)
		errorMessageState.setErrorMessage('Could not download data. Please try again later.')
	}
	fetchingState.setFetching(false)
}

function HomeScreen({ navigation }) {
	

	const [weatherList, setWeatherList] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	errorMessageState = {message: String, setErrorMessage: setErrorMessage}

	const [isFetching, setFetching] = useState(false)
	fetchingState = {fetching : Boolean, setFetching: setFetching}

	const [settings, setSettings] = useState({'city': '', metric: true, 'lastCity': ''})
	settingsState = {settings, setSettings}
	
	const [oldMetric, setOldMetric] = useState(true)
	metricsState = {oldMetric : Boolean, setOldMetric}
	
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableNativeFeedback onPress={() => navigation.navigate('Settings')}>
					<Text style={styles.settingsButton}>{'\uf992 '}</Text>
				</TouchableNativeFeedback>
			),
		})
	}, [navigation])
	
	function onRefresh(items) {
		setWeatherList(items)
	}

	
	function itemClicked(item) {
		BackgroundFetchResult.
		navigation.navigate('Weather Details', { item: item, metric: settings['metric'] })
	}

	useEffect(() => {
		repository.registerFutureItems((items) => onRefresh(items), (err)=>setErrorMessage(err))	
	}, [])

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', async () => {
			var c = await getCity()
			var m = await getMetric()
			var l = await getLastCity();
			setSettings({'city': c, 'lastCity': l, 'metric': m});
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		async function run() {
			if (settings['city'] !== settings['lastCity']) {
				await onLoadData(true);
			} else if (settings['metric'] !== oldMetric) {
				setWeatherList(weatherList)
				setOldMetric(settings['metric'])
			}
		}
		run()
	}, [settings])

	return (
		<View style={styles.container}>
			{errorMessage.length > 0 ?
				<Text style={styles.errorMessage} visible={errorMessage.length > 0}>{errorMessage}</Text>:
				null}
			<FlatList
				data={weatherList}
				onRefresh={async () => await onLoadData(false) }
				refreshing={isFetching}
				keyExtractor={(item) => item.forecastDate.toString()}
				renderItem={({ item, index }) => {
					if (index == 0) {
						return (
							<TouchableWithoutFeedback onPress={() => itemClicked(item)}>
								<View style={styles.listItemFirst}>
									<Image style={styles.listItemFirstImage} source={item.getImageLink()}/>
									<View sytle={styles.listItemFirstContainer}>
										<Text style={styles.listItemFirstHeading}>{item.getDateString()}</Text>
										<Text style={styles.listItemFirstText}>{item.weatherConditionText}</Text>
										<Text style={styles.listItemFirstText}>{item.getTemperatureString(settings['metric'])}</Text>
									</View>
								</View>
							</TouchableWithoutFeedback>
						)
					} else {
						return (
							<TouchableWithoutFeedback onPress={() => itemClicked(item)}>
								<View style={styles.listItem}>
									<Image style={styles.listItemImage} source={item.getImageLink()}/>
									<View sytle={styles.listItemContainer}>
										<Text style={styles.listItemText}>{item.getDateString()}</Text>
										<Text style={styles.listItemText}>{item.getTemperatureString(settings['metric'])}</Text>
									</View>
								</View>
							</TouchableWithoutFeedback>
						)
					}
				}}
			/>
		</View>
	)
}

export default HomeScreen
