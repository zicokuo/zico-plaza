import { graphql, useStaticQuery } from "gatsby"

export const useAllTags = () => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
    query allTags {
      allMarkdownRemark(filter: { frontmatter: { tags: {} } }) {
        totalCount
        group(field: fields___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  console.log("ddd", allMarkdownRemark)

  return allMarkdownRemark
}
