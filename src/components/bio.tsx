/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

// @ts-ignore
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { useIntl, FormattedMessage } from "gatsby-plugin-intl"
import styled from 'styled-components'
import tw, { css, theme } from 'twin.macro'

import Avatar from '@micalgenus/gatsby-plugin-github-avatar';
const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author

  const CompWrapper = styled.div`${tw`flex flex-auto flex-grow items-center`}`;
  const AuthorName = styled.div`${tw`flex flex-auto`}`;

  return (
    <CompWrapper className={"bio"} >
     <Avatar tw={"flex rounded-full h-32 mr-8"} />
      <AuthorName>
        <FormattedMessage id={`Author`} /> :{author?.name || ` `}
      </AuthorName>
    </CompWrapper>
  )
}

export default Bio
