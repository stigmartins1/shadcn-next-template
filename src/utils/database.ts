import mongoose from "mongoose"

let isConnected = false // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true)

  if (isConnected) {
    console.log("MongoDB is already connected")
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "sp-app",
    })

    isConnected = true

    console.log("MongoDB connected to database sp-app")
  } catch (error) {
    console.log(error)
  }
}
