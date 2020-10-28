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
        }
    },
    plugins: [
        //  PostCSS 处理
        { resolve: `gatsby-plugin-postcss` },
        //  Tailwind css
        { resolve: `gatsby-plugin-tailwindcss` },
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
                redirect: true
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
            resolve: "gatsby-plugin-categories",
            options: {
                templatePath: `${__dirname}/src/pages/category.tsx`
            }
        },
        {
            resolve: "gatsby-plugin-tags",
            options: {
                templatePath: `${__dirname}/src/pages/tag.tsx`
            }
        }

        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
