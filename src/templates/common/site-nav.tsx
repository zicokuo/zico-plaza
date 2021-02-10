import { Grid, Toolbar } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Link } from "gatsby-plugin-intl"
import { useStyles } from "@/src/hooks/styles"

const drawerWidth = 75,
  styles = {
    root: {},
    drawer: {
      width: drawerWidth + "vw",
    },
    navItem: {
      margin: 4,
    },
  }
const SiteNavWidget = ({}) => {
  const { site } = useStaticQuery(pageQuery),
    classes = useStyles(styles),
    siteNav = site?.siteMetadata?.siteNav ?? []

  return (
    <Toolbar classes={classes}>
      {siteNav.map(
        (nav: { path: string; label: React.ReactNode }, idx: number) => {
          return (
            <Grid key={`${idx}-${nav?.path}`} className={classes.navItem}>
              <Link
                key={`${idx}-${nav?.path}-link`}
                to={`${nav?.path?.match("^/") ? nav : `/${nav.path}`}`}
              >
                {nav?.label}
              </Link>
            </Grid>
          )
        }
      )}
    </Toolbar>
  )
}

export default SiteNavWidget

export const pageQuery = graphql`
  query MyQuery {
    site(siteMetadata: {}) {
      siteMetadata {
        title
        description
        siteNav {
          path
          label
          type
        }
      }
    }
  }
`
