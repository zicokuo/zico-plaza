//  站点头部
// @ts-ignore
import React, { useState } from "react"
import tw from "twin.macro"
import { FormattedMessage, Link } from "gatsby-plugin-intl"
import { AppBar, Avatar, Grid, IconButton, Toolbar, Typography, useScrollTrigger } from "@material-ui/core"
import SiteNavWidget from "./siteNav"
import { MobileOnly, PcOnly } from "./commonStyledComponents"
import { Search, Share } from "@material-ui/icons"
import { graphql, useStaticQuery } from "gatsby"
import { createStyles, makeStyles } from "@material-ui/styles"
import { HeaderEmbedSearchComp } from "@/src/sections/header/headerEmbedSearch"

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  title?: String
  window?: () => Window
  children: React.ReactElement
}

const ElevationScrollWrapper = (props: Props) => {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  return React.cloneElement(children, {
    elevation: scrollTrigger ? 4 : 0,
  })
}
const useStyles = makeStyles((theme:any) =>
  createStyles({
    AppBar:{
      height:72
    },
    root: {
      position: "relative",
      maxWidth: "1200px",
      margin: "auto",
      justifyContent: "start",
      backGround: theme?.colors?.background
    },
    HeaderLogo: {
      backGround: theme?.colors?.cyan["500"],
    },
  })
)

const HeaderWidget = ({ title, theme }: { isRootPath: boolean, title: string, theme: any }, props: Props) => {
  let { site } = useStaticQuery(pageQuery),
    pageTitle = site?.siteMetadata?.title || props?.title || "",
    classes = useStyles(theme),
    HeaderLogo = () => (
    <Link className="header-link-home" to="/">
      <Grid container alignItems={"center"} >
        <Avatar alt="Zico" src="/logo.png" css={[tw`m-4`]}  />
        <FormattedMessage id={`${pageTitle || title}`} />
      </Grid>
    </Link>
  )



  return (
    <ElevationScrollWrapper  {...props}>
      <AppBar className={classes.AppBar} position={"sticky"} color={"inherit"}>
        <PcOnly>
          <Grid classes={classes}  container alignItems={"center"}  wrap={"nowrap"}>
            <Grid item><HeaderLogo></HeaderLogo></Grid>
            <Grid item xs><SiteNavWidget ></SiteNavWidget></Grid>
            <Grid item css={[tw`relative right-0`]}>
              <HeaderEmbedSearchComp isShow={false}></HeaderEmbedSearchComp>
            </Grid>
          </Grid>
        </PcOnly>
        <MobileOnly>
          <div css={[tw`flex items-center justify-between`]}>
            <div css={[tw`flex-1 p-2 text-white`]}>
              <SiteNavWidget></SiteNavWidget>
            </div>
            <Typography variant="h6" css={[tw`flex-1 text-center text-white `]}>
              <HeaderLogo></HeaderLogo>
            </Typography>
            <div css={[tw`flex-1 p-2 text-right text-white`]}>
              <IconButton>
                <Share />
              </IconButton>
            </div>
          </div>
        </MobileOnly>
      </AppBar>
    </ElevationScrollWrapper>
  )
}

export default HeaderWidget

export const pageQuery = graphql`
  query headerQuery {
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
    intl: sitePlugin(name: { eq: "gatsby-plugin-intl" }) {
      options: pluginOptions {
        lang: languages
      }
    }
  }
`
