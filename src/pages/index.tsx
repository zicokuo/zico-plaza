import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"
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
  Chip,
  CardActions,
  Container,
} from "@material-ui/core"
import { WelcomeWidget } from "../sections/home/welcomeWidget"
import FallingStart from "@/src/ui/common/fallingStarBgWidget"
import tw from "twin.macro"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  postCard: {
    margin: 2,
  },
  postCardChip: {
    margin: 2,
  },
  mediaBig: {
    height: 250,
    backgroundPosition: "center",
  },
  mediaCommon: {
    height: 150,
    backgroundPosition: "center",
  },
})

const BlogIndexPage = ({ location }: { location: Location }) => {
  const intl = useIntl(),
    data = useStaticQuery(pageQuery),
    siteTitle = intl.formatMessage({
      id: data.site.siteMetadata?.title || `Title`,
    }),
    { posts } = data.allMarkdownRemark,
    classes = useStyles()

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
      <FallingStart/>
      <Container css={[tw`z-10`]}>
        <WelcomeWidget />
        <Grid container spacing={2}>
          {posts
            .filter(post => post.frontmatter?.visitable !== 0)
            .map(function ({ id, frontmatter, fields }, key) {
              let thumb =
                frontmatter.img ?? require(`../${fields.generatedCoverSlug}`)
              return (
                <Grid
                  item
                  key={id}
                  md={key < 1 ? 8 : 4}
                  xs={12}
                  style={{
                    height: "auto",
                    paddingBottom: "1em",
                    backgroundColor: "#eee",
                  }}
                >
                  <Card key={`postCard-${id}`} className={classes.postCard}>
                    <CardActionArea href={fields.slug}>
                      <CardMedia
                        className={
                          key < 1 ? classes.mediaBig : classes.mediaCommon
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
                          {frontmatter.date}
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
                    <CardActions>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="small"
                      >
                        {frontmatter.tags.map((tag: String) => (
                          <Chip
                            className={classes.postCardChip}
                            key={`${frontmatter.id}-${tag}`}
                            size={"small"}
                            clickable={true}
                            label={tag}
                          />
                        ))}
                      </Typography>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
        </Grid>
      </Container>
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
      posts: nodes {
        id
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
