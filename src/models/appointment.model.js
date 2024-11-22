import mongoose from "mongoose";

const AppointSchema = mongoose.Schema({
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

export const appoinecollection = new mongoose.model("appoinecollection", AppointSchema);