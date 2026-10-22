document.addEventListener("DOMContentLoaded", () => {

    const botaoMenu = document.getElementById("botao-menu");
    const menu = document.getElementById("menu-principal");
    const botaoTema = document.getElementById("alternar-tema");

    // =====================================================
    // MENU MOBILE
    // =====================================================

    if (botaoMenu && menu) {

        botaoMenu.addEventListener("click", () => {

            const aberto = menu.classList.toggle("ativo");

            botaoMenu.setAttribute(
                "aria-expanded",
                String(aberto)
            );

            botaoMenu.textContent =
                aberto ? "✕" : "☰";

        });

        menu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menu.classList.remove("ativo");

                botaoMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

                botaoMenu.textContent = "☰";

            });

        });

    }

    // =====================================================
    // TEMA CLARO / ESCURO
    // =====================================================

    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "dark" || temaSalvo === "light") {

        document.documentElement.setAttribute(
            "data-theme",
            temaSalvo
        );

    }

    function temaAtual() {

        return document.documentElement.getAttribute("data-theme")
            === "dark"
            ? "dark"
            : "light";

    }

    function atualizarBotaoTema() {

        if (!botaoTema) {
            return;
        }

        const escuro = temaAtual() === "dark";

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

        botaoTema.addEventListener("click", () => {

            const novoTema =
                temaAtual() === "dark"
                    ? "light"
                    : "dark";

            document.documentElement.setAttribute(
                "data-theme",
                novoTema
            );

            localStorage.setItem(
                "tema",
                novoTema
            );

            atualizarBotaoTema();

        });

    }

    // =====================================================
    // REDIMENSIONAMENTO
    // =====================================================

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 820 &&
            menu
        ) {

            menu.classList.remove("ativo");

            if (botaoMenu) {

                botaoMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

                botaoMenu.textContent = "☰";

            }

        }

    });

});
