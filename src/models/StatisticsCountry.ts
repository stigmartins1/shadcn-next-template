import { Schema, model, models } from "mongoose"

const statisticsCountrySchema = new Schema({
  name: String,
  plotCount: Number,
  ownersCount: Number,
})

const StatisticsCountry =
  models.StatisticsCountry ||
  model("StatisticsCountry", statisticsCountrySchema)

export default StatisticsCountry
