import { graphql, useStaticQuery } from "gatsby"

export const postsQuery = () =>
  useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        posts: nodes {
          id
          excerpt
          fields {
            slug
            generatedCoverSlug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            enTitle
            author
            visitable
            description
            enDescription
            category
            tags
          }
        }
      }
    }
  `)

export interface PostsQueryNode {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    posts: PostsQueryPostNode[]
  }
}

export interface PostsQueryPostNode {
  id: string
  excerpt: string
  fields?: {
    slug: string
    generatedCoverSlug: string
  }
  frontmatter?: {
    img: string
    date: string
    title: string
    enTitle: string
    author: string
    visitable: number
    description: string
    enDescription: string
    category: string
    tags: string[]
  }
}
