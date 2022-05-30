const tabuleiro = document.getElementById("tabuleiro");
const letrasErradas = document.getElementById("letras-erradas");
const re = new RegExp("^[a-zç/s]+$");

const canvas = document.querySelector("#canvas");
const pencil = canvas.getContext("2d");

const sounds = [
    new Audio("/assets/audio/beep-10.mp3"),
    new Audio("/assets/audio/coin-drop-1.mp3"),
    new Audio("/assets/audio/fail-trombone-01.mp3"),
    new Audio("/assets/audio/magic-chime-01.mp3"),
    new Audio("/assets/audio/winning.wav"),
    new Audio("/assets/audio/button-30.mp3")
];

const janelaVenceuPerdeu = document.querySelector("#venceu-perdeu");
const mensagem = document.querySelector("#mensagem");

const Keyboard = window.SimpleKeyboard.default;

const myKeyboard = new Keyboard({
    onKeyPress: button => onKeyPress(button),
    layout: {
        default: ["q w e r t y u i o p", "a s d f g h j k l ç", "z x c v b n m"]
    }
});

novasPalavras = JSON.parse(window.sessionStorage.getItem("novasPalavras"));

let palavras = [
    { nome: "azul", dica: "Cor" },
    { nome: "bege", dica: "Cor" },
    { nome: "tesoura", dica: "Objeto" },
    { nome: "foca", dica: "Animal" },
    { nome: "serpente", dica: "Animal" },
    { nome: "patinete", dica: "Transporte" }
];

if (novasPalavras != undefined) {
    palavras = palavras.concat(novasPalavras);
}

console.log(palavras);

let sorteio = Math.floor(Math.random() * palavras.length);
let palavraSorteada = palavras[sorteio].nome;
let letras = palavraSorteada.split("");

for (let i = 0; i < letras.length; i++) {
    let input = document.createElement("input");
    input.disabled = true;
    tabuleiro.appendChild(input);
    console.log(letras[i]);
}
let erros = [];
let acertos = [];

window.addEventListener("click", onKeyPress);

window.addEventListener("keydown", onKeyDown);

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

        if (erros.length == 1) {
            desenhaForca(head);
            mouth = true;
            desenhaForca(upperLip);
            desenhaForca(teethLine);
            desenhaRetas(scar);
            drawTeeth = true;
            desenhaRetas(teeth);
            headDone = true;
            desenhaForca(leftEye);
            desenhaForca(rightEye);
            desenhaForca(nose);
        }
        if (erros.length == 2) {
            desenhaForca(body);
        }
        if (erros.length == 3) {
            desenhaForca(leftLeg);
        }
        if (erros.length == 4) {
            desenhaForca(rightLeg);
        }
        if (erros.length == 5) {
            desenhaForca(leftArm);
        }
        if (erros.length == 6) {
            desenhaForca(rightArm);
        }
    }

    if (acertos.length == letras.length) {
        window.removeEventListener("click", onKeyPress, false);
        window.removeEventListener("keydown", onKeyDown, false);
        setTimeout("mostraJanela(`venceu`)", 1000);
        setTimeout("playSounds(sounds[4])", 1000);
    }
    if (erros.length == 6) {
        window.removeEventListener("click", onKeyPress, false);
        window.removeEventListener("keydown", onKeyDown, false);
        setTimeout("mostraJanela(`perdeu`)", 1000);
        setTimeout("playSounds(sounds[2])", 1000);
    }
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

function playSounds(sounds) {
    sounds.play();
}

let base = [320, 280, 120, 5];
let column = [385, 50, 5, 235];
let columExtend = [385, 50, -80, 5];
let columExtend2 = [305, 50, 5, 20];
let head = [307, 90, 20, 0, 2 * Math.PI];

let headDone = false;
let mouth = false;

let leftEye = [299, 87, 5, 0, 2 * Math.PI];
let rightEye = [315, 87, 5, 0, 2 * Math.PI];
let nose = [307, 95, 1.5, 0, 2 * Math.PI];
let scar = [323, 76, 293, 106];
let upperLip = [307, 82, 18, 0, 1 * Math.PI];
let teethLine = [307, 84, 20, 0, 1 * Math.PI];
let teeth = [292, 94, 292, 105];
let drawTeeth = false;
let body = [305, 110, 4, 60];
let leftLeg = [307, 170, 285, 225];
let rightLeg = [307, 170, 325, 225];
let leftArm = [307, 125, 285, 165];
let rightArm = [307, 125, 325, 165];

function desenhaForca(piece) {
    let pieceCoordinate = piece;
    if (erros.length == 0 || erros.length == 2) {
        pencil.closePath();
        pencil.fillRect(
            pieceCoordinate[0],
            pieceCoordinate[1],
            pieceCoordinate[2],
            pieceCoordinate[3]
        );
    } else if (erros.length == 1) {
        if (mouth) {
            pencil.lineWidth = 1;
        } else {
            pencil.lineWidth = 4;
        }

        pencil.beginPath();
        pencil.arc(
            pieceCoordinate[0],
            pieceCoordinate[1],
            pieceCoordinate[2],
            pieceCoordinate[3],
            pieceCoordinate[4]
        );
        if (headDone) {
            pencil.fill();
        } else {
            pencil.stroke();
        }
    } else if (erros.length > 2) {
        pencil.lineWidth = 3;

        pencil.beginPath();
        pencil.moveTo(pieceCoordinate[0], pieceCoordinate[1]);
        pencil.lineTo(pieceCoordinate[2], pieceCoordinate[3]);
        pencil.closePath();
        pencil.stroke();
    }
}

function desenhaRetas(piece) {
    let pieceCoordinate = piece;

    if (drawTeeth) {
        pencil.lineWidth = 0.4;
        for (let j = 0; j <= 6; j++) {
            pencil.beginPath();
            pencil.moveTo(pieceCoordinate[0], pieceCoordinate[1]);
            pencil.lineTo(pieceCoordinate[2], pieceCoordinate[3]);
            pencil.closePath();
            pencil.stroke();
            pieceCoordinate[0] = pieceCoordinate[0] + 5;
            pieceCoordinate[1] = pieceCoordinate[1] + 2;
            pieceCoordinate[2] = pieceCoordinate[0];
            pieceCoordinate[3] = pieceCoordinate[3] + 2;
            if (j >= 3) {
                pieceCoordinate[1] = pieceCoordinate[1] - 4;
                pieceCoordinate[3] = pieceCoordinate[3] - 4;
            }
        }
    } else {
        pencil.lineWidth = 1;

        pencil.beginPath();
        pencil.moveTo(pieceCoordinate[0], pieceCoordinate[1]);
        pencil.lineTo(pieceCoordinate[2], pieceCoordinate[3]);
        pencil.closePath();
        pencil.stroke();
    }
}
desenhaForca(base);
desenhaForca(column);
desenhaForca(columExtend);
desenhaForca(columExtend2);
