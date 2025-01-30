const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  availability: { type: String },
  googleID: { type: String, unique: true },
  username: { type: String, required: true },
  userImage: { type: String },
  email: { type: String },
  bio: { type: String },
  messages:[
    {
      message:{type:String,required:true},
      budget:{type:Number,required:true},
      senderId:{type:String,required:true}
    }
  ],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  savedDesigns: [{ type: Schema.Types.ObjectId, ref: "Design" }],
  likedDesigns: [{ type: Schema.Types.ObjectId, ref: "Design" }],
  likedBY: [{ type: Schema.Types.ObjectId, ref: "Design" }],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
