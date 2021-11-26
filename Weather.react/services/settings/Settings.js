import AsyncStorage from '@react-native-async-storage/async-storage';

async function getSetting(key, defaultValue) {
	try {
		const value = await AsyncStorage.getItem(key)
		if(value !== null)
			return value
		return defaultValue
	} catch(e) {
		return defaultValue
	}
}

async function storeSetting(key, value) {
	await AsyncStorage.setItem(key, value)
}

export async function getCity() {
	return getSetting('city', 'Vienna,at')
}

export async function getLastCity() {
	return getSetting('lastCity', 'Vienna,at');
}

export async function getMetric() {
	const val = await getSetting('metric', 'true')
	return val === 'true'
}

export async function storeCity(value) {
	storeSetting('city', value)
}

export async function storeLastCity(value) {
	storeSetting('lastCity', value);
}

export async function storeMetric(value) {
	storeSetting('metric', value.toString())
}
