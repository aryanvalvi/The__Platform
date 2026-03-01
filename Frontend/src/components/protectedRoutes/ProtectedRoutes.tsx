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
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && !loading && !user) {
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
