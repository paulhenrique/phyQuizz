class Questionario {
    username;
    questao_numero;
    questoes;
    constructor() {
        this.username = localStorage.getItem("username");

        if (localStorage.getItem("questoes")) {
            this.questoes = localStorage.getItem("questoes");
        } else {
            this.formar_perguntas();
        }
        
        if ((localStorage.getItem("questao_numero"))) {
            this.questao_numero = localStorage.getItem("questao_numero");
        } else {
            localStorage.setItem("questao_numero", 0);
            this.questao_numero = localStorage.getItem("questao_numero");
        }

    };

    formar_perguntas() {
        $.getJSON('/phyQuizz/questions.json', function(data) {
            data.sort(function(){
                return .5 - Math.random();
            });
            this.questoes = data.slice(0, 20);
        });
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
$(window).on("load", function () {
    var q = new Questionario();
    q.atualizar_visualizacao();
});
$("#avancar_questao").on("click", function () {
    var q = new Questionario();
    q.avancar_questao();
});

$("#retroceder_questao").on("click", function () {
    var q = new Questionario();
    q.retroceder_questao();
});