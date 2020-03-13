import React from 'react';
import Parameters from './components/Parameters';
import Trajets from './components/Trajets';
import './App.css';
import './Weather.css';
import './Background.css';

class App extends React.Component {

  state = {
    date:'',
    ville: '',
    ready: false
  }

  takeProps = (data1, data2) => {
    console.log(data1)
    console.log(data2)
    this.setState({
      date: data1,
      ville: data2,
      ready: true
    })
  }

  render() {
    return (
      <section>
        <div className="wrapper">
          <div className="background"></div>
          <div className="rocks_1"></div>
          <div className="rocks_2"></div>
          <div className="rails"></div>
          <div className="train"></div>
          <div className="ground"></div>
          <div className="lights"></div>
        </div>
        {/* <div className="weather-icon">
          <div icon="sunny">
            <span className="sun"></span>
          </div>

          <div icon="cloudy">
            <span className="cloud"></span>
            <span className="cloud"></span>
          </div>
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
        </div>  */}
        <div className="forms">
          <Parameters data={this.takeProps}/>
        </div>
        <div className="trajets">
          <Trajets ville={this.state.ville} date={this.state.date} ready={this.state.ready}/>
        </div>
      </section>
    )
  }
}

export default App;