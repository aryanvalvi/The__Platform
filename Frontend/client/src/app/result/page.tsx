"use client"
import {useEffect, useState} from "react"
import {useSearchParams} from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import "./Search.scss"
import {FaHeart} from "react-icons/fa"
import "../homeContent/Sexplore.scss"
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
        console.log(data)
        console.log(data.map(e => e.images?.[0]))
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
    <div>
      <h1 className="resultsH1">Search Results for "{query}"</h1>
      <div className="flex">
        {results.map(f => (
          <div key={f._id} className="gand">
            <div className="imageContent">
              <Link href={`/detailInfo/${f._id}`}>
                {f.images && f.images.length > 0 ? (
                  <img className="mgand" src={f.images} alt={f.title} />
                ) : (
                  <video
                    muted
                    autoPlay
                    loop
                    className="mgand"
                    src={f.video}
                    alt={f.title}
                  ></video>
                )}
                <p className="ImageTitle">{f.title}</p>
              </Link>
            </div>
            <div className="ImgAndHeart">
              <Link href={`/profile/${f.creator._id}`}>
                <img
                  className="profile"
                  src={f.UserProfileImage}
                  alt="Profile"
                />
              </Link>
              <p className="overlayText">{f.creator.username}</p>
              <span className="">0</span>
              <FaHeart
              // onClick={() => ItemClicked(f.id)}
              // className="like"
              // style={{
              //   fontSize: "20px",
              //   color: cart.includes(f._id) ? "red" : "gray",
              // }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

//  <div className="search-results-container">
//       <h1>Search Results for "{query}"</h1>
//       <div className="results-grid">
//         {results.map(design => (
//           <div key={design._id} className="design-card">
//             <Link href={`/detailInfo/${design._id}`}>
//               {design.images?.[0] ? (
//                 <Image
//                   src={design.images[0]}
//                   alt={design.title || "Design image"}
//                   width={300}
//                   height={200}
//                   className="design-image"
//                   onError={e =>
//                     console.log(`Failed to load image: ${design.images[0]}`)
//                   }
//                 />
//               ) : (
//                 <div className="image-placeholder">No Image Available</div>
//               )}
//               <h3>{design.title}</h3>
//               <p>{design.description?.substring(0, 100)}...</p>
//               <p>By: {design.creator.username}</p>
//               {/* <p>Category: {design.category}</p> */}
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
