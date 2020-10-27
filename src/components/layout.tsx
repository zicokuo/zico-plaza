//  页面布局
// @ts-ignore
import React from "react"
import { GlobalStyles } from "twin.macro"
import HeaderWidget from "./header"
import FooterWidget from "./footer"


const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  return (
    <>
      <HeaderWidget title={title} isRootPath={isRootPath}/>
      <GlobalStyles />
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
      </div>
      <FooterWidget/>
    </>
  )
}

export default Layout
