/*
 * @Author: Zico
 * @Date: 2020-10-21 10:43:41
 * @LastEditors: Zico
 * @LastEditTime: 2020-11-20 15:16:12
 * @Description: eBayMonitor Server
 * @FilePath: \zico-plaza\gatsby-config.js
 */

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

// gatsby-config.js
const myQuery = `{
  pages: allSitePage {
    nodes {
      # try to find a unique id for each node
      # if this field is absent, it's going to
      # be inserted by Algolia automatically
      # and will be less simple to update etc.
      objectID: id
      component
      path
      componentChunkName
      # jsonName
      internal {
        type
        contentDigest
        owner
      }
    }
  }
}`;

const queries = [
    {
        query: myQuery,
        transformer: ({ data }) => data.pages.nodes, // optional
        indexName: 'index name to target', // overrides main index name, optional
        settings: {
            // optional, any index settings
        },
        matchFields: ['slug', 'date','title'], // Array<String> overrides main match fields, optional
    },
];

module.exports = {
    siteMetadata: {
        title: `Zico Plaza`,
        author: {
            name: `Zico`,
            summary: `fullstack develop engineer`
        },
        description: `A starter blog demonstrating what Gatsby can do.`,
        siteUrl: `https://gatsby-starter-blog-demo.netlify.app/`,
        social: {
            twitter: ``
        },
        siteNav: [
            // {
            //     path: 'category',
            //     label: 'Category',
            //     type: 'category'
            // },
            {
                path: 'tags',
                label: 'Tags',
                type: 'tag'
            },
            {
                path: 'shop',
                label: 'Shop',
                type: 'shop'
            },
        ]
    },
    plugins: [

        //  PostCSS 处理
        {
            resolve: `gatsby-plugin-postcss`
        },
        {
            resolve: `babel-plugin-tailwind-components`
        },
        //  Tailwind css
        {
            resolve: `gatsby-plugin-tailwindcss`,
        },
        //  Material UI
        {
            resolve: `gatsby-plugin-material-ui`,
            options: {
                stylesProvider: {
                    injectFirst: true
                }
            }
        },
        //    apollo client
        {
            resolve: `gatsby-theme-apollo`
        },
        {
            resolve: `gatsby-plugin-dynamic-routes`,
            options: {
                routeFilePath: `src/routes.ts`
            }
        },
        {
            resolve: 'gatsby-plugin-apollo',
            options: {
                uri:  `http://localhost:8000/___graphql`
            }
        },        {
            resolve: `gatsby-source-shopify`,
            options: {
                // The domain name of your Shopify shop.
                shopName: `hhhtest001`,
                // The storefront access token
                accessToken: `cea03dbd64effd74062401daeb0312fa`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: `blog`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/assets`,
                name: `assets`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [{
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 630,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`
                        }
                    },{
                        resolve: `gatsby-remark-responsive-image`,
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 590
                        }
                    }, {
                        resolve: `gatsby-remark-liquid-tags`
                    },
                    {resolve:`gatsby-remark-prismjs`},
                    {resolve:`gatsby-remark-copy-linked-files`},
                    {resolve:`gatsby-remark-smartypants`}
                ],
            },
        },
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                plugins: [
                    { resolve: `gatsby-transformer-sharp` },
                    {
                        resolve: `gatsby-plugin-google-analytics`,
                        options: {
                            //trackingId: `ADD YOUR TRACKING ID HERE`,
                        }
                    }
                ]
            }
        }
          ,{resolve:`gatsby-plugin-feed`,},
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Gatsby Starter Blog`,
                short_name: `GatsbyJS`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `content/assets/gatsby-icon.png`,
            },
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-typescript`,
            options: {
                isTSX: true, // defaults to false
                jsxPragma: `jsx`, // defaults to "React"
                allExtensions: true, // defaults to false
            },
        },
        {
            resolve: `gatsby-plugin-intl`,
            options: {
                // language JSON resource path
                path: `${__dirname}/src/intl`,
                // supported language
                languages: [`cn`, `en`],
                // language file path
                defaultLanguage: `cn`,
                // option to redirect to `/ko` when connecting `/`
                redirect: false
            },
        }, {
            resolve: `@micalgenus/gatsby-plugin-github-avatar`,
            options: {
                username: `zicokuo`, // Github username
                default: null // Github userid for default image
            }
        }, {
            resolve: `gatsby-plugin-styled-components`,
            options: {
                "pure": true
                // Add any options here
            }
        }, {
            //    markdown 分类库
            resolve: "gatsby-plugin-categories",
            options: {
                templatePath: `${__dirname}/src/pages/category.tsx`
            }
        }, {
            //    markdown 标签库
            resolve: "gatsby-plugin-tags",
            options: {
                templatePath: `${__dirname}/src/pages/tag.tsx`
            }
        },  {
            //  gitalk 留言
            resolve: `gatsby-plugin-gitalk`,
            options: {
                config: {
                    clientID: "9cdb3b2c53495acbb5c9",
                    clientSecret: "bc464af694dcd1dcb480971b8e902edd90d3629d",
                    repo: "zico-plaza",      // The repository of store comments,
                    owner: "zicokuo",
                    admin: ["zicokuo"],
                    distractionFreeMode: false,// Faceb
                    createIssueManually: true

                }
            }
        },{
            //  alogolia - 搜索插件
            // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
            resolve: `gatsby-plugin-algolia`,
            options: {
                appId: process.env.ALGOLIA_APP_ID,
                // Use Admin API key without GATSBY_ prefix, so that the key isn't exposed in the application
                // Tip: use Search API key with GATSBY_ prefix to access the service from within components
                apiKey: process.env.ALGOLIA_API_KEY,
                indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
                queries,
                chunkSize: 10000, // default: 1000
                settings: {
                    // optional, any index settings
                },
                enablePartialUpdates: true, // default: false
                matchFields: ['slug', 'date','title'], // Array<String> default: ['modified']
                concurrentQueries: true, // default: true
                skipIndexing: true, // default: false, useful for e.g. preview deploys or local development
            },
        },

        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}

