import {prcollection} from '../../../models/pr.model.js';

const getdata = async(req, res)=>{
    const data = await prcollection.find({});
    res.status(200).send(data);
}
export default getdata;