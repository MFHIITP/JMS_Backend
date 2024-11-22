import talkcollection from "../models/talkcollection.model.js"

const getdata = async(req, res)=>{
    const data = await talkcollection.find({});
    res.status(200).json(data);
}
export {getdata}