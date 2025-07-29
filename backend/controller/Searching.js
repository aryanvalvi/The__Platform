const express = require("express")
const router = express.Router()
const DesignSchema = require("../models/DesignSchema")

const autocompleteSearch = async (req, res) => {
  const {q} = req.query
  if (!q || q.trim() === "") {
    return res.status(200).json([])
  }
  try {
    const result = await DesignSchema.aggregate([
      {
        $search: {
          index: "posts",
          autocomplete: {
            query: q,
            path: "title",
            tokenOrder: "any",
            fuzzy: {
              maxEdits: 1,
              prefixLength: 1,
            },
          },
        },
      },
      {$limit: 5},
      {
        $project: {
          _id: 1,
          title: 1,
        },
      },
    ])
    res.status(200).json(result)
  } catch (error) {
    console.error("Autocomplete search failed:", error)
    res.status(500).json({error: error.message || "Autocomplete search failed"})
  }
}

const fullSearch = async (req, res) => {
  const {q} = req.query
  if (!q || q.trim() === "") {
    return res.status(400).json({message: "Query is required"})
  }
  try {
    const result = await DesignSchema.aggregate([
      {
        $search: {
          index: "posts", // Keep this for full-text search
          compound: {
            should: [
              {text: {query: q, path: "title", score: {boost: {value: 3}}}},
              {
                text: {
                  query: q,
                  path: "description",
                  score: {boost: {value: 1.5}},
                },
              },
              {text: {query: q, path: "tags", score: {boost: {value: 2}}}},
            ],
            minimumShouldMatch: 1,
          },
          highlight: {
            path: ["title", "description", "tags"],
          },
        },
      },
      {$limit: 20},
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $project: {
          _id: 1,
          availability: 1,
          UserProfileImage: 1,
          title: 1,
          description: 1,
          images: 1,
          sideImages: 1,
          video: 1,
          tags: 1,
          category: 1,
          tools: 1,
          externalLinks: 1,
          creator: {
            _id: 1,
            username: 1,
            userImage: 1,
          },
          likes: 1,

          comments: 1,
          createdAt: 1,
          views: 1,

          score: {$meta: "searchScore"},
          highlight: {$meta: "searchHighlights"},
        },
      },
    ])
    res.status(200).json(result)
  } catch (error) {
    console.error("Full search failed:", error)
    res.status(500).json({error: error.message || "Full search failed"})
  }
}

module.exports = {autocompleteSearch, fullSearch}
