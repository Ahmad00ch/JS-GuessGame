

let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By Ahmad Chaar`



let triesNum = 6;
let lettersNum = 6;
let currentTry = 1;



let wordToGuess = "";
const words = ["create", "update", "delete", "master", "branch", "mainly", "b7ebek"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();


let messageArea = document.querySelector(".message");


function generateInput() {
    const inputs = document.querySelector(".inputs");

    for (let i = 1; i<=triesNum; i++){
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;

        if(i !== 1) tryDiv.classList.add("disabled-inputs");

        for(let j =1; j<=lettersNum; j++){
            const tryLetters = document.createElement("input");
            tryLetters.type = "text";
            tryLetters.id = `guess-${i}-letter-${j}`;
            tryLetters.setAttribute("maxlength", "1");
            tryDiv.appendChild(tryLetters);
        }
        inputs.appendChild(tryDiv);
    }

    inputs.children[0].children[1].focus();

    //css disable mch kefye la 7ala la y2fol l try l disabled so.. hay 7ata ma y2dr l gamer b ay tari2a yltob b disabled boxes
    const disabledDiv = document.querySelectorAll('.disabled-inputs input');
    disabledDiv.forEach((input) => (input.disabled = true));
    
    const inputI = document.querySelectorAll("input");
    inputI.forEach((input, index) =>{
            input.addEventListener("input", function() {
                this.value = this.value.toUpperCase();
                
                //bs yktob 7arf btn2ol 3ali ba3do la7ala
                const nextInput = inputI[index + 1];
                if(nextInput) nextInput.focus();
            });

            //3m zid 5asiye la saham yamin w chmel bs ma aktar..bdk trakez b esas l dom l2n ktir t2aaal
            input.addEventListener("keydown", function(e){
                const currentIndex = Array.from(inputI).indexOf(e.target);
                if (e.key === "ArrowRight"){
                    const nextInput = currentIndex + 1;
                    if(nextInput < inputI.length) inputI[nextInput].focus();
                }
                if(e.key === "ArrowLeft"){
                    const prevInput = currentIndex - 1;
                    if(prevInput >= 0) inputI[prevInput].focus();
                }

            });
    });
}

const checkButton = document.querySelector(".check");
checkButton.addEventListener("click" ,handleGuesse);

// fction li hiye fik t2ul l game kella 3an tari2a mn3ref lklme sa7 aw la2 w mn3ml some events also metel lon w hek...

function handleGuesse(){
        let successGuess = true;
        for(let i=1 ; i<= lettersNum; i++){
            const actualLetter = wordToGuess[i - 1];
            const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`)
            const letter = inputField.value.toLowerCase();

            if(letter === actualLetter) {
                inputField.classList.add("right");
            }else if(wordToGuess.includes(letter) && letter != ""){
                inputField.classList.add("notPlace");
                successGuess = false;
            }else{
                inputField.classList.add("wrong");
                successGuess = false;
            }
        }

    if(successGuess){
        messageArea.innerHTML = `You Win The Word IS <span>${wordToGuess}</span>`

        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
        checkButton.disabled = true;
    }else{
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        let lettersInTry = document.querySelectorAll(`.try-${currentTry} input`);
        lettersInTry.forEach((letter) => letter.disabled = true);
        currentTry++;
        let nextLettersInTry = document.querySelectorAll(`.try-${currentTry} input`);
        nextLettersInTry.forEach((letter) => letter.disabled = false);
        
        let nexElement = document.querySelector(`.try-${currentTry}`);
        if(nexElement){
            nexElement.children[1].focus();
            document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
        }else{
            messageArea.innerHTML = `You Loose The Word IS <span>${wordToGuess}</span>`
            checkButton.disabled = true;
        }
    }
}

window.onload = function () {
    generateInput();
};