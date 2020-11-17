//  站点头部
// @ts-ignore
import React from "react"
import tw, { styled } from "twin.macro"
import { FormattedMessage, Link } from "gatsby-plugin-intl"
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@material-ui/core"
import SiteNavWidget from "./siteNav"
import { MobileOnly, PcOnly } from "./commonStyledComponents"
import ShareIcon from "@material-ui/icons/Share"
import { graphql, useStaticQuery } from "gatsby"
import LangSwitchWidget from "./langSwitch"
import { createStyles, makeStyles } from "@material-ui/styles"

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

const HeaderWidget = ({ isRootPath = true, title = null }, props: Props) => {
  const { site } = useStaticQuery(pageQuery),
    pageTitle = site?.siteMetadata?.title || props?.title || ""

  let HeaderLogo = () => (
    <Link className="header-link-home" to="/">
      <FormattedMessage id={`${pageTitle || title}`} />
    </Link>
  )

  const classes = makeStyles(theme =>
    createStyles({
      root: {
        position: "relative",
        maxWidth: "1200px",
        margin: "auto",
      },
      langSwitch: {
        position: "relative",
        right: "1em",
      },
    })
  )

  return (
    <ElevationScrollWrapper {...props}>
      <AppBar position={"sticky"}>
        <PcOnly>
          <Toolbar classes={classes()} disableGutters={true}>
            <HeaderLogo></HeaderLogo>
            <SiteNavWidget></SiteNavWidget>
            <div css={[tw`absolute right-0 ml-4`]}>
              <LangSwitchWidget></LangSwitchWidget>
            </div>
          </Toolbar>
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
                <ShareIcon />
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
