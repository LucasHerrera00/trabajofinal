//variable que mantiene el carrito visible
var carritoVisible = false;

if(document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready();
}

function ready(){
    //funcionalidad a los botones de eliminar
    var botonesEliminarItem = document.getElementsByClassName ("btn-eliminar")
    for(var i=0; i < botonesEliminarItem.length;i++){
        var button = botonesEliminarItem[i];
        button.addEventListener("click", eliminarItemCarrito)
    }

    //agregamos funcionalidad al boton sumar
    var botonesSumarCantidad = document.getElementsByClassName("sumar-cantidad");
    for (var i=0; i < botonesSumarCantidad.length;i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener("click", sumarCantidad);
    }

    //agregamos funcionalidad al boton restar
    var botonesRestarCantidad = document.getElementsByClassName("restar-cantidad");
    for (var i=0; i < botonesRestarCantidad.length;i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener("click", restarCantidad);
    }

    //funcionalidad al boton de agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName("boton-item");
    for (var i=0; i<botonesAgregarAlCarrito.length;i++){
        button.addEventListener("click", botonesAgregarAlCarritoClicked);
    }

    //funcionalidad al boton pagar
    document.getElementsByClassName("btn-pagar")[0].addEventListener("click", pagarClicked)
}
 

//eliminamos item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    //actualizamos los precios despues de eliminar o agregar un item
    actualizarTotalCarrito();

    //lo sig controla si hay elementos en el carrito una vez que se elimino, si no hay, se elimina el carrito
    ocultarCarrito();
}

//actualizamos precio del carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor del carrito
    var carritoContenedor = document.getElementsByClassName("carrito")[0];
    var carritoItems = carritoContenedor.getElementsByClassName("carrito-items");
    var total = 0;

    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i < carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName("carrito-item-precio")[0];
        console.log(precioElemento);
        //sacamos el signo del peso y del centavo
        var precio = parseFloat(precioElemento.innerText.replace("$", "").replace(".", ""));
        console.log(precio);
        var cantidadItem = item.getElementsByClassName("carrito-item-cantidad")[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total + (precio * cantidad);
    }

    total = Math.round(total*100)/100;
    document.getElementsByClassName("carrito-precio-total")[0].innerText = "$" + total.toLocaleString("es") + ",00";
}

function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName("carrito-items")[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName("carrito")[0];
        carrito.style.marginRight = "-100%";
        carrito.style.opacity="0";
        carritoVisible = false;

        //ahora maximizamos el contenedor de los items
        var items = document.getElementsByClassName("contenedor-items")[0];
        items.style.width = "100%"; 
    }
}

function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName("carrito-item-cantidad")[0].value;
    console.log(cantidadActual); 
    cantidadActual++;
    selector.getElementsByClassName("carrito-item-cantidad")[0].value = cantidadActual;
    //actualizamos el carrito
    actualizarTotalCarrito();
}

function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName("carrito-item-cantidad")[0].value;
    console.log(cantidadActual); 
    cantidadActual--;

    //controlamos que no sea menor que 1 
    if(cantidadActual>=1){
        selector.getElementsByClassName("carrito-item-cantidad")[0].value = cantidadActual;
        //actualizamos el carrito
        actualizarTotalCarrito();
    }
    
}

function botonesAgregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement; 
    var titulo = item.getElementsByClassName("titulo-item")[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName("precio-item")[0].innerText;
    var imagenSrc = item.getElementsByClassName("img-item")[0].src;
    console.log(imagenSrc);

    //funcion que agrega los items al carrito
    agregarItemAlCarrito(titulo, precio, imagenSrc);

    //hacemos visible el carrito cuando se agrega por primera vez
    hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement("div");
    item.classList.add = "item";
    var itemsCarrito = document.getElementsByClassName("carrito-items")[0];

    //controlamos que el item agregador no se encuentre en el carrito
    var nombresItemCarrito = itemsCarrito.getElementsByClassName("carrito-item-titulo");
    for(var i=0; i < nombresItemCarrito.length;i++){
        alert("El item ya se encuentra en el carrito");
        return;
    }

    var itemCarritoContenido = `
    <div class="carrito-item">
        <img src="${imagenSrc}" alt="" width="80px">
        <div class="carrito-item-detalles">
              <span class="carrito-item-titulo">${titulo}</span>
              <div class="selector-cantidad">
                 <i class="fa-solid fa-minus restar-cantidad"></i>
                 <input type="text" value="1" class="carrito-item-cantidad" disabled>
                 <i class="fa-solid fa-plus sumar-cantidad"></i>
              </div>
              <span class="carrito-item-precio">${precio}</span>
              <span class="btn-eliminar">
                  <i class="fa-solid fa-trash"></i>
              </span>
        </div>
     </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //agregamos funcionalidad al boton eliminar del nuevo item
    item.getElementsByClassName("btn-eliminar")[0].addEventListener("click", eliminarItemCarrito)
    //agregamos funcionalidad al boton sumar del nuevo item
    var botonesSumarCantidad = item.getElementsByClassName("sumar-cantidad")[0];
    botonesSumarCantidad.addEventListener("click", sumarCantidad);
    //agregamos funcionalidad al boton restar del nuevo item
    var botonesRestarCantidad = item.getElementsByClassName("restar-cantidad")[0];
    botonesRestarCantidad.addEventListener("click", restarCantidad);
}

function pagarClicked(event){
    alert("Gracias por su compra!")
    //eliminamos todos los items del carrito
    var carritoItems = document.getElementsByClassName("carrito-items")[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    //funcion que oculta el carrito
    ocultarCarrito();
}

function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName("carrito")[0];
    carrito.style.marginRight = "0";
    carrito.style = "1";

    var items = document.getElementsByClassName("carrito-items")[0];
    items.style.width = "60%";
}
