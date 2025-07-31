"use client"
import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {setOpen} from "@/ReduxStore/slices/Authentication"
import {useRouter} from "next/navigation" // Updated import
import React, {useEffect, useState} from "react"

const ProtectedRoutes = ({children}: {children: React.ReactNode}) => {
  const router = useRouter()
  const {user, loading} = useAppSelector(state => state.AuthenticationReducer)
  const dispatch = useAppDispatch()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true) // Mark as mounted on client
  }, [])

  useEffect(() => {
    if (isMounted && !loading && !user) {
      console.log("Redirecting to / because user is null and loading is false")
      dispatch(setOpen(true))
      router.push("/")
    }
  }, [isMounted, user, loading, dispatch, router])

  if (!isMounted || loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoutes
