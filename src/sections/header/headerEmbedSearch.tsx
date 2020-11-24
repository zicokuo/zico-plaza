import React, { useState } from "react"
import { Fade, Grid, IconButton } from "@material-ui/core"
import { Search } from "@material-ui/icons"
import { Highlight, Hits, InstantSearch, SearchBox } from "react-instantsearch-dom/dist/es/index.js"
import algoliasearch from "algoliasearch/lite"

// const useStyles = makeStyles(
//   createStyles({
//     root: {
//       margin: 12,
//       padding: 12,
//       height: (props: any) => props?.isShow ? "auto" : "0"
//     }
//   }))

const HeaderEmbedSearchComp = ({
                                 isShow
                               }: { isShow: boolean }) => {
  const [searchWord, setSearchWord] = useState(""),
    [isShowComp, setShowComp] = useState(isShow),
    searchClient = algoliasearch("GLO3877ISM", "69d1332950aec951e868bcca5efd4b1e")

  function Hit(props: any) {
    console.log(props);
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

  return (
    <Grid container direction={"row"} wrap={"nowrap"} alignItems={"center"} gap-1>
      <Grid item md={10}>
        <Fade in={isShowComp}>
          <Grid>
            <InstantSearch indexName="Posts" searchClient={searchClient}>
              <div className="right-panel">
                <SearchBox />
                <Hits hitComponent={Hit} />
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
