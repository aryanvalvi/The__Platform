"use client"
import {useEffect, useRef, useState} from "react"
import {useRouter} from "next/navigation"
import {animateScroll as scroll} from "react-scroll"
import {Typewriter} from "react-simple-typewriter"
import {MdSearch} from "react-icons/md"
import HomeContent from "./homeContent/page"
import "./Home.scss"

export default function Home() {
  const wrapperRef = useRef<HTMLFormElement | null>(null)
  const [showLine, setShowLine] = useState(false)
  const [showGet, setShowNotice] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [filterData, setFilterData] = useState<{title: string}[]>([])
  const [showSearchOption, setShowSearchOption] = useState(false)
  const router = useRouter()

  const scrollButoon = () => {
    scroll.scrollTo(700)
  }

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
      setFilterData(data)
    } catch {}
    setSearchValue(e)
    setShowSearchOption(true)
  }

  const handleClickSearch = (title: string) => {
    if (searchValue.trim()) {
      router.push(`/result?q=${encodeURIComponent(title)}`)
    }
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
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      <div className="Homecontainer">
        <div className="gradient" />
        <div className="HomeContent">
          <p className="HomeP">
            U <span>iuxyn</span>
          </p>
          <div className="HomeP2">
            <div className="TypewriterLine">
              <div style={{backgroundColor: "transparent"}}>
                <Typewriter
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
                  words={["Share your passion."]}
                  loop={1}
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
                      cursor
                      cursorStyle="|"
                      typeSpeed={60}
                      deleteSpeed={0}
                      delaySpeed={1000}
                    />
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
              <MdSearch className="img" />
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
          <img src="/bruhh.svg" alt="" className="top-wave" />
          <img src="/wavy.svg" alt="" className="bottom-wave" />
        </div>
        <div className="homebuttonContainer">
          <button onClick={scrollButoon} className="HomeButton">
            See What People have made
          </button>
        </div>
      </div>
      <div>
        <HomeContent />
      </div>
    </>
  )
}
