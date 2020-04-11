import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import TrajetsDetails from './TrajetDetails';
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

    render() {
        const { error, isLoaded, ready, items } = this.state;

        const trajets = items.map( (item, key) => {
                // return <div key={key} className="trajets"><p>{item.route.name} départ : {this.parseDate(item.stop_date_time.departure_date_time)} {this.getDestination(item.route.direction.id)}</p>
                return <TrajetsDetails  key={key} itemName={item.route.name} time={this.parseDate(item.stop_date_time.departure_date_time)} directionID={item.route.direction.id} />
                {/* <Router>
                    <Link to={"/" + item.route.name}>about</Link>
                    <Switch>
                        <Route path={"/" + item.route.name}>
                            <Details/>
                        </Route>
                        <Route path={"/test"}>
                            return <h2>test</h2>
                        </Route>
                    </Switch>
                </Router> */}
                // </div>
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
                </div>
            )
        }
    }
}

export default Trajets;