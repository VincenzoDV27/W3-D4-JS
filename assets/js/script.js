/*
  REGOLE
  - Solo const/let, mai var.
  - DOM con querySelector / querySelectorAll.
  - Eventi con addEventListener (mai onclick inline nell'HTML).
*/

/* SCRIVI QUI LE TUE FUNZIONI E I TUOI LISTENER:
   1. rendiTabellone()  — crea 90 div, evidenzia i numeri usciti
   2. estrai()          — pesca un numero casuale tra i non usciti
   3. rendiCronologia() — mostra gli ultimi 10 estratti
   4. Listener click su #estrai e #reset
   EXTRA: conteggio, animazione di estrazione, localStorage
*/

let usciti = []; // array dei numeri già estratti

const estraiNum = document.querySelector("#estrai");
const lastNum = document.querySelector("#ultimo-numero");
const chronology = document.querySelector("#cronologia");
const reset = document.querySelector("#reset");

window.onload = (e) => {
  e.preventDefault();
  rendiTabellone();
};

// crea tabellone con i 90 div/numeri
function rendiTabellone() {
  const scoreboard = document.querySelector("#tabellone");
  for (let i = 1; i <= 90; i++) {
    //creazione dei div
    const numDiv = document.createElement("div");
    numDiv.classList.add("numero");
    numDiv.innerText = i;
    scoreboard.appendChild(numDiv);
  }
}

const estrai = (e) => {
  e.preventDefault();

  // Estrae un numero da 1 a 90
  let num = Math.floor(Math.random() * 90) + 1;

  // ripesca il numero fino a quando nell'array usciti era gia presente il num estratto qui all'inizio
  do {
    num = Math.floor(Math.random() * 90) + 1;
  } while (usciti.includes(num));

  //aggiungi il num inizialmente estratto  all'array e stampalo nel dom
  usciti.push(num);
  lastNum.innerText = num;

  //stampa nella cronologia gli ultimi 10 numeri estratti
  chronology.classList.add(".numero");
  chronology.textContent = usciti;

  // cerca i div creato nel js con class numero
  const numeri = document.querySelectorAll("#tabellone .numero");

  numeri.forEach((div) => {
    // aggiungo la class numero-uscito
    if (Number(div.textContent) === num) {
      div.classList.add("numero-uscito");
    }
  });

  // se l'array ha gia tutti e 90 i numeri compare l'alert
  if (usciti.length === 90) {
    alert("Hai estratto tutti i numeri!");
  }
};

const ricomincia = (e) => {
  e.preventDefault();
  // cerca i div creato nel js con class numero-uscito
  const numeri = document.querySelectorAll(".numero-uscito");
  numeri.forEach((div) => {
    // rimuovo la class numero-uscito
    div.classList.remove("numero-uscito");
  });
  //resetta l'array, toglie l'ultimo numero e la cronologia stampata nel dom
  usciti = [];
  lastNum.innerText = "";
  chronology.innerText = "Nessun numero estratto.";
};

//exec degli eventi dai button estrai numero e ricomincia
estraiNum.addEventListener("click", estrai);
reset.addEventListener("click", ricomincia);
