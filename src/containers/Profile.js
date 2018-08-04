import styled from "styled-components"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default class Profile extends Component {
  render() {
    return (
      <Layout>
        <Navbar {...this.props} active={'profile'} />
        <Body>
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
  height: 100vh;
  width: 100vw;
`

const Body = styled.div`
  grid-row: 2;
  grid-column: 1 / 13;
  min-height: 80vh;
  background: grey;
  display: grid;
  grid-template-rows: auto;
`