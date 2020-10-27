//  站点头部
// @ts-ignore
import React from "react"
import styled from "styled-components"
import tw from "twin.macro"
import { FormattedMessage, Link } from "gatsby-plugin-intl"

const HeaderWidget = ({
                        isRootPath = true,
                        title = null
                      }) => {
  const Header = styled.header`${tw`flex flex-auto items-center`}`
  let HeaderLogo
  if (isRootPath) {
    HeaderLogo = ()=>(
      <h1 className="main-heading">
        <Link to="/"><FormattedMessage id={title} /></Link>
      </h1>
    )
  } else {
    HeaderLogo =()=> (
      <Link className="header-link-home" to="/">
        <FormattedMessage id={title} />
      </Link>
    )
  }

  return (
    <>
      <Header>
        <HeaderLogo></HeaderLogo>
      </Header>
    </>
  )
}

export default HeaderWidget
