"use client"
import Image from "next/image"
import Link from "next/link"
import React, {useEffect, useState} from "react"
import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {fetchUserData, logoutUser} from "@/ReduxStore/slices/dataFetchSlice"
import "./Navbar.scss"
import {RxHamburgerMenu} from "react-icons/rx"

const Navbar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [ham, setHam] = useState(false)

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.UserDataFetchReducer.userData)
  const isLoading = useAppSelector(state => state.UserDataFetchReducer.pending)

  console.log("Current user:", user)
  console.log("Ham state:", ham)

  const handleLogin = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) {
      console.error("API URL not configured")
      return
    }
    window.location.href = `${apiUrl}/auth/google`
  }

  const handleLogout = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      if (!apiUrl) {
        console.error("API URL not configured")
        return
      }

      const res = await fetch(`${apiUrl}/auth/logout`, {
        method: "GET",
        credentials: "include",
      })

      if (!res.ok) {
        throw new Error(`Logout failed: ${res.status}`)
      }

      const data = await res.json()
      console.log("Logout successful:", data)
      dispatch(logoutUser())
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const toggleMenu = () => {
    setHam(prev => !prev)
  }

  const closeMenu = () => {
    setHam(false)
  }

  useEffect(() => {
    if (user === null) {
      dispatch(fetchUserData())
    }
  }, [dispatch, user])

  const renderAuthSection = () => {
    if (isLoading) {
      return (
        <div className="loading-spinner">
          <span>Loading...</span>
        </div>
      )
    }

    if (!user) {
      return (
        <button onClick={handleLogin} className="sign">
          Log In
        </button>
      )
    }

    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="NavProfile"
      >
        <div className="pname">
          <Link href={`/dashboard/profile/${user._id}`}>
            <img
              className="profile-picture"
              src={user.userImage || "/image/fallback.png"}
              alt={`${user.username}'s profile picture`}
            />
          </Link>
          <p className="profile-name">{user.username}</p>
          {isHovered && (
            <button onClick={handleLogout} className="logout">
              Log Out
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="NavContainer">
      {/* Backdrop overlay */}
      <div
        className={`backdrop ${ham ? "active" : ""}`}
        onClick={closeMenu}
        aria-hidden={!ham}
      />

      <div className="NavbarContain">
        <div>
          <Link href="/">
            <Image
              className="Navlogo"
              width={200}
              height={300}
              src="/client_images/logoooo1.svg"
              alt="Logo"
              priority
            />
          </Link>
        </div>

        <div>
          <nav>
            <span className="ham">
              <RxHamburgerMenu
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={ham}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    toggleMenu()
                  }
                }}
              />
            </span>

            <ul className={`navbarElements ${ham ? "open" : ""}`}>
              <li>
                <Link href="/" className="Link" onClick={closeMenu}>
                  <span className="home">Home</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/publish"
                  className="Link Explore"
                  onClick={closeMenu}
                >
                  <span>Publish</span>
                </Link>
              </li>

              <li className="signCont">{renderAuthSection()}</li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar
