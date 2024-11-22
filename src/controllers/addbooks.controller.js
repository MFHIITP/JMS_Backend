import librarycollection from "../models/library.model.js";

const addbooks = async(req, res)=>{
    console.log("Came to add books in the library")
    const data = new librarycollection(req.body);
    data.save();
    res.status(200).send("OK");
}

export default addbooks;