import dateFormat from "dateformat";

export default class WeatherModel {
	constructor(
		id,
		forecastDate,
		temperature,
		pressure,
		humidity,
		weatherIcon,
		weatherConditionCode,
		weatherConditionText,
		cloudCover,
		windSpeed,
		windDirection,
		rainLast3h,
		snowLast3h) {
		this.id = id
		this.forecastDate = forecastDate
		this.temperature = temperature
		this.pressure = pressure
		this.humidity = humidity
		this.weatherIcon = weatherIcon
		this.weatherConditionCode = weatherConditionCode
		this.weatherConditionText = weatherConditionText
		this.cloudCover = cloudCover
		this.windSpeed = windSpeed
		this.windDirection = windDirection
		this.rainLast3h = rainLast3h
		this.snowLast3h = snowLast3h
	}

	static fromRow(row) {
		return new WeatherModel(row['id'],
			row['forecastDate'],
			row['temperature'],
			row['pressure'],
			row['humidity'],
			row['weatherIcon'],
			row['weatherConditionCode'],
			row['weatherConditionText'],
			row['cloudCover'],
			row['windSpeed'],
			row['windDirection'],
			row['rainLast3h'],
			row['snowLast3h'])
	}

	toString(){
		return '[' + 
			this.id + ', ' + 
			this.forecastDate + ', ' + 
			this.temperature + ', ' + 
			this.pressure + ', ' + 
			this.humidity + ', ' + 
			this.weatherIcon + ', ' + 
			this.weatherConditionCode + ', ' + 
			this.weatherConditionText + ', ' + 
			this.cloudCover + ', ' + 
			this.windSpeed + ', ' + 
			this.windDirection + ', ' + 
			this.rainLast3h + ', ' + 
			this.snowLast3h + ']'
	}

	getDateString() {
		return dateFormat(new Date(this.forecastDate), "dd.mm.yyyy HH:MM")
	}

	getTemperatureString(metric) {
		if (metric)
			return this.temperature.toFixed(2) + " C"
		else
			return (1.8 * this.temperature + 32.0).toFixed(2) + " F"
	}

	getRainLast3hString(metric) {
		if (metric)
			return this.rainLast3h.toFixed(2) + ' mm/hr'
		else
			return (this.rainLast3h * 0.039370).toFixed(2) + ' in/hr'
	}

	getSnowLast3hString(metric) {
		if (metric)
			return this.snowLast3h.toFixed(2) + ' mm/hr'
		else
			return (this.snowLast3h * 0.039370).toFixed(2) + ' in/hr'
	}

	getWindSpeedString(metric) {
		if (metric)
			return this.windSpeed.toFixed(2) + ' kph'
		else
			return (this.windSpeed * 0.62137).toFixed(2) + ' mph'
	}

	getWindDirectionString(metric) {
		return this.windDirection.toFixed(2) + ' deg'
	}

	getPressureString(metric) {
		return this.pressure.toFixed(2) + ' hPa'
	}

	getHumidityString(metric) {
		return this.humidity.toFixed(2) + ' %'
	}

	getCloudCoverString(metric) {
		return this.cloudCover.toFixed(2) + ' %'
	}

	getImageLink() {
		switch(this.weatherIcon) {
			case "01d":
				return require("../img/icon01d.png")
			case "01n":
				return require("../img/icon01n.png")
			case "02d":
				return require("../img/icon02d.png")
			case "02n":
				return require("../img/icon02n.png")
			case "03d":
				return require("../img/icon03d.png")
			case "03n":
				return require("../img/icon03n.png")
			case "04d":
				return require("../img/icon04d.png")
			case "04n":
				return require("../img/icon04n.png")
			case "09d":
				return require("../img/icon09d.png")
			case "09n":
				return require("../img/icon09n.png")
			case "10d":
				return require("../img/icon10d.png")
			case "10n":
				return require("../img/icon10n.png")
			case "11d":
				return require("../img/icon11d.png")
			case "11n":
				return require("../img/icon11n.png")
			case "13d":
				return require("../img/icon13d.png")
			case "13n":
				return require("../img/icon13n.png")
			case "50d":
				return require("../img/icon50d.png")
			case "50n":
				return require("../img/icon50n.png")
			default:
				return null
		}
	}
}
