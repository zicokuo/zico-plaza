import React from "react"
import { graphql } from "gatsby"

import Layout from "../layouts/layout"
import SEO from "../components/seo"
import PostsList from "../components/postsList"

const CategoryTemplate = (props) => {
  const { category } = props.pageContext
  return (
    <Layout location={props.location} title={`Posts in category "${category}"`}>
      <div className="category-container">
        <SEO title={`Posts in category "${category}"`} />

        <div>
          <h1>Category: {category}</h1>
          <PostsList postEdges={props.data.allMarkdownRemark.edges} />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
    query CategoryPage($category: String) {
        allMarkdownRemark(
            limit: 1000
            filter: { fields: { category: { eq: $category } } }
        ) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                        category
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

export default CategoryTemplate
