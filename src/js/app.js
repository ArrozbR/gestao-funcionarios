var funcionarios = [];
var indiceEdicao = null;

function lerCampos() {
    return {
        nome: document.getElementById("nome").value.trim(),
        idade: document.getElementById("idade").value,
        cargo: document.getElementById("cargo").value.trim(),
        salario: document.getElementById("salario").value
    };
}

function salvar() {
    var dados = lerCampos();

    if (dados.nome === "" || dados.idade === "" || dados.cargo === "" || dados.salario === "") {
        alert("Preencha todos os campos.");
        return;
    }

    if (indiceEdicao === null) {
        var novo = new Funcionario(dados.nome, dados.idade, dados.cargo, dados.salario);
        funcionarios.push(novo);
        console.log("Cadastrado: " + novo.toString());
    } else {
        var funcionario = funcionarios[indiceEdicao];
        funcionario.atualizar(dados.nome, dados.idade, dados.cargo, dados.salario);
        console.log("Atualizado: " + funcionario.toString());
    }

    limparFormulario();
    listar();
}

function editar(indice) {
    var funcionario = funcionarios[indice];

    document.getElementById("nome").value = funcionario.nome;
    document.getElementById("idade").value = funcionario.idade;
    document.getElementById("cargo").value = funcionario.cargo;
    document.getElementById("salario").value = funcionario.salario;

    indiceEdicao = indice;
    document.getElementById("tituloFormulario").textContent = "Editar Funcionário";
    document.getElementById("btnSalvar").textContent = "Salvar alterações";
    document.getElementById("btnCancelar").hidden = false;
}

function excluir(indice) {
    var funcionario = funcionarios[indice];

    if (!confirm("Deseja excluir " + funcionario.nome + "?")) {
        return;
    }

    funcionarios.splice(indice, 1);
    console.log("Excluído: " + funcionario.toString());
    limparFormulario();
    listar();
}

function limparFormulario() {
    document.getElementById("formFuncionario").reset();
    indiceEdicao = null;
    document.getElementById("tituloFormulario").textContent = "Cadastrar Funcionário";
    document.getElementById("btnSalvar").textContent = "Cadastrar";
    document.getElementById("btnCancelar").hidden = true;
}

function criarCelula(texto) {
    var td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function criarBotao(texto) {
    var botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = texto;
    return botao;
}

function listar() {
    var tabela = document.getElementById("tabelaFuncionarios");
    tabela.innerHTML = "";

    funcionarios.forEach(function (funcionario, indice) {
        var tr = document.createElement("tr");

        tr.appendChild(criarCelula(funcionario.nome));
        tr.appendChild(criarCelula(funcionario.idade));
        tr.appendChild(criarCelula(funcionario.cargo));
        tr.appendChild(criarCelula(funcionario.salarioFormatado()));

        var btnEditar = criarBotao("Editar");
        btnEditar.onclick = function () {
            editar(indice);
        };

        var btnExcluir = criarBotao("Excluir");
        btnExcluir.onclick = function () {
            excluir(indice);
        };

        var acoes = document.createElement("td");
        acoes.appendChild(btnEditar);
        acoes.appendChild(btnExcluir);
        tr.appendChild(acoes);

        tabela.appendChild(tr);
    });
}

document.getElementById("btnSalvar").onclick = function () {
    salvar();
};

document.getElementById("btnCancelar").onclick = function () {
    limparFormulario();
};
