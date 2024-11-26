import { WebSocketServer } from "ws";
import { httpserver } from "../index.js";
import talkcollection from "../models/talkcollection.model.js";
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
          date: data.date,
        });
        await saveddata.save();
        wss.clients.forEach((client) => {
          if (client.readyState == ws.OPEN) {
            client.send(JSON.stringify(saveddata));
          }
        });
      } else if (data.type) {
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === ws.OPEN) {
            client.send(message);
          }
        });
      } else {
        console.log("Unknown message type", data);
      }
    });
    ws.on("close", () => {
      console.log("Disconnected");
    });
  });
};

export default webSocketControl;
