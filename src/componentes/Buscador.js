import React, { Component } from 'react';

class Buscador extends Component {

    busquedaRef = React.createRef();

    obtenerDatos = (e) =>{
        e.preventDefault();

        //leemos el valor 
        const termino = this.busquedaRef.current.value;

        //enviar al props
        this.props.datosBusqueda(termino);
    }

    render() { 
        return ( 
            <form onSubmit={this.obtenerDatos}>
                <div className="row">
                    <div className="form-group col-md-8">
                        <input ref={this.busquedaRef} type="text" className="form-control form-control-lg" placeholder="Busca tu imagen, ejemplo: Futbol"/>
                    </div>
                    <div className="form-group col-md-4">
                        <input type="submit" className="bt btn-lg btn-danger btn-block" value="Buscar..." />
                    </div>
                </div>
            </form>
         );
    }
}
 
export default Buscador;