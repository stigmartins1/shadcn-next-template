import { NextRequest, NextResponse } from "next/server"
/* import { sendEmail } from "@/helpers/mailer" */
import AssetsByAccount from "@/models/AssetsByAccount"
import { connectToDB } from "@/utils/database"
import axios from "axios"

export async function POST(request: NextRequest) {
  const GOMAESTRO_APIKEY = process.env.GOMAESTRO_APIKEY
  const URL = "https://mainnet.gomaestro-api.org/v1/assets/policy/"

  try {
    console.log(`AssetsByAccount: Entering local Gomaestro API...`)
    const reqBody = await request.json()
    const { policy } = reqBody
    console.log(policy)

    // https://docs.gomaestro.org/docs/API%20reference/Asset%20Policy/policy-accounts
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${URL}${policy}/accounts`,
      headers: {
        Accept: "application/json",
        "api-key": `${GOMAESTRO_APIKEY}`,
      },
    }

    const response = await axios(config)
    console.log(`AssetsByAccount: Exiting local Gomaestro API`)
    return NextResponse.json(response.data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
