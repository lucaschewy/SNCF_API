import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Details from './Details';
var moment = require('moment');

// let authentificationkey0 = 'fb9253e4-9288-4be5-9da6-cf5db676ae20';
// let authentificationkey1 = 'da920f44-b8e2-4a07-a5f9-5888296ae13f';
// let authentificationkey2 = '28788241-cfd6-480f-baa3-aa071e03a3c5';
let authentificationkey3 = 'bb105868-922d-418b-987d-f8b406b8855f';

class Trajets extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        ready: false,
        items: [],
        destination: [],
        meteo: []
    };

    parsePropsDate(myDate){
        return moment(myDate).format("YYYYMMDD[T]HHmmss")
    }

    parseUnixDate(myDate){
        return moment(myDate).format("X")  
    }

    parseDate(myDate){
        return moment(myDate).format("DD/MM/YYYY - HH:mm")  
    }

    componentDidUpdate(prevProps) {
        if (this.props.date !== prevProps.date || this.props.ville !== prevProps.ville) {
            console.log("recherche lancée")
            this.setState({ready: this.props.ready})
            fetch('https://api.sncf.com/v1/coverage/sncf/stop_areas/' + this.props.ville + '/departures?from_datetime=' + this.parsePropsDate(this.props.date) + '&count=10&key=' + authentificationkey3)
                .then(res => res.json())
                .then((result) => {
                    let items = result.departures
                    console.log(items)
                    this.setState({
                        isLoaded: true,
                        items
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        }
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
        let result2 = ""
        fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/f85a100da7b9e8977687e7b3f80cd287/' + lat + ',' + long + ',' + timestamp + '?lang=fr&units=auto&exclude=minutely,hourly')
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                let meteo = result.daily.data[0].summary
                console.log(meteo)
                let icon = result.daily.data[0].icon
                console.log(icon)
                return "test"
                if(icon === "clear-day"){
                    console.log('clearday')
                    result2 = "blabla"
                    // return <div icon="sunny"><span className="sun"></span></div>
                }else if(icon === "partly-cloudy-day"){
                    console.log('clearday')
                    result2 = "blabla"
                    // return <div icon="cloudy"><span className="cloud"></span><span className="cloud"></span></div>
                }else if(icon === "rain"){
                    console.log('clearday')
                    result2 = "blabla"
                    // return <div icon="stormy"><span className="cloud"></span><ul><li></li><li></li><li></li><li></li><li></li></ul></div>
                }else{
                    result2 = "blabla"
                    console.log('clearday')
                    // return <div icon="supermoon" data-label="Cool!"><span class="moon"></span><span class="meteor"></span></div>
                }
                return result2
            }).catch( err => {
                return "blabla"
            })
    }

    render() {
        const { error, isLoaded, ready, items } = this.state;

        const trajets = items.map( (item, key) => {
                return <div key={key} className="trajets"><p>{item.route.name} départ : {this.parseDate(item.stop_date_time.departure_date_time)} {this.getDestination(item.route.direction.id)}</p>
                <Router>
                    <Link to={"/" + item.route.name}>about</Link>
                    <Switch>
                        <Route path={"/" + item.route.name}>
                            <Details/>
                        </Route>
                        <Route path={"/test"}>
                            return <h2>test</h2>
                        </Route>
                    </Switch>
                </Router>
                </div>
            })
        
        if(ready === true){
            if (error) {
                return <div>Erreur : {error.message}</div>;
            } else if (!isLoaded) {
                return <div>Chargement…</div>;
            } else {
                return (
                    <div className="résultats">
                        {trajets}
                    </div>
                );
            }
        }else{
            return (
                <div className="notReady">
                    <h1>Renseignez les champs</h1>
                </div>
            )
        }
    }
}

export default Trajets;