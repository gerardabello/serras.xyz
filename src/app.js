import React, { Component } from 'react'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './home'
import About from './about'
import Projects from './projects'
import Contact from './contact'
import Background from './background'

import SofiaProBoldWoff from '../assets/fonts/subset-SofiaPro-Bold.woff'
import SofiaProBoldWoff2 from '../assets/fonts/subset-SofiaPro-Bold.woff2'

import MonostenWoff from '../assets/fonts/subset-Monosten-E.woff'
import MonostenWoff2 from '../assets/fonts/subset-Monosten-E.woff2'

const theme = {
  background: '#11151C',
  text: '#EAE3E0',
  color1: '#212D40',
  color2: '#364156',
  color3: '#7D4E57',
  color4: '#D66853'
}

injectGlobal`

  @font-face {
      font-family: 'Sofia Pro';
      src: url(${SofiaProBoldWoff2}) format('woff2'),
          url(${SofiaProBoldWoff}) format('woff');
      font-weight: bold;
      font-style: normal;
  }

  @font-face {
      font-family: 'Monosten-E';
      src: url(${MonostenWoff2}) format('woff2'),
          url(${MonostenWoff}) format('woff');
      font-weight: 400;
      font-style: normal;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }
`

const Root = styled.div`
  font-family: 'Sofia Pro', sans-serif;
  min-height: 100%;
  width: 100%;
  overflow-x: hidden;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  padding: 36px;
  padding-top: 24px;

  @media (max-width: 500px) {
    padding: 24px;
    padding-top: 18px;
  }

  @media (max-width: 400px) {
    padding: 18px;
    padding-top: 16px;
  }
`

const Content = styled.div`
  min-height: 100%;
  position: relative;
`

export default class App extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Root>
            <Background />
            <Content>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/projects' component={Projects} />
              <Route exact path='/contact' component={Contact} />
            </Content>
          </Root>
        </Router>
      </ThemeProvider>
    )
  }
}
