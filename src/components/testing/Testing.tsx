import React from "react"

import useAccounts from "@/lib/maestro/useAccounts"

const Testing = () => {
  const { data } = useAccounts(1)
  console.log("data =", data)
  if (!data) return "Loading..."
  return <div>Testing</div>
}

export default Testing
