// https://docs.gomaestro.org/docs/API%20reference/Asset%20Policy/policy-accounts
// Returns a list of native assets which are owned by addresses
// with the specified stake key
import { NextRequest, NextResponse } from "next/server"
//import { sendEmail } from "@/helpers/mailer"
//import AssetsByAccount from "@/models/AssetsByAccount"
//import { connectToDB } from "@/utils/database"
import axios from "axios"

export async function GET(request: NextRequest) {
  console.log(`AccountAssets: Entering local Maestro API...`)
  const baseUrl = process.env.GOMAESTRO_MAINNET
  const pathUrl = "/accounts"
  const GOMAESTRO_APIKEY = process.env.GOMAESTRO_APIKEY
  const POLICY = process.env.SP_POLICY_ID
  const URL = `${baseUrl}${pathUrl}`

  try {
    const nextUrl = request.nextUrl
    const queryParams = new URLSearchParams(nextUrl.search)
    console.log(`AccountAssets: queryParams = ${queryParams}`)
    const account = queryParams.get("account")
    const cursor = queryParams.get("cursor")
    let query = `?policy=${POLICY}`
    query += cursor !== null ? `&cursor=${cursor}` : ""
    console.log(`AccountAssets: query = ${query}`)

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${URL}/${account}/assets${query}`,
      headers: {
        Accept: "application/json",
        "api-key": `${GOMAESTRO_APIKEY}`,
      },
    }

    console.log(`AccountAssets: Axios config.url = ${config.url}`)

    const response = await axios(config)
    console.log(`AccountAssets: Exiting local Gomaestro API`)
    return NextResponse.json(response.data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
