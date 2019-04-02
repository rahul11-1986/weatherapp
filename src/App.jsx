import React from 'react'
import Main from './Main'
import Error from './Error'

const App = () => {
	return ( navigator.onLine ? <Main /> : <Error>No internet connection!!</Error> )
}

export default App