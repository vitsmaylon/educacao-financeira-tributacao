document.addEventListener("DOMContentLoaded", () => {

    const botaoMenu = document.getElementById("botao-menu");
    const menu = document.getElementById("menu-principal");

    // =====================================================
    // MENU MOBILE
    // =====================================================

    if (botaoMenu && menu) {

        botaoMenu.addEventListener("click", () => {

            const aberto = menu.classList.toggle("ativo");

            botaoMenu.setAttribute(
                "aria-expanded",
                aberto
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

    const botaoTema =
        document.getElementById("alternar-tema");

    const temaSalvo =
        localStorage.getItem("tema");

    if (temaSalvo) {

        document.documentElement.setAttribute(
            "data-theme",
            temaSalvo
        );

    }

    function atualizarIconeTema() {

        const temaAtual =
            document.documentElement.getAttribute(
                "data-theme"
            );

        botaoTema.textContent =
            temaAtual === "dark" ? "☀" : "☾";

    }

    if (botaoTema) {

        atualizarIconeTema();

        botaoTema.addEventListener("click", () => {

            const temaAtual =
                document.documentElement.getAttribute(
                    "data-theme"
                );

            const novoTema =
                temaAtual === "dark"
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

            atualizarIconeTema();

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
