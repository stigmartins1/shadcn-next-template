"use client"

import React from "react"
import Link from "next/link"
import { Wallet } from "lucide-react"

/* import getKey from "@/lib/getKey" */
/* import useRequest from "@/lib/useRequests" */
import AccountAssets from "@/components/testing/AccountAssets"
import PolicyAccounts from "@/components/testing/PolicyAccounts"
import SwrPolicyAssets from "@/components/testing/SwrPolicyAssets"
import Wallets from "@/components/testing/Wallets"

const AdminPage = () => {
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
      <div className="my-4 flex gap-x-4">
        <Wallets />
        <AccountAssets />
        <PolicyAccounts />
      </div>
    </div>
  )
}

export default AdminPage
