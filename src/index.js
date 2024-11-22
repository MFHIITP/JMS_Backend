import express from "express";
import cors from "cors";
import apiroute from "./routers/query.route.js";
import userrouter from "./routers/users.routes.js";
import talkrouter from "./routers/talk.route.js";
import libraryrouter from './routers/library.route.js';
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import talkcollection from "./models/talkcollection.model.js";
import loginaction from "./controllers/login.controller.js";
import connect from "./utils/connection.utils.js";
import { collection } from "./models/collection.model.js";
import devrouter from "./routers/teams/devteam.route.js"
import designrouter from './routers/teams/designteam.route.js'
import contentrouter from './routers/teams/contentteam.route.js'
import appointmentrouter from './routers/teams/appointment.route.js'
import activityrouter from './routers/teams/activityteam.route.js';
import disciplinerouter from './routers/teams/discipline.route.js'
import executiverouter from './routers/teams/executiveteam.route.js'
import prrouter from './routers/teams/prteam.route.js'
import treasuryrouter from './routers/teams/treasury.route.js'
import corerouter from './routers/teams/coreteam.route.js'
import removetoken from "./controllers/logout.controller.js";
import liveuser from "./controllers/extras/LiveUser.controller.js";
import historyuser from "./controllers/extras/Historyuser.controller.js"
import updatelogouthistory from "./utils/nodecron.js";
import checktoken from "./utils/Checktokens.js";

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json());
app.set("view-engine", "html");

export const JWT_SECRET = "This website has been made by Farshid Hossain";
export const server = process.env.SERVER;
export const database = process.env.DATABASE;
const port = 8000;
const hostname = "localhost";
export const otpStore = [];

connect();

updatelogouthistory();

app.post("/login", loginaction);

app.post("/removeprofile", async (req, res) => {
  const mail = await collection.deleteOne({ email: req.body.email });
  res.status(200).send("Deleted");
});

app.post("/checktoken", checktoken);
app.get("/liveusers", liveuser)
app.get("/historyusers", historyuser);
app.post("/logout", removetoken)
app.use("/api", apiroute);
app.use("/users", userrouter); 
app.use("/talks", talkrouter);
app.use('/library', libraryrouter);
app.use('/devteam', devrouter)
app.use('/designteam', designrouter);
app.use('/contentteam', contentrouter);
app.use('/appointmentteam', appointmentrouter)
app.use('/activityteam', activityrouter);
app.use('/disciplineteam', disciplinerouter);
app.use('/executiveteam', executiverouter);
app.use('/prteam', prrouter);
app.use('/treasuryteam', treasuryrouter);
app.use('/coreteam', corerouter);

const httpserver = app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});

const rooms = {};

const webSocketControl = async () => {
  const wss = new WebSocketServer({
    server: httpserver,
  });
  wss.on("connection", (ws) => {
    console.log("Connected");
    ws.on("message", async (message) => {
      const data = JSON.parse(message);
      if (data.name && data.message && data.image) {
        const saveddata = new talkcollection({
          name: data.name,
          message: data.message,
          image: data.image,
          date: data.date
        });
        await saveddata.save();
        wss.clients.forEach((client) => {
          if (client.readyState == ws.OPEN) {
            client.send(JSON.stringify(saveddata));
          }
        });
      }
      else if(data.type){
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === ws.OPEN) {
              client.send(message);
          }
      });
     }
     else{
      console.log("Unknown message type", data);
     }

    });
    ws.on("close", () => {
      console.log("Disconnected");
    });
  });
};
webSocketControl();