// // migrate.js
// const mongoose = require("mongoose")
// const Design = require("../models/DesignSchema")
// // const elasticClient = require("./elasticClient")
// const {Client} = require("@elastic/elasticsearch")
// require("dotenv").config({path: "../.env"})
// const client = new Client({
//   node: "http://localhost:9200",
//   auth: {
//     username: process.env.ElasticSearchUsername,
//     password: process.env.ElasticSearchPassword,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// })

// const checkelastic = async () => {
//   try {
//     const res = await client.info()
//     console.log("connected to elastic search")
//   } catch (error) {
//     console.log("failed to connect elastic search", error)
//   }
// }
// checkelastic()

// async function migrateData() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI)
//     console.log("✅ MongoDB connected")

//     const designs = await Design.find().lean()
//     // console.log(designs)
//     // get all documents

//     const body = designs.flatMap(doc => [
//       {index: {_index: "designs", _id: doc._id.toString()}},
//       {
//         availability: doc.availability,
//         UserProfileImage: doc.UserProfileImage,
//         title: doc.title,
//         description: doc.description,
//         images: doc.images,
//         sideImages: doc.sideImages,
//         video: doc.video,
//         tags: doc.tags,
//         creator: doc.creator.toString(), // just storing ObjectId as string
//         likes: doc.likes.map(id => id.toString()),
//         saves: doc.saves.map(id => id.toString()),
//         comments: doc.comments.map(id => id.toString()),
//         createdAt: doc.createdAt,
//         views: doc.views,
//         downloads: doc.downloads,
//         visibility: doc.visibility,
//         category: doc.category,
//       },
//     ])

//     const bulkResponse = await client.bulk({refresh: true, body})

//     if (bulkResponse.errors) {
//       console.error("❌ Errors occurred during bulk insert")
//     } else {
//       console.log("✅ Successfully indexed data to Elasticsearch")
//     }

//     mongoose.disconnect()
//   } catch (error) {
//     console.error("❌ Migration failed:", error)
//   }
// }

// // migrateData()
// module.exports = client
