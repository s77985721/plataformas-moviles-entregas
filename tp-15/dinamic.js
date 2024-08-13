/* Variable globales */

let titulo = "";
let container = document.createElement("div");
let listaing = [];
let listamed = [];
let listaComidas = [];

/* Funcion para obtener todas las recetas */

async function obtenerTodo(url) {
  const response = await fetch(url);
  const datos = await response.json();

  return datos.meals;
}

/* Funcion para obtener los detalles de una sola receta por su id */

async function obteneReceta(details, id) {
  const respuesta = await fetch(details + id);
  const info = await respuesta.json();
  p;
  return info.meals;
}

/* Esta funcion crea los elementos para poder mostrar las recetas */

async function mostrarComidas(url, details, titulo) {
  container.remove();
  document.querySelector(".titulo").innerText = titulo;
  const spinner = document.querySelector("#spinner");
  spinner.classList.remove("d-none");
  const comidas = await obtenerTodo(url);
  spinner.classList.add("d-none");
  container = document.createElement("div");
  const section = document.querySelector(".container");
  section.classList.remove("d-none");
  section.appendChild(container);
  container.className += "row g-0 justify-content-between p-4";

  comidas.forEach(async (e) => {
    const moreInformation = await obteneReceta(details, e.idMeal);

    const card = document.createElement("div");
    const cardBody = document.createElement("div");
    const parrafo = document.createElement("p");
    const tituloComida = document.createElement("h5");
    const imagenPlato = document.createElement("img");
    const instrucciones = document.createElement("p");
    const button = document.createElement("button");

    /* Apartado de ingredientes */

    /* creacion de los elementos de este apartado */

    const ol = document.createElement("ol");
    const ul = document.createElement("ul");

    /* Agregar los datos a este apartado */
    const containerIngredientes = document.createElement("div");
    const ingredientes = document.createElement("div");
    const medidas = document.createElement("div");
    const subTitle = document.createElement("h3");
    subTitle.innerText = "Ingredientes";
    containerIngredientes.appendChild(subTitle);

    /* Clases de los elementos */

    containerIngredientes.className += "row g-0 justify-content-between";
    containerIngredientes.id += e.idMeal;
    ingredientes.className += "col-6";
    medidas.className += "col-6";
    subTitle.className += "fst-italic fw-bold text-warning bg-dark m-2";

    listaing = Array(20)
      .fill(undefined)
      .map((_, i) => moreInformation[0][`strIngredient${i + 1}`]);

    listamed = Array(20)
      .fill(undefined)
      .map((_, i) => moreInformation[0][`strMeasure${i + 1}`]);

    listaing.forEach((element) => {
      if (
        element != "" &&
        element != null &&
        element != undefined &&
        element != 0
      ) {
        const listaIngredientes = document.createElement("li");

        listaIngredientes.innerText = element;

        ol.appendChild(listaIngredientes);
        ingredientes.appendChild(ol);
        containerIngredientes.appendChild(ingredientes);
      }
    });

    listamed.forEach((e) => {
      if (e != "" && e != null && e != undefined && e != 0) {
        const listaMedidas = document.createElement("li");

        listaMedidas.innerText = e;
        ul.appendChild(listaMedidas);
        medidas.appendChild(ul);
        containerIngredientes.appendChild(medidas);
      }
    });

    /* console.log(moreInformation[0][`strIngredient${1}`]) */

    /* Finaliza ingredientes */

    card.className += "container-fluid card m-2 col-md-4 col-sm-2 ";
    card.id += e.idMeal;
    imagenPlato.className += "card-img-top";
    cardBody.className += "card-body esconder";
    tituloComida.className += "card-title text-center";
    parrafo.className += "card-text";
    instrucciones.className += " ms-1";
    instrucciones.id = e.idMeal;
    button.className += "btn btn-outline-secondary m-4";
    button.id = e.idMeal;
    card.style.width = 30 + "%";

    card.style.height = card.min;
    card.style.transition = "height 1500ms";

    button.innerText = "Show +";
    tituloComida.innerText = e.strMeal;
    imagenPlato.src = e.strMealThumb;
    parrafo.appendChild(tituloComida);
    parrafo.appendChild(imagenPlato);
    cardBody.appendChild(parrafo);
    card.appendChild(cardBody);
    listaComidas.push(card);

    moreInformation.forEach((element) => {
      instrucciones.innerText = element.strInstructions;
      cardBody.appendChild(containerIngredientes);
      cardBody.appendChild(instrucciones);
    });

    card.appendChild(button);

    container.appendChild(card);

    card.max = card.offsetHeight + "px";
    card.min = 480 + "px";

    card.style.height = card.min;

    const listaInstrucciones = [];
    listaInstrucciones.push(instrucciones);

    const listaContainerIng = [];
    listaContainerIng.push(containerIngredientes);

    button.addEventListener("click", (e) => {
      idReceta = e.target.id;

      if (e.target.innerText == "Show +" || e.target.innerText == "Mostrar.") {
        card.style.height = card.max;

        listaContainerIng.forEach((I) => {
          if (I.id == e.target.id) {
            e.target.innerText = "Hide -";
          }
          listaInstrucciones.forEach((element) => {
            if (element.id == e.target.id) {
            }
          });
        });
      } else if (
        e.target.innerText == "Hide -" ||
        e.target.innerText == "Ocultar -"
      ) {
        card.style.height = card.min;
        listaContainerIng.forEach((I) => {
          if (I.id == e.target.id) {
            e.target.innerText = "Show +";
          }
          listaInstrucciones.forEach((element) => {
            if (element.id == e.target.id) {
            }
          });
        });
      }
    });
  });
}

