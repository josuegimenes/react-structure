import React, { Component } from 'react'

class TechList extends Component {
    state = {
        newTech: '',
        techs: [
            'Node.js',
            'ReactJS',
            'React Native',
        ],
    };

    handleInputChange = e => {
        //console.log(e.target.value);
        this.setState({ newTech: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();

        //console.log(this.state.newTech);
        
        /**
         * Copia o estado e cria um novo estado com o item adicionado.
         */
        this.setState({ 
            techs: [...this.state.techs, this.state.newTech],
            newTech: ''
        });
    }

    handleDelete = (tech) => {
        //console.log(tech);

        this.setState({ techs: this.state.techs.filter(t => t !== tech ) })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <h1>{this.state.newTech}</h1>
                <ul>
                    {this.state.techs.map(tech => (
                        <li key={tech}>
                            {tech}
                            <button onClick={() => this.handleDelete(tech)} type="button">Remover</button>
                        </li>
                    ))}
                </ul>
                <input 
                    type="text" 
                    onChange={this.handleInputChange} 
                    value={this.state.newTech} 
                />
                <button type="submit">Enviar</button>
            </form>
        );
    }
}

export default TechList;