
let api = "https://www.themealdb.com/api/json/v1/1";

// PESQUISAR RECEITA

function pesquisar() {

    let nome = document.getElementById("campoPesquisa").value;

    fetch(api + "/search.php?s=" + nome)
    .then(resposta => resposta.json())
    .then(dados => {

        let area = document.getElementById("resultados");

        area.innerHTML = "";

        if (dados.meals == null) {
            area.innerHTML = "Receita não encontrada";
        } else {

            let receita = dados.meals[0];

            area.innerHTML =
                "<h2>" + receita.strMeal + "</h2>" +
                "<h3>Ingredientes</h3>" +
                "<p>" + receita.strIngredient1 + "</p>" +
                "<p>" + receita.strIngredient2 + "</p>" +
                "<p>" + receita.strIngredient3 + "</p>" +
                "<h3>Preparo</h3>" +
                "<p>" + receita.strInstructions + "</p>";
        }
    });
}


// SALVAR RECEITA

function salvar() {

    let nome = document.getElementById("nome").value;
    let ingredientes = document.getElementById("ingredientes").value;
    let preparo = document.getElementById("preparo").value;

    let receita = nome + "<br>" + ingredientes + "<br>" + preparo;

    localStorage.setItem("receita", receita);

    alert("Receita salva!");
}


// MOSTRAR RECEITA SALVA

function carregar() {

    document.getElementById("receitasSalvas").innerHTML =
        localStorage.getItem("receita");
}


// BOTÕES

document.getElementById("botaoPesquisar").onclick = pesquisar;
document.getElementById("botaoSalvar").onclick = salvar;

carregar();
