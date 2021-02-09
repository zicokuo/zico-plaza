//  页面布局
// @ts-ignore
import React from "react"
import HeaderWidget from "../templates/common/header"
import FooterWidget from "../templates/common/footer"
import { useIntl } from "gatsby-plugin-intl"
import { graphql, useStaticQuery } from "gatsby"
import { themeConfig } from "@/src/theme/base.theme"

const Layout = ({
  location,
  children,
}: {
  location: Location
  title: String
  children: any
}) => {
  const intl = useIntl()
  // @ts-ignore
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location?.pathname === rootPath
  const theme = themeConfig
  const { site } = useStaticQuery(layoutQuery)
  const siteTitle = intl.formatMessage({
    id: site?.siteMetadata?.title || `Title`,
  })

  return (
    <>
      <HeaderWidget
        title={siteTitle?.toString() ?? ""}
        theme={theme}
        isRootPath={isRootPath}
      />
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
      </div>
      <FooterWidget />
    </>
  )
}

export const layoutQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default Layout
