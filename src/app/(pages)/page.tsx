"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import useAuth from "@/context/useAuth"

import { siteConfig } from "@/config/site"
import Login from "@/components/Login"
import ProfileCard from "@/components/ProfileCard"

const Home = () => {
  const { authStatus } = useAuth()
  return (
    <div className="mx-auto w-full max-w-7xl px-8">
      <div className="-mx-2 mt-32 flex flex-wrap gap-y-8">
        <div className="flex w-full flex-wrap items-center justify-center px-2 sm:w-1/2">
          <div className="relative flex w-full flex-wrap justify-center">
            {/* <div className="w-full max-w-[100px]">
              <Image src="/favicon.ico" alt="Logo" width={800} height={1347} />
            </div> */}
            <div className="w-full">
              <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                Welcome to{" "}
                <span className="text-blue-500">Smart Places Toolkit</span>
              </h1>
              <div className="text-muted-foreground">
                <p className="my-6">
                  This project is an independent endeavor with the goal of
                  offering tools to assist you as a land plot owner manage your
                  plots, acquire valuable insights and statistics regarding
                  activities within the{" "}
                  <Link
                    className="hover:underline"
                    href={siteConfig.links.smartplaces}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Smart Places
                  </Link>{" "}
                  social app ecosystem, and much more.
                </p>
                <Link
                  className="hover:underline"
                  href={siteConfig.links.smartplacesmap}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/images/SP_mapsite.webp"
                    alt="Smart Places land plots map"
                    width={1920 / 3}
                    height={890 / 3}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-wrap justify-end px-2 sm:w-1/2">
          {authStatus ? (
            <div className="max-w-md">
              <ProfileCard />
            </div>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
