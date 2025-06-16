const {default: mongoose} = require("mongoose")
const client = require("../elasticSearchSync/sync")
const Design = require("../models/DesignSchema")
const User = require("../models/UserSchema")
const search = async (req, res) => {
  console.log("search hit")
  const {query} = req.query

  if (!query || query.trim() === "") {
    return res.status(400).json({error: "Search query is required"})
  }

  try {
    const result = await client.search({
      index: "designs",
      query: {
        multi_match: {
          query,
          fields: ["title^2", "description", "tags"],
          fuzziness: "AUTO",
        },
      },
    })

    const hits = result.hits.hits.map(hit => ({
      id: hit._id,
      title: hit._source.title,
      description: hit._source.description,
      images: hit._source.images,
      creator: hit._source.creator,
      category: hit._source.category || "N/A",
      createdAt: hit._source.createdAt,
      views: hit._source.views,
      downloads: hit._source.downloads,
      visibility: hit._source.visibility,
    }))

    console.log(hits.map(id => id.id))
    const ids = hits
      .map(id => id.id)
      .filter(id => mongoose.Types.ObjectId.isValid(id))
      .map(id => new mongoose.Types.ObjectId(id))

    console.log(ids)
    const data = await Design.find({_id: {$in: ids}}).populate("creator")
    console.log(data)

    res.json(data)
  } catch (error) {
    console.error("Search error:", error)
    res.status(500).json({error: "Search failed"})
  }
}
module.exports = search
