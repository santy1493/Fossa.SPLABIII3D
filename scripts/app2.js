//import {empleados} from "../data/datos.js";
import crearTabla from "./tablaDinamica.js";
import Anuncio_Auto from "./Anuncio_Auto.js";
import crearAnuncios from "./anunciosDinamicos.js";

const autos = localStorage.getItem('autos')?JSON.parse(localStorage.getItem('autos')):[];


actualizarTabla(autos);


function actualizarTabla(vec) {
 
    const container = document.querySelector('.main');

    while(container.children.length>0){
        container.removeChild(container.firstElementChild);
    }
    if(vec.length>0){
        container.appendChild(crearAnuncios(vec));
    }
}
