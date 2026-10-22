document.addEventListener("DOMContentLoaded", () => {

    const botaoTema =
        document.getElementById("alternar-tema");

    const temaSalvo =
        localStorage.getItem("tema");

    if (
        temaSalvo === "dark" ||
        temaSalvo === "light"
    ) {
        document.documentElement.setAttribute(
            "data-theme",
            temaSalvo
        );
    }

    function temaAtual() {

        return document.documentElement
            .getAttribute("data-theme") === "dark"
            ? "dark"
            : "light";

    }

    function atualizarBotaoTema() {

        if (!botaoTema) return;

        const escuro =
            temaAtual() === "dark";

        botaoTema.textContent =
            escuro ? "☀" : "☾";

        botaoTema.setAttribute(
            "aria-label",
            escuro
                ? "Ativar tema claro"
                : "Ativar tema escuro"
        );

        botaoTema.setAttribute(
            "title",
            escuro
                ? "Ativar tema claro"
                : "Ativar tema escuro"
        );

    }

    if (botaoTema) {

        atualizarBotaoTema();

        botaoTema.addEventListener(
            "click",
            () => {

                const novoTema =
                    temaAtual() === "dark"
                        ? "light"
                        : "dark";

                document.documentElement
                    .setAttribute(
                        "data-theme",
                        novoTema
                    );

                localStorage.setItem(
                    "tema",
                    novoTema
                );

                atualizarBotaoTema();

            }
        );

    }

});
