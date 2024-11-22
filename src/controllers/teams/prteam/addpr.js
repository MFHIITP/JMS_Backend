import { prcollection } from "../../../models/pr.model.js";

const addperson = async(req, res)=>{
    const prevdata = await prcollection.find({email_id: req.body.email_id});
    if(prevdata.length > 0){
        res.status(400).send(data);
    }
    const data = new prcollection(req.body);
    await data.save();
    res.status(200).send("Done");
}
export default addperson;