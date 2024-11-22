import mongoose from 'mongoose'

const talkschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },
    image: {
        type: String
    },
    date:{
        type: String
    }
})

const talkcollection = mongoose.model('talkcollection', talkschema);
export default talkcollection