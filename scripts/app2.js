//import {empleados} from "../data/datos.js";
import crearTabla from "./tablaDinamica.js";
import Anuncio_Auto from "./Anuncio_Auto.js";
import crearAnuncios from "./anunciosDinamicos.js";

const Url = 'http://localhost:3000/anuncios';

function getAnunciosAjax(){
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState == 4){
            if(xhr.status>=200 && xhr.status<300){
                const data = JSON.parse(xhr.responseText);
                actualizarTabla(data);
            }
            else{
                console.error(xhr.status, xhr.statusText);
            }
        }
    });
    xhr.open('GET', Url);
    xhr.send();
}

getAnunciosAjax();


function actualizarTabla(vec) {
 
    const container = document.querySelector('.main');

    while(container.children.length>0){
        container.removeChild(container.firstElementChild);
    }
    if(vec.length>0){
        container.appendChild(crearAnuncios(vec));
    }
}
