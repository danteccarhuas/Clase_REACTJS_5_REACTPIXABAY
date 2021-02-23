import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';
import './App.css';

class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: '',
    cargando: false,
    totalPaginas: ''
  }

  consultarAPI = async () =>{
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=20379591-669af63b9811b359b13fd021d&q=${termino}&per_page=30&page=${pagina}`;
    await fetch(url)
    .then(respuesta => {
      this.setState({
        cargando: true
      });
      return respuesta.json()
    })
    .then(resultado => {
      console.log(resultado.totalHits);
      const totalPaginacion = Math.ceil(resultado.totalHits / 30);
      setTimeout(()=> {
        this.setState({
          imagenes: resultado.hits,
          cargando: false,
          totalPaginas: totalPaginacion
        })
      },500)
    });
  }

  datosBusqueda = (termino) =>{
    this.setState({
      termino: termino,
      pagina: 1
    }, ()=>{
      this.consultarAPI();
    });
  }

  paginaAnterior = ( )=> {
    //leemos el state
    let pagina = this.state.pagina;
    //si es la pagina 1, ya no podemos retroceder
    if(pagina  === 1) return null;
    //restar a la pagina actual
    pagina -= 1;
    //agregar al state
    this.setState({
      pagina
    },() => {
      this.consultarAPI();
      this.scroll();
    });
  }

  paginaSiguiente = () => {
    //leemos el state
    let {pagina} = this.state;
    const {totalPaginas} = this.state;
    if(pagina === totalPaginas) return null;
    //sumar a la pagina actual
    pagina += 1;
    //agregar al state
    this.setState({
      pagina
    }, ()=> {
      this.consultarAPI();
      this.scroll();
    });
  }

  scroll = ()=> {
    const elemento = document.querySelector(".jumbotron");
    elemento.scrollIntoView('smooth','start');
  }

  render(){
    const cargando = this.state.cargando;
    let resultado;
    if(cargando){
      resultado = <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                  </div>
    }else{
      resultado = <Resultado 
                      imagenes={this.state.imagenes}
                      paginaAnterior={this.paginaAnterior}
                      paginaSiguiente={this.paginaSiguiente}
                      pagina={this.state.pagina}
                      totalPaginas={this.state.totalPaginas}
                  />
    }

    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador Imágenes</p>
          <Buscador 
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
            {resultado}
        </div>
      </div>
    );
  }
}

export default App;