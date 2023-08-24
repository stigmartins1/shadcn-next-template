import axios from "axios"
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite"

const fetcher = (url: any) => axios.get(url).then((res) => res.data)
// Default count is 100 per page
const getKeyPolicyAccounts: SWRInfiniteKeyLoader = (
  pageIndex,
  previousPageData
) => {
  console.log("pageIndex =", pageIndex)
  // reached the end
  if (previousPageData && previousPageData.next_cursor === null) return null

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `/api/gomaestro/assetpolicy/accounts`

  // add the cursor to the API endpoint
  return `/api/gomaestro/assetpolicy/accounts?cursor=${previousPageData.next_cursor}`
}
export default function useAccounts(pages: any) {
  const { data, error, isLoading, isValidating, mutate, size, setSize } =
    useSWRInfinite(getKeyPolicyAccounts, fetcher, {
      initialSize: pages,
      revalidateIfStale: true,
    })
  return { data, error, isLoading, isValidating, mutate, size, setSize }
}
