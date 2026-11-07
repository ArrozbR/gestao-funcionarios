var funcionarios = [];

function cadastrar() {
    var nome = document.getElementById("nome").value.trim();
    var idade = document.getElementById("idade").value;
    var cargo = document.getElementById("cargo").value.trim();
    var salario = document.getElementById("salario").value;

    if (nome === "" || idade === "" || cargo === "" || salario === "") {
        alert("Preencha todos os campos.");
        return;
    }

    var funcionario = new Funcionario(nome, idade, cargo, salario);
    funcionarios.push(funcionario);
    console.log("Cadastrado: " + funcionario.toString());

    document.getElementById("formFuncionario").reset();
    listar();
}

function criarCelula(texto) {
    var td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function listar() {
    var tabela = document.getElementById("tabelaFuncionarios");
    tabela.innerHTML = "";

    for (var i = 0; i < funcionarios.length; i++) {
        var funcionario = funcionarios[i];
        var tr = document.createElement("tr");

        tr.appendChild(criarCelula(funcionario.nome));
        tr.appendChild(criarCelula(funcionario.idade));
        tr.appendChild(criarCelula(funcionario.cargo));
        tr.appendChild(criarCelula(funcionario.salarioFormatado()));

        tabela.appendChild(tr);
    }
}
