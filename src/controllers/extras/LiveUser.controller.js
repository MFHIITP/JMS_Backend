import tokenschema from "../../models/Token.model.js";

const liveuser = async(req, res)=>{
    const data = await tokenschema.find({});
    res.status(200).send(data)
}
export default liveuser