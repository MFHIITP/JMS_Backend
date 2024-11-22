import librarycollection from "../models/library.model.js";

const getbooks = async(req, res)=>{
    const data = await librarycollection.find();
    res.status(200).json(data);
}

export default getbooks;