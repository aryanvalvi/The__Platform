"use client"
import {useAppDispatch} from "@/ReduxStore/hook/CustomHook"
import {authCheckFunction} from "@/ReduxStore/slices/Authentication"
import React, {useEffect} from "react"

const AuthInitilizer = ({children}: {children: React.ReactNode}) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authCheckFunction())
  }, [dispatch])
  return <div>{children}</div>
}

export default AuthInitilizer
