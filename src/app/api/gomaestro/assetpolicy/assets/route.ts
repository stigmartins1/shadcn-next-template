// https://docs.gomaestro.org/docs/API%20reference/Asset%20Policy/policy-info
// Returns information about assets of the specified minting policy ID

import { NextRequest, NextResponse } from "next/server"
//import { sendEmail } from "@/helpers/mailer"
//import AssetsByPolicy from "@/models/AssetsByPolicy"
//import { connectToDB } from "@/utils/database"
import axios from "axios"

export async function GET(request: NextRequest) {
  console.log(`AssetsByPolicy: Entering local Maestro API...`)
  const baseUrl = process.env.GOMAESTRO_MAINNET
  const pathUrl = "/assets/policy"
  const GOMAESTRO_APIKEY = process.env.GOMAESTRO_APIKEY
  const POLICY = process.env.SP_POLICY_ID
  const URL = `${baseUrl}${pathUrl}`

  try {
    const nextUrl = request.nextUrl
    const queryParams = new URLSearchParams(nextUrl.search)
    const cursor = queryParams.get("cursor")
    console.log(`AssetsByPolicy: cursor = ${cursor}`)

    let query = cursor ? `?cursor=${cursor}` : ""
    console.log(`AssetsByPolicy: query = ${query}`)

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${URL}/${POLICY}${query}`,
      headers: {
        Accept: "application/json",
        "api-key": `${GOMAESTRO_APIKEY}`,
      },
    }

    console.log(`AssetsByPolicy: Axios config.url = ${config.url}`)

    const response = await axios(config)
    console.log(`AssetsByPolicy: Exiting local Gomaestro API`)
    return NextResponse.json(response.data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
