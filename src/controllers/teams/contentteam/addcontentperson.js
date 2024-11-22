import {contentcollection} from '../../../models/content.model.js'

const addcontent = async(req, res)=>{
    const prevdata = await contentcollection.find({email_id: req.body.email_id});
    if(prevdata.length > 0){
        res.status(400).send("Exist");
    }
    const data = new contentcollection(req.body);
    await data.save();
    res.status(200).send("Done");
}

export default addcontent;