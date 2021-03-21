const request=require('request')


const forecast=(latitude,longitude,callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=7cc87a91cfbace4b2acc4cf68e8e2cf4'
    
    console.log(latitude)
    console.log(longitude)
    request({url,json:true},(error,{body})=>{

        if(error){
            callback("Unable to connect to network",undefined)
    
        }else if(body.message){
            callback("Unable too find location",undefined)
    
        }else{
            callback(undefined,{
                description: body.weather[0].description,
                visibility: body.visibility

            })
          
    
    
        }

    })
}
    
module.exports=forecast
