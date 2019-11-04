const Joi = require("joi");
 const courses = [
    {id: 0, name: "CO"},
    {id: 1, name: "data communication"},
    {id: 2, name: "math"},
    {id: 3, name: "electronics"},
    {id: 4, name: "phyics"},
     ];
 function  coursesRoutes  (app) 
 {
    

    app.get("/api/courses", (req, res) => {
        res.send(courses);
    });

    app.get("/api/courses/:id", (req, res) => {
        const course = courses.find(c => c.id === parseInt(req.params.id));
        if(!course) return res.status(404).send(`Course of ID ${req.params.id} does not exist`);
        res.send(course);
    });

    app.post("/api/courses", (req, res) => {
        const schema = {
            name: Joi.string().min(3).required()
        };
        const result = Joi.validate(req.body, schema);
        if (result.error)
            return res.status(400).send(result.error.details[0].message);
        
        var courseee = { id: courses.length, ...req.body };
        courses.push(courseee);
        res.send(courseee);
    });

    app.put("/api/courses/:id", (req, res) => {
        const course = courses.find(s => s.id === parseInt(req.params.id));
        if (!course) return res.status(404).send("course of ID = " + req.params.id + " does not exist!");

        const schema = {
            name: Joi.string().required().min(3),
        };

        const result = Joi.validate(req.body, schema);
        if (result.error)
            return res.status(400).send(result.error.details[0].message);

        var idx = courses.indexOf(course);
        courses[idx] = { id: courses[idx].id, ...req.body };
        res.send("Course updated successfully!");
    });
    app.delete("/api/courses/:id", (req, res) => {
        const course = courses.find(s => s.id === parseInt(req.params.id));
        if (!course) return res.status(404).send("course of ID = " + req.params.id + " does not exist!");

        const idx = courses.indexOf(course);
        courses.splice(idx, 1);
        res.send("course deleted successfully!")
    });
 
   };
      module.exports= coursesRoutes;