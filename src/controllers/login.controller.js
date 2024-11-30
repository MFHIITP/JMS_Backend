import { collection } from "../models/collection.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../index.js";
import tokenschema from "../models/Token.model.js";
import historyschema from "../models/History.model.js";
import dotenv from "dotenv";
import axios from 'axios'
import useragent from 'useragent'
dotenv.config();
const loginaction = async (req, res) => {
  const userdetails = useragent.parse(req.headers['user-agent'])
  const ip = req.headers['x-forwarded-for']
  const response = await axios.get(`https://ipinfo.io/${ip}/json?token=c13532365e8939`);

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
        details: JSON.stringify({
          OperatingSystem: userdetails.os,
          Browser: userdetails.device,
          class: userdetails.family,
          patch: userdetails.patch,
          major: userdetails.major,
          minor: userdetails.minor
        }),
        locations: JSON.stringify(response.data)
      });
      await tokenelement.save();
      const prevelement = await historyschema.find({ email: mail[0].email });
      if (prevelement.length > 0) {
        await historyschema.updateOne(
          { email: mail[0].email },
          {
            $set: {
              logintime: Date.now(),
              status: "active",
              logouttime: null,
            },
          }
        );
      } else {
        const historyelement = new historyschema({
          userId: mail[0]._id,
          name: mail[0].name,
          email: mail[0].email,
          logintime: Date.now(),
          status: "active",
          details: JSON.stringify({
            OperatingSystem: userdetails.os,
            Browser: userdetails.device,
            class: userdetails.family,
            patch: userdetails.patch,
            major: userdetails.major,
            minor: userdetails.minor
          }),
          locations: JSON.stringify(response.data)
        });
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
      res
        .setHeader("Access-Control-Allow-Origin", " http://localhost:3001")
        .setHeader("Access-Control-Allow-Credentials", "true")
        .status(200)
        .cookie("TestCookie", token, {
          domain: '.localhost'
        })
        .json({
          message: "OK",
          token: token,
          profileinfo: profiles,
        });
    }
  }
};

export default loginaction;
