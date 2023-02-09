import mongoose from 'mongoose'
import './dbConnect.js'

const user_schema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    about:{
        type:String
    },
    type : {
        type : String,
        required : true
    }

});
const patient_schema = new mongoose.Schema({
    name:String,
    username:String,
    personalInfo:{
        gender:String,
        DOB : Date,
        bloodGroup:String
 
    },
    reports:Array,
    records:Array 
});
const users = new mongoose.model("users",user_schema);
const patients =new mongoose.model("patients",patient_schema);

export {users,patients}