
const woorden = document.querySelector('.woorden')
const start = document.querySelector('#start')
const ion = document.querySelector('#ion')
const punt = document.querySelector('.punten')
let score = document.querySelector('.score')
const lichtbox = document.querySelector('.lichtbox');
// zet de score op nul punten
let newScore = 0
const ionen =["nitraat","sulfaat","fosfaat","hydroxide","jodide","bromide","chloride","sulfide","oxide","zilver","aluminium","barium","calcium","koper","ijzer_2","ijzer_3","kwik","kalium","magnesium","natrium","ammonium","lood","tin","zink"]
// maak de buttons op de pagina
let bezoekers = document.querySelector('.counter')

const getShuffledArr = arr => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
};

let ionenrij = getShuffledArr(ionen) 
ionenrij.forEach(el =>{
 woorden.innerHTML += `<button id='${el}' onclick='test(${el})'>${el}</button>`
})


const counter = async() =>{
    const  count = await fetch("../api/hitCounter.php", {
     method: "GET"
   });
 
   const terug = await count.text();

   bezoekers.innerHTML = `U bent de <b class='num'>${terug}</b>ste bezoeker`
}

counter();

ion.innerHTML = '<h1>Klik op start</h1>'

start.addEventListener('click', ()=>{
    let newwoord = ionen[Math.floor(Math.random()*ionen.length)];
    localStorage.setItem("ionnaam" ,newwoord );
    // console.log(newwoord);
 
    lichtbox.style.display = 'none';
    const ionnaam = localStorage.getItem("ionnaam")
    ion.innerHTML = `<img src="./images/${ionnaam}.png" alt="${ionnaam}">`
    score.innerHTML = ''
})



//test of button click gelijk is aan gegeven woord

const test = (X)=>{
    let Y = X.innerHTML
    console.log(Y);
    lichtbox.style.display = 'flex';
        
    if(Y === localStorage.getItem("ionnaam")){
      newScore++
      score.innerHTML = 'Goed punt erbij'
    }else{
        score.innerHTML = 'Foutje puntje eraf'
        newScore--
    }
  start.innerHTML = 'Volgende'
  punt.innerHTML = `${newScore} punten`
}

