import mongoose from "mongoose"

let isConnected = false // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true)

  if (!process.env.MONGODB_URI)
    return console.log("utils/database: process.env.MONGODB_URI not found")

  if (isConnected) {
    return console.log("utils/database: MongoDB is already connected")
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "sp-app",
    })

    isConnected = true

    console.log("utils/database: MongoDB connected to database sp-app")
  } catch (error) {
    console.log(error)
  }
}
