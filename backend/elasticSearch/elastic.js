const {Client} = require("@elastic/elasticsearch")
require("dotenv").config()

const client = new Client({
  node: "https://localhost:9200",
  auth: {
    apiKey: process.env.elastic_api,
  },
  tls: {rejectUnauthorized: false},
})

const checkConnection = async () => {
  try {
    const check = await client.info()
    console.log("client cluster : ", check)
  } catch (error) {
    console.log("error while connecting to elastic search", error)
  }
}
module.exports = {client, checkConnection}
// checkConnection()
