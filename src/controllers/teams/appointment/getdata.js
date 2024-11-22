import {appoinecollection} from '../../../models/appointment.model.js'

const getdata = async(req, res)=>{
    const data = await appoinecollection.find({});
    res.status(200).send(data);
}
export default getdata;