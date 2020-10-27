//  页面布局
// @ts-ignore
import React from "react"
import { GlobalStyles } from "twin.macro"
import HeaderWidget from "./header"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  return (
    <>
      <HeaderWidget title={title} isRootPath={isRootPath}/>
      <GlobalStyles />
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
