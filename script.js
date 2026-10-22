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


        // Fecha o menu ao clicar em um link
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
    // FECHA O MENU AO REDIMENSIONAR A TELA
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
