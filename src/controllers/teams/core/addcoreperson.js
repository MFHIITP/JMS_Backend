import {corecollection} from '../../../models/core.model.js'

const addperson = async(req, res)=>{
    const prevdata = await corecollection.find({email_id: req.body.email_id});
    if(prevdata.length > 0){
        res.status(400).send("Exist");
    }
    else{
        const data = new corecollection(req.body);
        await data.save();
        res.status(200).send("Done")
    }
}
export default addperson;