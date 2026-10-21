function calcularIPVA() {

    const valorVeiculo =
        Number(document.getElementById("valorVeiculo").value);

    const aliquota =
        Number(document.getElementById("aliquotaIpva").value);

    const ipva = valorVeiculo * (aliquota / 100);

    const resultado =
        document.getElementById("resultadoIpva");


    if (valorVeiculo < 0 || aliquota < 0) {

        resultado.textContent =
            "Informe valores válidos.";

        return;
    }


    resultado.innerHTML =
        `Valor estimado do IPVA: <strong>R$ ${ipva.toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )}</strong>`;
}

function calcularIPTU() {

    const valorImovel =
        Number(document.getElementById("valorImovelIptu").value);

    const aliquota =
        Number(document.getElementById("aliquotaIptu").value);

    const resultado =
        document.getElementById("resultadoIptu");


    if (valorImovel < 0 || aliquota < 0) {

        resultado.textContent =
            "Informe valores válidos.";

        return;
    }


    const iptu =
        valorImovel * (aliquota / 100);


    resultado.innerHTML =
        `Valor estimado do IPTU: <strong>R$ ${iptu.toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )}</strong>`;
}



function calcularITBI() {

    const valorImovel =
        Number(document.getElementById("valorImovelItbi").value);

    const aliquota =
        Number(document.getElementById("aliquotaItbi").value);

    const resultado =
        document.getElementById("resultadoItbi");


    if (valorImovel < 0 || aliquota < 0) {

        resultado.textContent =
            "Informe valores válidos.";

        return;
    }


    const itbi =
        valorImovel * (aliquota / 100);


    resultado.innerHTML =
        `Valor estimado do ITBI: <strong>R$ ${itbi.toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )}</strong>`;
}

function calcularIR() {

    const renda =
        Number(document.getElementById("rendaMensal").value);

    const deducoesLegais =
        Number(document.getElementById("deducoesIr").value);

    const resultado =
        document.getElementById("resultadoIr");


    if (renda < 0 || deducoesLegais < 0) {

        resultado.textContent =
            "Informe valores válidos.";

        return;
    }


    // Desconto simplificado mensal vigente em 2026
    const descontoSimplificado = 607.20;

    // Utilizamos o desconto mais vantajoso
    const deducaoUtilizada =
        Math.max(deducoesLegais, descontoSimplificado);

    const baseCalculo =
        Math.max(0, renda - deducaoUtilizada);


    let aliquota = 0;
    let parcelaDeduzir = 0;


    if (baseCalculo <= 2428.80) {

        aliquota = 0;
        parcelaDeduzir = 0;

    } else if (baseCalculo <= 2826.65) {

        aliquota = 0.075;
        parcelaDeduzir = 182.16;

    } else if (baseCalculo <= 3751.05) {

        aliquota = 0.15;
        parcelaDeduzir = 394.16;

    } else if (baseCalculo <= 4664.68) {

        aliquota = 0.225;
        parcelaDeduzir = 675.49;

    } else {

        aliquota = 0.275;
        parcelaDeduzir = 908.73;
    }


    let impostoTabela =
        baseCalculo * aliquota - parcelaDeduzir;

    impostoTabela =
        Math.max(0, impostoTabela);


    // Redução adicional vigente em 2026
    let reducao = 0;


    if (renda <= 5000) {

        reducao =
            Math.min(impostoTabela, 312.89);

    } else if (renda <= 7350) {

        reducao =
            978.62 - (0.133145 * renda);

        reducao =
            Math.max(0, reducao);

        reducao =
            Math.min(reducao, impostoTabela);
    }


    const impostoFinal =
        Math.max(0, impostoTabela - reducao);


    resultado.innerHTML = `
        <p>
            Dedução considerada:
            <strong>
                R$ ${deducaoUtilizada.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Base de cálculo:
            <strong>
                R$ ${baseCalculo.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Alíquota da faixa:
            <strong>${(aliquota * 100).toFixed(1)}%</strong>
        </p>

        <p>
            Imposto pela tabela:
            <strong>
                R$ ${impostoTabela.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Redução em 2026:
            <strong>
                R$ ${reducao.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Imposto estimado:
            <strong>
                R$ ${impostoFinal.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </strong>
        </p>
    `;
}

function calcularInvestimento() {

    const valorInvestido =
        Number(document.getElementById("valorInvestido").value);

    const valorResgate =
        Number(document.getElementById("valorResgate").value);

    const dias =
        Math.floor(Number(document.getElementById("diasInvestimento").value));

    const resultado =
        document.getElementById("resultadoInvestimento");


    if (
        valorInvestido < 0 ||
        valorResgate < 0 ||
        dias < 1
    ) {

        resultado.textContent =
            "Informe valores válidos.";

        return;
    }


    // Rendimento antes dos tributos
    const rendimentoBruto =
        valorResgate - valorInvestido;

    // Se houve prejuízo ou nenhum rendimento, não há IR/IOF sobre ganho nesta simulação.
    if (rendimentoBruto <= 0) {

        resultado.innerHTML = `
            <h3>Resultado da simulação</h3>
            <p>
                Resultado bruto:
                <strong>
                    R$ ${rendimentoBruto.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                </strong>
            </p>
            <p>
                Não há rendimento positivo para tributação nesta simulação.
            </p>
            <p>
                Valor no resgate:
                <strong>
                    R$ ${valorResgate.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                </strong>
            </p>
        `;

        return;
    }


    /*
        Percentuais máximos de IOF sobre o rendimento
        do 1º ao 30º dia.
    */

    const tabelaIOF = [
        96, 93, 90, 86, 83,
        80, 76, 73, 70, 66,
        63, 60, 56, 53, 50,
        46, 43, 40, 36, 33,
        30, 26, 23, 20, 16,
        13, 10, 6, 3, 0
    ];


    let aliquotaIOF = 0;


    if (dias < 30) {

        aliquotaIOF =
            tabelaIOF[dias - 1] / 100;
    }


    const valorIOF =
        rendimentoBruto * aliquotaIOF;


    /*
        Para fins desta simulação,
        o rendimento após o IOF será usado
        na apuração do Imposto de Renda.
    */

    const baseIR =
        Math.max(0, rendimentoBruto - valorIOF);


    let aliquotaIR = 0;


    if (dias <= 180) {

        aliquotaIR = 0.225;

    } else if (dias <= 360) {

        aliquotaIR = 0.20;

    } else if (dias <= 720) {

        aliquotaIR = 0.175;

    } else {

        aliquotaIR = 0.15;
    }


    const valorIR =
        baseIR * aliquotaIR;


    const rendimentoLiquido =
        rendimentoBruto - valorIOF - valorIR;


    const valorLiquido =
        valorInvestido + rendimentoLiquido;


    resultado.innerHTML = `

        <h3>Resultado da simulação</h3>

        <p>
            Rendimento bruto:
            <strong>
                R$ ${rendimentoBruto.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Alíquota de IOF:
            <strong>
                ${(aliquotaIOF * 100).toFixed(0)}%
            </strong>
        </p>

        <p>
            IOF estimado:
            <strong>
                R$ ${valorIOF.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Base utilizada para o IR:
            <strong>
                R$ ${baseIR.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Alíquota do IR:
            <strong>
                ${(aliquotaIR * 100).toFixed(1)}%
            </strong>
        </p>

        <p>
            Imposto de Renda estimado:
            <strong>
                R$ ${valorIR.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Rendimento líquido:
            <strong>
                R$ ${rendimentoLiquido.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Valor líquido após os tributos:
            <strong>
                R$ ${valorLiquido.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </strong>
        </p>
    `;
}

function calcularCashback() {

    const cbs =
        Number(document.getElementById("valorCbsCashback").value);

    const ibs =
        Number(document.getElementById("valorIbsCashback").value);

    const tipo =
        document.getElementById("tipoCashback").value;

    const resultado =
        document.getElementById("resultadoCashback");


    if (cbs < 0 || ibs < 0) {

        resultado.textContent =
            "Informe valores válidos.";

        return;
    }


    let percentualCBS;
    const percentualIBS = 0.20;


    if (tipo === "especial") {

        percentualCBS = 1.00;

    } else {

        percentualCBS = 0.20;
    }


    const cashbackCBS =
        cbs * percentualCBS;

    const cashbackIBS =
        ibs * percentualIBS;

    const cashbackTotal =
        cashbackCBS + cashbackIBS;


    resultado.innerHTML = `

        <h3>Resultado da simulação</h3>

        <p>
            Devolução da CBS:
            <strong>
                R$ ${cashbackCBS.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Devolução do IBS:
            <strong>
                R$ ${cashbackIBS.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Cashback total estimado:
            <strong>
                R$ ${cashbackTotal.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </strong>
        </p>
    `;
}

