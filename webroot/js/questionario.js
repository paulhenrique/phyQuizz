class Questionario {
    username;
    questao_numero;
    questoes;
    constructor() {
        this.username = localStorage.getItem("username");

        if (localStorage.getItem("questoes")) {
            // this.questoes = localStorage.getItem("questoes");
            this.questoes = JSON.parse(window.localStorage.getItem('questoes'));
        } else {
            this.formar_perguntas();
        }
        if ((localStorage.getItem("questao_numero"))) {
            this.questao_numero = localStorage.getItem("questao_numero");
        } else {
            localStorage.setItem("questao_numero", 1);
            this.questao_numero = localStorage.getItem("questao_numero");
        }

    };

    formar_perguntas() {
        console.log("formar perguntas");
        $.getJSON('/phyQuizz/questions.json', function(data) {
            data.sort(function(){
                return .5 - Math.random();
            });
            this.questoes = data.slice(0, 20);
            localStorage.setItem('questoes', JSON.stringify(this.questoes));
            this.questoes = JSON.parse(window.localStorage.getItem('questoes'));
        });
    };

    atualizar_visualizacao() {
        let questao_atual =  this.questoes[this.questao_numero];

        document.getElementById("questao_number").innerHTML = "Questão " + this.questao_numero;
        document.getElementById("question_text").innerHTML = questao_atual.questao;
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
        this.atualizar_visualizacao();
    };

    encerrar_game(){
        localStorage.removeItem("questao_numero");
        localStorage.removeItem("questoes");
    }
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
$("#encerrar_game").on("click", function () {
    var q = new Questionario();
    q.encerrar_game();
});