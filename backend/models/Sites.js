import mongoose from "mongoose";
const siteSchema = new mongoose.Schema({
    name : String,
    username : String,
    password : String
});
export const Site = mongoose.model("Site", siteSchema);