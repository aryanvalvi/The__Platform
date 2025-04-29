const DesignUpload = require("../models/DesignSchema")

const retrive = async () => {
  const data = await DesignUpload.find()
  // console.log(data)
  return data
}
console.log(retrive())
const modification = async () => {}

module.exports = retrive
