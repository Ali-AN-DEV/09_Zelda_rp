let xp = 0;
let vida= 100;
let rupias = 50;
let currentWeaponIndex = 0;
let fighting;
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
  { name : "palo de madera", daño : 1 },
  { name : "espada del viajero", daño : 4 },
  { name : "espada del caballero", daño : 10 },
  { name : "espada maestra", daño : 50 }
];

const locations = [ //objeto, fijate como en el interior tiene keys : ...; si la key tiene espacios se pone entre comillas.
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
      },
      {
        name: "tienda",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
      },
      {
        name : "cueva", 
        "button text": ["Lucha vs. Bokoblin", "Lucha vs. Moblin", "Vuelve a la ciudadela"],
        "button functions" : [vsBoko, vsMoblin, goTown],
        text: "Das un rodea a caballo, te encuentras a unos monstruos."
      }

]; 

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


function update(location) {
  text.innerText = location.text //Muestra el texto apropiado según la ubicación 
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
  
function fightDragon() {
    console.log("Fighting dragon.");
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
      text.innerText += " En tu inventario tienes: " + inventory; 
    } else {
      text.innerText = "Rupias insuficientes";
    }
  } else { //si ya tienes las espada maestra 
    text.innerText = "Ya tienes el arma más poderosa"; 
    //TODO poder vender armas ??  
  }
};

function vsBoko () {

}

function vsMoblin () {

};
