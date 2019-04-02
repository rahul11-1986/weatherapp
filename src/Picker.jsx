import React from 'react'
import {SmallText} from './Main'
import styled from 'styled-components'


const Paragraph = styled.p`
	font-weight: bold;
`

const Picker = (data) => {

	const { current_temperature:temperature, humidity, pressure, wind} = data

	return (
		<div className="picker">
			<div className="temperature">
				<SmallText shadow size={100}>
					{temperature}
				</SmallText>
				<SmallText shadow margin={17} size={40}>°C</SmallText>
			</div>
			<div className="detail">
				<Paragraph>Humidity: {humidity}%</Paragraph>
				<Paragraph>Pressure: {pressure} MB</Paragraph>
				<Paragraph>Wind: {Convert(wind)} KM/H</Paragraph>
			</div>
		</div>
	)
}


function Convert(wind){
	return Math.round(wind * 18/5);
}

export default Picker