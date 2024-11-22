import {activitycollection} from '../../../models/activity.model.js'

const getdata = async(req, res)=>{
    const data = await activitycollection.find({});
    res.status(200).send(data);
}
export default getdata;