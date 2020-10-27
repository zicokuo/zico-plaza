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

  const Header = styled.header`${tw`sticky top-0 flex flex-auto items-center bg-gray-200 bg-opacity-75 `}`

  return (
    <>
      <Header>
        <div tw="max-w-6xl m-auto h-12 flex items-center">
        <HeaderLogo></HeaderLogo>
        </div>
      </Header>
    </>
  )
}

export default HeaderWidget
