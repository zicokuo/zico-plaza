import React from "react"
import lodash from "lodash"
import { graphql, useStaticQuery } from "gatsby"
import { Link, FormattedMessage, useIntl } from "gatsby-plugin-intl"
import Layout from "../layouts/layout"
import SEO from "../components/seo"
import {
  Card,
  CardActionArea,
  CardMedia,
  makeStyles,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  postCard: {
    margin: 16,
  },
  mediaBig: {
    height: 300,
    backgroundPosition: "center",
  },
  mediaCommon: {
    height: 150,
    backgroundPosition: "center",
  },
})

const BlogIndexPage = ({ location }: { location: Location }) => {
  console.log(location)
  let intl = useIntl()
  let data = useStaticQuery(pageQuery)
  let siteTitle = intl.formatMessage({
    id: data.site.siteMetadata?.title || `Title`,
  })
  let posts = data.allMarkdownRemark.nodes
  let classes = useStyles()

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
      <Grid container spacing={3}>
        {posts
          .filter(post => post.frontmatter?.visitable !== 0)
          .map(function ({ frontmatter, fields }, key) {
            let thumb =
              frontmatter.img ??
              require(`../${lodash.replace(fields.generatedCoverSlug, "", "")}`)
            return (
              <Grid
                key={frontmatter.id}
                md={key == 0 ? 12 : 6}
                xs={12}
                style={{ height: "auto", paddingBottom: "1em" }}
              >
                <Card className={classes.postCard}>
                  <CardActionArea href={fields.slug}>
                    <CardMedia
                      className={
                        key == 0 ? classes.mediaBig : classes.mediaCommon
                      }
                      image={thumb}
                      title={frontmatter.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {frontmatter.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {frontmatter.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })}
      </Grid>
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
          generatedCoverSlug
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
