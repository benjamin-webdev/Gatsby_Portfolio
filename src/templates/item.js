// This is the template for each programmatically generated item in the shop. It will be populated with data from markdown files in the content folder.

import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components"
import axios from 'axios'

import Layout from "../components/layout";
import MyCal from "../components/myCal/myCal"


const Heading = styled.h1`
  font-weight: 900;
  font-size: 1.5em;
  margin: 20px 0;
`

const ImgStyled = styled(Img)`
  width: 100%;
  height: 400px;
`

const Price = styled.p`
  margin: 20px 0;
  padding: 10px;
  font-weight: 700;
  background: ${props => props.theme.colors.primaryAccent};
`
const Description = styled.p`
  margin: 20px 0;
  padding: 10px;
`

const Dropdown = styled.select`
  display: block;
  padding: 10px;
  margin: 10px 0;
  background: ${props => props.theme.colors.secondaryAccent};
  font-weight: 700;
  border: none;
  outline: none;
`
const DropdownOption = styled.option`
  padding: 10px;
  background: ${props => props.theme.colors.secondaryAccent};
  font-weight: 700;
  border: none;
  outline: none;
`


class Item extends React.Component {
  state = {
    selected: this.props.data.markdownRemark.frontmatter.customField.values[0].name,
    events: []
  }

  componentDidMount() {
    const item = this.props.data.markdownRemark

    axios
      .get('http://localhost:3000/events/?email=' + item.frontmatter.email)
      .then((result) => {
        const {data} = result;
        console.log(data)
        let events = [];
        for(let i = 0; i < data.events.length; i += 1) {
          const event = {
            title: data.events[i].summary,
            start: new Date(data.events[i].start.dateTime),
            end: new Date(data.events[i].end.dateTime),
            allDay: false
          };
          events.push(event);
        }
        console.log(events);

        this.setState({events});
      })
      .catch(error => {
        console.log(error)
      })

  }

  setSelected = (value) => {
    this.setState({ selected: value })
  }

  // create the string required by snipcart to allow price changes based on option chosen
  createString = (values) => {
    return values.map(option => {
      const price = option.priceChange >= 0 ? `[+${option.priceChange}]` : `[${option.priceChange}]`
      return `${option.name}${price}`
    }).join('|')
  }

   // calculate price based on option selected for display on item page
  updatePrice = (basePrice, values) => {
    const selectedOption = values.find(option => option.name === this.state.selected)
    return (basePrice + selectedOption.priceChange).toFixed(2)
    
  }

  render() {
    const item = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const {events} = this.state;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Heading>{item.frontmatter.title}</Heading>
        <Description>{item.frontmatter.description}</Description>

        <div>
          <MyCal events={events} email={item.frontmatter.email}/>
        </div>

        <Price>${this.updatePrice(item.frontmatter.price, item.frontmatter.customField.values)}</Price>
      </Layout>
    )
  }
}

export default Item;

export const pageQuery = graphql`
  query ItemBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
        price
        id
        email
        image {
          childImageSharp {
            fluid {
              src
              ...GatsbyImageSharpFluid
            }
          }
        }
        customField {
          name
          values {
            name
            priceChange
          }   
        }
      }
    }
  }
`
