"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import useAuth from "@/context/useAuth"

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { authStatus } = useAuth()

  // if logged in, redirect to the dashboard
  useEffect(() => {
    if (!authStatus) {
      router.replace("/login")
    }
  }, [authStatus, router])

  return children
}

export default ProtectedLayout
