"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import useAuth from "@/context/useAuth"

import Login from "@/components/Login"

const LoginPage = () => {
  const router = useRouter()
  const { authStatus } = useAuth()

  useEffect(() => {
    if (authStatus) {
      router.push("/profile")
    }
  })

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <Login />
    </section>
  )
}

export default LoginPage
