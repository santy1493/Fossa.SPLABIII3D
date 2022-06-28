function crearTabla(vec){

    const tabla = document.createElement('table');
    tabla.appendChild(crearCabecera(vec[0]));
    tabla.appendChild(crearCuerpo(vec));
    return tabla;
}

function crearCabecera(elemento){
    const thead = document.createElement('thead'),
          tr = document.createElement('tr');

    Object.keys(elemento).forEach(k => {

        if(k !== 'id'){
            const th = document.createElement('th');
            th.textContent = k;
            tr.appendChild(th)
        } 
    });

    thead.appendChild(tr);
    return thead;
}

function crearCuerpo(vec){
    const tbody = document.createElement('tbody');
    vec.forEach((elemento, index) => {
        const tr = document.createElement('tr');
        tr.classList.add(index%2?'oscuro':'claro');
        
        for(const key in elemento) {
            if(key!=='id'){
                const td = document.createElement('td');
                if(elemento[key]===true) {
                    td.textContent = 'si';
                }
                else if(elemento[key]===false) {
                    td.textContent = 'no';
                }
                else {
                    td.textContent = elemento[key];
                }
                tr.appendChild(td);
            } else {
                tr.setAttribute('data-id', elemento[key]);
            }
        }        
    
        tbody.appendChild(tr);
    });

    return tbody;
}

export default crearTabla;