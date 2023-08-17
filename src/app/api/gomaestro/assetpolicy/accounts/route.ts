import { NextRequest, NextResponse } from "next/server"
/* import { sendEmail } from "@/helpers/mailer" */
//import PolicyAccounts from "@/models/PolicyAccounts"
//import { connectToDB } from "@/utils/database"
import axios from "axios"

export async function POST(request: NextRequest) {
  const baseUrl = process.env.GOMAESTRO_MAINNET
  const pathUrl = "/assets/policy"
  const GOMAESTRO_APIKEY = process.env.GOMAESTRO_APIKEY
  const POLICY = process.env.SP_POLICY_ID
  const URL = `${baseUrl}${pathUrl}`

  try {
    console.log(`PolicyAccounts: Entering local Gomaestro API...`)
    const reqBody = await request.json()
    const { cursor } = reqBody
    let query = `?cursor=${cursor}`
    console.log(`PolicyAccounts: query = ${query}`)

    // https://docs.gomaestro.org/docs/API%20reference/Asset%20Policy/policy-accounts
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${URL}${POLICY}/accounts${query}`,
      headers: {
        Accept: "application/json",
        "api-key": `${GOMAESTRO_APIKEY}`,
      },
    }

    const response = await axios(config)
    console.log(`PolicyAccounts: Exiting local Gomaestro API`)
    return NextResponse.json(response.data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
