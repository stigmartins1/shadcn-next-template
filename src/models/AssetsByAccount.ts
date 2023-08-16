import { Schema, model, models } from "mongoose"

const assetsByAccountSchema = new Schema({
  account: String,
  asset_count: Number,
  assets: Array,
  last_updated: Object,
})

const AssetsByAccount =
  models.AssetsByAccount || model("AssetsByAccount", assetsByAccountSchema)

export default AssetsByAccount
