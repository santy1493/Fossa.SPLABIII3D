function crearAnuncios(vec){

    const anuncios = document.createElement('div');
    anuncios.appendChild(crearCuerpo(vec));
    return anuncios;
}

function crearCuerpo(vec){
    
    const listaAnuncios = document.createElement('div');
    listaAnuncios.setAttribute('class', 'scroll');

    vec.forEach((elemento) => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const titulo = document.createElement('h2');
        titulo.textContent = elemento['titulo'];

        const descripcion = document.createElement('h3');
        descripcion.textContent = elemento['descripcion'];

        const precio = document.createElement('h4');
        precio.style.color = 'limegreen';
        precio.textContent = '$' + elemento['precio'];

        const ul = document.createElement('ul');
        ul.setAttribute('class', 'caracteristicas');

        const puertas = document.createElement('li');
        puertas.setAttribute('class', 'inline');
        const divPuertas = document.createElement('div');
        const imgPuertas = document.createElement('img');
        imgPuertas.setAttribute('src', './media/icon/anuncioPuerta.png');
        imgPuertas.style.width = '50px';
        const labelPuertas = document.createElement('label');
        labelPuertas.style.marginLeft = '10px';
        labelPuertas.textContent = elemento['puertas'];
        divPuertas.appendChild(imgPuertas);
        divPuertas.appendChild(labelPuertas);
        puertas.appendChild(divPuertas);

        const kms = document.createElement('li');
        kms.setAttribute('class', 'inline');
        const divKms = document.createElement('div');
        const imgKms = document.createElement('img');
        imgKms.setAttribute('src', './media/icon/anuncioVelocimento.png');
        imgKms.style.width = '50px';
        const labelKms = document.createElement('label');
        labelKms.textContent = elemento['kms'];
        divKms.appendChild(imgKms);
        divKms.appendChild(labelKms);
        kms.appendChild(divKms);

        const potencia = document.createElement('li');
        potencia.setAttribute('class', 'inline');
        const divPotencia = document.createElement('div');
        const imgPotencia = document.createElement('img');
        imgPotencia.setAttribute('src', './media/icon/anuncioMotor.png');
        imgPotencia.style.width = '70px';
        imgPotencia.style.height = '50px';
        const labelPotencia = document.createElement('label');
        labelPotencia.textContent = elemento['potencia'];
        divPotencia.appendChild(imgPotencia);
        divPotencia.appendChild(labelPotencia);
        potencia.appendChild(divPotencia);

        ul.appendChild(puertas);
        ul.appendChild(kms);
        ul.appendChild(potencia);

        const btn = document.createElement('button');
        btn.setAttribute('class', 'boton');
        btn.textContent = 'Ver Vehiculo';
        const br = document.createElement('br');

        card.appendChild(titulo);
        card.appendChild(descripcion);
        card.appendChild(precio);
        card.appendChild(ul);
        card.appendChild(btn);

        listaAnuncios.appendChild(card);
    });

    return listaAnuncios;
}

export default crearAnuncios;