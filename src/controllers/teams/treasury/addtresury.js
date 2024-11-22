import { treasurycollection } from "../../../models/treasury.model.js";

const addperson = async(req, res)=>{
    const prevdata = await treasurycollection.find({email_id: req.body.email_id});
    if(prevdata.length > 0){
        res.status(400).send("Exists");
    }
    const data = new treasurycollection(req.body);
    await data.save();
    res.status(200).send("Done");
}
export default addperson;