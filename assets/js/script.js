const tabuleiro = document.getElementById("tabuleiro");
const letrasErradas = document.getElementById("letras-erradas");
const janelaVenceuPerdeu = document.querySelector("#venceu-perdeu");
const mensagem = document.querySelector("#mensagem");
const msgFinal = document.querySelector("#msg");
const canvas = document.querySelector("#canvas");
const pencil = canvas.getContext("2d");
const mostraDica = document.querySelector("#dica");
const mostraTecladoVirtural = document.querySelector("#teclado");
const tecladoVirtual = document.querySelector("#teclado-virtual");

const re = new RegExp("^[a-z/s]+$");

const sounds = [
    new Audio("../audio/button-30.mp3"),
    new Audio("../audio/coin-drop-1.mp3"),
    new Audio("../audio/fail-trombone-01.mp3"),
    new Audio("../audio/magic-chime-01.mp3"),
    new Audio("../audio/winning.wav")
];

const Keyboard = window.SimpleKeyboard.default;

const myKeyboard = new Keyboard({
    onKeyPress: button => onKeyPress(button),
    layout: {
        default: ["q w e r t y u i o p", "a s d f g h j k l", "z x c v b n m"]
    }
});

novasPalavras = JSON.parse(window.sessionStorage.getItem("novasPalavras"));
gameDificult = JSON.parse(window.sessionStorage.getItem("dificult"));

let palavras = [
    { nome: "azul", dica: "Cor" },
    { nome: "bege", dica: "Cor" },
    { nome: "tesoura", dica: "Objeto" },
    { nome: "serpente", dica: "Animal" },
    { nome: "navio", dica: "Transporte" },
    { nome: "laranja", dica: "Fruta" },
    { nome: "banana", dica: "Fruta" },
    { nome: "jacare", dica: "Animal" },
    { nome: "coruja", dica: "Animal" },
    { nome: "skate", dica: "Transporte" },
    { nome: "calopsita", dica: "Animal" },
    { nome: "arroz", dica: "Comida" },
    { nome: "luneta", dica: "Objeto" }
];
let dificult = 1;

if (novasPalavras != undefined) {
    palavras = palavras.concat(novasPalavras);
    console.log(palavras);
}

if (gameDificult != undefined) {
    dificult = gameDificult;
}

if (dificult == 2) {
    mostraDica.style.visibility = "hidden";
}

let sorteio = Math.floor(Math.random() * palavras.length);
let palavraSorteada = palavras[sorteio].nome;
let letras = palavraSorteada.split("");
let attemptsLeft = 6;

//Cria espaços para a palava secreta
for (let i = 0; i < letras.length; i++) {
    let input = document.createElement("input");
    input.disabled = true;
    tabuleiro.appendChild(input);
    tabuleiro.addEventListener("animationend", drawGallows, false);
}

function canListenKeyboard() {
    tecladoVirtual.addEventListener("click", onKeyPress, true);
    window.addEventListener("keydown", onKeyDown, true);
}

function drawGallows() {
    if (dificult == 0) {
        drawLineX(newBase);
        attemptsLeft = 9;
    }
    if (dificult == 1) {
        drawLineX(newBase, drawLineY, newColumn);
        drawLineY(newColumnExtend2, "none", drawLineX, newColumnExtend);
    }
    if (dificult == 2) {
        drawLineX(newBase, drawLineY, newColumn);
        drawLineY(newColumnExtend2, "none", drawLineX, newColumnExtend);
        setTimeout(drawHead, 1700);
        attemptsLeft = 5;
    }
    setTimeout(canListenKeyboard, 2000);
    tabuleiro.removeEventListener("animationend", drawGallows, false);
}

let erros = [];
let acertos = [];
let noDisplayKeyboard = true;

dica.addEventListener("click", () => {
    criaDica = document.createElement("p");
    criaDica.innerHTML = `Dica: ${palavras[sorteio].dica}`;
    mostraDica.innerHTML = ``;

    mostraDica.appendChild(criaDica);
});

teclado.addEventListener("click", () => {
    toogleDisplayKeyboard();
});

