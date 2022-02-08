const modal = document.querySelector('#miModal');
const boton = document.querySelector('#mi-boton');

const close = document.getElementsByClassName("close")[0];

boton.addEventListener("click", abrirModal);
close.addEventListener("click", closeModal);


function abrirModal () {
    
    modal.style.display = "block";
}

function closeModal () {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }