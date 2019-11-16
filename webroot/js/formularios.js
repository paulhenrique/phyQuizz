function formularios() {

    this.init = function () {
        $("#user_name").on("keyup", function () {
            var comprimento = $("#user_name").val();
            console.log(comprimento);
            if (comprimento.length >= 3) {
                $("#btn_start_game").removeClass("disabled");
            }else{
                $("#btn_start_game").addClass("disabled");
            }
        });
    }
}