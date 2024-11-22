import {appoinecollection} from '../../../models/appointment.model.js'

const addappointment = async(req, res)=>{
    const prevdata = await appoinecollection.find({email_id: req.body.email_id});
    if(prevdata.length > 0){
        res.status(400).send("Exist")
    }
    const data = new appoinecollection(req.body);
    await data.save();
    res.status(200).send("Done");
}
export default addappointment;