class Questionario {
    username;
    questao_numero;
    questoes;
    alternativas;
    constructor() {

        this.username = localStorage.getItem("username");

        if (localStorage.getItem("questoes")) {
            // this.questoes = localStorage.getItem("questoes");
            this.questoes = JSON.parse(window.localStorage.getItem('questoes'));
        } else {
            this.formar_perguntas();
        }
        if (localStorage.getItem('alternativas')) {
            this.alternativas = localStorage.getItem('alternativas');
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
            data.sort(function() {
                return .5 - Math.random();
            });
            this.questoes = data.slice(0, 20);
            localStorage.setItem('questoes', JSON.stringify(this.questoes));

            //definindo variável global de questões
            this.questoes = JSON.parse(window.localStorage.getItem('questoes'));
        });
        let questoes = this.questoes;
        $.each(questoes, function(indice_questao, conteudo) {
            let questao_atual = conteudo;
            let alternativas = questao_atual.erradas;
            alternativas.push(questao_atual.correta);

            alternativas.sort(function() {
                return .5 - Math.random();
            });

            var form = $("<div>")
                .attr('id', 'form_alternatives_question_' + parseInt(indice_questao))
                .addClass('hide')
                .addClass('form_alternativas');

            $.each(alternativas, function(indice, conteudo) {
                let id_alternativa = 'alternativas_' + parseInt(indice) + '_questao_' + parseInt(indice_questao);
                var div = $("<p/>");
                var label = $("<label/>");
                var span = $("<span>");
                var input_radio = $('<input/>').attr({
                    'type': 'radio',
                    'name': 'alternativas_questao_' + parseInt(indice_questao),
                    'value': conteudo,
                    'class': 'alternative_radio with-gap',
                    'id': id_alternativa
                });

                input_radio.prop('checked', 'checked');

                span.append(conteudo);

                label.attr('for', id_alternativa);
                label.addClass('alternative_radio_label');
                label.append(input_radio);
                label.append(span);

                div.append(label);
                form.append(div);
            });
            console.log(form);
            $("#question_alternat").append(form);
            localStorage.setItem('alternativas', String(document.getElementById("question_alternat").innerHTML));

            //definindo variável global de alternativas
            this.alternativas = window.localStorage.getItem('alternativas');
        });

        localStorage.setItem('questoes', JSON.stringify(this.questoes));
        this.questoes = JSON.parse(window.localStorage.getItem('questoes'));
    };
    atualizar_alternativas() {
        localStorage.setItem('alternativas', String(document.getElementById("question_alternat").innerHTML));
        this.alternativas = localStorage.getItem('alternativas');
        console.log('Atualizando alternativas');
    }
    atualizar_visualizacao() {
        let questao_atual = this.questoes[this.questao_numero];
        var numero_questao = parseInt(this.questao_numero) + 1;
        document.getElementById("questao_number").innerHTML = "Questão " + (numero_questao);
        document.getElementById("question_text").innerHTML = questao_atual.questao;
        if (!String(document.getElementById('question_alternat').innerHTML).length > 0) {
            document.getElementById('question_alternat').innerHTML = this.alternativas;
        }
        $('.form_alternativas').removeClass('hide');
        $('.form_alternativas').addClass('hide');
        $('#form_alternatives_question_' + parseInt(this.questao_numero)).removeClass('hide');
        // this.atualizar_alternativas();
    };

    avancar_questao() {
        if (this.questao_numero == 19) {
            this.questao_numero = 0;
        } else {
            this.questao_numero++;
        }
        localStorage.setItem("questao_numero", this.questao_numero);
        this.atualizar_visualizacao();
    };
    retroceder_questao() {
        if (this.questao_numero == 0) {
            this.questao_numero = 19;
        } else {
            this.questao_numero--;
        }
        localStorage.setItem("questao_numero", this.questao_numero);
        this.atualizar_visualizacao();
    };

    encerrar_game() {



        localStorage.setItem("questao_numero", 0);
        localStorage.removeItem("questoes");
        localStorage.removeItem("alternativas");
    }
};
$(window).on("load", function() {
    var q = new Questionario();
    q.atualizar_visualizacao();
});
$("#avancar_questao").on("click", function() {
    var q = new Questionario();
    q.avancar_questao();
});

$("#retroceder_questao").on("click", function() {
    var q = new Questionario();
    q.retroceder_questao();
});
$("#encerrar_game").on("click", function() {
    var q = new Questionario();
    q.encerrar_game();
});