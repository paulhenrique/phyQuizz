class Questionario {
    username;
    questao_numero;
    constructor() {
        this.username = localStorage.getItem("username");
        if ((localStorage.getItem("questao_numero"))) {
            this.questao_numero = localStorage.getItem("questao_numero");
        } else {
            localStorage.setItem("questao_numero", 0);
            this.questao_numero = localStorage.getItem("questao_numero");
        }
    };

    atualizar_visualizacao() {

    };

    avancar_questao() {
        if (this.questao_numero == 20) {
            this.questao_numero = 1;
        } else {
            this.questao_numero++;
        }
        localStorage.setItem("questao_numero", this.questao_numero);
        this.atualizar_visualizacao();
    };
    retroceder_questao() {
        if (this.questao_numero == 1) {
            this.questao_numero = 20;
        } else {
            this.questao_numero--;
        }
        localStorage.setItem("questao_numero", this.questao_numero);
    };
};

$("#avancar_questao").on("click", function () {
    var q = new Questionario();
    q.avancar_questao();
});

$("#retroceder_questao").on("click", function () {
    var q = new Questionario();
    q.retroceder_questao();
});