import {contentcollection} from '../../../models/content.model.js'

const getdata = async(req, res)=>{
    const data = await contentcollection.find({});
    res.status(200).send(data);
}

export default getdata;