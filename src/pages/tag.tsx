import React from "react"
import { graphql } from "gatsby"

import Layout from "../layouts/layout"
import SEO from "../components/seo"
import PostsList from "../components/postsList"

const TagTemplate = ({ location, pageContext, data }) => {
  const { tag } = pageContext ?? []
  return (
    <Layout location={location} title={`Posts in tag "${tag}"`}>
      <div className="tag-container">
        <SEO title={`Posts in tag "${tag}"`} />
        <div>
          <h1>Tag: {tag}</h1>
          <PostsList postEdges={data.allMarkdownRemark.edges} />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
    query TagPage($tag: String) {
        allMarkdownRemark(
            limit: 1000
            filter: { fields: { tags: { in: [$tag] } } }
        ) {
            totalCount
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
