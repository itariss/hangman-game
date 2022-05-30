const send = document.querySelector("#add");
const addField = document.getElementById("campo-adiciona");
const newGame = document.querySelector("#new-game");
let novasPalavras = [];

newGame.onclick = event => {
    window.sessionStorage.setItem(
        "novasPalavras",
        JSON.stringify(novasPalavras)
    );
};

send.onclick = event => {
    if (!addField.validity.patternMismatch && addField.value != "") {
        let novaPalavra = {};
        event.preventDefault();
        novaPalavra.nome = addField.value;
        novasPalavras.push(novaPalavra);
        console.log(novasPalavras);
        addField.value = "";
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
