import {designcollection} from '../../../models/design.model.js'

const addperson = async(req, res)=>{
    const prevdata = await designcollection.find({email_id: req.body.email_id});
    if(prevdata.length > 0){
        res.status(400).send("Exist")
    }
    const data = new designcollection(req.body);
    await data.save();
    res.status(200).send("Done");
}
export default addperson;