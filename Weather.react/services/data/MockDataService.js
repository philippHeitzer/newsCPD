import WeatherModel from '../../models/WeatherModel'

Date.prototype.addHours = function(h) {
	this.setTime(this.getTime() + (h*60*60*1000))
	return this
}

export default function getDataFromService() {
	var list = []
	for (var i = 0; i < 20; i++) {
		const model = new WeatherModel(
			new Date().addHours(3 * i).getTime(),
			Math.random() * (30.0 + 10.0) - 10.0,
			Math.random() * (1030.0 - 1010.0) + 1010.0,
			Math.random() * (100.0 - 0.0) + 0.0,
			"10d",
			100,
			Math.random() * (100.0 - 0.0) + 0.0,
			Math.random() * (100.0 - 0.0) + 0.0,
			Math.random() * (360.0 - 0.0) + 0.0,
			Math.random() * (20.0 - 0.0) + 0.0,
			Math.random() * (20.0 - 0.0) + 0.0,
		)
		list.push(model)
	}
	return list
}

