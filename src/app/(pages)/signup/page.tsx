"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import useAuth from "@/context/useAuth"

import Signup from "@/components/Signup"

const SignupPage = () => {
  const router = useRouter()
  const { authStatus } = useAuth()

  useEffect(() => {
    if (authStatus) {
      router.push("/profile")
    }
  })

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <Signup />
    </section>
  )
}

export default SignupPage
