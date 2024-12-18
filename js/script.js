/*Uppgift U1b */

// Globala konstanter och variabler
const wordList = ["BLOMMA", "LASTBIL", "SOPTUNNA", "KÖKSBORD", "RADIOAPPARAT", "VINTER", "SOMMAR", "DATORMUS", "LEJON", "ELEFANT", "JULTOMTE", "SKOGSHYDDA", "BILNUMMER", "BLYERTSPENNA", "SUDDGUMMI", "KLÄDSKÅP", "VEDSPIS", "LJUSSTAKE", "SKRIVBORD", "ELDGAFFEL", "STEKPANNA", "KASTRULL", "KAFFEBRYGGARE", "TALLRIK", "SOFFBORD", "TRASMATTA", "FLYGPLAN", "FLYGPLATS", "TANGENTBORD", "DATORSPEL", "WEBBPLATS", "TELEFON", "STJÄRNA", "KANELBULLE", "SEMLA", "ÄPPELPAJ", "BLÅBÄR", "LINGONSYLT", "TRAKTOR", "CYKELKEDJA", "BOKHYLLA", "BOKSTAV", "GRILLPLATS", "SOLSTOL", "BADPLATS", "SNÖGUBBE", "PARAPLY"];
let randomWord, boxElems, startBtn, letterButtons, hangmanImg, hangmanNr, msgElem, startTime;
// --------------------------------------------------
// Initiering då webbsidan laddats in
function init() {
    startBtn = document.querySelector("#startBtn");
    letterButtons = document.querySelectorAll("#letterButtons button");
    hangmanImg = document.querySelector("#hangman");
    msgElem = document.querySelector("#message");

    // Lägg till händelselyssnare
    startBtn.addEventListener("click", startGame);
    letterButtons.forEach(button => {
        button.addEventListener("click", guessLetter);
        button.disabled = true; // Inaktivera bokstavsknappar initialt
    });
}

// Initiera ett nytt spel
function startGame() {
    hangmanImg.src = "img/h0.png"; // Visa första bilden 
    hangmanNr = 0; // Nollställ antalet fel
    startBtn.disabled = true; // Inaktivera startknappen
    enableLetterButtons(); // Aktivera bokstavsknappar
    selectRandomWord(); // Välj ett slumpmässigt ord
    msgElem.textContent = ""; // Rensa meddelanderutan
    startTime = new Date().getTime(); // Spara starttid
}

// Välj ett slumpmässigt ord
function selectRandomWord() {
    randomWord = wordList[Math.floor(Math.random() * wordList.length)]; // Slumpa fram ett ord från listan
    const letterBoxes = document.querySelector("#letterBoxes");
    letterBoxes.innerHTML = ""; // Rensa tidigare rutor
    randomWord.split("").forEach(() => {
        const span = document.createElement("span"); // Skapa en ruta för varje bokstav
        letterBoxes.appendChild(span);
    });
    boxElems = document.querySelectorAll("#letterBoxes span"); // Spara referenser till rutorna
    console.log(boxElems); // För debugging
}

// Gissa en bokstav
function guessLetter() {
    this.disabled = true; // Inaktivera knappen efter klick
    const letter = this.value; // Hämta bokstaven från knappen
    let found = false; // Håll reda på om bokstaven finns i ordet

    randomWord.split("").forEach((char, index) => {
        if (char === letter) {
            boxElems[index].textContent = letter; // Visa bokstaven i rätt ruta
            found = true;
        }
    });

    if (!found) {
        hangmanNr++; // Öka antalet fel
        hangmanImg.src = `img/h${hangmanNr}.png`; // Uppdatera bilden
    }

    checkGameStatus(); // Kontrollera om spelet är slut
}

// Kontrollera spelets status
function checkGameStatus() {
    // Kontrollera om spelaren förlorat
    if (hangmanNr === 6) {
        endGame(true); // Spelet slut, gubben hängdes
    } else if ([...boxElems].every(span => span.textContent !== "")) {
        endGame(false); // Spelet slut, spelaren vann
    }
}

// Avsluta spelet
function endGame(manHanged) {
    const endTime = new Date().getTime(); // Spara sluttid
    const duration = ((endTime - startTime) / 1000).toFixed(1); // Beräkna speltid i sekunder
    if (manHanged) {
        msgElem.textContent = `Tyvärr, gubben hängdes. Rätt svar är ${randomWord}. Det tog ${duration} sekunder.`;
    } else {
        msgElem.textContent = `Grattis! Du klarade det. Det tog ${duration} sekunder.`;
    }
    startBtn.disabled = false; // Aktivera startknappen
    disableLetterButtons(); // Inaktivera bokstavsknappar
}

// Aktivera bokstavsknappar
function enableLetterButtons() {
    letterButtons.forEach(button => button.disabled = false);
}

// Inaktivera bokstavsknappar
function disableLetterButtons() {
    letterButtons.forEach(button => button.disabled = true);
}

// Kör initiering när sidan laddas
window.addEventListener("load", init);
