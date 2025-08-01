"use client"
import React from "react"
import {usePathname} from "next/navigation"
import {useAppSelector, useAppDispatch} from "@/ReduxStore/hook/CustomHook"
import {setOpen} from "@/ReduxStore/slices/Authentication"
import {RxCross2} from "react-icons/rx"
import "./login.scss"

const LoginPopup = () => {
  const dispatch = useAppDispatch()
  const openPopup = useAppSelector(
    state => state.AuthenticationReducer.openPopup
  )
  const pathname = usePathname()

  if (!openPopup) {
    return null
  }

  const handleGoogleLogin = () => {
    const state = encodeURIComponent(pathname)
    const googleAuthUri = `${process.env.NEXT_PUBLIC_API_URL}/auth/google?state=${state}`
    window.location.href = googleAuthUri
  }

  return (
    <div className="modal2">
      <div className="modal2Content">
        <h1>Get started with Uiuxyn</h1>
        <button onClick={handleGoogleLogin} className="google-login-btn">
          <img src="/google.png" alt="Google logo" />
          <span>Continue with Google</span>
        </button>
        <span className="crossCunt" onClick={() => dispatch(setOpen(false))}>
          <RxCross2 size={30} className="cross" />
        </span>
      </div>
    </div>
  )
}

export default LoginPopup
