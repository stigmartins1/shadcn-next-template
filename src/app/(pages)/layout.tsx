"use client"

import React, { useEffect, useState } from "react"
import appwriteService from "@/appwrite/config"
import { AuthProvider } from "@/context/authContext"

import Blog from "@/components/Blog"
import Header from "@/components/Header"

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [authStatus, setAuthStatus] = useState(false)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    appwriteService
      .isLoggedIn()
      .then(setAuthStatus)
      .finally(() => setLoader(false))
  }, [])

  return (
    <AuthProvider value={{ authStatus, setAuthStatus }}>
      {!loader && (
        <>
          <div className="text-primary">
            <div className="fixed left-1/3 top-2/3 z-[-1] w-12 blur-2xl">
              <Blog blur />
            </div>
            <div className="fixed left-2/3 top-1/3 z-[-1] w-12 blur-2xl">
              <Blog blur />
            </div>
            <div className="fixed left-1/4 top-1/4 z-[-1] w-40 opacity-50 blur-2xl">
              <Blog blur />
            </div>
            <div className="fixed left-1/2 top-1/2 z-[-1] w-32 opacity-60 blur-2xl">
              <Blog blur />
            </div>
            <div className="fixed left-[45%] top-1/3 z-[-1] w-12 blur-2xl">
              <Blog blur />
            </div>
            <div className="fixed left-3/4 top-1/3 z-[-1] w-60 opacity-20 blur-2xl">
              <Blog blur />
            </div>
          </div>
          {/* <Header /> */}
          <main className="px-2 py-4">{children}</main>
        </>
      )}
    </AuthProvider>
  )
}

export default ProtectedLayout
