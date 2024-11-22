import { treasurycollection } from "../../../models/treasury.model.js";

const getdata = async(req, res)=>{
    const data = await treasurycollection.find({});
    res.status(200).send(data);
}
export default getdata;