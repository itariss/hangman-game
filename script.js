const tabuleiro = document.getElementById("tabuleiro");

const letrasErradas = document.getElementById("letras-erradas");

var palavrasLvFacil = ["azul", "alura", "oracle"];

var sorteio = Math.floor(Math.random() * palavrasLvFacil.length);

var palavraSorteada = palavrasLvFacil[sorteio];

const re = new RegExp("^[a-z/s ]+$");

console.log(palavraSorteada);

var letras = palavraSorteada.split("");
for (var i = 0; i < letras.length; i++) {
    var input = document.createElement("input");
    input.disabled = true;
    tabuleiro.appendChild(input);
    console.log(letras[i]);
}

window.addEventListener("keydown", function () {
    console.log(this.event.key);

    var tecla = this.event.key;
    var acertou = false;

    if (tecla.length > 1 || !tecla.match(re)) {
        console.log(tecla);
        return;
    }

    for (var k = 0; k < letras.length; k++) {
        if (tecla == letras[k]) {
            tabuleiro.children[k].value = letras[k].toUpperCase();
            acertou = true;
        }
    }
    if (!acertou) {
        console.log("errou");
    } else {
        console.log("acertou");
    }
});

function mostraLetrasErradas() {
    var p = document.createElement("p");
    p.innerHTML = tecla.toUpperCase();
    letrasErradas.appendChild(p);
}
