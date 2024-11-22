import { executivecollection } from "../../../models/executive.model.js";

const addperson = async(req, res)=>{
    const prevdata = await executivecollection.find({email_id: req.body.email_id});
    if(prevdata.length > 0){
        res.status(400).send("Exists");
    }
    const data = new executivecollection(req.body);
    await data.save();
    res.status(200).send("Done");
}
export default addperson;