function compararCumulatividade() {

    const etapa1 =
        Number(document.getElementById("valorEtapa1").value);

    const etapa2 =
        Number(document.getElementById("valorEtapa2").value);

    const etapa3 =
        Number(document.getElementById("valorEtapa3").value);

    const aliquota =
        Number(document.getElementById("aliquotaComparacao").value) / 100;

    const resultado =
        document.getElementById("resultadoCumulatividade");


    if (
        etapa1 < 0 ||
        etapa2 < 0 ||
        etapa3 < 0 ||
        aliquota < 0
    ) {

        resultado.textContent =
            "Informe valores válidos.";

        return;
    }


    if (
        etapa2 < etapa1 ||
        etapa3 < etapa2
    ) {

        resultado.textContent =
            "Para esta simulação, utilize valores crescentes ao longo da cadeia.";

        return;
    }


    // MODELO CUMULATIVO HIPOTÉTICO

    const tributoEtapa1 =
        etapa1 * aliquota;

    const tributoEtapa2 =
        etapa2 * aliquota;

    const tributoEtapa3 =
        etapa3 * aliquota;

    const totalCumulativo =
        tributoEtapa1 +
        tributoEtapa2 +
        tributoEtapa3;


    // MODELO NÃO CUMULATIVO

    const recolhimento1 =
        tributoEtapa1;

    const recolhimento2 =
        tributoEtapa2 - tributoEtapa1;

    const recolhimento3 =
        tributoEtapa3 - tributoEtapa2;

    const totalNaoCumulativo =
        recolhimento1 +
        recolhimento2 +
        recolhimento3;


    const diferenca =
        totalCumulativo - totalNaoCumulativo;


    resultado.innerHTML = `

        <h3>Modelo cumulativo hipotético</h3>

        <p>
            Etapa 1:
            <strong>
                R$ ${tributoEtapa1.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Etapa 2:
            <strong>
                R$ ${tributoEtapa2.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Etapa 3:
            <strong>
                R$ ${tributoEtapa3.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Total:
            <strong>
                R$ ${totalCumulativo.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2
                })}
            </strong>
        </p>


        <h3>Modelo não cumulativo</h3>

        <p>
            Produtor:
            <strong>
                R$ ${recolhimento1.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Indústria:
            <strong>
                R$ ${recolhimento2.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Loja:
            <strong>
                R$ ${recolhimento3.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Total:
            <strong>
                R$ ${totalNaoCumulativo.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2
                })}
            </strong>
        </p>


        <h3>Diferença entre os modelos</h3>

        <p>
            <strong>
                R$ ${diferenca.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2
                })}
            </strong>
        </p>
    `;
}

function calcularReducaoAliquota() {

    const valor =
        Number(document.getElementById("valorOperacaoReducao").value);

    const aliquotaPadrao =
        Number(document.getElementById("aliquotaPadraoReducao").value);

    const reducao =
        Number(document.getElementById("percentualReducao").value);

    const resultado =
        document.getElementById("resultadoReducao");


    if (
        valor < 0 ||
        aliquotaPadrao < 0 ||
        reducao < 0 ||
        reducao > 100
    ) {

        resultado.textContent =
            "Informe valores válidos.";

        return;
    }


    const aliquotaEfetiva =
        aliquotaPadrao * (1 - reducao / 100);


    const tributoPadrao =
        valor * (aliquotaPadrao / 100);


    const tributoReduzido =
        valor * (aliquotaEfetiva / 100);


    const diferenca =
        tributoPadrao - tributoReduzido;


    resultado.innerHTML = `

        <h3>Resultado</h3>

        <p>
            Alíquota-padrão:
            <strong>
                ${aliquotaPadrao.toFixed(2)}%
            </strong>
        </p>

        <p>
            Redução:
            <strong>
                ${reducao.toFixed(0)}%
            </strong>
        </p>

        <p>
            Alíquota após a redução:
            <strong>
                ${aliquotaEfetiva.toFixed(2)}%
            </strong>
        </p>

        <p>
            Tributo sem redução:
            <strong>
                R$ ${tributoPadrao.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Tributo com redução:
            <strong>
                R$ ${tributoReduzido.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2
                })}
            </strong>
        </p>

        <p>
            Diferença:
            <strong>
                R$ ${diferenca.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2
                })}
            </strong>
        </p>
    `;
}