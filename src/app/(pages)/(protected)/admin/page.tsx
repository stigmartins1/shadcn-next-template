import React from "react"
import Link from "next/link"

import AccountAssets from "@/components/testing/AccountAssets"
import PolicyAccounts from "@/components/testing/PolicyAccounts"

const PolicyPage = () => {
  return (
    <div className="container gap-y-6 py-8">
      <h1 className="flex w-full items-center gap-x-4">
        <Link href={"../"}>
          <span className=" inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-200/70 hover:bg-gray-100">
            &lt;
          </span>
        </Link>
        <span className="text-3xl font-bold">Policy</span>
      </h1>
      <div className="flex gap-x-4">
        <AccountAssets />
        <PolicyAccounts />
      </div>
    </div>
  )
}

export default PolicyPage
