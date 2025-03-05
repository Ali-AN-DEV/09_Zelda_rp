let xp = 0;
let vida= 100;
let rupias = 50;
let currentWeaponIndex = 0;
let currentFightingIndex;
let monsterHealth;
let inventory = ["palo de madera"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const textXp = document.querySelector("#xpText");
const textVida = document.querySelector("#vidaText");
const rupiasText = document.querySelector("#rupiasText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const armas = [
  { name : "palo de madera", daño : 2 },
  { name : "espada del viajero", daño : 5 },
  { name : "espada del caballero", daño : 15 },
  { name : "espada maestra", daño : 60 }
];

const enemigos = [
  {name : "Bokoblin", vidaMonstruo : 10, lvl: 5, reward: 10}, 
  {name : "Moblin", vidaMonstruo : 25, lvl: 15, reward: 30},
  {name : "Ganon", vidaMonstruo : 250, lvl: 70, reward: 200}
]; 

const locations = [ //objeto, fijate como en el interior tiene keys : ...; si la key tiene espacios se pone entre comillas.
    {
        name: "town square",
        "button text": ["Ir a la tienda", "Aventurarse en la pradera", "Enfrentarse a Ganon"],
        "button functions": [goStore, goCave, vsGanon],
        text: "Estás en la ciudadela de Hyrule. Ves un cartel que dice \"Tienda\"."
      },
      {
        name: "tienda",
        "button text": ["Comprar 10 de VIDA (10 rupias)", "Comprar nueva arma (30 rupias)", "Volver a la ciudadela"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "Entraste en la tienda."
      },
      {
        name : "cueva", 
        "button text": ["Lucha vs. Bokoblin", "Lucha vs. Moblin", "Vuelve a la ciudadela"],
        "button functions" : [vsBoko, vsMoblin, goTown],
        text: "Das un rodeo a caballo, te encuentras a unos monstruos."
      },
      {
        name : "lucha",
        "button text": ["Atacar", "Esquivar", "Escapar"], 
        "button functions" : [ataque, esquive, goTown],
        text: "Estás luchando "
      },
      {
        name: "monstruo derrotado",
        "button text": ["Volver a la ciudadela", "Volver a la ciudadela", "Volver a la ciudadela"],
        "button functions": [goTown, goTown,  goTown],
        text: 'Has derrotado al monstruo! Has ganado experiencia y rupias'
      }, 
      {
        name: "Derrota", 
        "button text": ["Continuar?","Continuar?","Continuar?",],
        "button functions": [restart, restart, restart],
        text: "Has muerto &#x2620", 
      }, 
      {
        name: "Victoria", 
        "button text": ["Continuar?","Continuar?","Continuar?",],
        "button functions": [restart, restart, restart],
        text: "Has derrotado a ganon, ENHORABUENA!! &#x1F389;", 
      }
]; 

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = vsGanon;


function update(location) {
  monsterStats.style.display = "none"; //quitamos el menu de batalla
  text.innerHTML = location.text //Muestra el texto apropiado según la ubicación 
  //Actualizar el texto de los botones 
  button1.innerText = location["button text"][0]; 
  button2.innerText = location["button text"][1]; 
  button3.innerText = location["button text"][2];
  //Y su función  
  button1.onclick = location["button functions"][0]; 
  button2.onclick = location["button functions"][1]; 
  button3.onclick = location["button functions"][2]; 
}

function goTown() {
  update(locations[0])
};

function goStore() {
  update(locations[1])
};

function goCave() {
    update(locations[2])
};

function buyHealth() {
  if(rupias >= 10) {
    vida += 10; 
    rupias -= 10; 
    rupiasText.innerText = rupias; 
    textVida.innerText = vida; 
  } else {
    text.innerText = "No tienes suficientes rupias"; 
  }
};
  
function buyWeapon() {
  if (currentWeaponIndex < armas.length - 1) {  //si aun no tienes la última y mejor arma, espada maestra
    if (rupias >= 30) {
      rupias -= 30; 
      currentWeaponIndex++; 
      rupiasText.innerText = rupias; 
      let nuevaArma = armas[currentWeaponIndex].name; 
      inventory.push(nuevaArma);//introducimos la nueva arma en el inventario para luego mostrarla por el text 
      text.innerText = " Has obtenido:  " + armas[currentWeaponIndex].name + ".   ";
      text.innerText += "  Tu inventario: " + inventory;  
    } else {
      text.innerText = "Rupias insuficientes";
    }
  } else { //si ya tienes las espada maestra 
    text.innerText = "Ya tienes el arma más poderosa"; 
  }
};

function goFight () {
  update(locations[3]); 
  monsterStats.style.display = "block"; 
  monsterHealth = enemigos[currentFightingIndex].vidaMonstruo; 
  //actualizar datos en pantalla.
  monsterName.innerText = enemigos[currentFightingIndex].name;
  monsterHealth.innerText = enemigos[currentFightingIndex].vidaMonstruo;
  
}; 

function vsBoko () {
  currentFightingIndex = 0; 
  goFight(); 
}

function vsMoblin () {
  currentFightingIndex = 1; 
  goFight(); 
};

function vsGanon () {
  currentFightingIndex = 2; 
  goFight(); 
};

function ataque () {
  text.innerText = "El " + enemigos[currentFightingIndex].name + " te ataca!!"; 
  text.innerText = "Respondes usando tu  " + armas[currentWeaponIndex].name + ". "; 
  vida -= enemigos[currentFightingIndex].lvl; 
  monsterHealth -= armas[currentWeaponIndex].daño; 
  //actualizamos tras un ataque
  textVida.innerText = vida; 
  monsterHealthText.innerText = monsterHealth; 
  //comprobamos ambas barras de vida 
  if (vida <= 0) {
    perder(); 
  } else if (monsterHealth <= 0) {
    if (currentFightingIndex === 2) {
      ganar(); 
    } else {
      derrotarMonstruo(); 
    }
  }
};

function esquive () {
  text.innerText = "Has esquivado el ataque de " + enemigos[currentFightingIndex].name; 
};

function derrotarMonstruo () {
  rupias += Math.floor(enemigos[currentFightingIndex].reward); 
  xp += enemigos[currentFightingIndex].lvl; 
  //actualizar datos en pantalla 
  rupiasText.innerText = rupias; 
  textXp.innerText = xp; 
  update(locations[4]); 
}; 

function perder () {
  update(locations[5])
};

function ganar () {
  update(locations[6])
}; 

function restart () {
  xp = 0; 
  vida = 100; 
  rupias = 50;
  currentWeaponIndex = 0; 
  inventory = "palo de madera"; 

  //actualizar
  textXp.innerText = xp; 
  textVida.innerText = vida; 
  rupiasText.innerText = rupias; 

  //resetear
  goTown(); 
}
