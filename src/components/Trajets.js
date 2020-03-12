import React from 'react';
var moment = require('moment');

let authentificationkey = 'bb105868-922d-418b-987d-f8b406b8855f';

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
            fetch('https://api.sncf.com/v1/coverage/sncf/stop_areas/' + this.props.ville + '/departures?from_datetime=' + this.parsePropsDate(this.props.date) + '&count=10&key=' + authentificationkey)
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
        fetch('https://api.sncf.com/v1/coverage/sncf/stop_areas/' + stopArea + '/stop_areas?&key=' + authentificationkey)
                .then(res => res.json())
                .then( (result) => {
                    console.log()
                    let destination = result.coord
                    return destination
                })
    }

    getMeteo(){
        fetch('https://api.darksky.net/forecast/c0ea17f48f58bf1ffc09a62740384ae2/45.664898,3.207027,1584198000?lang=fr&units=auto&exclude=minutely,hourly')
            .then(res => res.json())
            .then((result) => {
                let meteo = result.daily.data.summary
                return meteo
            },
            )
        
    }

    parseDate(myDate){
        return moment(myDate).format("DD/MM/YYYY - HH:mm")  
    }

    render() {
        const { error, isLoaded, ready, items } = this.state;

        const trajets = items.map( (item, key) => {
                return <div key={key} className="trajets">{item.route.name} départ : {this.parseDate(item.stop_date_time.departure_date_time)} coordonnées : {this.getDestination(item.route.direction.id)} météo : {this.getMeteo()}</div>
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
                        {/* {items.map( (item, key) => (<div key={key} className="trajets">{item.route.name} départ : {this.parseDate(item.stop_date_time.departure_date_time)} coordonnées : ba yes hein - météo : {this.getMeteo()} <button className="details">détails</button></div>))} */}
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