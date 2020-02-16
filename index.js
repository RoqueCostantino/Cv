const grid = new Muuri('.Grid', {
    layout: {
        rounding: false
      }

});

window.addEventListener('load', () => {   
    document.getElementById('Grid').classList.add('imagenes-cargadas');

    // Agregamos los listener de los enlaces para filtrar por categoria.

    const enlaces = document.querySelectorAll('#categoria a');
    enlaces.forEach( (elemento) => {
       
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            enlaces.forEach((enlace)=> enlace.classList.remove('activo'));
            evento.target.classList.add('activo')

            const categorias = evento.target.innerHTML.toLowerCase();
            
            categorias === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categorias}"]`);
        });
    });

    // Agregamos el listener para la barra de busqueda.

    document.querySelector('#search-bar').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
        grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
    });

    // Agregamos el listener para las imagenes.

    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.Grid .item img').forEach((elemento) => {
          
        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .description').innerHTML = descripcion;
        });

    });

    // Eventlistener del boton de cerrar.

    document.querySelector('#btn-close').addEventListener('click', () => {
        overlay.classList.remove('activo');
    });

    // Eventlistener del Overlay

    overlay.addEventListener('click', () => {
        overlay.classList.remove('activo')
    });

});
