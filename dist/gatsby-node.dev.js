"use strict";

var path = require("path");

var _require = require("gatsby-source-filesystem"),
    createFilePath = _require.createFilePath;

exports.createPages = function _callee(_ref) {
  var graphql, actions, reporter, createPage, blogPost, result, posts, shopifyResult;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          graphql = _ref.graphql, actions = _ref.actions, reporter = _ref.reporter;
          createPage = actions.createPage; // Define a template for blog post

          blogPost = path.resolve("./src/templates/blog-post.tsx"); // Get all markdown blog posts sorted by date

          _context.next = 5;
          return regeneratorRuntime.awrap(graphql("\n      {\n        allMarkdownRemark(\n          sort: { fields: [frontmatter___date], order: ASC }\n          limit: 1000\n        ) {\n          nodes {\n            id\n            fields {\n              slug\n            }\n          }\n        }\n      }\n    "));

        case 5:
          result = _context.sent;

          if (!result.errors) {
            _context.next = 9;
            break;
          }

          reporter.panicOnBuild("There was an error loading your blog posts", result.errors);
          return _context.abrupt("return");

        case 9:
          posts = result.data.allMarkdownRemark.nodes; // Create blog posts pages
          // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
          // `context` is available in the template as a prop and as a variable in GraphQL

          if (posts.length > 0) {
            posts.forEach(function (post, index) {
              var previousPostId = index === 0 ? null : posts[index - 1].id;
              var nextPostId = index === posts.length - 1 ? null : posts[index + 1].id;
              createPage({
                path: post.fields.slug,
                component: blogPost,
                context: {
                  id: post.id,
                  previousPostId: previousPostId,
                  nextPostId: nextPostId
                }
              });
            });
          }

          _context.next = 13;
          return regeneratorRuntime.awrap(graphql("\n  query {\n    allShopifyProduct(sort: { fields: [title] }) {\n      edges {\n        node {\n          title\n          images {\n            originalSrc\n          }\n          shopifyId\n          handle\n          description\n          availableForSale\n          priceRange {\n            maxVariantPrice {\n              amount\n            }\n            minVariantPrice {\n              amount\n            }\n          }\n        }\n      }\n    }\n  }\n"));

        case 13:
          shopifyResult = _context.sent;
          // Iterate over all products and create a new page using a template
          // The product "handle" is generated automatically by Shopify
          shopifyResult.data.allShopifyProduct.edges.forEach(function (_ref2) {
            var node = _ref2.node;
            createPage({
              path: "/product/".concat(node.handle),
              component: path.resolve("./src/templates/shop-product.tsx"),
              context: {
                product: node
              }
            });
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.onCreateNode = function (_ref3) {
  var node = _ref3.node,
      actions = _ref3.actions,
      getNode = _ref3.getNode;
  var createNodeField = actions.createNodeField;

  if (node.internal.type === "MarkdownRemark") {
    var value = createFilePath({
      node: node,
      getNode: getNode
    });
    createNodeField({
      name: "slug",
      node: node,
      value: value
    });
  }
};

exports.createSchemaCustomization = function (_ref4) {
  var actions = _ref4.actions;
  var createTypes = actions.createTypes; // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js
  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error

  createTypes("\n    type SiteSiteMetadata {\n      author: Author\n      siteUrl: String\n      social: Social\n    }\n\n    type Author {\n      name: String\n      summary: String\n    }\n\n    type Social {\n      twitter: String\n    }\n\n    type MarkdownRemark implements Node {\n      frontmatter: Frontmatter\n      fields: Fields\n    }\n\n    type Frontmatter {\n      title: String\n      description: String\n      date: Date @dateformat\n    }\n\n    type Fields {\n      slug: String\n      category: String\n      tags: [String]\n    }\n  ");
};