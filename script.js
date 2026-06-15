const form = document.getElementById("formEntrada");
const lista = document.getElementById("listaEntradas");

const tituloInput = document.getElementById("titulo");
const descricaoInput = document.getElementById("descricao");
const dataInput = document.getElementById("data");

const installBtn = document.getElementById("installBtn");

let entradas =
    JSON.parse(localStorage.getItem("entradas")) || [];

/* Salva os dados no LocalStorage */
function salvarLocalStorage() {
    localStorage.setItem(
        "entradas",
        JSON.stringify(entradas)
    );
}

/* Renderiza a lista de entradas */
function renderizarEntradas() {

    let html = "";

    entradas.forEach((entrada, index) => {

        html += `
            <li>
                <h3>${entrada.titulo}</h3>
                <p>${entrada.descricao}</p>
                <small>${entrada.data}</small>
                <br>
                <button
                    class="remover"
                    onclick="removerEntrada(${index})">
                    Remover
                </button>
            </li>
        `;
    });

    lista.innerHTML = html;
}

/* Adiciona nova entrada */
form.addEventListener("submit", (e) => {

    e.preventDefault();

    const titulo = tituloInput.value;
    const descricao = descricaoInput.value;
    const data = dataInput.value;

    entradas.push({
        titulo,
        descricao,
        data
    });

    salvarLocalStorage();
    renderizarEntradas();

    form.reset();
});

/* Remove entrada */
function removerEntrada(index) {

    entradas.splice(index, 1);

    salvarLocalStorage();

    renderizarEntradas();
}

/* Renderização inicial */
renderizarEntradas();

/* Registro do Service Worker */
if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./service-worker.js")
            .catch((erro) => {

                console.error(
                    "Erro ao registrar Service Worker:",
                    erro
                );

            });

    });

}

/* Instalação do PWA */
let deferredPrompt;

window.addEventListener(
    "beforeinstallprompt",
    (e) => {

        e.preventDefault();

        deferredPrompt = e;

        installBtn.hidden = false;

    }
);

installBtn.addEventListener(
    "click",
    async () => {

        if (!deferredPrompt) return;

        installBtn.hidden = true;

        deferredPrompt.prompt();

        await deferredPrompt.userChoice;

        deferredPrompt = null;

    }
);