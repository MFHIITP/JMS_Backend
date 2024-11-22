import {activitycollection} from '../../../models/activity.model.js'

const addactivityperson = async(req, res)=>{
    const prevdata = await activitycollection.find({email_id: req.body.email_id});
    if(prevdata.length > 0){
        res.status(400).send("Exists")
    }
    const data = new activitycollection(req.body);
    await data.save();
    res.status(200).send("Saved");
}
export default addactivityperson;