const tabuleiro = document.getElementById("tabuleiro");
const letrasErradas = document.getElementById("letras-erradas");
const re = new RegExp("^[a-z/s]+$");

const canvas = document.querySelector("#canvas");
const pencil = canvas.getContext("2d");

let palavrasLvFacil = ["azul", "alura", "oracle"];

let sorteio = Math.floor(Math.random() * palavrasLvFacil.length);
let palavraSorteada = palavrasLvFacil[sorteio];
let letras = palavraSorteada.split("");

for (let i = 0; i < letras.length; i++) {
    let input = document.createElement("input");
    input.disabled = true;
    tabuleiro.appendChild(input);
    console.log(letras[i]);
}

let erros = [];
let acertos = [];

window.addEventListener("keydown", () => {
    let tecla = this.event.key;
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
            acertou = true;
        }
    }

    acertou ? acertos.push(tecla) : mostraLetrasErradas(tecla);
    console.log(acertos);

    if (!acertou) {
        if (erros.length == 1) {
            console.log("errou");
            desenhaForca(base);
        }
        if (erros.length == 2) {
            desenhaForca(column);
            desenhaForca(columExtend);
            desenhaForca(columExtend2);
        }

        if (erros.length == 3) {
            desenhaForca(head);
        }
        if (erros.length == 4) {
            desenhaForca(body);
        }
        if (erros.length == 5) {
            desenhaForca(leftLeg);
        }
        if (erros.length == 6) {
            desenhaForca(rightLeg);
        }
        if (erros.length == 7) {
            desenhaForca(leftArm);
        }
        if (erros.length == 8) {
            desenhaForca(rightArm);
        }
    }

    if (acertos.length == letras.length) {
        alert("Venceu!");
    }
    if (erros.length == 8) {
        alert("Perdeu!");
    }
});

function mostraLetrasErradas(tecla) {
    if (erros.includes(tecla)) {
        return;
    } else {
        erros.push(tecla);
        let p = document.createElement("p");
        p.innerHTML = tecla.toUpperCase();
        letrasErradas.appendChild(p);
    }
}

function mostraTecla(tecla) {}

let base = [320, 280, 120, 5];
let column = [385, 50, 5, 235];
let columExtend = [385, 50, -80, 5];
let columExtend2 = [305, 50, 5, 20];
let head = [307, 90, 20, 0, 2 * Math.PI];
let body = [305, 110, 4, 60];
let leftLeg = [307, 170, 275, 235];
let rightLeg = [307, 170, 335, 235];
let leftArm = [307, 130, 275, 155];
let rightArm = [307, 130, 335, 155];

function desenhaForca(piece) {
    let pieceCoordinate = piece;
    if (erros.length != 3 && erros.length <= 4) {
        pencil.closePath();
        pencil.fillRect(
            pieceCoordinate[0],
            pieceCoordinate[1],
            pieceCoordinate[2],
            pieceCoordinate[3]
        );
    } else if (erros.length == 3) {
        pencil.lineWidth = 4;
        pencil.beginPath();
        pencil.arc(
            pieceCoordinate[0],
            pieceCoordinate[1],
            pieceCoordinate[2],
            pieceCoordinate[3],
            pieceCoordinate[4]
        );
        pencil.stroke();
    } else if (erros.length > 4) {
        pencil.lineWidth = 3;

        pencil.beginPath();
        pencil.moveTo(pieceCoordinate[0], pieceCoordinate[1]);
        pencil.lineTo(pieceCoordinate[2], pieceCoordinate[3]);
        pencil.closePath();
        pencil.stroke();
    }
}
