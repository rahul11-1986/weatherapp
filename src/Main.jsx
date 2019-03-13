import React, {Component} from 'react'
import styled from 'styled-components'
import fewclouds from './images/coolbreeze.png'
import lightrain from './images/heavyrainshower.png'
import brokenclouds from './images/lightrainfall.png'
import sunlightdrizzle from './images/sunlightdrizzle.png'
import clearsky from './images/sunny.png'
import thunderstorm from './images/thunderstorm.png'
import 'babel-polyfill'

const MainDiv = styled.div`
	display: flex;
	/* height: 300px;
	width: 500px; */
	border: black 2px solid;
	justify-content: space-between;
`

const Images = {
	"02d": clearsky,
	"02n": fewclouds,
	"04d": brokenclouds,
	"10d": lightrain,
	"10n": sunlightdrizzle
}

const Icon = styled.img`
	/* justify-content: "center"; */
	/* flex:1; */
`

class Main extends Component {

	constructor(props){
		super(props)
		this.state = { forecast : [] }
	}

	componentDidMount(){
	  this.getForecast();
	}

	getForecast = async () =>  {
		const url = 'https://api.openweathermap.org/data/2.5/forecast?q=sydney,au&APPID=fb1158dc7dfef5f0967ceac8f71ee3a6'

		try {
			let response = await fetch(url)
			let weeklyForecast = await response.json()

			const {list} = weeklyForecast
			console.log('d:', list)

			let dt = [] 

			list.forEach(x => {
				//console.log('t', Math.round(x.main.temp_min))
				let date = x.dt_txt ? x.dt_txt.split(' ') : []

				if(date && date.length > 0 && !dt.some(x => x.date === date[0])){
					let weather = {
						max : x.main.temp_max,
						min : x.main.temp_min,
						current : (Math.round(x.main.temp) - 273.15).toFixed(2),
						date: date[0],
						icon: x.weather[0].icon
					}

					dt = [...dt, weather]
				}
			})

			this.setState({
				forecast : dt
			})

			console.log('t:', this.state.forecast)

		} catch (error) {
			console.log('error')
		}
	}

	render(){

		let condition = this.state.forecast.map((x,index) => {
			return <Icon key={index} src={Images[x.icon]} alt="name" width="50" height="50"/>
		})

		return (
			<MainDiv>
				{condition}
				{/* <img src={fewclouds} alt="name" width="50" height="50"/>
				<img src={lightrain} alt="name" width="50" height="50"/>
				<img src={brokenclouds} alt="name" width="50" height="50"/>
				<img src={sunlightdrizzle} alt="name" width="50" height="50"/>
				<img src={clearsky} alt="name" width="50" height="50"/>
				<img src={thunderstorm} alt="name" width="50" height="50"/> */}
			</MainDiv>
		)
	}
}

export default Main