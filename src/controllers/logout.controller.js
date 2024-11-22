import tokenschema from "../models/Token.model.js";
import historyschema from "../models/History.model.js";
const removetoken = async (req, res) => {
  const result = await tokenschema.deleteOne({ email_id: req.body.email });
  if (result.deletedCount === 0) {
    return res.status(404).send("No token found for this email.");
  }
  const historyUpdateResult = await historyschema.updateOne(
    { email: req.body.email },  
    { 
      $set: {
        logouttime: Date.now(),   
        status: 'inactive'   
      }
    }
  );
  res.status(200).send("Token deleted successfully.");
};
export default removetoken;
