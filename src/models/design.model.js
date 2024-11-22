import mongoose from "mongoose";

const DesignSchema = mongoose.Schema({
    position: {
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    email_id: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String
    }
})

export const designcollection = new mongoose.model("designcollection", DesignSchema);