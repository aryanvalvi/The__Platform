"use client"
import React, {useState, useEffect} from "react"
import axios from "axios"
import Skeleton from "react-loading-skeleton"

interface PostCardProps {
  post: {
    id: number
    title: string
    body: string
  }
}

const PostCard: React.FC<PostCardProps> = ({post}) => {
  const [imageUrl, setImageUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchImage()
  }, [])

  const fetchImage = () => {
    setLoading(true)
    axios
      .get("https://picsum.photos/200")
      .then(response => {
        setImageUrl(response.request.responseURL)
        setLoading(false)
      })
      .catch(error => console.error(error))
  }

  return (
    <div className="post-card">
      <div className="post-image">
        {loading ? (
          <Skeleton height={"50vh"} width={"30vw"} className="skeleton" />
        ) : (
          <img src={imageUrl} alt="Post" />
        )}
      </div>
      <div className="post-content">
        {loading ? (
          <React.Fragment>
            <Skeleton
              height={20}
              width={200}
              style={{marginBottom: "10px", marginTop: "10px"}}
              className="skeleton"
            />
            <Skeleton height={60} count={3} className="skeleton" />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <center>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </center>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default PostCard
