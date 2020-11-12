const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

app.get('/',(req,res)=>{
   
    res.status(200).send("Hello world!");
    return;

});



const  Validatebody = (req,res)=> {
   
    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);

    if (isNaN(num1) || isNaN(num2) ){
      
        res.send({   status: "error",
        message: "Invalid data types",
       });
        
        return true;
    }

   

     if(num1 <-100000 || num2 >100000  || (num1+num2)<-100000 ||(num1-num2)<-100000 ||(num1*num2)<-100000 ||(num1/num2)<-100000 )
     {
        res.send({   status: "error",
        message: "Underflow",
        })   ;
        return true;
     }

     
     if(num1 >100000 || num2 >100000  || (num1+num2)>100000||(num1-num2)>100000 ||(num1*num2)>100000 ||(num1/num2)>100000)
     {
        res.send({   status: "error",
        message: "Overflow",
       });
        return true;   
     }
    

     return false;
    
}



app.post('/add',(req,res)=>{

    if(Validatebody(req,res))
    {
         return;
    }

    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);
   
     const obj ={
        status: "success",
        message: "the sum of given two numbers",
         sum: num1+num2
        };

        

        res.send(obj);
     

});

app.post('/sub',(req,res)=>{

    if(Validatebody(req,res))
    {
         return;
    }

    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);
   
     const obj ={
        status: "success",
        message: "the difference of given two numbers",
        difference: num1-num2
        };

        res.send(obj);
     

});

app.post('/multiply',(req,res)=>{

    if(Validatebody(req,res))
    {
         return;
    }

    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);
   
     const obj ={
        status: "success",
        message: "the product of given two numbers",
        result: num1*num2
        };

        res.send(obj);
     

});

app.post('/divide',(req,res)=>{

    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);

    if(num2===0)
    {
        res.send({
            status: "error",
            message: "Cannot divide by zero",
        });
        return;
    }

    if(Validatebody(req,res))
    {
         return;
    }

     const obj ={
        status: "success",
        message: "the division of given two numbers",
        result: num1/num2
        };

        res.send(obj);
     

});



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
