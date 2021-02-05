import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  ClickAwayListener,
  createStyles,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core"
// @ts-ignore
import {
  connectHits,
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
} from "react-instantsearch-dom/dist/es/index"
import algoliasearch from "algoliasearch/lite"
import { makeStyles } from "@material-ui/styles"
import { graphql, Link, useStaticQuery } from "gatsby"
export interface AlgoliaSearchHit {
  frontmatter: any
  objectID: string
  id: string
}

const useStyile = makeStyles(
  createStyles({
    root: {
      // margin: "0 10vw"
    },
    paper: {
      margin: "0 10vw",
    },
  })
)

/**
 * 头部aligo搜索结果弹出界面
 * @param hits
 */
const customHits = ({
  hits,
}: {
  hits: Array<AlgoliaSearchHit> | undefined
}) => {
  return (
    <List dense>
      {hits?.map(({ frontmatter, objectID, id }: AlgoliaSearchHit) => (
        <ListItem dense>
          <Link to={``}>
            <ListItemText
              inset
              primary={frontmatter?.title}
              secondary={frontmatter?.description}
            >
              <Highlight attribute="name" hit={frontmatter?.title} />
              <Highlight
                attribute="description"
                hit={frontmatter?.description}
              />
            </ListItemText>
          </Link>
        </ListItem>
      ))}
    </List>
  )
}

/**
 * 头部嵌入式搜索组件
 * @param isShow
 * @constructor
 */
const HeaderEmbedSearchComp = ({ isShow }: { isShow: boolean }) => {
  const [showResult, setShowResult] = useState(false),
    [isShowComp, setShowComp] = useState(isShow),
    searchClient = algoliasearch(
      "GLO3877ISM",
      "69d1332950aec951e868bcca5efd4b1e"
    ),
    CustomHits = connectHits(customHits),
    classes = useStyile()

  return (
    <Grid
      container
      direction={"row"}
      wrap={"nowrap"}
      alignItems={"center"}
      gap-1
    >
      <Grid item md={10}>
        <InstantSearch indexName="Posts" searchClient={searchClient}>
          <div className="right-panel">
            {/*搜索框*/}
            <SearchBox
              searchAsYouType={true}
              onSubmit={(event: Event) => {
                event.preventDefault()
                setShowResult(true)
              }}
            />
            <ClickAwayListener onClickAway={_ => setShowResult(false)}>
              <Drawer
                classes={classes}
                anchor={"top"}
                open={showResult}
                onClose={_ => setShowResult(false)}
              >
                {/*结果*/}
                <Card raised={true}>
                  <CardHeader title={`Search Result:`}></CardHeader>
                  <CardContent>
                    <CustomHits />
                  </CardContent>
                </Card>
              </Drawer>
            </ClickAwayListener>
          </div>
        </InstantSearch>
      </Grid>
    </Grid>
  )
}

export default HeaderEmbedSearchComp
