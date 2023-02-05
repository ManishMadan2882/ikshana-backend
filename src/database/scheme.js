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
    role : {
        type : String,
        required : true
    },
    about:{
        type:String,
    }

});
const patient_schema = new mongoose.Schema({
    name:String,
    personalInfo:{
        gender:String,
        age:Number,
        ailment:String,
        department:String,
        bloodGroup:String,
        Room:String,
        Bed:{
           type: String
        }
    },
    reports:Array,
    records:Array,
    doctors:Array,//under observance of
    Checkin:String,
    Checkout:{
        type:String,
        default:'_'
    }

});
const healthWorkers = new mongoose.model("workers",user_schema);
const patients =new mongoose.model("patients",patient_schema);

export {healthWorkers,patients}