//  站点头部
// @ts-ignore
import React from "react"
import tw, { styled } from "twin.macro"
import { FormattedMessage, Link } from "gatsby-plugin-intl"
import { AppBar, useScrollTrigger } from "@material-ui/core"

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
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
  let HeaderLogo
  if (isRootPath) {
    HeaderLogo = () => (
      <h1 className="main-heading">
        <Link to="/">
          <FormattedMessage id={`${title}`} />
        </Link>
      </h1>
    )
  } else {
    HeaderLogo = () => (
      <Link className="header-link-home" to="/">
        <FormattedMessage id={`${title}`} />
      </Link>
    )
  }

  return (
    <ElevationScrollWrapper {...props}>
      <AppBar position={"sticky"}>
        <div css={[tw`flex items-center h-12 max-w-6xl m-auto`]}>
          <HeaderLogo></HeaderLogo>
          <Link to={"/shop"}>{"Shop"}</Link>
        </div>
      </AppBar>
    </ElevationScrollWrapper>
  )
}

export default HeaderWidget
