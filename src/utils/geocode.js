const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFuc2lqMTEiLCJhIjoiY2ttM3M0bW95MGVtcjJ4cWQzM2ptM2p2dyJ9.ceGTp2c81TaBeNopSZSHUA&limit=1'
     request({url,json:true},(error,{body})=>{
         if(error){
             callback('unable to connect to services.',undefined||{})
         }else if(body.features.length===0){
             callback('Unable to find location',undefined)
    
         }else{
             callback(undefined,{
                 latitute: body.features[0].center[0],
                 longitude: body.features[0].center[1],
                 location:body.features[0].place_name
             })
    
    
         }
    
     }) 
    
    }
    
    module.exports=geocode
    
    