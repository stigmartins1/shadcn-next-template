// https://docs.gomaestro.org/docs/API%20reference/Asset%20Policy/policy-accounts
// Returns stake addresses for accounts which hold assets
// of the given policy ID with the asset names and amounts
import { NextRequest, NextResponse } from "next/server"
/* import { sendEmail } from "@/helpers/mailer" */
//import PolicyAccounts from "@/models/PolicyAccounts"
//import { connectToDB } from "@/utils/database"
import axios from "axios"

export async function GET(request: NextRequest) {
  console.log(`PolicyAccounts: Entering local Maestro API...`)
  const baseUrl = process.env.GOMAESTRO_MAINNET
  const pathUrl = "/assets/policy"
  const GOMAESTRO_APIKEY = process.env.GOMAESTRO_APIKEY
  const POLICY = process.env.SP_POLICY_ID
  const URL = `${baseUrl}${pathUrl}`

  try {
    const nextUrl = request.nextUrl
    const queryParams = new URLSearchParams(nextUrl.search)
    console.log(`PolicyAccounts: queryParams = ${queryParams}`)
    const query = String(queryParams) !== "" ? `?${queryParams}` : ""
    console.log(`PolicyAccounts: query = ${query}`)

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${URL}/${POLICY}/accounts${query}`,
      headers: {
        Accept: "application/json",
        "api-key": `${GOMAESTRO_APIKEY}`,
      },
    }

    console.log(`PolicyAccounts: Axios config.url = ${config.url}`)

    const response = await axios(config)
    console.log(`PolicyAccounts: Exiting local Gomaestro API`)
    return NextResponse.json(response.data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
