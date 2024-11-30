import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    email_id: {
        type: String, 
        required: true
    },
    name: {
        type:String,
        required: true
    },
    token: {
        type:String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "24h",
        required: true
    },
    details: {
        type: String,
    },
    locations: {
        type: String
    }
})

const tokenschema = mongoose.model('tokenschema', tokenSchema)
export default tokenschema;