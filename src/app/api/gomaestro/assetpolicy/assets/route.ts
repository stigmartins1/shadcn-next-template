// https://docs.gomaestro.org/docs/API%20reference/Asset%20Policy/policy-info
// Returns information about assets of the specified minting policy ID

import { NextRequest, NextResponse } from "next/server"
//import { sendEmail } from "@/helpers/mailer"
//import PolicyAssets from "@/models/PolicyAssets"
//import { connectToDB } from "@/utils/database"
import axios from "axios"

export async function GET(request: NextRequest) {
  console.log(`PolicyAssets: Entering local Maestro API...`)
  const baseUrl = process.env.GOMAESTRO_MAINNET
  const pathUrl = "/assets/policy"
  const GOMAESTRO_APIKEY = process.env.GOMAESTRO_APIKEY
  const POLICY = process.env.SP_POLICY_ID
  const URL = `${baseUrl}${pathUrl}`

  try {
    const nextUrl = request.nextUrl
    const queryParams = new URLSearchParams(nextUrl.search)
    console.log(`PolicyAssets: queryParams = ${queryParams}`)
    const query = String(queryParams) !== "" ? `?${queryParams}` : ""
    console.log(`PolicyAssets: query = ${query}`)

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${URL}/${POLICY}${query}`,
      headers: {
        Accept: "application/json",
        "api-key": `${GOMAESTRO_APIKEY}`,
      },
    }

    console.log(`PolicyAssets: Axios config.url = ${config.url}`)

    const response = await axios(config)
    console.log(`PolicyAssets: Exiting local Gomaestro API`)
    return NextResponse.json(response.data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
