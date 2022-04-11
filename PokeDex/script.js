const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#ffeb00",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
  null: "#000000",
};

const url = " https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const pokemon = document.getElementById("pokemon")
const boton = document.getElementById("btn");
const boton2 = document.getElementById("btn_2");

let getPokeData = (nombre_pokemon) => {
  const url_final = url + nombre_pokemon;
  fetch(url_final).then((response) => {
    if (response.status != "200") {
      const hp = 0
      const imgSrc = "./img/not-found.png"
      const pokeName = "Not found"
      const statAttack = "0"
      const statDefense = "0"
      const statSpeed = "0"
      card.innerHTML = `
          <p class="hp">
            <span>HP</span>
              ${hp}
          </p>
          <img src=${imgSrc} />
          <h2 class="poke-name">${pokeName}</h2>
          <div class="types">
          
          </div>
          <div class="stats">
            <div>
              <h3>${statAttack}</h3>
              <p>Attack</p>
            </div>
            <div>
              <h3>${statDefense}</h3>
              <p>Defense</p>
            </div>
            <div>
              <h3>${statSpeed}</h3>
              <p>Speed</p>
            </div>
          </div>
    `;
    styleCard('null');
    }
    else {
      return response.json();
    }
  }).
    then((data) => {
      if (data) {
      generar_carta(data)}
    });
}

let generar_carta = (data) => {
  const hp = data.stats[0].base_stat;
  const imgSrc = data.sprites.other.dream_world.front_default;
  const pokeName = data.name;
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;
  const statSpeed = data.stats[3].base_stat;
  const color_tema = typeColor[data.types[0].type.name];
  card.innerHTML = `
        <p class="hp">
          <span>HP</span>
            ${hp}
        </p>
        <img src=${imgSrc} />
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types">
         
        </div>
        <div class="stats">
          <div>
            <h3>${statAttack}</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3>${statDefense}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>${statSpeed}</h3>
            <p>Speed</p>
          </div>
        </div>
  `;
  appendTypes(data.types);
  styleCard(color_tema);

};

let appendTypes = (types) => {
  types.forEach(item => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name;
    document.querySelector(".types").appendChild(span);

  });
};

let styleCard = (color) => {
  card.style.background = `radial-gradient(circle, ${color} 55%, #ffffff 100%)`;
  card.querySelectorAll(".types span").forEach((typeColor) => {
    typeColor.style.backgroundColor = color;
  });

};

window.addEventListener("load", getPokeData);


