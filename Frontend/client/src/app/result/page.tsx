"use client"
import {useEffect, useState, Suspense} from "react"
import {useSearchParams} from "next/navigation"
import Link from "next/link"
import {FaHeart} from "react-icons/fa"
import "./Search.scss"
import "../homeContent/Sexplore.scss"

type Highlight = {[key: string]: any}
type DesignPost = {
  _id: string
  title: string
  description: string
  UserProfileImage: string
  creator: {userImage: string; username: string; _id: string}
  images: string[]
  video: string[]
  sideImages: string[]
  externalLinks: string[]
  tags: string[]
  tools: string[]
  highlight: Highlight[]
  comments: any[]
  likes: string[]
  views: number
  score: number
  createdAt: string
}

const SearchResultsContent = () => {
  const [results, setResults] = useState<DesignPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const searchParams = useSearchParams()
  const query = searchParams.get("q")

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setError("No search query provided")
        setLoading(false)
        return
      }
      try {
        const res = await fetch(
          `http://localhost:5001/search?q=${encodeURIComponent(query)}`,
          {
            method: "GET",
            credentials: "include",
          }
        )
        if (!res.ok) {
          throw new Error("Failed to fetch search results")
        }
        const data = await res.json()
        setResults(data)
        setLoading(false)
      } catch (err) {
        setError((err as Error).message)
        setLoading(false)
      }
    }
    fetchResults()
  }, [query])

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">{error}</div>
  if (!results.length)
    return <div className="no-results">No results found for {query}</div>

  return (
    <div>
      <h1 className="resultsH1">
        Search Results for <span className="query-underline"> {query}</span>
      </h1>
      <div className="flex">
        {results.map(f => (
          <div key={f._id} className="gand">
            <div className="imageContent">
              <Link href={`/detailInfo/${f._id}`}>
                {f.images && f.images.length > 0 ? (
                  <img className="mgand" src={f.images[0]} alt={f.title} />
                ) : (
                  <video
                    muted
                    autoPlay
                    loop
                    className="mgand"
                    src={f.video[0]}
                  />
                )}
                <p className="ImageTitle">{f.title}</p>
              </Link>
            </div>
            <div className="hover-strip">
              <Link href={`/other/${f.creator._id}`}>
                <img
                  className="profile"
                  src={f.UserProfileImage}
                  alt="Profile"
                />
              </Link>
              <p className="overlayText">{f.title}</p>
              <span className="like-count">0</span>
              <FaHeart className="like-button" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const SearchResults = () => {
  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <SearchResultsContent />
    </Suspense>
  )
}

export default SearchResults
