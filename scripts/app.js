import crearTabla from "./tablaDinamica.js";
import Anuncio_Auto from "./Anuncio_Auto.js";

const Url = 'http://localhost:3000/anuncios';

//const autos = localStorage.getItem('autos')?JSON.parse(localStorage.getItem('autos')):[];

let filteredAds=[];
let temporalListAds=[];

const container = document.querySelector('.table-container');
const $spinner = document.getElementById('spinner');

getAnunciosAjax();
//console.log('##autos: ' + autos);
let idSeleccionado = 0;
let idAModificar = 0;

//actualizarTabla(autos);

//console.log(autos);

const filtrosCheckbox =  document.querySelectorAll(".filtroCheck");
const myAverage = document.getElementById("Average");

filtrosCheckbox.forEach((element)=> element.addEventListener("click",filtrarPorCheckbox));

window.addEventListener("change", (ev) => {
    if(ev.target.matches('#FTransaction')){
      console.log('Inside of the Change Event');
      filtrarTabla(ev, filteredAds, temporalListAds);
    }
  });

const $frmAuto = document.forms[0];

const $btnBaja = document.getElementById('bajaAuto');
const $btnModificar = document.getElementById('modificarAuto');
const $btnAlta = document.getElementById('altaAuto');
const $btnCancelar = document.getElementById('cancelar');





function esconderBotones() {
    $btnAlta.hidden = false;
    $btnModificar.hidden = true;
    $btnBaja.hidden = true;
    $btnCancelar.hidden = true;
}

function mostrarBotones() {
    $btnAlta.hidden = true;
    $btnModificar.hidden = false;
    $btnBaja.hidden = false;
    $btnCancelar.hidden = false;
}
esconderBotones();

$frmAuto.addEventListener('submit', (e)=>{

    const frm = e.target;
    console.log(frm);

    e.preventDefault();

    const nuevoAuto = new Anuncio_Auto(
        Date.now(), 
        frm.titulo.value, 
        frm.transaccion.value, 
        frm.descripcion.value, 
        frm.precio.value, 
        frm.puertas.value,
        frm.kms.value,
        frm.potencia.value

    );

    console.log(nuevoAuto);
    
    //autos.push(nuevoAuto);
    //localStorage.setItem('autos', JSON.stringify(autos));
    
    crearAnuncioAjax(nuevoAuto);
    getAnunciosAjax();

    Swal.fire('Anuncio creado!','Se creo con exito el anuncio','success');
    $frmAuto.reset();

})

function eliminarAnuncio() {

    if(idSeleccionado != 0) {
        
        eliminarAnuncioAjax(idSeleccionado);
    
        //localStorage.setItem('autos', JSON.stringify(autos));
        Swal.fire('Anuncio eliminado!','Se elimino con exito el anuncio','error');
        getAnunciosAjax();
        idSeleccionado = 0;
        esconderBotones();
        $frmAuto.reset();
    }
    
}

function modificarAnuncio() {

    if(idAModificar == 0) {
        if(idSeleccionado != 0) {
        
            $btnBaja.disabled = true;
            getPersonaAjax(idSeleccionado);
        }
    }
    else {
        modificarAnuncioAjax(idAModificar);

        idSeleccionado = 0;
        idAModificar = 0;
        $btnBaja.disabled = false;
        esconderBotones();
        //localStorage.setItem('autos', JSON.stringify(autos));
        getAnunciosAjax();
        Swal.fire('Anuncio modificado!','Se modifico con exito el anuncio','info');
        $frmAuto.reset();
    } 
}

window.addEventListener('click', (e) => {

    if(e.target.matches('tr td')) {
        console.log(e.target.parentElement.dataset.id);
        idSeleccionado = e.target.parentElement.dataset.id;
        idAModificar = 0;
        mostrarBotones();
    }
    else if(e.target.matches('#bajaAuto')) {
        eliminarAnuncio(idSeleccionado);
    }
    else if(e.target.matches('#modificarAuto')) {
        modificarAnuncio(idSeleccionado);
    }
    else if(e.target.matches('#cancelar')) {
        esconderBotones();
        $frmAuto.reset();
    }

});



function actualizarTabla(vec) {
 
    /*const container = document.querySelector('.table-container');
    const $spinner = document.getElementById('spinner');
    container.hidden = true;
    $spinner.hidden = false;

    setTimeout(()=>{
        $spinner.hidden = true; 
        container.hidden = false;
    }, 1500);*/

    while(container.children.length>0){
        container.removeChild(container.firstElementChild);
    }
    if(vec.length>0){
        container.appendChild(crearTabla(vec));
    }
}

