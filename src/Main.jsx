import React, {Component} from 'react'
import styled from 'styled-components'
import {Countries} from './data'
import ForecastList from './ForecastList'
import SearchBox from './SearchBox'
import Picker from './Picker'
import Error from './Error'
import 'babel-polyfill'

export const SmallText = styled.span`
	font-size: ${props => props.size}px;
	font-weight: 600;
	margin-top: ${props => props.margin && props.margin}px;
	text-shadow: ${props => props.shadow && '4px 4px 0 rgba(0,0,0,0.1)'};
`

const Button = styled.input`
	background:#0783ED;
  	border-top: 1px solid #0783ED;
  	border-bottom: 1px solid #0783ED;
	color:white;
	border-right: 0;
`

class Main extends Component {

	constructor(props){
		super(props)
		this.state = { 
			forecast : [], 
			country : 'AU',
			current_temperature : '', 
		}
	}

	componentDidMount(){
		this.txtCity.value = 'sydney'
		this.getForecast();
	}

	getForecast = async (e) =>  {

		if(e) {
			e.preventDefault()
		}

		let city = this.txtCity.value
		let {country} = this.state 

		const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=fb1158dc7dfef5f0967ceac8f71ee3a6`

		let data = []

		try {
			let response = await fetch(url)
			let weeklyForecast = await response.json()

			const {list} = weeklyForecast

			list.forEach(x => {

				let date = x.dt_txt ? x.dt_txt.split(' ') : []

				if(date && date.length > 0 && !data.some(x => x.date === date[0])){
					
					let weather = {
						max : x.main.temp_max,
						min : x.main.temp_min,
						current : (Math.round(x.main.temp) - 273.15).toFixed(1),
						date: date[0],
						day: new Date(date[0]).getDay(), 
						icon: x.weather[0].icon,
						description: x.weather[0].main,
						humidity: x.main.humidity,
						pressure: x.main.pressure,
						wind: x.wind.speed,
						sealevel: x.main.sea_level
					}

					data = [...data, weather]
				}
			})
		} catch (error) {
			console.log('error')
		}

		this.setState({
			forecast : data
		}, this.showCurrentTemperature)
	}

	showCurrentTemperature = (index=0) => {

		let {forecast} = this.state;

		if(forecast && forecast.length > 0){

			let {humidity, pressure, wind, current} = forecast[index]

			this.setState({
				humidity,
				pressure,
				wind,
				current_temperature : current
			})
		}
	}

	setCountry = e => {
		this.setState({
			country : e.target.value
		})
	}
	
	render(){

		let {forecast} = this.state

		let options = Countries.map((item, index) => <option key={index} value={item.value}>{item.name}</option>)

		let hasRecords = forecast && forecast.length > 0 ? true : false

		return (
			<div className="main">
				<div className="container">
					<SearchBox submit={this.getForecast} >
						<input type="search" ref={x => this.txtCity = x} placeholder="city" required/>
						<select value={this.state.country} onChange={this.setCountry}>
							{options}
						</select>
						<Button type="submit" value="Search" />
					</SearchBox>
					{
						!hasRecords  ? 
						(
							<Error>No record found.</Error>
						) : 
						(
							<div className="layout">
								<Picker {...this.state} />
								<ForecastList list={forecast} click={this.showCurrentTemperature} />
							</div>
						)
					}
				</div>
			</div>
		)
	}
}

export default Main