// https://swr.vercel.app/docs/pagination#example-2-cursor-or-offset-based-paginated-api

export default function getKey(
  url: String,
  pageIndex: any,
  previousPageData: any
) {
  // reached the end
  if (previousPageData && !previousPageData.data) return null

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `${url}`

  // add the cursor to the API endpoint
  return `${url}?cursor=${previousPageData.nextCursor}`
}
