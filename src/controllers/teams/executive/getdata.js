import {executivecollection} from '../../../models/executive.model.js'

const getdata = async(req, res)=>{
    const data = await executivecollection.find({});
    res.status(200).send(data);
}
export default getdata; 