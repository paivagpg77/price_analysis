function salvar() {
    console.log("clicou em salvar");

    const nome = document.getElementById("nome").value;
    const link = document.getElementById("link").value;
    const preco = parseFloat(document.getElementById("preco").value);

    if (!nome || !link || isNaN(preco)) {
        alert("Preencha todos os campos.");
        return;
    }

    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    let produto = produtos.find(p => p.link === link);

    if (!produto) {
        produto = { nome, link, historico: [] };
        produtos.push(produto);
    }

    produto.historico.push({
        data: new Date().toLocaleDateString(),
        preco: preco
    });

    localStorage.setItem("produtos", JSON.stringify(produtos));

    limpar();
    listar();
}

function listar() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    produtos.forEach(p => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <strong>${p.nome}</strong><br>
            <a href="${p.link}" target="_blank">Ver produto</a><br>
            Status: ${status(p.historico)}
        `;

        lista.appendChild(div);
    });
}

function status(historico) {
    if (historico.length < 2) return "➖ Sem histórico";

    const atual = historico[historico.length - 1].preco;
    const anterior = historico[historico.length - 2].preco;

    if (atual > anterior) return "🔺 Preço subiu";
    if (atual < anterior) return "🔻 Preço caiu";
    return "➖ Preço manteve";
}

function limpar() {
    document.getElementById("nome").value = "";
    document.getElementById("link").value = "";
    document.getElementById("preco").value = "";
}

listar();
