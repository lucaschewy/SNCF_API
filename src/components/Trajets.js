import React from 'react';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
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
                    // this.getMeteo(lat, long)
                })
    }

    // getMeteo(lat, long){
    //     fetch('https://api.darksky.net/forecast/c0ea17f48f58bf1ffc09a62740384ae2/45.664898,3.207027,1584198000?lang=fr&units=auto&exclude=minutely,hourly')
    //     // fetch('https://api.darksky.net/forecast/c0ea17f48f58bf1ffc09a62740384ae2/' + lat + long + ',1584198000?lang=fr&units=auto&exclude=minutely,hourly')
    //         .then(res => res.json())
    //         .then((result) => {
    //             let meteo = result.daily.data.summary
    //             console.log(meteo)
    //         },
    //         )
    // }

    // getMeteo() {
    //     <Get url="https://api.darksky.net/forecast/c0ea17f48f58bf1ffc09a62740384ae2/45.664898,3.207027,1584198000" params={{lang: "fr"}, {units: "auto"}, {exclude: "minutely,hourly"}}>
    //     {(error, response, isLoading, makeRequest, axios) => {
    //       if(error) {
    //         return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
    //       }
    //       else if(isLoading) {
    //         return (<div>Loading...</div>)
    //       }
    //       else if(response !== null) {
    //         return (<div>{response.data.message} <button onClick={() => makeRequest({ params: { refresh: true } })}>Refresh</button></div>)
    //       }
    //       return (<div>Default message before request is made.</div>)
    //     }}
    //   </Get>
    // }








    getMeteo(lat, long){
        fetch('https://api.darksky.net/forecast/c0ea17f48f58bf1ffc09a62740384ae2/45.664898,3.207027,1584198000?lang=fr&units=auto&exclude=minutely,hourly')
        // fetch('https://api.darksky.net/forecast/c0ea17f48f58bf1ffc09a62740384ae2/' + lat + long + ',1584198000?lang=fr&units=auto&exclude=minutely,hourly')
            .then(res => res.json())
            .then((result) => {
                let meteo = result.daily.data.summary
                let icon = result.daily.data.icon
                console.log(meteo)
                console.log(icon)
                switch(icon){
                    case "clear-day":
                        return (
                            <div icon="sunny">
                                <span className="sun"></span>
                            </div>
                        )
                    break;
                    case "rain":
                        return (
                            <div icon="stormy">
                                <span className="cloud"></span>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                        )
                    break;
                    default:
                        return (
                            <div icon="supermoon" data-label="Cool!">
                                <span class="moon"></span>
                                <span class="meteor"></span>
                            </div>
                        )
                }
            },
            )
            
    }

    parseDate(myDate){
        return moment(myDate).format("DD/MM/YYYY - HH:mm")  
    }

    render() {
        const { error, isLoaded, ready, items } = this.state;

        const trajets = items.map( (item, key) => {
                return <div key={key} className="trajets">{item.route.name} départ : {this.parseDate(item.stop_date_time.departure_date_time)} {this.getDestination(item.route.direction.id)}</div>
                // return <div key={key} className="trajets">{item.route.name} départ : {this.parseDate(item.stop_date_time.departure_date_time)} coordonnées : {this.getDestination(item.route.direction.id)} météo : {this.getMeteo()}</div>
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