function cargarSpinner() {
    container.hidden = true;
    $spinner.hidden = false;
}

function eliminarSpinner() {
    container.hidden = false;
    $spinner.hidden = true;
}


function actualizarTablaSinSpinner(vec) {
 
    const container = document.querySelector('.table-container');
    const $spinner = document.getElementById('spinner');
    container.hidden = false;
    $spinner.hidden = true;

    while(container.children.length>0){
        container.removeChild(container.firstElementChild);
    }
    if(vec.length>0){
        container.appendChild(crearTabla(vec));
    }
}

function getAnunciosAjax(){
    cargarSpinner();
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState == 4){
            if(xhr.status>=200 && xhr.status<300){
                const data = JSON.parse(xhr.responseText);
                filteredAds = data;
                temporalListAds = data;
                actualizarTabla(data);
            }
            else{
                console.error(xhr.status, xhr.statusText);
            }
            eliminarSpinner();
        }
        else{
            cargarSpinner();
        }
    });
    xhr.open('GET', Url);
    xhr.send();
}

function crearAnuncioAjax(anuncio){
    cargarSpinner();
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState == 4){
            if(xhr.status>=200 && xhr.status<300){
                const data = JSON.parse(xhr.responseText);
            }
            else{
                console.error(xhr.status, xhr.statusText);
            }
            eliminarSpinner();
        }
        else{
            cargarSpinner();
        }
    });
    xhr.open('POST', Url);
    xhr.setRequestHeader('Content-Type','application/json;charset=utf8');
    xhr.send(JSON.stringify(anuncio));
}

function modificarAnuncioAjax(id){
    cargarSpinner();
    const anuncioModificado = {titulo:$frmAuto.titulo.value, transaccion:$frmAuto.transaccion.value, descripcion:$frmAuto.descripcion.value, precio:parseInt($frmAuto.precio.value),
                                puertas:parseInt($frmAuto.puertas.value), kms:parseInt($frmAuto.kms.value), potencia:parseInt($frmAuto.potencia.value)}
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState == 4){
            if(xhr.status>=200 && xhr.status<300){
                console.log(xhr.responseText);
            }
            else{
                console.error(xhr.status, xhr.statusText);
            }
           eliminarSpinner();
        }
        else{
            cargarSpinner();
        }
    });
    xhr.open('PUT', Url + '/' + id);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(anuncioModificado));
}

function getPersonaAjax(id){
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState == 4){
            if(xhr.status>=200 && xhr.status<300){
                const data = JSON.parse(xhr.responseText);
                idAModificar = id;
                $frmAuto.titulo.value = data.titulo;
                $frmAuto.transaccion.value = data.transaccion;
                $frmAuto.descripcion.value = data.descripcion;
                $frmAuto.precio.value = data.precio;
                $frmAuto.puertas.value = data.puertas;
                $frmAuto.kms.value = data.kms;
                $frmAuto.potencia.value = data.potencia;
            }
            else{
                console.error(xhr.status, xhr.statusText);
            }
        }
    });
    xhr.open('GET', Url + '/' + id);
    xhr.send();
}

function eliminarAnuncioAjax(id){
    cargarSpinner();
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState == 4){
            if(xhr.status>=200 && xhr.status<300){
                console.log(xhr.responseText);
            }
            else{
                console.error(xhr.status, xhr.statusText);
            }
           eliminarSpinner();
        }
        else{
            cargarSpinner();
        }
    });
    xhr.open('DELETE', Url + '/' + id);
    xhr.send();
}

function filtrarTabla(e, filteredAds, temporalList){

    let selectedOption =  FTransaction.value;
    let averageToShow = 'N/A';

    if(selectedOption != "todos"){
        temporalList = filteredAds.filter(value => value.transaccion == selectedOption);
        const average = temporalList.reduce((total, current) => total + parseInt(current.precio), 0) /temporalList.length;

        averageToShow = `$ ${average.toFixed(2)}`;
    }else{
        temporalList = filteredAds;
    }

    if(temporalList.length>0) {
        myAverage.value =  averageToShow;
    }

    actualizarTablaSinSpinner(temporalList);
}

function filtrarPorCheckbox(e){
  const filtros = {};
  filtrosCheckbox.forEach((item) => {
    filtros[item.name] = item.checked;
  });

  const listaAnuncios = temporalListAds.map((item) => {
    const mapAnuncios = {};
    for (const key in item) {
      if (filtros[key] || key == "id") {
        mapAnuncios[key] = item[key];
      }
    }
    return mapAnuncios;
  });
  actualizarTablaSinSpinner(listaAnuncios);
}