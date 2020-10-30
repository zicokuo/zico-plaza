import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core"
import React from "react"
import tw, { styled } from "twin.macro"

export interface CardItemProps {
  id?: string
  title: string
  summary?: string
  tags?: [string]
  pubDate?: string
  thumbUrl?: string
  storeUrl?: string
  styledWrapper?: any
}
const UIPostsListWithCard = (item: CardItemProps) => {
  let CardMediaSize = styled.div`
    max-height: 50%;
  `

  return (
    <item.styledWrapper as={Card}>
      <CardActionArea>
        <CardMediaSize
          as={CardMedia}
          component="img"
          image={item?.thumbUrl}
          title={item.title}
        ></CardMediaSize>
        <CardContent>
          <Typography gutterBottom variant="h6" component="p">
            {item.title.length > 64 ? item.title.substring(0, 60) + "..." : ""}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <p
              dangerouslySetInnerHTML={{
                __html:
                  item?.summary?.length && item?.summary?.length > 200
                    ? item?.summary?.substring(0, 197) + "..."
                    : item?.summary || "",
              }}
              itemProp="description"
            />
            <small>{item?.pubDate}</small>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <a href={item.storeUrl}>But it now</a>
      </CardActions>
    </item.styledWrapper>
  )
}

export default UIPostsListWithCard
