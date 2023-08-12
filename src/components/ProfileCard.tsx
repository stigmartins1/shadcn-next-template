"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import appwriteService from "@/appwrite/config"
import { Models } from "appwrite"

import Avatar from "./Avatar"

const ProfileCard = () => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)

  useEffect(() => {
    ;(async () => {
      const userData = await appwriteService.getCurrentUser()
      if (userData) {
        setUser(userData)
      }
    })()
  }, [])

  return (
    user && (
      <>
        <div className="flex flex-wrap gap-y-6">
          <div className="flex w-full items-center gap-x-4">
            <div className="w-20 shrink-0">
              <Avatar img="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
            </div>
            <div className="relative">
              <p className="mb-1 w-full text-xl font-bold">{user.name}</p>
              <div className="inline-block rounded-md bg-destructive p-0.5 text-[12px] ">
                <button className="rounded-md px-2 font-bold text-muted-foreground">
                  FREE
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-wrap gap-y-4 rounded-xl bg-gray-200/70 p-8">
            <div className="relative w-full">
              <p className="text-sm text-gray-700">Display Name</p>
              <p className="font-semibold">{user.name}</p>
            </div>
            <div className="relative w-full">
              <p className="text-sm text-gray-700">Email Id</p>
              <p className="font-semibold">{user.email}</p>
            </div>
            <div className="relative w-full">
              <p className="text-sm text-gray-700">Phone Number</p>
              <p className="font-semibold">999-888-7777</p>
            </div>
            <div className="relative w-full">
              <p className="text-sm text-gray-700">Password</p>
              <p className="font-semibold">********</p>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <Link
              href={"/logout"}
              className="inline-block rounded-xl bg-gray-200/70 px-6 py-3 duration-150 hover:bg-gray-100"
            >
              Logout
            </Link>
          </div>
        </div>
      </>
    )
  )
}

export default ProfileCard
