"use client"
import {useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {useRouter} from "next/Navigation"
import React, {useEffect} from "react"

const ProtectedRoutes = ({children}: {children: React.ReactNode}) => {
  const router = useRouter()
  const {user, loading} = useAppSelector(state => state.AuthenticationReducer)

  useEffect(() => {
    if (!loading && !user) {
      console.log("Redirecting to / because user is null and loading is false")
      router.push("/")
    }
  }, [user, loading])
  if (loading) {
    return <div>Loading...</div>
  }
  if (!user) {
    return null
  }
  return <>{children}</>
}

export default ProtectedRoutes
