import React from 'react';
import {SimpleSelect} from 'react-selectize';
import '../../node_modules/react-selectize/themes/index.css'

// let authentificationkey0 = 'fb9253e4-9288-4be5-9da6-cf5db676ae20';
// let authentificationkey1 = 'da920f44-b8e2-4a07-a5f9-5888296ae13f';
// let authentificationkey2 = '28788241-cfd6-480f-baa3-aa071e03a3c5';
let authentificationkey3 = 'bb105868-922d-418b-987d-f8b406b8855f';



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
            alert("champs vides ou incorrects")
            event.preventDefault();
        }else{
            this.props.data(this.state.date, this.state.ville)
            event.preventDefault();
        }
    }

    componentDidMount() {
        fetch('https://api.sncf.com/v1/coverage/sncf/stop_areas?count=4333&key=' + authentificationkey3)
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
        const gares = gare.map( (gare, key) => {
            return <option key={key} value={gare.id}>{gare.name}</option>
        })

        return (
            <form id="selectParameters" onSubmit={this.handleSubmit}>
                <label className="inputForm">
                    <input type="date" name="date" onChange={this.handleInputChange} />
                </label>
                <SimpleSelect placeholder="Gare de départ" onValueChange={value => this.setState({ville: value.value})} theme = "material" transitionEnter = {true} transitionLeave = {true}>
                    {gares}
                </SimpleSelect>
                <input type="submit" value="envoyer"/>
                
            </form>
        );
    }
}

export default Parameters;