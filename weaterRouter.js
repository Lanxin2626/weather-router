const express =require('express');
const weatherRouter=express.Router();
let data = [
    {
      activity: ["morning jog", "breakfast", "work", "lunch", "gym"],
      weather: "sunny",
    },
    {
      activity: ["work", "coffee break", "meetings", "dinner", "movie"],
      weather: "cloudy",
    },
    {
      activity: ["weekend", "hiking", "picnic", "reading", "gardening"],
      weather: "rainy",
    },
  ];
  //GET retrieve the entire list
  weatherRouter.get('/api/list',(req,res)=>{
    res.send(data);
  })

  //GET item by query paramater ? activity= work
  weatherRouter.get('/api/activities',(req,res)=>{
    const activityToFind=req.query.activity;
    if(!activityToFind){
        return res.status(400).send('Activity paramter is missing')
    }
    const foundItems=data.filter(item=>{
        return item.activity.includes(activityToFind)
    });
    if(!foundItems.length){
        return res.status(400).send('Activity is not found')
    }
    res.send(foundItems);
  })
  //POST add a new item

  //GET activties based on weather condition /:condition/rainy

  //PUT update activities :/condition 

  //DELETE items based on weathear condition /:condition/rainy

  module.exports=weatherRouter;
