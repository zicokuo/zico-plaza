import React, { useRef, useState } from "react"
import { ClickAwayListener, Fade, Grid, IconButton, Popover } from "@material-ui/core"
import { Search } from "@material-ui/icons"
// @ts-ignore
import { Highlight, Hits, InstantSearch, SearchBox } from "react-instantsearch-dom/dist/es/index"
import algoliasearch from "algoliasearch/lite"
import "./../../../static/algolia-min.css"

const HeaderEmbedSearchComp = ({
                                 isShow
                               }: { isShow: boolean }) => {
  const [showResult, setShowResult] = useState(false),
    [isShowComp, setShowComp] = useState(isShow),
    popupRef = useRef(),
    searchClient = algoliasearch("GLO3877ISM", "69d1332950aec951e868bcca5efd4b1e")

  const Hit = (props: any) => {
    // console.log(props);
    return (
      <div>
        <div className="hit-name">
          {props.hit?.frontmatter.title}
          <Highlight attribute="name" hit={props.hit?.frontmatter.title} />
        </div>
        <div className="hit-description">
          <Highlight attribute="description" hit={props.hit?.frontmatter.description} />
        </div>
      </div>
    )
  }

  const Hits = (props: any) => {
    return (<ClickAwayListener onClickAway={_ => setShowResult(false)}>
      <Popover
        action={props.ref}
        open={showResult}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Hits hitComponent={Hit} />
      </Popover>
    </ClickAwayListener>)
  }

  return (
    <Grid container direction={"row"} wrap={"nowrap"} alignItems={"center"} gap-1>
      <Grid item md={10}>
        <Fade in={isShowComp}>
          <Grid>
            <InstantSearch indexName="Posts" searchClient={searchClient}>
              <div className="right-panel">
                <SearchBox
                  ref={popupRef}
                  searchAsYouType={true}
                  onSubmit={event => {
                    event.preventDefault()
                    setShowResult(true)
                  }}
                />
                <Hits ref={popupRef}/>
              </div>
            </InstantSearch>
          </Grid>
        </Fade>
      </Grid>
      <Grid item md={2}>
        <IconButton aria-label="search">
          <Search onClick={_ => {
            setShowComp(!isShowComp)
          }} />
        </IconButton>
      </Grid>
    </Grid>

  )
}

export default HeaderEmbedSearchComp
