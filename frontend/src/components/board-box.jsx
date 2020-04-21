import React from 'react'

const Box = (props) => {
	return (
		<button className="board_box" onClick={props.onClick}>
			{props.value}
		</button>
	)
}
export default Box
