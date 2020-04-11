// This is the homepage.

import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import queryString from 'query-string';
import axios from 'axios';

import ItemThumbnail from '../components/ItemThumbnail/ItemThumbnail';
import Layout from "../components/layout"
import SEO from "../components/seo"

const ThumbnailsWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    padding: 20px;
`

class BlogIndex extends React.Component {
  componentDidMount() {
    const {location: {search}} = this.props;
    const params = queryString.parse(search);
    // console.log(params)
    // if(params && params.id){
    //   axios
    //   .get('http://localhost:3000/user/?id=' + params.id)
    //   .then((result) => {
    //     const {data} = result;
    //     // localStorage.setItem('loggedUser', JSON.stringify(data));
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    // }
  }
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const items = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="One on One Tutoring" />
      <ThumbnailsWrapper>
        {items.map(({ node }) => {
          const { title, image, price, description } = node.frontmatter
          return (
            <ItemThumbnail
              key={node.fields.slug}
              link={node.fields.slug}
              heading={title}
              image={image.childImageSharp.fluid}
              price={price}
              description={description}
            />
          )
        })}
      </ThumbnailsWrapper>
        

      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            price
            description
            email
            image {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
