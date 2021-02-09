import { graphql, useStaticQuery } from "gatsby"

export const sqSiteInfoData = (): SiteInfoDataFace =>
  useStaticQuery(graphql`
    query {
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
  `)

export interface SiteInfoDataFace {
  site: {
    siteMetadata: {
      title: string
      description: string
      siteNav: {
        path: string
        label: string
        type: string
      }
    }
  }
  intl: {
    options: {
      lang: string
    }
  }
}
