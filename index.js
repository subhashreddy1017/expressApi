const express=require('express');
const path=require('path')
const exphbs = require('express-handlebars');
const app=express();
const PORT=5000;
const logger =require('./middeleware/logger');
//const member=require('./members');
const { title } = require('process');
const members = require('./members');
// app.get('/user',(req,res)=>
// {
//     res.sendFile(path.join(__dirname,'public','index.html'));
// });
// Body parse Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//HandleBars Middeleware
// here view engine handle to handlebars exphs is variable to set default layer 
app.engine('handlebars',exphbs.engine({defaultLayout: 'main.handlebars'}));
app.set('view engine', 'handlebars');



app.get('/',(req,res)=>res.render('index',
{title:'Member App',members}
));

app.get('/update',(req,res)=>res.render('update'));  

//Set for Static folder
app.use(express.static(path.join(__dirname,'public'))); 



app.use('/api/members',require('./routes/api/member'));
app.listen(PORT,()=>console.log(`Server started at ${PORT}`));
app.use(logger);

//get member by id
