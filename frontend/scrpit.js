const btn = document.getElementById("btnMonitorar");
const resultado = document.getElementById("resultado");
const historicoEl = document.getElementById("historico");

btn.addEventListener("click", async () => {
  const url = document.getElementById("urlProduto").value;

  if (!url) {
    alert("Cole o link do produto!");
    return;
  }

  resultado.innerText = "⏳ Buscando preço...";

  try {
    const response = await fetch("http://localhost:3000/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (!data.success) throw new Error();

    resultado.innerText = `💲 Preço atual: R$ ${data.price}`;

    const li = document.createElement("li");
    li.innerText = `${new Date().toLocaleString()} — R$ ${data.price}`;
    historicoEl.prepend(li);

  } catch {
    resultado.innerText = "❌ Erro ao buscar o preço";
  }
});
