const tabuleiro = document.getElementById("tabuleiro");
const letrasErradas = document.getElementById("letras-erradas");
const re = new RegExp("^[a-z/s ]+$");

<<<<<<< HEAD
=======
const canvas = document.querySelector("#canvas");
const pencil = canvas.getContext("2d");

>>>>>>> ed7a51b (working with canvas)
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
let acertos = 0;

window.addEventListener("keydown", () => {
    console.log(this.event.key);

    let tecla = this.event.key;
    let acertou = false;

    if (tecla.length > 1 || !tecla.match(re)) {
        return;
    }

    for (let k = 0; k < letras.length; k++) {
        if (tecla == letras[k]) {
            tabuleiro.children[k].value = letras[k].toUpperCase();
            acertou = true;
        }
    }

    acertou ? acertos++ : mostraLetrasErradas(tecla);

<<<<<<< HEAD
=======
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

>>>>>>> ed7a51b (working with canvas)
    if (acertos == letras.length) {
        alert("Venceu!");
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
<<<<<<< HEAD
=======

let base = [300, 280, 120, 5];
let column = [365, 50, 5, 235];
let columExtend = [365, 50, -80, 5];
let columExtend2 = [285, 50, 5, 20];
let head = [287, 90, 20, 0, 2 * Math.PI];
let body = [285, 110, 2, 80];

function desenhaForca(piece) {
    let pieceCoordinate = piece;
    if (erros.length != 3) {
        pencil.fillRect(
            pieceCoordinate[0],
            pieceCoordinate[1],
            pieceCoordinate[2],
            pieceCoordinate[3]
        );
    } else if (erros.length == 3) {
        pencil.beginPath();
        pencil.arc(
            pieceCoordinate[0],
            pieceCoordinate[1],
            pieceCoordinate[2],
            pieceCoordinate[3],
            pieceCoordinate[4]
        );
        pencil.stroke();
    }
}
>>>>>>> ed7a51b (working with canvas)
