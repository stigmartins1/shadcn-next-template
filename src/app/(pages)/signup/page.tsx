"use client"

import React, { useEffect } from "react"
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
      <div className="flex items-center justify-center">
        <div className="mx-auto rounded-xl bg-primary-foreground p-10">
          <div className="mb-2 flex justify-center">
            <span className="inline-block max-w-[60px]">
              <img src="/favicon.ico" alt="Logo" />
            </span>
          </div>
          <Signup />
        </div>
      </div>
    </section>
  )
}

export default SignupPage
