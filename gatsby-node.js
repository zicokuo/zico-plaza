const fs = require(`fs`);
const path = require(`path`)
const lodash = require(`lodash`)
const createImage = require(`gatsby-plugin-blog-cover`)
const {
  createFilePath
} = require(`gatsby-source-filesystem`)
exports.onCreateWebpackConfig = ({
  stage,
  actions
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/src": path.resolve(__dirname, './src'),
        "@/public": path.resolve(__dirname, './public'),
        "@/content": path.resolve(__dirname, './content'),
        "@/intl": path.resolve(__dirname, './intl'),
      }
    }
  })
};

exports.createPages = async ({
  graphql,
  actions,
  reporter
}) => {
  const {
    createPage
  } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  const shopifyResult = await graphql(`
  query {
    allShopifyProduct(sort: { fields: [title] }) {
      edges {
        node {
          title
          images {
            originalSrc
          }
          shopifyId
          handle
          description
          availableForSale
          priceRange {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
`)
  // Iterate over all products and create a new page using a template
  // The product "handle" is generated automatically by Shopify
  shopifyResult.data.allShopifyProduct.edges.forEach(({
    node
  }) => {
    createPage({
      path: `/product/${node.handle}`,
      component: path.resolve(`./src/templates/shop-product.tsx`),
      context: {
        product: node,
      },
    })
  })

}

exports.onCreateNode = ({
  node,
  actions,
  getNode
}) => {
  const {
    createNodeField
  } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({
      node,
      getNode
    })

    createNodeField({
      name: `slug`,
      node,
      value,
    })

    //  封面
    const {
      title,
      enTitle
    } = node.frontmatter;
    const thumbBgColor = [
      '#B0E0E6', '#4169E1', '#FF6347'
    ];
    //  检查封面文件夹,存在则清空*.png,不存在则创建
    const generatedCoverSlug = createImage({
      title: enTitle,
      border: false,
      domain: 'zico.plaza',
      imgPath: './src/thumbs',
      bgColor: lodash.toLower(thumbBgColor[lodash.random(0, thumbBgColor.length, false)])
      // domain: "https://dillionmegida.com"
    })
    createNodeField({
      node,
      name: 'generatedCoverSlug',
      value: generatedCoverSlug
    })

  }
}

exports.createSchemaCustomization = ({
  actions
}) => {
  const {
    createTypes
  } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(
    `
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
      siteNav:[SiteNav]
    }
    
    type SiteNav{
      path: String,
      label: String,
      type: String
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
      category: String
      tags: [String],
      generatedCoverSlug: String
    }
  `)
}