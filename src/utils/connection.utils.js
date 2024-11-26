import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const server = process.env.SERVER;
const database = process.env.DATABASE
const connect = async () => {
    try {
      await mongoose.connect(`mongodb+srv://${server}/${database}`);
      console.log("Connecion Successful");
    } catch (err) {
      console.log(err);
    }
};
export default connect;