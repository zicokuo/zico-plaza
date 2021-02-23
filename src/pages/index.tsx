import React, { useState } from "react"
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
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { WelcomeWidget } from "../templates/home/welcome-widget"
import {
  postsQuery,
  PostsQueryNode,
  PostsQueryPostNode,
} from "@/src/graphql/posts"
import InfiniteScroll from "react-infinite-scroll-component"
import lodash from "lodash"

const useStyles = makeStyles({
  root: {
    background: "transparent",
    zIndex: 10,
  },
  postCard: {
    height: "100%",
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
  let intl = useIntl(),
    data: PostsQueryNode = postsQuery(),
    siteTitle = intl.formatMessage({
      id: data.site.siteMetadata?.title || `Title`,
    }),
    { posts } = data.allMarkdownRemark,
    classes = useStyles(),
    showPosts = (_posts: PostsQueryPostNode[]): PostsQueryPostNode[] =>
      _posts.filter(_post => _post?.frontmatter?.visitable !== 0),
    pageSize = 4,
    [curPage, setCurPage] = useState(1),
    [pagePosts, setPagePosts] = useState(
      lodash.take(posts, curPage * pageSize)
    ),
    nextPagePosts = () => {
      setCurPage(curPage + 1)
      setPagePosts(lodash.take(posts, (curPage + 1) * pageSize))
    }

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
      <Container classes={classes}>
        <WelcomeWidget />
        <InfiniteScroll
          style={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}
          dataLength={pagePosts.length}
          next={nextPagePosts}
          hasMore={pagePosts.length > pageSize * (curPage - 1)}
          loader={
            <Grid container justify={"center"}>
              <CircularProgress />
            </Grid>
          }
          endMessage={
            <Grid container justify={"center"}>
              -- the end --
            </Grid>
          }
          pullDownToRefresh={true}
          refreshFunction={() => setCurPage(1)}
        >
          {pagePosts
            // .filter(post => post?.frontmatter?.visitable !== 0)
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
                    padding: "1em",
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
        </InfiniteScroll>
      </Container>
    </Layout>
  )
}

export default BlogIndexPage
