import React from "react";
import styled, { ThemeProvider } from 'styled-components';
import axios from 'axios';
import { theme } from '../styles/theme';
import { GlobalStyle } from '../styles/globalStyle';

import HeaderMain from './Headers/HeaderMain';
import HeaderMinor from './Headers/HeaderMinor';


const PageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  width: 90%;

`

const MainSection = styled.main`
  margin: 30px 0;
  width: 100%;
`

const FooterStyled = styled.footer`
  width: 100%;
  padding: 20px;
  text-align: right;

  @media (max-width: 600px) {
    text-align: center;
  }
`
const ExternalLink = styled.a`
  color: #c59fc5;
`


class Layout extends React.Component {

  componentDidMount() {
    if (window.Snipcart) {
      window.Snipcart.api.configure('show_continue_shopping', true);
    }
  }

  googleAuth = () => {
    console.log('google auth')
    axios
      .get(`http://localhost:3000/login`)
      .then((result) => {
        console.log(result)
        const {redirectUrl} = result.data;
        window.location = redirectUrl;
      })
      .catch(error => {
        console.log(error)
      })

  }


  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const siteName = "One on One Tutoring"
    let header

    if (location.pathname === rootPath) {
      header = (
        <HeaderMain shopName={siteName} googleAuth={this.googleAuth}> </HeaderMain>
      )
    } else {
      header = (
        <HeaderMinor shopName={siteName}></HeaderMinor>
      )
    }

    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <PageWrapper>
            {header}
            <MainSection>{children}</MainSection>
            <FooterStyled>
              <strong>by Loving Tree</strong>
            </FooterStyled>
          </PageWrapper>
        </>
      </ThemeProvider>
    )
  }
}

export default Layout
