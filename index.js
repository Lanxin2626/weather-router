const express =require('express');
const weatherRouter=require('./weaterRouter')
//create a web server
const app= express();
const PORT=8000;
app.use(weatherRouter);
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})
