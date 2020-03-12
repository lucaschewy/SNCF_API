import React , {Component} from 'react';
import {ReactSelectize, SimpleSelect, MultiSelect} from 'react-selectize';

let authentificationkey = 'fb9253e4-9288-4be5-9da6-cf5db676ae20';
let authentificationkey1 = 'bb105868-922d-418b-987d-f8b406b8855f';


class Parameters extends React.Component {
    state = {
        date: '',
        ville: '',
        gare: []
    }
  
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }
    
    handleSubmit = event => {
        if(this.state.date === '' || this.state.ville === ''){
            alert("attention")
            event.preventDefault();
        }else{
            this.props.data(this.state.date, this.state.ville)
            event.preventDefault();
        }
    }

    componentDidMount() {
        fetch('https://api.sncf.com/v1/coverage/sncf/stop_areas?count=4333&key=' + authentificationkey1)
            .then(res => res.json())
            .then(result => {
                let resultVille = result.stop_areas
                this.setState({
                    gare: resultVille
                })
            })
    }
  
    render() {
        
        const gare  = this.state.gare;

        console.log(gare)

        const gares = gare.map( (gare, key) => {
            return <option key={key} value={gare.id}>{gare.name}</option>
        })

        return (
            <form id="selectParameters" onSubmit={this.handleSubmit}>
                <label className="inputForm">
                Date : 
                    <input type="date" name="date" onChange={this.handleInputChange} />
                </label>
                {/* <label className="inputForm">
                Choisissez votre lieu de départ : */}

                <MultiSelect 
                    options = {["apple", "mango", "orange", "banana"].map(
                        fruit => ({label: fruit, value: fruit})
                      )}
                    placeholder = "Select fruits"
                    transitionEnter = {true}
                    transitionLeave = {true}
                />

                    {/* <select id="ville"  name="ville" onChange={this.handleInputChange}>
                        <option >Sélectionner</option>
                        {gares}
                        
                        <option value="Bordeaux">Bordeaux</option>
                        <option value="Paris">Paris</option>
                    </select>
                </label> */}
                <input type="submit" value="envoyer"/>
                
            </form>
        );
    }
}

export default Parameters;