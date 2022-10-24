//Teste inicial para saber se está rodando Js
//alert('Deu certo');

let btn = document.querySelector("#icon-logo");
let sidebar = document.querySelector(".sidebar");
let input__nome = document.querySelector("#nome");



// Eventos
btn.onclick = function () {
  sidebar.classList.toggle("active");
}