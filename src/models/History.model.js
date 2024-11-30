import mongoose from "mongoose";

const Historymodel = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    logintime: {
        type: Date,
        default: Date.now
    },
    logouttime: {
        type: Date,
        default: null,
    },
    status: {
        type: String, 
        enum: ['active', 'inactive'],
        default: 'active'
    },
    details: {
        type: String,
    },
    locations: {
        type: String
    }
})
const historyschema = mongoose.model('historyschema', Historymodel);
export default historyschema;