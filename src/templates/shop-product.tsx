import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layouts/layout"

const ShopProductsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <h1>Products</h1>
      <ul>
        {data.allShopifyProduct.edges.map(({ node }) => (
          <li key={node.shopifyId}>
            <h3>
              <Link to={`/product/${node.handle}`}>{node.title}</Link>
              {" - "}${node.priceRange.minVariantPrice.amount}
            </h3>
            <p>{node.description}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default ShopProductsPage

export const query = graphql`
  {
    allShopifyProduct(sort: { fields: [title] }) {
      edges {
        node {
          title
          shopifyId
          description
          handle
          priceRange {
            minVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
`
