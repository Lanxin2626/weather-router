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
weatherRouter.post('/activities',(req,res)=>{
  console.log('body',req.body)
  const{activity,weather}=req.body;
  if(!activity||!weather){
    return res.status(400).send('activity and weather are required')
  }
  data.push({activity,weather});
  res.status(201).send({msg:'add activity succeeded'})
})
  //GET activties based on weather condition /:condition/rainy
weatherRouter.get('/activities/weather/:condition',(req,res)=>{
  const weatherCondition =req.params.condition;
  console.log(weatherCondition)
  if(!weatherCondition){
    res.status(400).send('weather condition is required')
  }
  const itemsWithCondition=data.filter(item=>{
    return item.weather===weatherCondition;
  })
  res.send(itemsWithCondition)
})
  //PUT update activities :/condition 
weatherRouter.put('/activities/weather/:condition',(req,res)=>{
  const weatherCondition=req.params.condition;
  const {activity}=req.body;
  const foundIndex =data.findIndex(item =>{
    return item.weather ===weatherCondition;
  })
  if(foundIndex ===-1){
    return res.status(404).send('weather condition not found')
  }
  data[foundIndex].activity=activity;
  res.send({
    msg:'act update successed',
    updateWeather:data[foundIndex]
  })
})
  //DELETE items based on weathear condition /:condition/rainy
weatherRouter.delete('/activities/weather/:condition',(req,res)=>{
  console.log(req.params);
  const weatherCondition=req.params.condition;
  
  const foundIndex =data.findIndex(item =>{
    return item.weather ===weatherCondition;
  });
  if(foundIndex ===-1){
    return res.status(404).send('weather condition not found')
  }
  const deleteWeather =data.splice(foundIndex,1);
  res.send({
    msg:"act is delete successfully",
    //deleteWeather:deleteWeather(0)
  })


})
  module.exports=weatherRouter;
