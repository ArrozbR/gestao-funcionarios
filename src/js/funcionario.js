class Funcionario {
    #nome;
    #idade;
    #cargo;
    #salario;

    constructor(nome, idade, cargo, salario) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
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

    salarioFormatado() {
        return this.#salario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    toString() {
        return `${this.#nome}, ${this.#idade} anos, ${this.#cargo}, ${this.salarioFormatado()}`;
    }
}
