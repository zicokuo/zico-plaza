import React from "react"
import { Link } from "gatsby"
import { Card, CardContent } from "@material-ui/core"

const PostsListCard = ({ frontmatter, fields, excerpt }) => {
  const title = frontmatter.title || fields.slug

  return (
    <Card className="mb-4">
      <CardContent>
        <h2 className="card-title">{title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: frontmatter.description || excerpt,
          }}
        />
        <Link to={`/${fields.slug}/`} className="btn btn-primary">
          Read More ;
        </Link>
        Posted on {frontmatter.date}
      </CardContent>
    </Card>
  )
}

export default PostsListCard
