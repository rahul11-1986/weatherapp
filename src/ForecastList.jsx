import React from 'react'
import {Days, Images} from './data'
import {SmallText} from './Main'

export default function ForecastList({list, click}){
	
	let climate = list.map((x,index) => {
		return (
			<div className="box" key={index} onClick={ () => click(index)}>
				<SmallText size={20}>{Days[x.day]}</SmallText>
				<img className="icon" src={Images[x.icon]} alt="name" width="50" height="50"/>
				<span>
					<SmallText size={18}>{x.current}°</SmallText>
				</span>
				<SmallText size={12}>{x.description}</SmallText>
			</div>
		)
	})

	return (
		<div className="forecast">{climate}</div>
	)
}