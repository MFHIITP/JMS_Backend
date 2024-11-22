import { collection } from "../models/collection.model.js";

const adminfunction = async(req, res)=>{
    const userdata = await collection.find();
    res.status(200).json({
        data: userdata
    });
}

export default adminfunction;