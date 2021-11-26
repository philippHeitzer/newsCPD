import * as SQLite from 'expo-sqlite';
import WeatherModel from '../models/WeatherModel';

class Repository {
    constructor() {
        this.callbacks = []
        this.db = SQLite.openDatabase("weather_new6.db");
        this.db.transaction(tx => {
        tx.executeSql(
            'create table if not exists weather (' +
                ' id integer primary key autoincrement not null,' +
                ' forecastDate integer not null,' +
                ' temperature real not null,' +
                ' pressure real, '+
                ' humidity real, ' +
                ' weatherIcon text not null,' +
                ' weatherConditionCode integer,' +
                ' weatherConditionText text,' +
                ' cloudCover real,' +
                ' windSpeed real,' +
                ' windDirection real,' +
                ' rainLast3h real,' +
                ' snowLast3h  real,' +
                ' unique(forecastDate)' +
            ');'
        )
        },
        (err) => console.log(err));
    }

    insert(tx, item) {
        console.log('insert: ' + item)
        tx.executeSql(
            'insert into weather ' +
                '(forecastDate, temperature, pressure, humidity, weatherIcon, weatherConditionCode, weatherConditionText, cloudCover, windSpeed, windDirection, rainLast3h, snowLast3h)' +
                ' values ' + 
                '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
            [item.forecastDate, item.temperature, item.pressure,
                item.humidity, item.weatherIcon, item.weatherConditionCode,
                item.weatherConditionText , item.cloudCover, item.windSpeed,
                item.windDirection , item.rainLast3h , item.snowLast3h])
    }

    update(tx, item) {
        console.log('update: ' + item)
        tx.executeSql(
            'update weather' +
                ' set forecastDate=?, temperature=?, pressure=?, humidity=?, weatherIcon=?, weatherConditionCode=?, weatherConditionText=?, cloudCover=?, windSpeed=?, windDirection=?, rainLast3h=?, snowLast3h=?' +
                ' where id=?;',
            [item.forecastDate, item.temperature, item.pressure,
                item.humidity, item.weatherIcon, item.weatherConditionCode,
                item.weatherConditionText , item.cloudCover, item.windSpeed,
                item.windDirection , item.rainLast3h , item.snowLast3h,
                item.id])
    }

    delete(tx, item) {
        console.log('delete: ' + item)
        tx.executeSql(
            'DELETE FROM weather' +
                ' where id=?;',
            [item.id]
        )
    }

    saveItems(items, onSuccess, onError) {
        console.log('saveItems: ' + items)
        this.db.transaction(
            tx => {
                items.forEach(item => {
                    if (item.id == 0)
                        this.insert(tx, item)
                    else
                        this.update(tx, item)
                })
            },
            onError,
            () => {
                this.notify(onError)
                onSuccess()
            },
        )
    }

    saveAndDeleteItems(saveItems, deleteItems, onSuccess, onError) {
        console.log('saveAndDeleteItems: ' + saveItems + " | " + deleteItems)
        this.db.transaction(
            tx => {
                deleteItems.forEach(item => {
                    this.delete(tx, item)
                })
                saveItems.forEach(item => {
                    if (item.id == 0)
                        this.insert(tx, item)
                    else
                        this.update(tx, item)
                })
            },
            onError,
            () => {
                this.notify(onError)
                onSuccess()
            },
        )
    }

    deleteAll(onSuccess, onError) {
        console.log('deleteAll')
        this.db.transaction(
            tx => {
                tx.executeSql(
                    'DELETE FROM weather;'
                )
            },
            onError,
            () => {
                this.notify(onError)
                onSuccess()
            },
        )
    }

  getFutureItems(callbacks, onError) {
    var dt = new Date().getTime()
    console.log('getFutureItems: ' + dt)
    this.db.transaction(tx => {
      tx.executeSql(
        'select' + 
            ' id, forecastDate, temperature, pressure, humidity, weatherIcon, weatherConditionCode, weatherConditionText, cloudCover, windSpeed, windDirection, rainLast3h, snowLast3h' +
            ' from weather' +
            ' WHERE forecastDate >= ?' +
            ' ORDER BY forecastDate;',
        [dt],
        (_, { rows: { _array } }) => {
          const weatherArray = _array.map(row => WeatherModel.fromRow(row))
          console.log('getFutureItems: ' + weatherArray)
          callbacks.forEach((callback) => {
            callback(weatherArray)
          })
        }
      )},
      onError,
    )
  }

  getAllItems(onResult, onError) {
    console.log('getAllItems')
    this.db.transaction(tx => {
      tx.executeSql(
        'select' + 
            ' id, forecastDate, temperature, pressure, humidity, weatherIcon, weatherConditionCode, weatherConditionText, cloudCover, windSpeed, windDirection, rainLast3h, snowLast3h' +
            ' from weather' +
            ' ORDER BY forecastDate;',
        [],
        (_, { rows: { _array } }) => {
            const weatherArray = _array.map(row => WeatherModel.fromRow(row))
            console.log('getAllItems: ' + weatherArray)
            onResult(weatherArray)
        }
      )},
      onError,
    )
  }

  registerFutureItems(callback, onError) {
    console.log('registerFutureItems')
    this.callbacks = [...this.callbacks, callback]
    this.getFutureItems([callback], onError)
  }

  notify(onError) {
      if (this.callbacks.length > 0)
        this.getFutureItems(this.callbacks, onError)
  }
}

const repository = new Repository()
export default repository
