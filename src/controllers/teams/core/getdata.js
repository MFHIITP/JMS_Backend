import {corecollection} from '../../../models/core.model.js'

const getdata = async(req, res)=>{
    const data = await corecollection.find({});
    res.status(400).send(data);
}

export default getdata;