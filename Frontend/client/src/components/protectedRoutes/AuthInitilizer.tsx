"use client"
import {authCheckFunction} from "@/ReduxStore/slices/Authentication"
import React, {useEffect} from "react"
import {useDispatch} from "react-redux"

const AuthInitilizer = ({children}: {children: React.ReactNode}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authCheckFunction())
  }, [dispatch])
  return <div>{children}</div>
}

export default AuthInitilizer
