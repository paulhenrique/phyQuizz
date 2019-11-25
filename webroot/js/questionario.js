class Questionario {
    username;
    questao_numero;
    questoes;
    alternativas;
    acertos;
    quantidade_de_acertos;
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
        if (localStorage.getItem('acertos')) {
            this.acertos = JSON.parse(localStorage.getItem('acertos'));
            let qnt_acertos = 0;
            $.each(this.acertos, function (i, c) {
                if (c == 1) {
                    qnt_acertos++;
                }
            });
            this.quantidade_de_acertos = qnt_acertos;
        }
    };

    formar_perguntas() {
        $.getJSON('/phyQuizz/questions.json', function (data) {
            data.sort(function () {
                return .5 - Math.random();
            });
            this.questoes = data.slice(0, 10);
            localStorage.setItem('questoes', JSON.stringify(this.questoes));

            //definindo variável global de questões
            this.questoes = JSON.parse(window.localStorage.getItem('questoes'));
        });
        let questoes = this.questoes;
        $.each(questoes, function (indice_questao, conteudo) {
            let questao_atual = conteudo;
            let alternativas = questao_atual.erradas;
            alternativas.push(questao_atual.correta);

            alternativas.sort(function () {
                return .5 - Math.random();
            });

            var form = $("<div>")
                .attr('id', 'form_alternatives_question_' + parseInt(indice_questao))
                .addClass('hide')
                .addClass('form_alternativas');

            $.each(alternativas, function (indice, conteudo) {
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

        location.reload();
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

    };

    avancar_questao() {
        if (this.questao_numero == 9) {
            this.questao_numero = 0;
        } else {
            this.questao_numero++;
        }
        localStorage.setItem("questao_numero", this.questao_numero);
        this.atualizar_visualizacao();
    };

    retroceder_questao() {
        if (this.questao_numero == 0) {
            this.questao_numero = 9;
        } else {
            this.questao_numero--;
        }
        localStorage.setItem("questao_numero", this.questao_numero);
        this.atualizar_visualizacao();
    };

    encerrar_game() {

        let acertos = [];

        $.each(this.questoes, function (indice, conteudo) {
            let alternativas_container_label = $('#form_alternatives_question_' + parseInt(indice) + '>p>label>input');
            let alternativa_selecionada = 'no_selected';
            $.each(alternativas_container_label, function () {
                if (this.checked) {
                    alternativa_selecionada = this.value;
                }
            });
            if (alternativa_selecionada == this.correta) {
                acertos.push(1);
            } else {
                acertos.push(0);
            }
        });
        localStorage.setItem('acertos', JSON.stringify(acertos));
        location.href = 'resultado.html';
    }
    
    apagar_jogo() {
        localStorage.setItem("questao_numero", 0);
        localStorage.removeItem("questoes");
        localStorage.removeItem("alternativas");
        location.href = 'index.html';
    }

    configurar_usuario() {
        if (localStorage.getItem('username')) {
            document.getElementById("name").innerHTML = localStorage.getItem('username');
        }
    }
    
};

