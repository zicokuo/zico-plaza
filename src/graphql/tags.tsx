/*
 * @Author: Zico
 * @Date: 2020-11-05 13:15:47
 * @LastEditors: Zico
 * @LastEditTime: 2020-11-20 14:23:50
 * @Description: eBayMonitor Server
 * @FilePath: \zico-plaza\src\hooks\tags-hooks.ts
 */
import { graphql, useStaticQuery } from "gatsby"

export const useAllTags = () => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
    query allTags {
      allMarkdownRemark {
        totalCount
        group(field: fields___tags) {
          fieldValue
          totalCount
          posts: nodes {
            id
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
    }
  `)

  return allMarkdownRemark
}
