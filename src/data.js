import fewclouds from './images/coolbreeze.png'
import lightrain from './images/heavyrainshower.png'
import brokenclouds from './images/lightrainfall.png'
import sunlightdrizzle from './images/sunlightdrizzle.png'
import clearsky from './images/sunny.png'
import thunderstorm from './images/thunderstorm.png'

export const Images = {
	"01d": clearsky,
	"01n": fewclouds,
	"02d": clearsky,
	"02n": fewclouds,
	"04n": brokenclouds,
	"04d": brokenclouds,
	"10d": lightrain,
	"10n": sunlightdrizzle,
	"03d": thunderstorm,
	"03n": thunderstorm
}

export const Days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const Countries = [
	{
		value : 'IN',
		name : 'India'
	}, 
	{
		value : 'AU',
		name : 'Australia'
	}, 
	{
		value : 'SG',
		name : 'Singapore'
	}, 
	{
		value : 'UK',
		name : 'United Kingdom'
	}
]