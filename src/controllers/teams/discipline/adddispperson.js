import {disciplinecolleciton} from '../../../models/discipline.model.js'

const addperson = async(req, res)=>{
    const prevdata = await disciplinecolleciton({email_id: req.body.email_id});
    if(prevdata.length > 0){
        res.status(400).send("Exists")
    }
    const data = new disciplinecolleciton(req.body);
    await data.save();
    res.status(200).send("Done");
}
export default addperson;