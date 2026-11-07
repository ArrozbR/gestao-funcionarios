# Gestão de Funcionários

Segundo trabalho da disciplina. Dessa vez o cenário é uma startup de tecnologia que quer um sistema simples no navegador pra cuidar dos funcionários: cadastrar, editar, excluir, listar e tirar alguns relatórios.

Assim como no trabalho anterior, é tudo HTML e JavaScript puro, sem CSS. Os dados ficam só em memória, então somem se a página for recarregada.

## Rodando o projeto

Precisa ter o Docker instalado e aberto. Na pasta do projeto:

```bash
docker compose up -d --build
```

Depois é só abrir http://localhost:8081 no navegador. Usei a porta 8081 pra dar pra rodar junto com o projeto dos alunos, que fica na 8080.

A pasta `src` fica ligada ao container, então dá pra mexer no código e só dar F5 pra ver a mudança. Pra parar:

```bash
docker compose down
```

## Como está organizado

- `src/index.html`: formulário, tabela, campo de busca e relatórios
- `src/js/funcionario.js`: a classe `Funcionario`
- `src/js/app.js`: a lógica da página
- `Dockerfile` e `docker-compose.yml`: sobem um nginx servindo a pasta `src`

## O que foi feito em cada exercício

Tem um commit por exercício, então dá pra ver o código evoluindo pelo histórico do Git.

**Exercício 1** - Criei a classe `Funcionario` com nome, idade, cargo e salário. Os atributos são privados e cada um tem seu get e set. Também tem um `toString()` que mostra tudo formatado, com o salário em reais. O formulário cadastra o funcionário num array e a tabela lista todos.

**Exercício 2** - Cada linha da tabela ganhou os botões de editar e excluir. Ao editar, os dados voltam pro formulário, e quando salva a classe atualiza os próprios atributos pelo método `atualizar()`, que usa os setters. Os cliques são tratados com `onclick` recebendo funções anônimas.

**Exercício 3** - Cada funcionário passou a ter um ID gerado automaticamente pela classe. As funções que mexem no array (buscar por ID, buscar por nome, remover e atualizar) foram reescritas como arrow functions, e os eventos de clique também. Coloquei um campo de busca por nome em cima da tabela pra usar a busca na prática.

A troca de função anônima tradicional pra arrow function ficou assim, por exemplo no botão de excluir:

```js
// Exercício 2
btnExcluir.onclick = function () {
    excluir(indice);
};

// Exercício 3
criarBotao("Excluir", () => excluir(funcionario.id));
```

E a remoção, que antes usava `splice` pelo índice, virou um `filter` pelo ID:

```js
const removerPorId = (id) => {
    funcionarios = funcionarios.filter((funcionario) => funcionario.id !== id);
};
```

**Exercício 4** - Adicionei os relatórios: funcionários com salário acima de R$ 5.000 (`filter`), média salarial (`reduce`), cargos sem repetição (`map` com `new Set()`) e lista de nomes em maiúsculo (`map`).
