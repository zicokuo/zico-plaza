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
        siteNav: [{
                path: 'category',
                label: 'Category',
                type: 'category'
            },
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
        {
            resolve: `gatsby-plugin-dynamic-routes`,
            options: {
                routeFilePath: `src/routes.ts`
            }
        },
        // {
        //     resolve: `gatsby-plugin-apollo-shopify`,
        //     options: {
        //         shopName: `hhhtest001`,
        //         accessToken: `cea03dbd64effd74062401daeb0312fa`,
        //         // Optionally set the API version you want to use. For a list of available API versions,
        //         // see: https://shopify.dev/concepts/about-apis/versioning/release-notes
        //         // Defaults to unspecified/oldest stable
        //         apiVersion: "2020-10",
        //     },
        // },
        {
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
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    `gatsby-remark-prismjs`,
                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-smartypants`,
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                //trackingId: `ADD YOUR TRACKING ID HERE`,
            },
        },
        `gatsby-plugin-feed`,
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
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [`gatsby-remark-liquid-tags`]
            }
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
        }, {
            //    markdown 文章预览图
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [{
                    resolve: `gatsby-remark-responsive-image`,
                    options: {
                        // It's important to specify the maxWidth (in pixels) of
                        // the content container as this plugin uses this as the
                        // base for generating different widths of each image.
                        maxWidth: 590,
                    },
                }, ]
            }
        }

        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}