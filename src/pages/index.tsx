import React from "react"
import { useStaticQuery } from "gatsby"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"
import Layout from "../layouts/layout"
import SEO from "../templates/common/seo"
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { WelcomeWidget } from "../templates/home/welcome-widget"
import FallingStart from "@/src/templates/common/falling-star-widget"
import {
  postsQuery,
  PostsQueryNode,
  PostsQueryPostNode,
} from "@/src/service/posts"

const useStyles = makeStyles({
  root: {
    background: "transparent",
    zIndex: 10,
  },
  postCard: {
    height: "100%",
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
    data: PostsQueryNode = postsQuery(),
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
      <FallingStart />
      <Container classes={classes}>
        <WelcomeWidget />
        <Grid container spacing={4}>
          {posts
            .filter(post => post?.frontmatter?.visitable !== 0)
            .map(({ id, frontmatter, fields }: PostsQueryPostNode, key) => {
              let thumb =
                frontmatter?.img ?? require(`../${fields?.generatedCoverSlug}`)
              return (
                <Grid
                  item
                  key={id}
                  md={key < 1 ? 8 : 4}
                  xs={12}
                  style={{
                    height: "auto",
                  }}
                >
                  <Card
                    key={`postCard-${id}`}
                    className={classes.postCard}
                    elevation={3}
                  >
                    <CardActionArea href={`${fields?.slug}`}>
                      <CardMedia
                        className={
                          key < 1 ? classes.mediaBig : classes.mediaCommon
                        }
                        image={thumb}
                        title={`${frontmatter?.title}`}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {`${frontmatter?.title}`}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {`${frontmatter?.date}`}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {`${frontmatter?.description}`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="small"
                      >
                        {frontmatter?.tags?.map((tag: String) => (
                          <Chip
                            className={classes.postCardChip}
                            key={`${id}-${tag}`}
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
