import { IconButton, Menu, MenuItem, Toolbar } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import { Link } from "gatsby-plugin-intl"
import React, { useState } from "react"
import tw, { styled } from "twin.macro"
import MenuIcon from "@material-ui/icons/Menu"
import { Div, MobileOnly, PcOnly } from "./commonStyledComponents"

const SiteNavWidget = ({}) => {
  const { site } = useStaticQuery(pageQuery),
    siteNav = site?.siteMetadata?.siteNav ?? [],
    siteNavId = "header-site-nav",
    HeaderNavItem = styled.div`
      ${tw`p-2`}
    `,
    HeaderNav = PcOnly,
    MobileHeaderNav = MobileOnly,
    [mobileHeaderEL, setMobileHeaderEl] = useState<null | HTMLElement>(null),
    handleClickMobileMenuPopUp = (event: React.MouseEvent<HTMLElement>) => {
      setMobileHeaderEl(event.currentTarget)
    }

  return (
    <nav>
      {/* pc导航 */}
      <HeaderNav as={Toolbar}>
        {siteNav.map((nav: { path: string; label: React.ReactNode }) => {
          return (
            <HeaderNavItem>
              <Link to={nav?.path?.match("^/") ? nav : `/${nav.path}`}>
                {nav?.label}
              </Link>
            </HeaderNavItem>
          )
        })}
      </HeaderNav>
      {/* 移动导航 */}
      <MobileHeaderNav>
        <IconButton edge="end" onClick={handleClickMobileMenuPopUp}>
          <Div as={MenuIcon} tw={`text-red-500`}></Div>
        </IconButton>
        <Menu
          anchorEl={mobileHeaderEL}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          id={siteNavId}
          keepMounted
          transformOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={Boolean(mobileHeaderEL)}
          onClose={() => setMobileHeaderEl(null)}
        >
          {siteNav.map((nav: { path: string; label: React.ReactNode }) => {
            return (
              <MenuItem>
                <Link to={nav?.path?.match("^/") ? nav : `/${nav.path}`}>
                  {nav?.label}
                </Link>
              </MenuItem>
            )
          })}
        </Menu>
      </MobileHeaderNav>
    </nav>
  )
}

export default SiteNavWidget

export const pageQuery = graphql`
  query MyQuery {
    site(siteMetadata: {}) {
      siteMetadata {
        title
        description
        siteNav {
          path
          label
          type
        }
      }
    }
  }
`
