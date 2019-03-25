import React, {Component} from 'react'
import styled from 'styled-components'
import fewclouds from './images/coolbreeze.png'
import lightrain from './images/heavyrainshower.png'
import brokenclouds from './images/lightrainfall.png'
import sunlightdrizzle from './images/sunlightdrizzle.png'
import clearsky from './images/sunny.png'
import thunderstorm from './images/thunderstorm.png'
import 'babel-polyfill'

const Days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Countries = [
	{
		value : 'IN',
		name : 'India'
	}, 
	{
		value : 'AU',
		name : 'Australia'
	}
]

const Images = {
	"02d": clearsky,
	"02n": fewclouds,
	"04d": brokenclouds,
	"10d": lightrain,
	"10n": sunlightdrizzle,
	"03d": thunderstorm
	//"04n","01n","01d","02n",
}

const Container = styled.div`
	height: 500px; 
	width: 600px;
	/* border: black 2px solid; */
	font-size: 14px;
	color: #0783ED;	
`

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	/* border: 5px solid green; */
	height: 450px;
`

const Forecast = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-around;
`

const Box = styled.div`
	display: flex;
	border: 0.2px solid black;
	flex-flow: column nowrap;
	padding: 0px;
	margin: 0px;
	align-items: center;
	justify-content: space-around;
	height: 150px;
	padding: 0px 25px;
`

const Icon = styled.img`
	margin: 10px 0px;
	/* height: 75px;
	max-width: 100px; */
`

const SmallText = styled.span`
	font-size: ${props => props.size}px;
	font-weight: 600;
	margin-top: ${props => props.margin && props.margin}px;
	text-shadow: ${props => props.shadow && '4px 4px 0 rgba(0,0,0,0.1)'};
	/* border: 1px solid black; */

`

const Picker = styled.div`
	/* border: 1px solid black; */
	display: flex;
	justify-content: space-between;
	/* width: 250px; */
`

const Detail = styled.div`
	padding: 10px;
`

const Paragraph = styled.p`
	font-weight: bold;
`

class Main extends Component {

	constructor(props){
		super(props)
		this.state = { forecast : [], current_temperature : '', country : 'AU' }
	}

	componentDidMount(){
		this.txtCity.value = 'sydney'
		this.getForecast();
	}

	shouldComponentUpdate(nextProps, nextState) {
		// console.log('nextState:', nextState)
		// console.log('current_temperature:', this.state.current_temperature)

		// if(nextState.country !== this.state.country){
		// 	return true
		// }

		// if(nextState.current_temperature === this.state.current_temperature){
		// 	return false;
		// }

		return true;
	}

	getForecast = async () =>  {

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

			//let firstRow = dt && dt[0]
	  
			// if(firstRow){
			// 	this.showCurrentTemperature(firstRow)
			// }
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

		let {humidity, pressure, wind, forecast} = this.state

		let climate = forecast.map((x,index) => {
			return (
				<Box key={index} onClick={ () => this.showCurrentTemperature(index)}>
					<SmallText size={20}>{Days[x.day]}</SmallText>
					<Icon src={Images[x.icon]} alt="name" width="50" height="50"/>
					<span>
						<SmallText size={18}>{x.current}°</SmallText>
					</span>
					<SmallText size={12}>{x.description}</SmallText>
				</Box>
			)
		})

		let options = Countries.map((item, index) => <option key={index} value={item.value}>{item.name}</option>)

		let hasRecords = climate.length > 0 ? true : false

		return (
				<Container>
					<div>
						<input type="text" ref={x => this.txtCity = x}placeholder="city"/>
						<select value={this.state.country} onChange={this.setCountry}>
							{options}
						</select>
						<button onClick={this.getForecast}>Search</button>
					</div>
					{
						!hasRecords  ? 
						(
							<p>No record found.</p>
						) : 
						(
							<Layout>
								<Picker>
									<div>
									<SmallText shadow size={100}>
										{this.state.current_temperature}
									</SmallText>
									<SmallText shadow margin={17} size={40}>°C</SmallText>
									</div>
									<Detail>
										<Paragraph>Humidity: {humidity}%</Paragraph>
										<Paragraph>Pressure: {pressure} MB</Paragraph>
										<Paragraph>Wind: {Convert(wind)} KM/H</Paragraph>
										{/* <Paragraph>Sea level:</Paragraph> */}
									</Detail>
								</Picker>
								<Forecast>{climate}</Forecast>
							</Layout>
						)
					}
				</Container>
		)
	}
}

function Convert(wind){
	return Math.round(wind * 18/5);
}

export default Main