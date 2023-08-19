import axios from "axios"
import useSWR from "swr"

function Dashboard() {
  /*   const fetcher = (url: any) => axios.get(url).then((res) => res.data)
  const { data: events } = useSWR("/api/events", fetcher)
  const { data: projects } = useSWR("/api/projects")
  const { data: user } = useSWR("/api/user", { refreshInterval: 0 }) // override */

  // ...
  return (
    <>
      <h1>Dashboard</h1>
    </>
  )
}

export default function SwrPolicyAssets() {
  return <Dashboard />
}
