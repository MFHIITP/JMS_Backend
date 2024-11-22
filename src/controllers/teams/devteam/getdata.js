import { devcollection } from "../../../models/development.model.js";

const getdevdata = async(req, res)=>{
    const data = await devcollection.find({});
    res.status(200).send(data);
}
export default getdevdata;