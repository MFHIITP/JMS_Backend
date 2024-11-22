import {disciplinecolleciton} from '../../../models/discipline.model.js'

const getdata = async(req, res)=>{
    const data = await disciplinecolleciton.find({});
    res.status(200).send(data);
}
export default getdata;