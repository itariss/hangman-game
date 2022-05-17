const tabuleiro = document.getElementById("tabuleiro");
const letrasErradas = document.getElementById("letras-erradas");
const re = new RegExp("^[a-z/s ]+$");

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
