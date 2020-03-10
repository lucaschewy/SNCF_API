import React from 'react';
import './App.css';

class App extends React.Component {
  
  state = {
    error: null,
    isLoaded: false,
    items: []
  };

  componentDidMount() {
    fetch("https://api.sncf.com/v1/coverage/sncf/stop_areas/stop_area%3AOCE%3ASA%3A87581009/departures?calendar=20200314T000000&key=28788241-cfd6-480f-baa3-aa071e03a3c5")
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

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.display_informations.direction}>{item.display_informations.direction}</li>
          ))}
        </ul>
      );
    }
  }
}

export default App;