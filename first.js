//  "use strict";
  const mongoose= require ('mongoose');
  mongoose.connect('mongodb://localhost/playground')
  .then (()=>console.log("connected"))
  .catch(err=>console.log('no'));

    

const courseschema=new mongoose.Schema(

{
    
    name:String,
}
);
const Course =mongoose.model('course',courseschema);
async function passcourse() {

const course=new Course ({
name: 'hadeer'
});
const result= await course.save();
console.log(result);
}
passcourse();


 const express = require("express");
 const Joi = require("joi");
 const app = express();
 app.use(express.json());
 
 const coursesRoutes = require("./courses");
 coursesRoutes(app);
 
 const studentsRouter = require("./students");
 app.use("/api/students", studentsRouter);
app.listen(6000);


