import { graphql, useStaticQuery } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { first } from "lodash"
import React from "react"
import tw, { styled } from "twin.macro"
import SEO from "../components/seo"
import Layout from "../layouts/layout"
import UIPostsListWithCard from "../ui/posts/postsList"

type ProductItem = {
  id: string
  title: string
  tags: [string]
  onlineStoreUrl: string
  description: string
  images: [{ originalSrc: string }]
  publishedAt: string
}
const ShopIndexPage = ({ location }) => {
  let intl = useIntl()
  let data = useStaticQuery(pageQuery)
  let siteTitle = intl.formatMessage({
    id: data.site.siteMetadata?.title || `Shop`,
  })
  let products = data?.allShopifyProduct.edges
  
  let CardBox = styled.div`
    ${tw`grid grid-cols-3 gap-4 justify-items-auto`}
  `
  let CardSize = styled.style`
    ${tw`py-2 m-2`}
  `

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={intl.formatMessage({ id: `title` })}></SEO>
      <CardBox>
        {products?.map(({ node }: ProductItem) => {
          return (
            <UIPostsListWithCard
              title={node.title}
              thumbUrl={first(node.images).localFile.childImageSharp.resize.src}
              pubDate={node.publishedAt}
              summary={node.description}
              storeUrl={node.onlineStoreUrl}
              styledWrapper={CardSize}
            ></UIPostsListWithCard>
          )
        })}
      </CardBox>
    </Layout>
  )
}
export default ShopIndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    shopifyShop {
      moneyFormat
    }
    allShopifyProduct {
      edges {
        node {
          id
          title
          tags
          onlineStoreUrl
          description
          availableForSale
          publishedAt(formatString: "MMMM DD, YYYY")
          images {
            originalSrc
            localFile {
              childImageSharp {
                resize(height: 480) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
