
const woorden = document.querySelector('.woorden')
const start = document.querySelector('#start')
const ion = document.querySelector('#ion')
const punt = document.querySelector('.punten')
let score = document.querySelector('.score')
const lichtbox = document.querySelector('.lichtbox');
// zet de score op nul punten
let newScore = 0
const naamJson ="./ionenlijst.json"

//shuffel een array

const Shuffled = arr => {
  const newArr = arr.slice()
  for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr
};


//maak een lijst met de naam van de ionen

const lijst = async () => {
  const gegevens = await fetch(naamJson);
  const data = await gegevens.json();
  let output = [];
  data.forEach(item => {
  output.push(item['naam'])
   } )

 return Shuffled(output) 
}

// maak buttons

const buttons = async ()=>{
let rij = await lijst()
console.log(rij);
    rij.forEach(el =>{
    woorden.innerHTML += `<button id='${el}' onclick='test(${el})'>${el}</button>`
    })
}

buttons()

// select een woord uit de lijst
const woord = async () => {
  const gegevens = await fetch(naamJson);
  const data = await gegevens.json();
  let newwoord = data[Math.floor(Math.random()*data.length)]
  ion.innerHTML = `<div class="woordNaam" >${newwoord['formule']}</div>`
  localStorage.setItem("naam", newwoord['naam'])
}


start.addEventListener('click', ()=>{
  lichtbox.style.display = 'none' 
  woord()

})


// //test of button click gelijk is aan gegeven woord

const test = (X)=>{
  let Y = X.innerHTML
  console.log(Y);
  lichtbox.style.display = 'flex';
  
  Y === localStorage.getItem("naam") ? (score.innerHTML = 'Goed punt erbij', newScore++):( score.innerHTML = 'Foutje puntje eraf', newScore--)
start.innerHTML = 'Volgende'
punt.innerHTML = `${newScore} punten`
}


let bezoekers = document.querySelector('.counter')

const counter = async() =>{
    const  count = await fetch("../api/hitCounter.php", {
     method: "GET"
   });
 
   const terug = await count.text();

   bezoekers.innerHTML = `U bent de <b class='num'>${terug}</b>ste bezoeker`
}

counter();

ion.innerHTML = '<h1>Klik op start</h1>'