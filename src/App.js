import React from 'react';
import Parameters from './components/Parameters';
import Trajets from './components/Trajets';
import './App.css';

class App extends React.Component {
  
  state = {
    date:'',
    ville: ''
  }

  takeProps = (data1, data2) => {
    console.log(data1)
    console.log(data2)
    this.setState({
      date: data1,
      ville: data2
    })
  }

  render() {
    return (
      <section>
        <div className="forms">
          <Parameters data={this.takeProps}/>
        </div>
        <div className="trajets">
          <Trajets ville={this.state.ville} date={this.state.date}/>
        </div>
      </section>
    )
  }
}

export default App;