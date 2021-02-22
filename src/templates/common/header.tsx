//  站点头部
// @ts-ignore
import React, { useState } from "react"
import { FormattedMessage, Link } from "gatsby-plugin-intl"
import { AppBar, Avatar, Grid, useScrollTrigger } from "@material-ui/core"
import { createStyles, makeStyles } from "@material-ui/styles"
import SiteNavWidget from "./site-nav"
import HeaderEmbedSearchComp from "@/src/templates/header/header-embed-search"
import { ThemeConfigFace } from "@/src/theme/base.theme"
import { sqSiteInfoData } from "@/src/graphql/site-info"
// import LangSwitchWidget from "@/src/templates/header/lang-switch"

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
const useStyles = makeStyles((theme: any) =>
  createStyles({
    appBar: {
      height: 72,
    },
    root: {
      position: "relative",
      maxWidth: "1200px",
      margin: "auto",
      justifyContent: "start",
    },
    item: {
      margin: 6,
    },
    headerAvatar: {
      margin: 6,
    },
  })
)

/**
 *  ## 头部 header
 * @param title
 * @param theme
 * @param props
 * @constructor
 */
const HeaderWidget = (
  {
    title,
    theme,
  }: { isRootPath: boolean; title: string; theme: ThemeConfigFace },
  props: Props
) => {
  let { site } = sqSiteInfoData(),
    pageTitle = site?.siteMetadata?.title || props?.title || "",
    classes = useStyles(theme),
    HeaderLogo = () => (
      <Link to="/">
        <Grid className={classes.root} container alignItems={"center"}>
          <Grid item className={classes.item}>
            <Avatar
              className={classes.headerAvatar}
              alt="avatar"
              src="/logo.png"
            />
          </Grid>
          <Grid item className={classes.item}>
            <FormattedMessage id={`${pageTitle || title}`} />
          </Grid>
        </Grid>
      </Link>
    )

  return (
    <ElevationScrollWrapper {...props}>
      <AppBar className={classes.appBar} position={"sticky"} color={"inherit"}>
        <Grid
          className={classes.root}
          container
          alignItems={"center"}
          wrap={"nowrap"}
        >
          <Grid item className={classes.item}>
            <HeaderLogo />
          </Grid>
          <Grid item xs className={classes.item}>
            <SiteNavWidget />
          </Grid>

          <Grid item style={{ position: `relative` }} className={classes.item}>
            <HeaderEmbedSearchComp isShow={false} />
          </Grid>
        </Grid>
      </AppBar>
    </ElevationScrollWrapper>
  )
}

export default HeaderWidget
