"use client"
import {animateScroll as scroll} from "react-scroll"
import "./Home.scss"
import HomeContent from "./homeContent/page"
import {Typewriter} from "react-simple-typewriter"
import {useEffect, useRef, useState} from "react"

import {MdSearch} from "react-icons/md"

import {useRouter} from "next/navigation"

export default function Home() {
  const wrapperRef = useRef<HTMLFormElement | null>(null)
  // console.log(search.map(e => e))
  const [showLine, setShowLine] = useState(false)
  const [showGet, setShowNotice] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const [filterData, setFilterData] = useState<{title: string}[]>([])
  console.log(filterData)
  const [showSearchOption, setShowSearchOption] = useState(false)
  console.log("show", showSearchOption)
  console.log("search", searchValue)
  const router = useRouter()
  const scrollButoon = () => {
    scroll.scrollTo(700)
  }

  // const searchQueryFunctionCaller = async query => {
  //   console.log("query", query)
  //   const res = await fetch(
  //     `http://localhost:5001/autocompleteSearch?query=${query}`,
  //     {
  //       method: "GET",
  //       credentials: "include",
  //     }
  //   )
  //   const data = await res.json()

  //   console.log(data)
  // }
  // const debounceFucntion = debounce(searchQueryFunctionCaller, 300)
  // const OnChangeSearchFunction = e => {
  //   setSearchValue(e)
  //   debounceFucntion(e)
  // }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchValue.trim()) {
      router.push(`/result?q=${encodeURIComponent(searchValue)}`)
    }
  }

  const searchChange = async (e: string) => {
    try {
      const res = await fetch(
        `http://localhost:5001/auth/autocomplete?q=${e}`,
        {
          method: "GET",
        }
      )
      const data = await res.json()
      console.log(data)
      setFilterData(data)
    } catch (error) {
      console.log(error)
    }

    setSearchValue(e)
    setShowSearchOption(true)
    // const filterdata = search
    //   .filter(key => key.toLowerCase().includes(e.toLowerCase()))
    //   .slice(0, 5)

    // console.log(filterdata)
    // setFilterData(filterdata)
  }

  const handleClickSearch = (title: string) => {
    // e.preventDefault()
    if (searchValue.trim()) {
      router.push(`/result?q=${encodeURIComponent(title)}`)
    }
    console.log("clicked option", title)
    setSearchValue(title)
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLine(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowSearchOption(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className="Homecontainer">
        <div className="gradient"></div>
        <div className="HomeContent">
          <p className="HomeP">
            U <span>iuxyn</span>
          </p>
          <div className="HomeP2">
            <div className="TypewriterLine">
              <div
                className="transperent"
                style={{backgroundColor: "transparent"}}
              >
                <Typewriter
                  // words={["Designs that speak louder than words"]}
                  words={["This project is on development stage..."]}
                  loop={1}
                  typeSpeed={30}
                  deleteSpeed={0}
                  delaySpeed={1000}
                />
              </div>
            </div>

            {showLine && (
              <div className="TypewriterLine TypewriterLine2">
                <Typewriter
                  words={[`Share your passion.`]}
                  loop={1}
                  // cursor
                  cursorStyle="|"
                  typeSpeed={30}
                  deleteSpeed={0}
                  delaySpeed={1000}
                  onType={() => {
                    setTimeout(() => {
                      setShowNotice(true)
                    }, 1000)
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
          <form
            ref={wrapperRef}
            className="NavSearchBar"
            onSubmit={handleSearch}
          >
            <input
              placeholder="Search the project"
              value={searchValue}
              type="text"
              onChange={e => searchChange(e.target.value)}
            />
            <button type="submit">
              <MdSearch className="img"></MdSearch>
            </button>
            <div className="searchResultContainer">
              {showSearchOption &&
                filterData?.map(e => (
                  <div key={e.title} className="searchbruh">
                    <p onClick={() => handleClickSearch(e.title)}>{e.title}</p>
                  </div>
                ))}
            </div>
          </form>

          <svg viewBox="0 0 1440 150" className="bottom-wave">
            {/* <path
              fill="#fb9a44"
              fillOpacity="0.3"
              d="M0,96L60,101.3C120,107,240,117,360,122.7C480,128,600,128,720,122.7C840,117,960,107,1080,117.3C1200,128,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path> */}
          </svg>
        </div>
        <div className="homebuttonContainer">
          <button onClick={scrollButoon} className="HomeButton">
            See What People have made
          </button>
        </div>
        <img src="/bruhh.svg" alt="" className="top-wave" />
        <img src="/wavy.svg" alt="" className="bottom-wave" />
      </div>
      <div>
        <HomeContent />
      </div>
    </>
  )
}
