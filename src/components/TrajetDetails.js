import React from 'react';
var moment = require('moment');

let authentificationkey3 = 'bb105868-922d-418b-987d-f8b406b8855f';

class TrajetsDetails extends React.Component {
    state = {
        icon: ""
    };

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
                this.setState({icon})
            })
    }

    parseUnixDate(myDate){
        return moment(myDate).format("X")  
    }

    componentDidMount(){
        this.getDestination(this.props.directionID)
    }

    getIcon(icon){
        if(icon === "clear-day"){
            return <div icon="sunny"><span className="sun"></span></div>
            
        }else if(icon === "partly-cloudy-day"){
            return<div icon="cloudy"><span className="cloud"></span><span className="cloud"></span></div>
        }else if(icon === "rain"){
            return <div icon="stormy"><span className="cloud"></span><ul><li></li><li></li><li></li><li></li><li></li></ul></div>
        }else{
            return <div icon="supermoon" data-label="Cool!"><span className="moon"></span><span className="meteor"></span></div>
        }
    }

    render() {
        return(
            <div className="trajet">
                <p>
                    {this.props.itemName}<br/>{this.props.time} 
                </p>
                <div>
                    {this.getIcon(this.state.icon)}
                </div>
            </div>
        )
    }
}

export default TrajetsDetails;