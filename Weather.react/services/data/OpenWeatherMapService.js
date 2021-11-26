import WeatherModel from '../../models/WeatherModel'
import repository from '../../database/Repository';

function fetchWithTimeout(url, options = {}, timeout = 7000) {
	return Promise.race([
		fetch(url, options),
		new Promise((_, reject) =>
			setTimeout(() => reject(new Error('Fetch timeout')), timeout)
		)
	])
}

async function getDataFromService(city) {
	const url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&mode=json&units=metric&appid=' +"da84e7503690946be2a793496aea0c3c"
	console.log(url)
	const response = await fetchWithTimeout(url, {}, 5000)	
	const json = await response.json()
	var list = []
	for (const obj of json.list) {
		list.push(new WeatherModel(
			0,
			obj.dt * 1000,
			obj.main.temp,
			obj.main.pressure,
			obj.main.humidity,
			obj.weather[0].icon,
			obj.weather[0].id,
			obj.weather[0].description,
			obj.clouds.all,
			obj.wind.speed,
			obj.wind.deg,
			obj?.rain?.["3h"] ?? 0.0,
			obj?.snow?.["3h"] ?? 0.0
		))
	}
	return list
}

export default async function cacheWeatherData(city, erase, onError) {
	var items = await getDataFromService(city)
	if (erase) {
		await new Promise((resolve, reject) => {
			repository.deleteAll(() => { return resolve() }, (err) => { return reject(err) })
		})
		return new Promise((resolve, reject) => {
			repository.saveItems(items, () => { return resolve() }, (err) => { return reject(err) })
		})
	} else {
		const currentItems = await new Promise((resolve, reject) => {
			repository.getAllItems(currentItems => { return resolve(currentItems) }, (err) => { return reject(err) })
		})
		var deleteItems = []
		for (const item of currentItems) {
			if (items.find(i => i.forecastDate == item.forecastDate) == null)
				deleteItems.push(item);
		}
		for (var item of items) {
			const currentItem = currentItems.find(i => i.forecastDate == item.forecastDate);
			if (currentItem != null)
				item.id = currentItem.id;
		}
		return new Promise((resolve, reject) => {
			repository.saveAndDeleteItems(items, deleteItems, () => { return resolve() }, (err) => { return reject(err) })
		})
	}
}
