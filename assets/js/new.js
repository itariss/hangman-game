const send = document.querySelector("#add");
const addTip = document.querySelector("#add-tip");
const addWord = document.querySelector("#add-word");
const addField = document.getElementById("campo-adiciona");
const newGame = document.querySelector("#new-game");

let setTip = false;

let novasPalavras = [];

newGame.onclick = event => {
    window.sessionStorage.setItem(
        "novasPalavras",
        JSON.stringify(novasPalavras)
    );
};
let novaPalavra;

send.onclick = event => {
    if (!addField.validity.patternMismatch && addField.value != "") {
        let qntsPalavras = 1;
        if (!setTip) {
            novaPalavra = {};
            addWord.style.display = "none";
            addWord.classList.remove("animate__lightSpeedInRight");
            event.preventDefault();
            novaPalavra.nome = addField.value;
            addTip.classList.add("animate__lightSpeedInRight");
            addTip.style.display = "flex";
            addField.value = "";
            setTip = true;
            return novaPalavra;
        } else if (setTip) {
            addTip.classList.remove("animate__lightSpeedInRight");
            addTip.style.display = "none";
            event.preventDefault();
            novaPalavra.dica = addField.value;
            novasPalavras.push(novaPalavra);
            addWord.classList.add("animate__lightSpeedInRight");
            addWord.style.display = "flex";
            addField.value = "";
            setTip = false;
            qntsPalavras += 1;
        }
    }
};

addField.oninvalid = event => {
    event.target.setCustomValidity(
        `Digite uma palavra de 3 a 8 letras. 
            Não utilize acentos.`
    );
};

addField.oninput = event => {
    event.target.setCustomValidity(" ");
};
