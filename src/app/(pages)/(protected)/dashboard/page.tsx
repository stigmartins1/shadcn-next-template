import React from "react"
import Link from "next/link"

import ProfileCard from "@/components/ProfileCard"

const DashboardPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-wrap gap-y-6 py-8">
      <h1 className=" flex w-full items-center gap-x-4">
        <Link href={"../"}>
          <span className=" inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-200/70 hover:bg-gray-100">
            &lt;
          </span>
        </Link>
        <span className="text-3xl font-bold">Dashboard</span>
      </h1>
      <ProfileCard />
    </div>
  )
}

export default DashboardPage
