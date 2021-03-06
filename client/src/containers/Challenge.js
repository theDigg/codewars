import styled from "styled-components";
import React, { Component } from "react";
import Navbar from "../components/Navbar";
import GameEditor from "../components/GameEditor";
import Footer from "../components/Footer";
import Panel from "../components/Panel";
import background from "../images/Grey-website-background.png";
export default class Challenge extends Component {
  render() {
    let timer = this.props.timer ? (
      <Timer>Next game starts in: {this.props.timer} </Timer>
    ) : (
      <Timer>...</Timer>
    );
    return (
      <Layout>
        <Navbar {...this.props} active={"challenge"} />
        <Prompt>{this.props.prompt.title}</Prompt>
        {timer}
        <GameEditor
          input={this.props.prompt.solution}
          change={this.props.addSolution}
        />
        <Panel
          {...this.props}
          join={this.props.join}
          leave={this.props.leave}
        />
        <Footer />
      </Layout>
    );
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-template-columns: repeat(auto-fit, 1fr);
  background: url(${background}) dimgrey;
  height: 100vh;
  width: 100vw;
  overflow: none;
`;
const Prompt = styled.div`
  grid-column: 2 / 8;
  text-align: center;
  align-self: center;
  justify-self: center;
  font-weight: bold;
  font-size: 24px;
  margin-top: 70px;
  border-radius: 5px;
  color: gainsboro;
  background: linear-gradient(grey, #595959);
  border: 2px solid black;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
  padding: 0.5em;
  width: 35vw;
  height: 3vh;
`;
const Timer = styled.h2`
  grid-column: 9 / 13;
  text-align: center;
  align-self: center;
  font-weight: bold;
  justify-self: center;
  margin-top: 90px;
  color: gainsboro;
  font-size: 28px;
  width: 100%;
  @media (max-width: 900px) {
    font-size: 24px;
  }
  @media (max-width: 600px) {
    font-size: 18px;
  }
`;
