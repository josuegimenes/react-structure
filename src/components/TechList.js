import React, { Component } from 'react'

import TechItem from './TechItem';

class TechList extends Component {
    state = {
        newTech: '',
        techs: [],
    };

    /* CICLO DE VIDA DO COMPONENTE */
    // Executado assim que o componente aparece em tela.
    componentDidMount() {
        const techs = localStorage.getItem('techs');

        // verifica se há dados no localStorage
        if (techs) {
            this.setState({ techs: JSON.parse(techs) });
        }
    }

    // Executado sempre que houver alterações nas props ou estado.
    // componentDidUpdate(prevProps, prevState) {
    componentDidUpdate(_, prevState) {
        // this.props; this.state
        // quando não utiliza prevProps ou prevState usa um underline _

        // verifica se o estado anterior esta diferente do atual.
        if (prevState.techs !== this.state.techs) {
            localStorage.setItem('techs', JSON.stringify(this.state.techs));
        }
    }

    // Executado quando o componente deixa de existir.
    componentWillUnmount() {
        // serve para limpar sujeiras que componentes possam deixa no App,
        // como Event Listener que não morre no app e ficam ouvindo uma ação 
        // do usuário.
    }

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
                        <TechItem 
                            key={tech} 
                            tech={tech} 
                            onDelete={() => this.handleDelete(tech)} 
                        />
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