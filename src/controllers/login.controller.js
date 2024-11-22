import {collection} from "../models/collection.model.js"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../index.js";
import tokenschema from "../models/Token.model.js";
import historyschema from "../models/History.model.js";
const loginaction = async (req, res) => {
  const mail = await collection.find({ email: req.body.email });
  if (mail.length === 0) {
    res.status(400).json({
      message: "You have not registered before. Please register first.",
    });
  } else {
    if (mail[0].password !== req.body.password) {
      res.status(400).json({ message: "Wrong Password" });
    } else {
      const token = jwt.sign(
        {
          id: mail[0]._id,
          email: mail[0].email,
        },
        JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      const tokenelement = new tokenschema({
        userId: mail[0]._id,
        email_id: mail[0].email,
        name: mail[0].name,
        token: token,
      })
      await tokenelement.save();
      const prevelement = await historyschema.find({email: mail[0].email});
      if(prevelement.length > 0){
        await historyschema.updateOne(
          {email: mail[0].email},
          {
            $set: {
              logintime: Date.now(),  
              status: 'active',
              logouttime: null    
            }
          }
        );
      }
      else{
        const historyelement = new historyschema({
          userId: mail[0]._id,
          name: mail[0].name,
          email: mail[0].email,
          logintime: Date.now(),
          status: 'active'
        })
        await historyelement.save();
      }
      const profiles = {
        name: mail[0].name,
        email: mail[0].email,
        college: mail[0].college,
        password: mail[0].password,
        year: mail[0].year,
        department: mail[0].department,
      };
      res.status(200).cookie('Token', token, {
        httpOnly: true,
        secure: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000
      }).cookie('ProfileInfo', profiles, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000
      }).json({
        message: "OK",
        token: token,
        profileinfo: profiles,
      });
    }
  }
};

export default loginaction
