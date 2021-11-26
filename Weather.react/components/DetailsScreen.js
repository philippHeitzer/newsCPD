import React from 'react'
import { Image, View, Text, ScrollView } from 'react-native'
import { styles } from '../styles/styles'

function DetailsScreen({ route }) {
	const { item, metric } = route.params

	return (
		<View style={styles.detailsContainer}>
			<Text style={styles.itemHeading}>{item.getDateString()}</Text>
			<View style={styles.itemLine}>
				<Image style={styles.itemImage} source={item.getImageLink()}/>
				<Text style={styles.itemText}>{item.weatherConditionText}</Text>
			</View>
			<ScrollView>
				<Text style={styles.itemCaption}>Temperature</Text>
				<Text style={styles.itemText}>{item.getTemperatureString(metric)}</Text>
				<Text style={styles.itemCaption}>Pressure:</Text>
				<Text style={styles.itemText}>{item.getPressureString(metric)}</Text>
				<Text style={styles.itemCaption}>Humidity:</Text>
				<Text style={styles.itemText}>{item.getHumidityString(metric)}</Text>
				<Text style={styles.itemCaption}>Cloud cover:</Text>
				<Text style={styles.itemText}>{item.getCloudCoverString(metric)}</Text>
				<Text style={styles.itemCaption}>Wind speed:</Text>
				<Text style={styles.itemText}>{item.getWindSpeedString(metric)}</Text>
				<Text style={styles.itemCaption}>Wind direction:</Text>
				<Text style={styles.itemText}>{item.getWindDirectionString(metric)}</Text>
				<Text style={styles.itemCaption}>Rain (last 3h):</Text>
				<Text style={styles.itemText}>{item.getRainLast3hString(metric)}</Text>
				<Text style={styles.itemCaption}>Snow (last 3h):</Text>
				<Text style={styles.itemText}>{item.getSnowLast3hString(metric)}</Text>
			</ScrollView>
		</View>
	)
}

export default DetailsScreen
