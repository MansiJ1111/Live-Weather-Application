const path=require('path')
const express=require('express')
const hbs=require('hbs')

const geocode=require('./utils/geocode')
const forecast =require('./utils/forecast')


const app=express ()
const port=process.env.PORT || 3000


//Define paths for express config
const public_dir=path.join(__dirname,'../public')
 const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

 //Setup for handlebaars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(public_dir))
app.get ('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'MJ'
         
    })
})

app.get ('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'Provide address.' 
        }) 
    }
    geocode(req.query.address,(error,{latitute,longitude,location}={})=>{
if(error){
    return res.send({error})
}
forecast(latitute,longitude,(error,forecastData)=>{

    if(error){
        return res.send({error})
    }
    res.send({

        forecast:forecastData,
        location,
        address:req.query.address
    })
})
})
})


    
    
    

app.get('/about',(req,res)=>{
    res.render('about',{
      title:'About me',
      name:'MJ'  
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
     
        title:'Help',
        name:'MJ',
        helpText:"Help_You",
    })
})


app.get('/help/*',(req,res)=>{
res.render('404',{
    title:'404',
    name:'Mansi',
    errorMessage:'Help Article not found'
})
})

app.get('*',(req,res)=>{
res.render('404',{

    title:'404',
    name:'Mansi',
    errorMessage:'Page nOt Found'
})

}) 


app.listen(port,()=>{

    console.log("Serever is up on port on "+port)
})


