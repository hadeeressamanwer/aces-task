
const students=
[ 
    {id:1,name: 'Ahmed',courses:['math','physics']},
    {id:2,name: 'Mohamed',courses:['co','electromagnetic field']},
    {id:3,name: 'Ibrahim',courses:['math','software']},
    
];
const studentsRouter = require("express").Router();

studentsRouter.get ('/names',(req,res) => 
{  
    
    var nameArray = students.map(function (el) { return el.name; })
    res.send(nameArray);
});
studentsRouter.get ('/',(req,res) => 
 {
    res.send(students);
 });
 studentsRouter.get ('/:id', (req,res) => 
     { 
     const student = students.find (c => c.id === parseInt (req.params.id));
     if (!student) return res.status (404).send ('student not found');

     else res.send(students[req.params.id-1]);
      });
 
      studentsRouter.post('/',(req,res) => 
  {
    const schema = {
      name: Joi.string().required().min(3),
      courses: Joi.array().required()
  };

  const result = Joi.validate(req.body, schema);
  if (result.error)
      return res.status(400).send(result.error.details[0].message);

    else{
  const aa =
  {
       id  : students.length+1,
       name:req.body.name,
       courses:req.body.courses,
  }
  students.push(aa);
  res.send(aa);
  }});

  studentsRouter.delete('/:id',function (req,res){
    const student = students.find (c => c.id === parseInt (req.params.id));
    if (!student) return res.status (404).send ('student not found');

    const index = students.indexOf (student);
    students.splice (index, 1);
    res.send(students);

  });
  
  studentsRouter.put ('/:id', (req, res) =>
   {  
  
    const student = students.find (c => c.id === parseInt (req.params.id));
    if (!student) return res.status (404).send ('course not found');
  
    const schema = {
      name: Joi.string().required().min(3),
      courses: Joi.array().required()
  };

  const result = Joi.validate(req.body, schema);
  if (result.error)
      return res.status(400).send(result.error.details[0].message);

    
    students[req.params.id] ={ id:req.param.id,...req.body};
    
    res.send (students[req.params.id]);
  });
  module.exports=studentsRouter;