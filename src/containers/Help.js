import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styled from 'styled-components'
import EditorInput from '../components/EditorInput'
import background from '../images/Grey-website-background.png'

const handleChange = (cb, inputType, input) => {
  cb(inputType, input)
}

export default class Help extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.props.userSubmition({
      owner: this.props.auth.user.username,
      title: this.props.input.submition_title,
      body: this.props.input.submition_body,
      tests: this.props.input.submition_tests,
      descriptions: this.props.input.submition_descriptions,
      solution: this.props.input.submition_solution
    })
  }

  render() {
    return (
      <Layout>
        <Navbar {...this.props} active={'help'} />
        <Body>
          <Heading>Submit your own challenge</Heading>
          <Info>User submitions will be checked by admins. For each submition approved, you will be granted +50 rating.</Info>
          <Guidelines>Successful user submitions must adhere to the following guidelines: </Guidelines>
          <Status>{this.props.prompt.submition_status}</Status>
          <Rule>Title must be short and descriptive (4 - 16 characters)</Rule>
          <Input placeholder={"Title"} onChange={e => handleChange(this.props.addText, "submition_title", e.target.value)} value={this.props.input.submition_title}/>
          <Rule>Body should clearly describe the guidelines of your challenge</Rule>          
          <Input placeholder={"Body"} onChange={e => handleChange(this.props.addText, "submition_body", e.target.value)}/>
          <Rule>At least 5 tests must be submitted as an array of boolean values. Example: [typeof helloWorld === 'function', helloWorld() === 'Hello World']</Rule>
          <Input placeholder={"Tests"} onChange={e => handleChange(this.props.addText, "submition_tests", e.target.value)}/>
          <Rule>Every test must have a short description (less than 30 character). Submit as an array of strings.</Rule>  
          <Input placeholder={"Test Descriptions"} onChange={e => handleChange(this.props.addText, "submition_descriptions", e.target.value)}/>
          <Rule>Insert a completed example of the challenge. Make sure the solution is short enought to be solved in less than 60 seconds.</Rule>
          <EditorInput input={this.props.input.submition_solution} change={this.props.addText} />
          <Button onClick={() => {
            this.props.clearAll()
            this.handleSubmit()
            setTimeout(() => this.props.clearAll(), 2500)
          }}> Submit </Button>
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
  background: url(${background}) dimgrey;
  width: 100vw;
  justify-items: center;
  color: gainsboro;
`
const Body = styled.div`
  grid-column: 1 / 13;
  display: grid;
  grid-template-rows: 50px 50px 50px 30px repeat(auto-fit, 50px);
  grid-row-gap: 40px;
  grid-template-columns: 1.4fr 1fr;
  min-height: 82vh;
  width: 100vw;
  justify-items: center;
  align-items: center;
  text-align: center;
`
const Heading = styled.h1`
  grid-row: 1;
  grid-column: 1 / 3;
  margin-top: 2em;
`
const Info = styled.h3`
  grid-row: 2;
  color: orangered;
  text-align: center;
  font-size: 18px;
  grid-column: 1 / 3;
`
const Guidelines = styled.h3`
  grid-row: 3;
  text-align: center;
  color: red;
  grid-column: 1 / 3;
`
const Status = styled.p`
  grid-row: 8;
  grid-column: 1 / 3;
  justify-self: center;
  color: darkgreen;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`
const Rule = styled.p`
  grid-column: 1 / 3;
  font-size: 18px;
  font-weight: bold;
  margin-right: 4em;
  margin-left: 4em;
`
const Input = styled.input`
  width: 75%;
  height: 40px;
  font-size: 18px;
  grid-column: 1 / 3;
`
const Button = styled.button`
  grid-column: 1 / 3;
  width: 30vw;
  height: 60px;
  font-size: 20px;
  margin-top: 1em;
  margin-bottom: 3em;
  &:hover{
      font-weight: bold;
      background: maroon;
      color: ghostwhite;
      cursor: pointer;
  }
`