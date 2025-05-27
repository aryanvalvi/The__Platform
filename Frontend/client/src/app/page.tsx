"use client"
import Image from "next/image"
import {animateScroll as scroll} from "react-scroll"
import "./Home.scss"
import HomeContent from "./homeContent/page"
import {Typewriter} from "react-simple-typewriter"
import {useEffect, useState} from "react"

export default function Home() {
  const [showLine, setShowLine] = useState(false)
  const [showGet, setShowNotice] = useState(false)

  const scrollButoon = () => {
    scroll.scrollTo(700)
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
          <div className="NavSearchBar">
            <input placeholder="Search the project" type="text" />
            <img src="/image/search.svg" alt="Search icon" />
          </div>
        </div>
        <button onClick={scrollButoon} className="HomeButton">
          See What People have made
        </button>
      </div>
      <HomeContent />
    </>
  )
}
