import styled from "styled-components";
import React, { Component } from "react";
import Navbar from "../components/Navbar";
import PracticeEditor from "../components/PracticeEditor";
import Footer from "../components/Footer";
import background from "../images/Grey-website-background.png";
import axios from 'axios'
import { 
  subscribeToDuelSocket, 
  duelComplete, 
  emitResponse, 
  resetConsoleForOpponent,
  connectToRoom,
  clearPromptForOpponent
} from '../socket/api'

export default class Duel extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      value: '',
      console: [],
      opponentConsole: '',
      completionStatus: '',
      loading: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onJoin = this.onJoin.bind(this)
  }

  componentDidMount() {
    subscribeToDuelSocket()
  }

  onJoin() {
    this.setState({
      loading: true
    })
  }

  onChange(e) {
    this.setState({
      value: e
    })
  }

  onSubmit() {
    this.props.resetConsoleResults()
    resetConsoleForOpponent()
    axios.post('http://localhost:4000/api/runner/challenge', 
    {
      solution: this.props.duel.solution,
      tests: this.props.duel.tests,
      testDescriptions: this.props.duel.testDescriptions
    }).then(res => {
      emitResponse(res)
      let results = res.data.testResults
      this.props.setConsoleResults(results)
      let passing = true
      results.forEach(result => {
        if (result.passing === false) passing = false
      })
      if (passing) {
        duelComplete()
        this.props.setDuelComplete()
        setTimeout(() => {
          this.setState({
            loading: false
          })
          this.props.clearDuelPrompt()
          this.props.resetConsoleResults()
          resetConsoleForOpponent()
          clearPromptForOpponent()
        }, 2000)
      }
    })
  }
  
  render() {
    let user = this.props.auth.user
    let button = this.props.duel.title ? 
      <Button onClick={() => this.onSubmit()}>Submit</Button> : this.state.loading ? 
      <Button>Waiting for another user...</Button> :
      <Button onClick={() => {
      this.onJoin()
      connectToRoom(user)
    }}>Join</Button>
    let opponent = this.props.duel.players[1].username !== user.username ? this.props.duel.players[1] : this.props.duel.players[0]
    let results = this.props.duel.console.map(result => {
      return <Result passing={result.passing}>{result.description}</Result>
    })
    let opponentResults = this.props.duel.opponentConsole.map(result => {
      return <Result passing={result.passing}>{result.description}</Result>
    })
    return (
      <Layout>
        <Navbar {...this.props} active={"duel"} />
        <UserDiv><User rank={user.rank}>{user.username}</User></UserDiv><UserDiv><User rank={opponent.rank}>{opponent.username}</User></UserDiv>
        <PracticeEditor
          input={this.props.duel.solution}
          opponent={this.props.duel.opponentSolution}
          change={this.props.addDuelSolution}
        />
        <Console>
          <UserConsole>{this.props.duel.passing ? "You Won!" : this.props.duel.opponentPassing ? "You Lost" : results}</UserConsole>
          <OpponentConsole>{opponentResults}</OpponentConsole>
        </Console>
        {button}
        <Footer />
      </Layout>
    );
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: 8vh 7vh 50vh 25vh 5vh;
  grid-template-columns: 1fr 1fr;
  background: url(${background}) dimgrey;
  width: 100vw;
  height: 100vh;
  overflow: none;
`;
const UserDiv = styled.div`
  grid-row: 2;
  background: grey;
  border: 4px solid #1f1f1f;
  border-radius: 5px;
  margin: 0.2rem;
  width: 50%;
  justify-self: center;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.9);
`
const User = styled.h2`
  text-align: center;
  line-height: 0;
  color: ${props => {
    if (props.rank === "Bad") {
      return "cyan";
    } else if (props.rank === "Noob") {
      return "green";
    } else if (props.rank === "Script Kiddie") {
      return "yellow";
    } else if (props.rank === "Brogrammer") {
      return "orange";
    } else if (props.rank === "Dev") {
      return "orangered";
    } else if (props.rank === "Senior") {
      return "red";
    } else if (props.rank === "Architect") {
      return "maroon";
    } else if (props.rank === "Genius") {
      return "#a500ff";
    } else if (props.rank === "Legend") {
      return "indigo";
    } else if (props.rank === "Hacker") {
      return "black";
    } else if (props.rank === "New") {
      return "white";
    }
  }};
`
const Console = styled.div`
  grid-row: 4;
  grid-column: 1 / 3;
  background: black;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: 1rem;
  margin-right: 1rem;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.9);
`
const UserConsole = styled.div`
  border-right: 1px solid dimgrey;
  color: green;
  overflow: auto;
  padding-left: 1rem;
`
const Result = styled.p`
  font-size: 12px;
  color: ${props => {
    if (props.passing) {
      return 'green'
    } else {
      return 'red'
    }
  }};
  text-align: left;
`
const OpponentConsole = styled.div`
  border-left: 1px solid dimgrey;
  color: red;
  overflow: auto;
  padding-left: 1rem;
`
const Button = styled.button`
  grid-row: 5;
  grid-column: 1 / 3;
  width: 40%;
  justify-self: center;
  border-radius: 10px;
  font-size: 20px;
  &:hover {
    font-weight: bold;
    background: maroon;
    color: ghostwhite;
    border: 1px solid maroon;
    cursor: pointer;
  }
`