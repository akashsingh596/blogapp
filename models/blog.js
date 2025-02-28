
const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    title : {
        type:String,
        required: true
    }
})