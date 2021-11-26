import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './components/HomeScreen'
import DetailsScreen from './components/DetailsScreen'
import SettingsScreen from './components/SettingsScreen'
import { titleBarStyle }  from './styles/styles'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Platform, Text } from 'react-native';
import { useState } from 'react'
import { onLoadData } from './components/HomeScreen'
import repository from './database/Repository';



TaskManager.defineTask("updateTask", async () => {
	console.log("Refreshing from updateTask: " + Platform.OS +  " " + new Date().toLocaleString())
	await onLoadData(true)
	return 2
  });

  
const Stack = createStackNavigator()


function App() {

	useEffect(() => {

		

		console.log("Register: " + Platform.OS + " " + new Date().toLocaleString())
		
		BackgroundFetch.setMinimumIntervalAsync(3600)
		BackgroundFetch.registerTaskAsync("updateTask", {minimumInterval:3600, stopOnTerminate: false,delay: 3600,startOnBoot: false})
		
		async function init() {

			const currentItems = await new Promise((resolve, reject) => {
				repository.getAllItems(currentItems => { return resolve(currentItems) }, (err) => { return reject(err) })
			})
	
			let counter=0
			for (const item of currentItems) {
				counter+=1
			}
			if(counter==0)
			{
				console.log("Database is empty")
				BackgroundFetch.setMinimumIntervalAsync(1)
				BackgroundFetch.registerTaskAsync("updateTask", {minimumInterval: 1, stopOnTerminate: false,startOnBoot: true})
				
			}

			
			await ScreenOrientation.unlockAsync()
		}
		init()
		

	}, [])

	

	const [fontsLoaded] = useFonts({
		'HackNerdFont': require('./assets/fonts/Hack_Regular_Nerd_Font_Complete.ttf'),
	})

	if (!fontsLoaded) {
		return null
	}

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={titleBarStyle}>
				<Stack.Screen name="Weather" component={HomeScreen} />
				<Stack.Screen name="Weather Details" component={DetailsScreen} />
				<Stack.Screen name="Settings" component={SettingsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App
