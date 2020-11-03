import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Link, FormattedMessage, useIntl } from "gatsby-plugin-intl"
import Layout from "../layouts/layout"
import SEO from "../components/seo"
import { Chip, List, ListItem } from "@material-ui/core"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import tw from "twin.macro"

const BlogIndexPage = ({ location }) => {
  console.log(location)
  let intl = useIntl()
  let data = useStaticQuery(pageQuery)
  let siteTitle = intl.formatMessage({
    id: data.site.siteMetadata?.title || `Title`,
  })
  let posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title={intl.formatMessage({ id: `title` })} />
        <FormattedMessage id="welcome" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={intl.formatMessage({ id: `title` })} />
      <FormattedMessage id="welcome" />
      <List style={{ listStyle: `none` }}>
        {posts
          .filter(post => post.frontmatter?.visitable !== 0)
          .map(post => {
            let title = post.frontmatter.title || post.fields.slug

            return (
              <ListItem key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                      {post.frontmatter.visitable !== 0 ? (
                        <span css={[tw`p-2 text-green-400`]}>
                          <CheckCircleIcon color="inherit" />
                        </span>
                      ) : null}
                    </h2>
                    {post.frontmatter.tags?.map(pt => (
                      <Chip label={pt}></Chip>
                    ))}
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </ListItem>
            )
          })}
      </List>
    </Layout>
  )
}

export default BlogIndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          enTitle
          author
          visitable
          description
          enDescription
          category
          tags
        }
      }
    }
  }
`
