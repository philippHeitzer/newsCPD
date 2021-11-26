import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	detailsContainer: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 5,
	},
	item: {
		padding: 5,
	},
	itemCaption: {
		fontSize: 12,
		color: '#555',
		padding: 1,
		paddingTop: 8,
	},
	itemLine: {
		flexDirection: 'row',
		alignContent: 'center',
		paddingTop: 5,
		paddingBottom: 30,
	},
	itemImage: {
		padding: 10,
		width: 100,
	},
	itemHeading: {
		padding: 1,
		fontSize: 24,
	},
	itemText: {
		padding: 1,
		fontSize: 18,
	},
	listItem: {
		padding: 5,
		flexDirection: 'row',
		alignItems: 'center',
	},
	listItemFirst: {
		padding: 5,
		paddingTop: 10,
		paddingBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Platform.OS === 'android' ? '#03dac6' : 'rgb(0, 122, 255)',
	},
	listItemContainer: {
	},
	listItemFirstContainer: {
	},
	listItemFirstImage: {
		width: 100,
	},
	listItemImage: {
	},
	listItemText: {
		padding: 1,
		fontSize: 18,
	},
	listItemFirstHeading: {
		padding: 1,
		fontSize: 24,
		color: Platform.OS === 'android' ? '#000' : '#fff',
	},
	listItemFirstText: {
		padding: 1,
		fontSize: 20,
		color: Platform.OS === 'android' ? '#000' : '#fff',
	},
	errorMessage: {
		padding: 5,
		fontSize: 18,
		color: '#b00020',
	},
	settingsContainer: {
		padding: 5,
	},
	settingsCaption: {
		fontSize: 12,
		color: '#555',
	},
	settingsValue: {
		fontSize: 18,
	},
	settingsButton: {
		fontSize: 24,
		color: Platform.OS === 'android' ? '#fff' : '#000',
		padding: 5,
		fontFamily: 'HackNerdFont',
	},
})

export const titleBarStyle = (Platform.OS === 'android') ? {
	headerStyle: {
		backgroundColor: '#6200EE',
	},
	headerTintColor: '#fff',
		headerTitleStyle: {
		fontWeight: 'bold',
	},
} : {}
