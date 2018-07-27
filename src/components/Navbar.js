import React from 'react'
import styled from 'styled-components'
import Signup from './Signup'
import Login from './Login'

const Navbar = (props) => {
  console.log('Navbar ---- ' + props.auth.isAuthenticated);
  const navAuth = !props.auth.isAuthenticated ? (
    <Layout>
    <Title>CodeWars</Title>
    <SignUp
      onClick={() => props.openModal('signup')}
    > 
      Signup
    </SignUp>
    <LogIn
      onClick={() => props.openModal('login')}
    >
      Login
    </LogIn></Layout> 
  ) : (
    <Layout>
      <Title>CodeWars</Title>
      <Logout onClick={() => props.logout()}>Logout</Logout>
    </Layout>
  )

  return (
    <div>
      {navAuth}
      <Login
          username={ props.input.username }
          password={ props.input.password }
          openModal={ props.openModal }
          closeModal={ props.closeModal }
          signin={ props.signin }
          login={ props.login }
          showModal={ props.modalReducer.login }
          message={props.modalReducer.message}
          addText={ props.addText }
        />
        <Signup
          username={ props.input.username }
          password={ props.input.password }
          email={ props.input.email }
          openModal={ props.openModal }
          closeModal={ props.closeModal }
          signup={ props.signup }
          showModal={ props.modalReducer.signup }
          message={props.modalReducer.message}
          addText={ props.addText }
        />
    </div>
  )
}

export default Navbar

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 20em 1fr 1fr;
  grid-row: 1;
  min-height: 100px;
`

const Title = styled.div`
    grid-column: 1;
    background: lightgrey;
`

const SignUp = styled.div`
    grid-column: 3;
    background: lightblue;
`

const LogIn = styled.div`
    grid-column: 4;
    background: red;
`

const Logout = styled.div`
  grid-column: 4;
  background: green;
`

