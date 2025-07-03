const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mongoosastic = require("mongoosastic")
require("dotenv").config({path: "../.env"})
const DesignSchema = new Schema({
  availability: {type: String},
  UserProfileImage: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String},
  images: [{type: String}],
  sideImages: [{type: String}],
  video: {type: String},
  tags: [{type: String}],
  category: {type: String},
  tools: [{type: String}],
  externalLinks: [{type: Object}],
  creator: {type: Schema.Types.ObjectId, ref: "User", required: true},
  likes: [{type: Schema.Types.ObjectId, ref: "User"}],
  saves: [{type: Schema.Types.ObjectId, ref: "User"}],
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
  createdAt: {type: Date, default: Date.now},
  views: {type: Number, default: 0},
  downloads: {type: Number, default: 0},
  visibility: {type: String, default: "public"},
  category: {type: String},
})

// DesignSchema.plugin(mongoosastic, {
//   host: "localhost",
//   port: 9200,
//   protocol: "https",
//   auth: {
//     username: process.env.ElasticSearchUsername,
//     password: process.env.ElasticSearchPassword,
//   },
//   ssl: {
//     rejectUnauthorized: false,
//   },
//   index: "design",
// })

const Design = mongoose.model("Design", DesignSchema)

module.exports = Design
