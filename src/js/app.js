let funcionarios = [];
let idEdicao = null;

const form = document.getElementById("formFuncionario");
const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("idade");
const campoCargo = document.getElementById("cargo");
const campoSalario = document.getElementById("salario");
const campoBusca = document.getElementById("busca");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const tituloFormulario = document.getElementById("tituloFormulario");
const tabela = document.getElementById("tabelaFuncionarios");
const mensagemVazia = document.getElementById("mensagemVazia");

const buscarPorId = (id) => funcionarios.find((funcionario) => funcionario.id === id);

const buscarPorNome = (texto) =>
    funcionarios.filter((funcionario) =>
        funcionario.nome.toLowerCase().includes(texto.trim().toLowerCase())
    );

const adicionar = (funcionario) => {
    funcionarios = [...funcionarios, funcionario];
};

const removerPorId = (id) => {
    funcionarios = funcionarios.filter((funcionario) => funcionario.id !== id);
};

const atualizarPorId = (id, dados) => {
    const funcionario = buscarPorId(id);
    funcionario.atualizar(dados.nome, dados.idade, dados.cargo, dados.salario);
    return funcionario;
};

const lerCampos = () => ({
    nome: campoNome.value.trim(),
    idade: campoIdade.value,
    cargo: campoCargo.value.trim(),
    salario: campoSalario.value
});

const camposPreenchidos = (dados) => Object.values(dados).every((valor) => valor !== "");

const limparFormulario = () => {
    form.reset();
    idEdicao = null;
    tituloFormulario.textContent = "Cadastrar Funcionário";
    btnSalvar.textContent = "Cadastrar";
    btnCancelar.hidden = true;
};

const criarCelula = (texto) => {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
};

const criarBotao = (texto, aoClicar) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = texto;
    botao.addEventListener("click", aoClicar);
    return botao;
};

const listar = () => {
    const lista = buscarPorNome(campoBusca.value);
    tabela.innerHTML = "";

    mensagemVazia.hidden = lista.length > 0;
    mensagemVazia.textContent = funcionarios.length === 0
        ? "Nenhum funcionário cadastrado."
        : "Nenhum funcionário encontrado com esse nome.";

    lista.forEach((funcionario) => {
        const tr = document.createElement("tr");

        tr.appendChild(criarCelula(funcionario.id));
        tr.appendChild(criarCelula(funcionario.nome));
        tr.appendChild(criarCelula(funcionario.idade));
        tr.appendChild(criarCelula(funcionario.cargo));
        tr.appendChild(criarCelula(funcionario.salarioFormatado()));

        const acoes = document.createElement("td");
        acoes.appendChild(criarBotao("Editar", () => editar(funcionario.id)));
        acoes.appendChild(criarBotao("Excluir", () => excluir(funcionario.id)));
        tr.appendChild(acoes);

        tabela.appendChild(tr);
    });
};

const salvar = () => {
    const dados = lerCampos();

    if (!camposPreenchidos(dados)) {
        alert("Preencha todos os campos.");
        return;
    }

    if (idEdicao === null) {
        const novo = new Funcionario(dados.nome, dados.idade, dados.cargo, dados.salario);
        adicionar(novo);
        console.log("Cadastrado:", novo.toString());
    } else {
        const atualizado = atualizarPorId(idEdicao, dados);
        console.log("Atualizado:", atualizado.toString());
    }

    limparFormulario();
    listar();
};

const editar = (id) => {
    const funcionario = buscarPorId(id);

    campoNome.value = funcionario.nome;
    campoIdade.value = funcionario.idade;
    campoCargo.value = funcionario.cargo;
    campoSalario.value = funcionario.salario;

    idEdicao = id;
    tituloFormulario.textContent = `Editar Funcionário #${id}`;
    btnSalvar.textContent = "Salvar alterações";
    btnCancelar.hidden = false;
};

const excluir = (id) => {
    const funcionario = buscarPorId(id);

    if (!confirm(`Deseja excluir ${funcionario.nome}?`)) {
        return;
    }

    removerPorId(id);
    console.log("Excluído:", funcionario.toString());

    if (idEdicao === id) {
        limparFormulario();
    }
    listar();
};

btnSalvar.addEventListener("click", () => salvar());
btnCancelar.addEventListener("click", () => limparFormulario());
campoBusca.addEventListener("input", () => listar());

listar();
