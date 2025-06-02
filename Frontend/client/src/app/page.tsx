"use client"
import Image from "next/image"
import {animateScroll as scroll} from "react-scroll"
import "./Home.scss"
import HomeContent from "./homeContent/page"
import {Typewriter} from "react-simple-typewriter"
import {useEffect, useState} from "react"
import debounce from "lodash/debounce"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {search} from "../utils/search/search"
export default function Home() {
  // console.log(search.map(e => e))
  const [showLine, setShowLine] = useState(false)
  const [showGet, setShowNotice] = useState(false)
  const [searchValue, setSearchValue] = useState("Search the project")
  const [searchResultData, setSearchResultData] = useState()
  const [filterData, setFilterData] = useState()
  console.log("search", searchValue)
  const router = useRouter()
  const scrollButoon = () => {
    scroll.scrollTo(700)
  }

  const searchQueryFunctionCaller = async query => {
    console.log("query", query)
    const res = await fetch(`http://localhost:5001/search?query=${query}`, {
      method: "GET",
      credentials: "include",
    })
    const data = await res.json()
    setSearchResultData(data)
    console.log(data)
  }
  const debounceFucntion = debounce(searchQueryFunctionCaller, 300)
  const OnChangeSearchFunction = e => {
    setSearchValue(e)
    debounceFucntion(e)
  }

  const handleSearch = e => {
    e.preventDefault()
    if (searchValue.trim()) {
      router.push(`/result?q=${encodeURIComponent(searchValue)}`)
    }
  }

  const searchChange = e => {
    setSearchValue(e)

    const filterdata = search
      .filter(key => key.toLowerCase().includes(e.toLowerCase()))
      .slice(0, 5)

    console.log(filterdata)
    setFilterData(filterdata)
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLine(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="Homecontainer">
        <div className="HomeContent">
          <p className="HomeP">ThePlatForm</p>
          <div className="HomeP2">
            <div className="TypewriterLine">
              <Typewriter
                words={["Designs that speak louder than words"]}
                loop={1}
                typeSpeed={60}
                deleteSpeed={0}
                delaySpeed={1000}
              />
            </div>

            {showLine && (
              <div className="TypewriterLine TypewriterLine2">
                <Typewriter
                  words={[`Share your passion.`]}
                  loop={1}
                  // cursor
                  cursorStyle="|"
                  typeSpeed={60}
                  deleteSpeed={0}
                  delaySpeed={1000}
                  onType={() => {
                    setTimeout(() => {
                      setShowNotice(true)
                    }, 1200)
                  }}
                />
                {showGet && (
                  <span className="highlighter">
                    <Typewriter
                      words={["Get noticed."]}
                      // loop={1}
                      cursor
                      cursorStyle="|"
                      typeSpeed={60}
                      deleteSpeed={0}
                      delaySpeed={1000}
                    ></Typewriter>
                  </span>
                )}
              </div>
            )}
          </div>
          <form className="NavSearchBar" onSubmit={handleSearch}>
            <input
              placeholder="Search the project"
              // value={searchValue}
              type="text"
              onChange={e => searchChange(e.target.value)}
            />
            <button type="submit">
              <img src="/image/search.svg" alt="Search icon" />
            </button>
          </form>
          <div className="searchResultContainer">
            {filterData?.map(e => (
              <div className="searchbruh">
                <Link href={`/detailInfo/${e._id}`}>
                  <p key={e}>{e}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button onClick={scrollButoon} className="HomeButton">
          See What People have made
        </button>
      </div>
      <div>
        <HomeContent />
      </div>
    </>
  )
}
