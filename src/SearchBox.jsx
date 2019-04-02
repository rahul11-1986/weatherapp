import React from 'react'
import styled from 'styled-components'

const Search = styled.form`
	z-index: 10;
	border:10px solid #D9E9F7;
	border-radius:5px;
	display:flex;
`

const SearchBox = (props) => {
	
	return(
		<Search className="search-box" onSubmit={props.submit} >
			{props.children}
		</Search>
	)

}

export default SearchBox