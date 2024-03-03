// User.js
import mongoose from "mongoose";

const { Schema } = mongoose;
export const userSchemaJson ={
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
}
const userSchema = new Schema(userSchemaJson);

const User = mongoose.model("User", userSchema);

export default User;
