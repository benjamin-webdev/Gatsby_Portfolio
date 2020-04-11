// This is the template for each programmatically generated item in the shop. It will be populated with data from markdown files in the content folder.
import React from "react";
import styled from "styled-components"
import GoogleButton from 'react-google-button'

import Layout from "../components/layout";


const Heading = styled.h1`
  font-weight: 900;
  font-size: 1.5em;
  margin: 20px 0;
`

const Description = styled.p`
  margin: 20px 0;
  padding: 10px;
`
class Login extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <GoogleButton
            onClick={() => { console.log('Google button clicked') }}
        />
      </Layout>
    )
  }
}

export default Login;