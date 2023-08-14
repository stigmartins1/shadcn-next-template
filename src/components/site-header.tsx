"use client"

import React from "react"
import Link from "next/link"
import useAuth from "@/context/useAuth"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const { authStatus } = useAuth()
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden space-x-2 lg:block">
            <Link
              href={authStatus ? "/profile" : "/signup"}
              className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {authStatus ? "Profile" : "Sign up"}
            </Link>
            <Link
              href={authStatus ? "/logout" : "/login"}
              className="rounded-md border border-primary px-3 py-2 text-sm font-semibold text-primary shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {authStatus ? "Logout" : "Log In"}
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
