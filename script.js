
var api = "https://www.themealdb.com/api/json/v1/1";

// PESQUISAR

function pesquisar() {
    var nome = document.getElementById("campoPesquisa").value;

    fetch(api + "/search.php?s=" + nome)
    .then(r => r.json())
    .then(d => {
        var area = document.getElementById("resultados");
        area.innerHTML = "";

        if (d.meals == null) {
            area.innerHTML = "Receita não encontrada";
        } else {
            for (var i = 0; i < d.meals.length; i++) {
                var r = d.meals[i];

                area.innerHTML += `
                    <div class="card">
                        <img src="${r.strMealThumb}">
                        <h3>${r.strMeal}</h3>
                        <button onclick="ver('${r.idMeal}')">Ver receita</button>
                    </div>`;
            }
        }
    });
}

// VER RECEITA

function ver(id) {
    fetch(api + "/lookup.php?i=" + id)
    .then(r => r.json())
    .then(d => {
        var r = d.meals[0];
        var lista = "";

        for (var i = 1; i <= 20; i++) {
            if (r["strIngredient" + i].trim() != "") {
                lista += "<li>" + r["strMeasure" + i] + " " + r["strIngredient" + i] + "</li>";
            }
        }

        mostrar(r.strMeal, r.strMealThumb, lista, r.strInstructions);
    });
}

// MOSTRAR

function mostrar(nome, imagem, lista, preparo) {
    document.getElementById("informacoesReceita").innerHTML =
        "<h2>" + nome + "</h2><img src='" + imagem + "'>" +
        "<h3>Ingredientes</h3><ul>" + lista + "</ul>" +
        "<h3>Preparo</h3><p>" + preparo + "</p>";

    document.getElementById("detalhes").hidden = false;
}

// SALVAR

var formulario = document.getElementById("formReceita");

if (formulario) {
    formulario.onsubmit = function(e) {
        e.preventDefault();

        var receitas = JSON.parse(localStorage.getItem("minhasReceitas")) || [];

        receitas.push({
            nome: document.getElementById("nome").value,
            categoria: document.getElementById("categoria").value,
            ingredientes: document.getElementById("ingredientes").value.split("\n"),
            preparo: document.getElementById("preparo").value
        });

        localStorage.setItem("minhasReceitas", JSON.stringify(receitas));
        alert("Receita salva!");
        formulario.reset();
    };
}

// MINHAS RECEITAS

function carregar() {
    var receitas = JSON.parse(localStorage.getItem("minhasReceitas")) || [];
    var area = document.getElementById("receitasSalvas");

    if (area) {
        area.innerHTML = "";

        for (var i = 0; i < receitas.length; i++) {
            area.innerHTML += `
                <div class="card">
                    <h3>${receitas[i].nome}</h3>
                    <p>${receitas[i].categoria}</p>
                    <button onclick="abrir(${i})">Ver</button>
                    <button onclick="excluir(${i})">Excluir</button>
                </div>`;
        }
    }
}

// ABRIR E EXCLUIR

function abrir(i) {
    var r = JSON.parse(localStorage.getItem("minhasReceitas"))[i];
    var lista = "";

    for (var j = 0; j < r.ingredientes.length; j++) {
        lista += "<li>" + r.ingredientes[j] + "</li>";
    }

    mostrar(r.nome, "", lista, r.preparo);
}

function excluir(i) {
    var receitas = JSON.parse(localStorage.getItem("minhasReceitas")) || [];

    if (confirm("Excluir receita?")) {
        receitas.splice(i, 1);
        localStorage.setItem("minhasReceitas", JSON.stringify(receitas));
        carregar();
    }
}

// BOTÕES

if (document.getElementById("botaoPesquisar"))
    document.getElementById("botaoPesquisar").onclick = pesquisar;

if (document.getElementById("botaoFechar"))
    document.getElementById("botaoFechar").onclick = function() {
        document.getElementById("detalhes").hidden = true;
    };

carregar();
