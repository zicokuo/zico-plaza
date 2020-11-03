import {
  createStyles,
  Drawer,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
} from "@material-ui/core"
import { graphql, useStaticQuery, Link } from "gatsby"
import React, { useState } from "react"
import MenuIcon from "@material-ui/icons/Menu"
import { Div, MobileOnly, PcOnly } from "./commonStyledComponents"
import tw, { styled } from "twin.macro"

const drawerWidth = 75

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth + "vw",
    },
  })
)

const SiteNavWidget = ({}) => {
  const { site } = useStaticQuery(pageQuery),
    classes = useStyles(),
    siteNav = site?.siteMetadata?.siteNav ?? [],
    HeaderNavItem = styled.div`
      ${tw`p-2`}
    `,
    HeaderNav = PcOnly,
    MobileHeaderNav = MobileOnly,
    [drawerOpen, setDrawerOpen] = useState(false),
    handleClickMobileMenuPopUp = (event: React.MouseEvent<HTMLElement>) => {
      setDrawerOpen(true)
      // setMobileHeaderEl(event.currentTarget)
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
          <Div as={MenuIcon} color="inherit"></Div>
        </IconButton>
        <Drawer
          classes={{ paper: classes.drawer }}
          anchor={"left"}
          open={drawerOpen}
          onClose={_ => setDrawerOpen(false)}
        >
          <List>
            {siteNav.map((nav: { path: string; label: React.ReactNode }) => {
              return (
                <ListItem>
                  <Link to={nav?.path?.match("^/") ? nav : `/${nav.path}`}>
                    {nav?.label}
                  </Link>
                </ListItem>
              )
            })}
          </List>
        </Drawer>
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
