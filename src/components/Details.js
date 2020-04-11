import React from 'react';
var moment = require('moment');

// let authentificationkey0 = 'fb9253e4-9288-4be5-9da6-cf5db676ae20';
// let authentificationkey1 = 'da920f44-b8e2-4a07-a5f9-5888296ae13f';
// let authentificationkey2 = '28788241-cfd6-480f-baa3-aa071e03a3c5';
let authentificationkey3 = 'bb105868-922d-418b-987d-f8b406b8855f';

class Details extends React.Component {

    parseUnixDate(myDate){
        return moment(myDate).format("X")  
    }

    getDestination(stopArea){
        fetch('https://api.sncf.com/v1/coverage/sncf/stop_areas/' + stopArea + '/stop_areas?&key=' + authentificationkey3)
                .then(res => res.json())
                .then( (result) => {
                    let destination = result.stop_areas[0].coord
                    let lat = destination.lat
                    let long = destination.lon
                    let timestamp = this.parseUnixDate(this.props.date)
                   
                    console.log("***************")
                    console.log(this.getMeteo(lat, long, timestamp))
                    console.log("***************")
                    return this.getMeteo(lat, long, timestamp)  
                })
    }

    getMeteo(lat, long, timestamp){
        fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/f85a100da7b9e8977687e7b3f80cd287/' + lat + ',' + long + ',' + timestamp + '?lang=fr&units=auto&exclude=minutely,hourly')
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                let meteo = result.daily.data[0].summary
                console.log(meteo)
                let icon = result.daily.data[0].icon
                console.log(icon)
                if(icon === "clear-day"){
                    console.log('clearday')
                    return <div icon="sunny"><span className="sun"></span></div>
                }else if(icon === "partly-cloudy-day"){
                    console.log('clearday')
                    return <div icon="cloudy"><span className="cloud"></span><span className="cloud"></span></div>
                }else if(icon === "rain"){
                    console.log('clearday')
                    return <div icon="stormy"><span className="cloud"></span><ul><li></li><li></li><li></li><li></li><li></li></ul></div>
                }else{
                    console.log('clearday')
                    return <div icon="supermoon" data-label="Cool!"><span class="moon"></span><span class="meteor"></span></div>
                }
                
            })
    }

    render() {
        // return <span>{this.getDestination(this.take.props.route.direction.id)}</span>
        return <span>test</span>
    }
}

export default Details;