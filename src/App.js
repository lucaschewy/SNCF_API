import React from 'react';
import './App.css';
var moment = require('moment');

class App extends React.Component {
  
  state = {
    error: null,
    isLoaded: false,
    items: []
  };

  componentDidMount() {
    fetch("https://api.sncf.com/v1/coverage/sncf/stop_areas/stop_area%3AOCE%3ASA%3A87581009/departures?from_datetime=20200314T000000&count=600&key=28788241-cfd6-480f-baa3-aa071e03a3c5")
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

  // Modifier le format de la date
  parseDate(myDate){
    return moment(myDate).format("DD/mm/YYYY - HH:mm")    
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <ul>
          {items.map( (item, key) => (
            <li key={key}>{item.route.name} départ : {this.parseDate(item.stop_date_time.departure_date_time)}</li>
          ))}
        </ul>
      );
    }
  }
}

export default App;