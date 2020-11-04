import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../layouts/layout"
import SEO from "../components/seo"
import PostsList from "../components/postsList"

const TagTemplate = ({ location, data }) => {
  const { allMarkdownRemark } = useStaticQuery(pageQuery)
  console.log(allMarkdownRemark)

  return (
    <Layout location={location} title={`Posts in tag "${allMarkdownRemark}"`}>
      <div className="tag-container">
        <SEO title={`Posts in tag "${allMarkdownRemark}"`} />
        <div>
          <h1>Tag: {allMarkdownRemark}</h1>
          <PostsList postEdges={data.allMarkdownRemark.edges} />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      group(field: fields___tags, limit: 1000) {
        fieldValue
        totalCount
      }
      edges {
        node {
          fields {
            slug
            tags
          }
          excerpt
          timeToRead
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`

export default TagTemplate
