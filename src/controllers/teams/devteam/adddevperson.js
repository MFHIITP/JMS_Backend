import { devcollection } from "../../../models/development.model.js";

const adddevperson = async(req, res)=>{
    const prevdata = devcollection.find({email_id: req.body.email_id});
    if(prevdata.length > 0){
        res.status(400).send("Already exists");
    }
    const data = new devcollection(req.body);
    await data.save();
    res.status(200).send("Done")
}

export default adddevperson;