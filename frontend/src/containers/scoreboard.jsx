import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import url from '../assets/globalvariables'
import ScoreBoardNameBox from '../components/scoreboard_name-box'
export class Scoreboard extends React.Component {
  constructor(props) {
    super(props)
    this.players=[{id:"playerOneName",title:"1st Player's Name"},{id:"playerTwoName",title:"2nd Player's Name"}]
    this.state = {
			playerOneName: props.state.playerOneName,
			playerTwoName: props.state.playerTwoName,
      scoreboard: []
    }
  }
  async componentDidMount() {
    this.refreshList()
  }
  refreshList = () => {
    axios.get(url)
      .then(response => {
        Promise.all(response.data.map((historyItem) => {
          return historyItem.title
        })).then((historyData) => {this.setState({scoreboard: historyData})})
      })
      .catch(error => console.error(error))
  }
  inputChangeHandler = (event) => {
    event.preventDefault()
    let key = event.target.dataset.name
    let value = event.target.value
    this.setState({
      [key]: value
    })
    this.props.nameChangeHandler(key, value)
  }

  handleNameValidation = (event) => {
    if (this.state.playerOneName.length !== 0 && this.state.playerTwoName.length !== 0) {
      return
    } else {
      event.preventDefault()
    }
  }

  render() {
    const scoreBoardListElements=this.state.scoreboard.map((leader, key) => {
      return <li key={key}>- {leader}</li>
    })
    const scoreBoardNameBoxxElements=this.players.map(el=>{
        return <ScoreBoardNameBox inputChangeHandler={this.inputChangeHandler} state={this.state} id={el.id} key={el.id} title={el.title}/>
    })

    return (
      <div className="view view--scoreboard">
        <h1 className="scoreboard-heading">Phoenix TicTacToe</h1>
        <h2 className="scoreboard-heading2">Welcome!</h2>
        <h2 className="scoreboard-subheading">Enter Player Names</h2>
        <div className="scoreboard-names">
            {scoreBoardNameBoxxElements}
        </div>
        <Link to="/board" onClick={this.handleNameValidation} className="scoreboard-button button">Start New Game</Link>
        <h2 className="scoreboard-subheading">Recent games:</h2>
        {this.state.scoreboard.length === 0 ? <p>There are no previous games to show.</p>:null}
        {this.state.scoreboard.length !== 0 ? <ul className="scoreboard-list">
          {scoreBoardListElements}
        </ul>:null}
      </div>
    )
  }
}
