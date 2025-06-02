"use client"
import {useEffect, useState} from "react"
import {useSearchParams} from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import "./Search.scss"

export default function SearchResults() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const searchParams = useSearchParams()
  const query = searchParams.get("q")

  useEffect(() => {
    const fetchResults = async () => {
      console.log("hit")
      if (!query) {
        setError("No search query provided")
        setLoading(false)
        return
      }

      try {
        const res = await fetch(
          `http://localhost:5001/search?query=${encodeURIComponent(query)}`,
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
        setError(err.message)
        setLoading(false)
      }
    }

    fetchResults()
  }, [query])

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">{error}</div>
  if (!results.length)
    return <div className="no-results">No results found for "{query}"</div>

  return (
    <div className="search-results-container">
      <h1>Search Results for "{query}"</h1>
      <div className="results-grid">
        {results.map(design => (
          <div key={design.id} className="design-card">
            <Link href={`/detailInfo/${design.id}`}>
              {/* <Image
                src={design.images[] || "/placeholder.jpg"}
                alt={design.title}
                width={300}
                height={200}
                className="design-image"
              /> */}
              <h3>{design.title}</h3>
              <p>{design.description?.substring(0, 100)}...</p>
              <p>By: {design.creator}</p>
              <p>Category: {design.category}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
