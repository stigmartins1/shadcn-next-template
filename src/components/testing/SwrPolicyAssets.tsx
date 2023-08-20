"use client"

import React from "react"
import axios from "axios"
import { useSWRConfig } from "swr"
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite"

const fetcher = (url: any) => axios.get(url).then((res) => res.data)
const PAGE_SIZE = 500
const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
  console.log("pageIndex =", pageIndex)
  // reached the end
  if (previousPageData && previousPageData.next_cursor === null) return null

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `/api/gomaestro/assetpolicy/assets`

  // add the cursor to the API endpoint
  return `/api/gomaestro/assetpolicy/assets?cursor=${previousPageData.next_cursor}`
}

const SwrPolicyAssets = () => {
  const { data, error, isLoading, isValidating, mutate, size, setSize } =
    useSWRInfinite(getKey, fetcher, {
      initialSize: PAGE_SIZE,
      revalidateIfStale: true,
    })

  return (
    <div className="container gap-y-6 py-8">
      <div className="my-4 flex gap-x-4"></div>
    </div>
  )
}

export default SwrPolicyAssets
