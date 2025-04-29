const mongoose = require("mongoose")
const Schema = mongoose.Schema
const DesignSchema = new Schema({
  availability: {type: String},
  UserProfileImage: {type: String, required: true},
  // username: { type: String, required: true },
  // userImage: { type: String, required: true },
  title: {type: String, required: true},
  description: {type: String},
  images: [{type: String}], // Array of URLs to images
  sideImages: [{type: String}],
  video: {type: String}, // URL to video (if applicable)
  tags: [{type: String}], // Array of tags for categorization
  creator: {type: Schema.Types.ObjectId, ref: "User", required: true}, // User who created the design
  likes: [{type: Schema.Types.ObjectId, ref: "User"}], // Users who liked the design
  saves: [{type: Schema.Types.ObjectId, ref: "User"}], // Users who saved the design
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}], // Array of comments
  createdAt: {type: Date, default: Date.now},
  views: {type: Number, default: 0}, // 👈 new
  downloads: {type: Number, default: 0}, // 👈 new
  visibility: {type: String, default: "public"}, //
  category: {type: String}, // 👈 new
})

const DesignUpload = mongoose.model("Design", DesignSchema)

module.exports = DesignUpload