const bandera = document.querySelector(".bandera");
const navText = document.querySelector(".navbar-brand");
const a = document.createElement("a");
a.classList.add("navbar-brand");
const audioAmericano = document.querySelector("#audioAmericano");
const audioItaliano = document.querySelector("#audioItaliano");
const audioChino = document.querySelector("#audioChino");

function mostrarComidaChina() {
  audioAmericano.pause();
  audioAmericano.currentTime = 0;
  audioItaliano.pause();
  audioItaliano.currentTime = 0;
  audioChino.play();
  a.innerText = "Comila lapila";
  titulo = "Bienvenido a la dinastlia China";
  bandera.src = "china.png";
  navText.appendChild(a);
  const url = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese";
  const details = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  mostrarComidas(url, details, titulo);
}

function mostrarComidaItaliana() {
  audioAmericano.pause();
  audioAmericano.currentTime = 0;
  audioChino.pause();
  audioChino.currentTime = 0;
  audioItaliano.play();
  a.innerText = "Fast Food";
  titulo = "Bienvenute to Italy";
  bandera.src = "italia.png";
  navText.appendChild(a);
  const url = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian";
  const details = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  mostrarComidas(url, details, titulo);
}

function mostrarComidaAmericana() {
  audioChino.pause();
  audioChino.currentTime = 0;
  audioItaliano.pause();
  audioItaliano.currentTime = 0;
  audioAmericano.play();
  a.innerText = "Fast Food";
  titulo = "Welcome America";
  bandera.src = "eeuu.png";
  navText.appendChild(a);
  const url = "https://www.themealdb.com/api/json/v1/1/filter.php?a=American";
  const details = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  mostrarComidas(url, details, titulo);
}

function buscarComida(plato) {
  if (plato != "") {
    listaComidas.forEach((e) => {
      if (
        e.firstChild.firstChild.firstChild.innerText.toLowerCase() ==
        plato.toLowerCase()
      ) {
        e.scrollIntoView({
          behavior: "smooth",
        });
        e.style.animation = "foco 1s linear";
        e.addEventListener("animationend", () => {
          e.style.animation = "none";
        });
      }
    });
  } else {
    alert("No se encuentra el plato");
  }
}

function handlerFormulario(e) {
  e.preventDefault();
  const input = e.target.querySelector("input");
  const plato = input.value;
  input.value = "";
  buscarComida(plato);
}

document.querySelector("form").addEventListener("submit", handlerFormulario);
