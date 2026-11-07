class Funcionario {
    static #proximoId = 1;

    #id;
    #nome;
    #idade;
    #cargo;
    #salario;

    constructor(nome, idade, cargo, salario) {
        this.#id = Funcionario.#proximoId++;
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    set nome(valor) {
        this.#nome = String(valor).trim();
    }

    get idade() {
        return this.#idade;
    }

    set idade(valor) {
        this.#idade = Number(valor);
    }

    get cargo() {
        return this.#cargo;
    }

    set cargo(valor) {
        this.#cargo = String(valor).trim();
    }

    get salario() {
        return this.#salario;
    }

    set salario(valor) {
        this.#salario = Number(valor);
    }

    atualizar(nome, idade, cargo, salario) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    salarioFormatado() {
        return this.#salario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    toString() {
        return `#${this.#id} - ${this.#nome}, ${this.#idade} anos, ${this.#cargo}, ${this.salarioFormatado()}`;
    }
}
