import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
mongoose.set("strictQuery",false);
const mongourl="mongodb+srv://manishdev:XMbl7sjCYkse5tNC@cluster0.fbb5bhh.mongodb.net/test";
export default mongoose.connect("mongodb+srv://manishdev:loging@cluster0.fbb5bhh.mongodb.net/test")
.then(()=>{
    console.log("MongoDB Connection: Success");
})
.catch((err)=>{
    console.log("MongoDB Connection: Failed \n"+err);
});
