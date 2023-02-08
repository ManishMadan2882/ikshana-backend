import express from 'express';
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken';
import MongoStore from 'connect-mongo';
import {healthWorkers,patients} from  './src/database/scheme.js'; 
import session from 'express-session';
dotenv.config();
const secret_key="asdfghjklzxcvbnmqwertyuio";
const port = process.env.PORT || 8080;
const app=express();
//JSON PARSER MIDDLEWARE
app.use(express.json());
//SESSION MIDDLEWARE
app.use(session({
    resave : false,
    saveUninitialized:true,
    cookie:{maxAge : 30*3600*24*1000 },
    secret: secret_key,
    store:MongoStore.create({mongoUrl : process.env.MONGO_LOCAL})
  }));
//NEW USER/DOCTOR/WHATEVER
app.get('/',(req,res)=>{
res.json({msg:"hello world"});
})
app.post('/register',async (req,res)=>{
    const username=req.body.username;
    console.log(username);
    const password=await bcrypt.hash(req.body.password,3);
    
  const newUser = {
        username:username,
        password:password,
        name:req.body.name,
        role:req.body.role,
        about:req.body.about
  };
  console.log(newUser);
   const newEntry = new healthWorkers(newUser);
   newEntry.save()
    .then(()=>res.json({newHealthWorker:true}))
    .catch((err)=>{
      console.log('Error: '+err);
      res.json({newHealthWorker:false,Error:err});
    }
        );
});
//NEW PATIENT
app.patch('/patients',async (req,res)=>
{
    const reqInfo = {
        name:req.body.name,

        personalInfo:{
            gender:req.body.personalInfo.gender,
            age:req.body.personalInfo.age,
            ailment:req.body.personalInfo.ailment,
            department:req.body.personalInfo.department,
            bloodGroup:req.body.personalInfo.bloodGroup,
            Room:req.body.personalInfo.room,
            Bed:req.body.personalInfo.bed
        },
        reports:req.body.reports,
        records:req.body.records,
        doctors:req.body.doctors,//under observance of
        Checkin:req.body.checkin
    
    };
    console.log(reqInfo);
    if(req.body.checkout)
    reqInfo.Checkout = req.body.checkout;
    const newEntry = new patients(reqInfo);
    newEntry.save()
    .then(()=>{
      res.json({newPatient:true});
      console.log(newEntry);
    })
    .catch((err)=>{
      console.log('Error: '+err);
      res.json({newPatient:false,Error:err});
    }
        );

});
//LOGIN ROUTE
app.post('/login',async (req,res) => {
    const {username ,  password} = req.body;
    const user = await healthWorkers.findOne({username : username});
    if(user){
      let isValid = await bcrypt.compare(password,user.password);
      
      if(isValid){
        
        let token = Jwt.sign({username : username},secret_key);
        req.session.token = token;//
        res.status(202).json({message : "access given",status:true});
        
      }
      else
      res.status(401).json({message : "invalid username or password",status:false});
      }
      else{
        res.status(404).json({message : "no such user found"});
      }
  });
  //search
  app.get('/search',async (req,res)=>{
    const patientName = new Array();
    const set = await patients.find();
    set.forEach(element => {
       patientName.push(element.name);
    });
    res.send(patientName);
  })
  //doctors
  app.get('/doctor',async (req,res)=>{
    //search /doctor or /staff 
      let doc=new Array();
     (await healthWorkers.find()).forEach((elem)=>{
        if(elem.role == 'Doctor')
        doc.push(elem);
        
      })
      res.json(doc);

  });

  app.get('/worker',async (req,res)=>{
    //search /doctor or /staff 
      let wrk=new Array();
     (await healthWorkers.find()).forEach((elem)=>{
        if(elem.role == 'Health Worker')
        wrk.push(elem);
        
      })
      res.json(wrk);

  });
  app.get('/patients/:room',async (req,res)=>{
    //search /doctor or /staff 
      let pat=new Array();
     (await patients.find()).forEach((elem)=>{
      console.log(elem.personalInfo.Room);
      console.log(req.params.room );
      if(req.params.room == 0)
      pat.push(elem);
      else if(elem.personalInfo.Room == req.params.room ) 
        pat.push(elem);
      })
      res.json(pat);

  });

//PORT LISTENER
app.listen(port,()=>{
console.log("Server is running succesfullly at port "+port)})
