"use client"

import React from "react"
import Link from "next/link"
import axios from "axios"
import { useSWRConfig } from "swr"
import useSWRInfinite from "swr/infinite"

/* import getKey from "@/lib/getKey" */
/* import useRequest from "@/lib/useRequests" */
import AccountAssets from "@/components/testing/AccountAssets"
import OverviewCombobox from "@/components/testing/OverviewCombobox"
import PolicyAccounts from "@/components/testing/PolicyAccounts"

const getKeyPolicyAssets = (pageIndex: any, previousPageData: any) => {
  // reached the end
  if (previousPageData && !previousPageData.data) return null

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `/api/gomaestro/assetpolicy/assets?count=10`

  // add the cursor to the API endpoint
  return `/api/gomaestro/assetpolicy/assets?cursor=${previousPageData.nextCursor}&count=10`
}

const AdminPage = () => {
  const fetcher = (url: any) => axios.post(url).then((res) => res.data)
  const { data: policyAssets } = useSWRInfinite(getKeyPolicyAssets, fetcher)

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
        <OverviewCombobox />
        <AccountAssets />
        <PolicyAccounts />
      </div>
    </div>
  )
}

export default AdminPage
