import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../index.js';

const checktoken = async(req, res)=>{
    try {
       const decode = jwt.verify(req.body.token, JWT_SECRET);
       res.status(200).send("OK");
    } catch (err) {
       res.status(400).send("NOT Ok");
    }
}
export default checktoken