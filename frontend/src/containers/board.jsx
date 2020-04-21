import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import url from '../assets/globalvariables'
import Box from '../components/board-box'

import * as utils from '../utils/functions'

export class Board extends React.Component {
	constructor(props) {
    super(props)
		this.state = {
			boxes: Array(9).fill(null),
			history: [],
			playerOneName: props.state.playerOneName,
			playerTwoName: props.state.playerTwoName,
			xIsNext: true
		}
	}

	handleBoxClick(index) {
		const boxes = this.state.boxes.slice()
		let history = [...this.state.history]
		if (utils.findWinner(boxes) || boxes[index]) {
			return
		}
		if(utils.areAllBoxesClicked(boxes)) {
			return
		}
		boxes[index] = this.state.xIsNext ? 'x' : 'o'
		history.push(this.state.xIsNext ? this.state.playerOneName : this.state.playerTwoName)
		this.setState({
				boxes: boxes,
				history: history,
				xIsNext: !this.state.xIsNext
			})
	}

	handleBoardRestart = () => {
		this.setState({
			boxes: Array(9).fill(null),
			history: [],
			xIsNext: true
		})
	}

	render() {
    const winner = utils.findWinner(this.state.boxes)
    const isFilled = utils.areAllBoxesClicked(this.state.boxes)

    let status

	    let gameWinner = winner === 'x' ? this.state.playerOneName : this.state.playerTwoName
		let playersTurn=(this.state.xIsNext ? this.state.playerOneName : this.state.playerTwoName)
		if (winner) {
			status = `The winner is: ${gameWinner}!`

			axios.post(url, {title: `${gameWinner} won`, text: ''})
		} else if(!winner && isFilled) {
			status = 'Game drawn!'

			axios.post(url, {title: `${'Game drawn'}`, text: ''})
		} else {
			status = `It is ${playersTurn}'s turn.`
		}



		const boardBoxElements=this.state.boxes.map((element,index)=>{
			return <Box value={this.state.boxes[index]} key={index+1} onClick={()=>this.handleBoxClick(index)}/>
		})
		
		
		const history=this.state.history.map((move, index) => {
			return <li key={index}>Move {index + 1}: <strong>{move}</strong></li>
		})
		
		
		return (
			<div className="view view--board">
				<Link to="/" className="go-back">Go back to startmenu</Link>
				<div className="board-wrapper">
					<div className="board">
						<h2 className="board-heading">{status}</h2>
						<div className="board-row">
							{boardBoxElements}
						</div>
					</div>

					<div className="history">
						<h2 className="board-heading">Moves history:</h2>
						<ul className="history-list">
							{this.state.history.length === 0 ? <span>No moves to show.</span>:null}
							{this.state.history.length !== 0 ? history:null}
						</ul>
					</div>
				</div>
				{winner ? <button className="board-button button" onClick={this.handleBoardRestart}>Start new game</button>:null}
			</div>
		)
	}
}
