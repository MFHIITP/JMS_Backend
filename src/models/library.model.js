import mongoose from 'mongoose';

var librarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

const librarycollection = mongoose.model('librarycollection', librarySchema)
export default librarycollection;