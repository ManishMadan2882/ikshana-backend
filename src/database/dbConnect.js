import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
mongoose.set("strictQuery",false);
//const mongourl="mongodb://localhost:27017

export default mongoose.connect(process.env.LOCAL)
.then(()=>{
    console.log("MongoDB Connection: Success");
})
.catch((err)=>{
    console.log("MongoDB Connection: Failed \n"+err);
});
