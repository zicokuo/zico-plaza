//  站点头部
// @ts-ignore
import React from "react"
import tw, { styled } from "twin.macro"
import { FormattedMessage, Link } from "gatsby-plugin-intl"
import { AppBar } from "@material-ui/core"

const HeaderWidget = ({ isRootPath = true, title = null }) => {
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
    <AppBar position={"sticky"}>
      <div css={[tw`max-w-6xl m-auto h-12 flex items-center`]}>
        <HeaderLogo></HeaderLogo>
        <Link to={"/shop"}>{"Shop"}</Link>
      </div>
    </AppBar>
  )
}

export default HeaderWidget
