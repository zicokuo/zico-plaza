/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

// @ts-ignore
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { FormattedMessage } from "gatsby-plugin-intl"

import Avatar from "@micalgenus/gatsby-plugin-github-avatar"
import { Grid } from "@material-ui/core"
import { createStyles, makeStyles } from "@material-ui/styles"

export const BioWidget = (): JSX.Element => {
  const data = useStaticQuery(graphql`
      query BioQuery {
        avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
          childImageSharp {
            fixed(width: 50, height: 50, quality: 95) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        site {
          siteMetadata {
            author {
              name
              summary
            }
            social {
              twitter
            }
          }
        }
      }
    `),
    author = data.site.siteMetadata?.author,
    summary = data.site.siteMetadata?.author?.summary,
    classes = makeStyles(theme =>
      createStyles({
        root: {
          display: "flex",
        },
        avatar: {
          height: 64,
        },
      })
    )()

  return (
    <Grid
      container
      spacing={4}
      className={"bio"}
      justify={"center"}
      alignContent={"center"}
      classes={classes}
    >
      <Grid item>
        <Avatar className={classes.avatar} />
      </Grid>
      <Grid item alignItems={"center"} container direction={"column"}>
        <Grid item>
          <FormattedMessage id={`Author`} /> :{author?.name || ` `}
        </Grid>
        <Grid item>{summary}</Grid>
      </Grid>
    </Grid>
  )
}
