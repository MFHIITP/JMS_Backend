import {designcollection} from '../../../models/design.model.js'

const getdata = async(req, res)=>{
    const data = await designcollection.find({});
    res.status(400).send(data);
}
export default getdata;