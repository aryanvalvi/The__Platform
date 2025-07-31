"use client"
import React from "react"
import "./login.scss"
import {usePathname} from "next/navigation"
import {useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {RxCross2} from "react-icons/rx"
import {useDispatch} from "react-redux"
import {setOpen} from "@/ReduxStore/slices/Authentication"
// interface LoginProps {
//   isOpen: boolean
//   setIsopen: (open: boolean) => void
// }

const LoginPopup = () => {
  const dispatch = useDispatch()
  const openPopup = useAppSelector(
    state => state.AuthenticationReducer.openPopup
  )
  console.log(openPopup)
  // useEffect(() => {}, [dispatch])
  const pathname = usePathname()
  if (!openPopup) {
    return null
  }

  const handleGoogleLogin = () => {
    const state = encodeURIComponent(pathname)
    console.log("Current pathname:", pathname)
    // Replace with your Google OAuth redirect URL
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
