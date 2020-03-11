import React from 'react';

class Parameters extends React.Component {
    state = {
        date: '',
        ville: ''
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
  
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label className="inputForm">
                Date : 
                    <input type="date" name="date" onChange={this.handleInputChange} />
                </label>
                <label className="inputForm">
                Choisissez votre lieu de départ :
                    <select id="ville"  name="ville" onChange={this.handleInputChange}>
                        <option >Sélectionner</option>
                        <option value="Bordeaux">Bordeaux</option>
                        <option value="Paris">Paris</option>
                    </select>
                </label>
                <input type="submit" value="envoyer"/>
            </form>
        );
    }
}

export default Parameters;