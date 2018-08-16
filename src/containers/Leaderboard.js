import styled from "styled-components"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import background from '../images/Grey-website-background.png'

export default class Leaderboard extends Component {

  componentDidMount() {
    this.props.getLeaderboard()
  }

  render() {
    let usernames = this.props.score.leaderboard.map((user, i) => {
      return (
        <UserName rank={user.rank} key={i}> {user.username} </UserName>
      )
    })
    let ratings = this.props.score.leaderboard.map((user, i) => {
      return (
        <UserRating key={i}> {user.rating} </UserRating>
      )
    })
    let wins = this.props.score.leaderboard.map((user, i) => {
      return (
        <UserWins key={i}> {user.wins} </UserWins>
      )
    })
    return (
      <Layout>
        <Navbar {...this.props} active={'scores'} />
        <Title>Leaderboard</Title>
        <Body>
          <LeftDiv>
            <User>User</User>
            {usernames}
          </LeftDiv>
          <MiddleDiv>
            <Rating>Rating</Rating>
            {ratings}
          </MiddleDiv>
          <RightDiv>
            <Win>Wins</Win>
            {wins}
          </RightDiv>
        </Body>
        <Footer />
      </Layout>
    )
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-template-columns: repeat(auto-fit, 1fr);
  width: 100vw;
  background: url(${background}) dimgrey;
`
const Body = styled.div`
  grid-column: 1 / 13;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 5% 1fr 1fr 1fr 5%;
  grid-column-gap: 10px;
  min-height: 80vh;
  margin-bottom: 3em;
`
const LeftDiv = styled.div`
  grid-row: 1;
  grid-column: 2;
  display: grid;
  grid-template-rows: 50px auto;
  grid-row-gap: 30px;
  justify-self: right;
`
const MiddleDiv = styled.div`
  grid-row: 1;
  grid-column: 3;
  display: grid;
  grid-template-rows: 50px auto;
  grid-row-gap: 30px;
  justify-self: center;

`
const RightDiv = styled.div`
  grid-row: 1;
  grid-column: 4;
  display: grid;
  grid-template-rows: 50px auto;
  grid-row-gap: 30px;
  justify-self: left;
`
const Title = styled.h1`
  grid-column: 1 / 13;
  justify-self: center;
  min-height: 50px;
`
const User = styled.span`
  font-size: 30px;
  justify-self: right;
  font-weight: bold;
  color: red;
`
const Rating = styled.span`
  font-size: 30px;
  justify-self: center;
  font-weight: bold;
  color: red;
`
const Win = styled.span`
  font-size: 30px;
  justify-self: left;
  font-weight: bold;
  color: red;
`
const UserName = styled.span`
  font-weight: bold;
  font-size: 24px;
  justify-self: right;
  color: ${props => { 
    if (props.rank === 'Bad') {
      return 'blue'
    } else if (props.rank === 'Noob') {
      return 'green'
    } else if (props.rank === 'Script Kiddie') {
      return 'yellow'
    } else if (props.rank === 'Brogrammer') {
      return 'orange'
    } else if (props.rank === 'Dev') {
      return 'orangered'
    } else if (props.rank === 'Senior') {
      return 'red'
    } else if (props.rank === 'Architect') {
      return 'maroon'
    } else if (props.rank === 'Genius') {
      return '#a500ff'
    } else if (props.rank === 'Legend') {
      return 'dimgrey'
    } else if (props.rank === 'Hacker') {
      return 'black'
    } else if (props.rank === 'New') {
      return 'white'
    }
  }};
`
const UserRating = styled.span`
  font-weight: bold;
  font-size: 24px;
  justify-self: center;
  color: gainsboro;
`
const UserWins = styled.span`
  font-weight: bold;
  font-size: 24px;
  justify-self: left;
  color: gainsboro;
`