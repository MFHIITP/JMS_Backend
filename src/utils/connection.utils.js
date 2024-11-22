import mongoose from "mongoose";
import {server, database} from "../index.js"
const connect = async () => {
    try {
      await mongoose.connect(`mongodb+srv://${server}/${database}`);
      console.log("Connecion Successful");
    } catch (err) {
      console.log(err);
    }
};
export default connect;