import React from "react"
import PropTypes from "prop-types"

// Components
import { graphql } from "gatsby"
import { useAllTags } from "../hooks/tags-hooks"
import Layout from "../layouts/layout"
import { Link, useIntl } from "gatsby-plugin-intl"
import SEO from "../components/seo"
import { getQuery } from "clearlake"

const Tags = ({ location, pageContext, data }) => {
  const intl = useIntl(),
    { group } = useAllTags(),
    { tag } = pageContext,
    { edges, totalCount } = data.allMarkdownRemark,
    tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`,
    siteTitle = intl.formatMessage({
      id: data?.site?.siteMetadata?.title || `Tags`,
    }),
    currentTag = getQuery("tag", location?.search)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={
          intl.formatMessage({ id: `tags` }) +
          (currentTag ? " - " + intl.formatMessage({ id: currentTag }) : "")
        }
      />

      <div>
        <h1>
          {tagHeader}
          {currentTag}
        </h1>
        <ul>
          {group.map(({ fieldValue }) => {
            return (
              <li key={fieldValue}>
                <Link to={`/tags?tag=${fieldValue}`}>{fieldValue}</Link>
              </li>
            )
          })}
        </ul>
        {/*
              This links to a page that does not yet exist.
              You'll come back to it!
            */}
        <Link to="/tags">All tags</Link>
      </div>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      sort: { fields: [fields___tags], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            tags
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
