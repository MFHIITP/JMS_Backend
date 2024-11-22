import historyschema from "../../models/History.model.js";

const historyuser = async(req, res)=>{
    const data = await historyschema.find({});
    res.status(200).send(data);
}
export default historyuser;