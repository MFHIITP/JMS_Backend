import { collection } from "../models/collection.model.js";

const updatefunc = async(req, res)=>{
    await collection.updateOne({email: req.body.email}, {$set: {[req.body.old] : req.body.name}});
    const mail = await collection.find({email: req.body.email});
    const profiles = {
        name: mail[0].name,
        email: mail[0].email,
        college: mail[0].college,
        password: mail[0].password,
        year: mail[0].year,
        branch: mail[0].department,
    }
    res.status(200).json({
        message: "OK",
        profileinfo: profiles
    });
}
export default updatefunc;