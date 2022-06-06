const toGame = document.querySelector("#to-game");

let selectDificult = document.querySelector("#dificult");

let dificult = 1;

selectDificult.addEventListener("click", () => {
    dificult = selectDificult.selectedIndex;
    console.log(dificult);
    return dificult;
});

toGame.onclick = event => {
    window.sessionStorage.setItem("dificult", JSON.stringify(dificult));
};
