const form = document.getElementById("formEntrada");
const lista = document.getElementById("listaEntradas");

let entradas =
    JSON.parse(localStorage.getItem("entradas")) || [];

function salvarLocalStorage() {
    localStorage.setItem(
        "entradas",
        JSON.stringify(entradas)
    );
}

function renderizarEntradas() {

    lista.innerHTML = "";

    entradas.forEach((entrada, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <h3>${entrada.titulo}</h3>
            <p>${entrada.descricao}</p>
            <small>${entrada.data}</small>
            <br>
            <button class="remover"
                onclick="removerEntrada(${index})">
                Remover
            </button>
        `;

        lista.appendChild(li);
    });
}

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const titulo =
        document.getElementById("titulo").value;

    const descricao =
        document.getElementById("descricao").value;

    const data =
        document.getElementById("data").value;

    entradas.push({
        titulo,
        descricao,
        data
    });

    salvarLocalStorage();
    renderizarEntradas();

    form.reset();
});

function removerEntrada(index){

    entradas.splice(index,1);

    salvarLocalStorage();

    renderizarEntradas();
}

renderizarEntradas();

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register(
            "./service-worker.js"
        );

    });

}

let deferredPrompt;

const installBtn =
    document.getElementById("installBtn");

window.addEventListener(
    "beforeinstallprompt",
    (e) => {

        e.preventDefault();

        deferredPrompt = e;

        installBtn.hidden = false;

    }
);

installBtn.addEventListener("click", async () => {

    installBtn.hidden = true;

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt = null;

});