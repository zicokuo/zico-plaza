import React from "react"

// Components
import lodash from "lodash"
import { graphql, useStaticQuery } from "gatsby"
import { useAllTags } from "../graphql/tags"
import Layout from "../layouts/layout"
import { Link, useIntl } from "gatsby-plugin-intl"
import SEO from "../templates/common/seo"

const pageQuery = graphql`
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

export default ({ location }: any): JSX.Element => {
  const intl = useIntl(),
    data = useStaticQuery(pageQuery),
    { group } = useAllTags(),
    siteTitle = intl.formatMessage({
      id: data?.site?.siteMetadata?.title || `Tags`,
    }),
    queries = location?.search.replace("?", ""),
    queriesTags = lodash.fromPairs(
      lodash
        .split(queries, "&")
        .map((query: string) => lodash.split(query, "="))
    ),
    currentTag = lodash.get(queriesTags, "tag")

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={
          intl.formatMessage({ id: `Tags` }) +
          (currentTag ? " - " + intl.formatMessage({ id: currentTag }) : "")
        }
      />

      <div>
        <h1>{currentTag}</h1>
        <ul>
          {group.map(({ fieldValue }: { fieldValue: string }) => {
            return (
              <li key={fieldValue}>
                <Link to={`/tags?tag=${fieldValue}`}>{fieldValue}</Link>
              </li>
            )
          })}
        </ul>
        <Link to="/tags">All tags</Link>
      </div>
    </Layout>
  )
}
