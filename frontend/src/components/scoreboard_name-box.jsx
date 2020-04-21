import React from 'react'
const ScoreBoardNameBox = (props) => {
	return (
		<div className="scoreboard-name-box">
            <label htmlFor={props.id}>{props.title} :</label>
            <input id={props.id} className="scoreboard-input-names" type="text" value={props.state[props.id]} onChange={props.inputChangeHandler} data-name={props.id} />
          </div>
	)
}
export default ScoreBoardNameBox