function toogleDisplayKeyboard() {
    if (noDisplayKeyboard) {
        tecladoVirtual.classList.remove("animate__slideOutDown");
        tecladoVirtual.classList.add("animate__slideInUp");
        tecladoVirtual.style.display = "inline-block";
        tecladoVirtual.addEventListener("animationend", () => {
            tecladoVirtual.style.display = "inline-block";
        });
        noDisplayKeyboard = false;
        return noDisplayKeyboard;
    } else if (!noDisplayKeyboard) {
        tecladoVirtual.classList.remove("animate__slideInUp");
        tecladoVirtual.classList.add("animate__slideOutDown");
        tecladoVirtual.addEventListener("animationend", () => {
            tecladoVirtual.style.display = "none";
        });
        noDisplayKeyboard = true;
        return noDisplayKeyboard;
    }
}

function mainFunction(tecla) {
    let acertou = false;

    if (
        tecla.length > 1 ||
        !tecla.match(re) ||
        acertos.includes(tecla) ||
        erros.includes(tecla)
    ) {
        return;
    }

    for (let k = 0; k < letras.length; k++) {
        if (tecla == letras[k]) {
            tabuleiro.children[k].value = letras[k].toUpperCase();
            tabuleiro.children[k].classList.add("animate__flipInY");
            acertou = true;
            acertos.push(tecla);
            sounds[3].load();
            playSounds(sounds[3]);
        }
    }

    if (!acertou) {
        mostraLetrasErradas(tecla);
        attemptsLeft--;
        switch (attemptsLeft) {
            case 8:
                drawLineY(newColumn);
                break;
            case 7:
                drawLineX(newColumnExtend);
                break;
            case 6:
                drawLineY(newColumnExtend2);
                break;
            case 5:
                drawHead();
                break;
            case 4:
                drawLineY(newBody, "body");
                break;
            case 3:
                drawLeftDiagonals(leftLeg, "legs");
                break;
            case 2:
                drawRightDiagonals(rightLeg, "legs");
                break;
            case 1:
                drawLeftDiagonals(leftArm);
                break;
            case 0:
                drawRightDiagonals(rightArm);
            default:
                break;
        }
    }
    verifyEnd();
}

function verifyEnd() {
    if (acertos.length == letras.length) {
        removeListenerAndKeyboard();
        setTimeout("mostraJanela(`venceu`)", 1200);
        setTimeout("playSounds(sounds[4])", 1200);
    }
    if (attemptsLeft == 0) {
        mostraPalavra();
        removeListenerAndKeyboard();
        setTimeout("mostraJanela(`perdeu`)", 1200);
        setTimeout("playSounds(sounds[2])", 1200);
    }
}

function removeListenerAndKeyboard() {
    setTimeout(() => {
        tecladoVirtual.style.display = "none";
    }, 900);
    window.removeEventListener("keydown", onKeyDown, true);
}

function onKeyDown() {
    tecla = event.key;
    mainFunction(tecla);
}

function onKeyPress(button) {
    tecla = button;
    mainFunction(tecla);
}

function mostraLetrasErradas(tecla) {
    if (erros.includes(tecla)) {
        return;
    } else {
        sounds[0].load();
        sounds[1].load();
        playSounds(sounds[0]);
        setTimeout("playSounds(sounds[1])", 400);
        erros.push(tecla);
        let p = document.createElement("p");
        p.innerHTML = tecla.toUpperCase();
        letrasErradas.appendChild(p);
    }
}

function mostraJanela(final) {
    janelaVenceuPerdeu.style.display = "flex";
    janelaVenceuPerdeu.classList.add(`${final}`);
    mensagem.innerHTML = `Você ${final}!`;
}

function mostraPalavra() {
    palavraCorreta = document.createElement("p");
    palavraCorreta.innerHTML = `A palavra era: ${palavraSorteada.toUpperCase()}`;
    palavraCorreta.classList.add("palavra-revelada");
    msgFinal.append(palavraCorreta);
}

function playSounds(sounds) {
    sounds.play();
}
