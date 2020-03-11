import React from 'react';
var moment = require('moment');

class Trajets extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        ready: false,
        items: []
    };

    parsePropsDate(myDate){
        return moment(myDate).format("YYYYmmDD[T]HHmmss")
    }

    componentDidUpdate(prevProps) {
        if (this.props.ready !== prevProps.ready) {
            this.setState({ready: this.props.ready})
            fetch('https://api.sncf.com/v1/coverage/sncf/stop_areas/stop_area%3AOCE%3ASA%3A87581009/departures?from_datetime=20200314T000000&count=600&key=28788241-cfd6-480f-baa3-aa071e03a3c5')
                .then(res => res.json())
                .then((result) => {
                    console.log(result)
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
    
    componentDidMount() {
        if(this.state.ready === true){
            console.log('test')
        }
    }

    parseDate(myDate){
        return moment(myDate).format("DD/mm/YYYY - HH:mm")    
    }

    render() {
        const { error, isLoaded, ready, items } = this.state;
        if(ready === true){
            if (error) {
                return <div>Erreur : {error.message}</div>;
            } else if (!isLoaded) {
                return <div>Chargement…</div>;
            } else {
                console.log('lancé')
                return (
                    <div className="résultats">
                        {items.map( (item, key) => (<div key={key} className="trajets">{item.route.name} départ : {this.parseDate(item.stop_date_time.departure_date_time)}</div>))}
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