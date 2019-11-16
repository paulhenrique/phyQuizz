function formularios() {

    this.init = function () {
        $("#user_name").on("keyup", function () {
            var comprimento = $("#user_name").val();
            if (comprimento.length >= 3) {
                $("#btn_start_game").removeClass("disabled");
            } else {
                $("#btn_start_game").addClass("disabled");
            }
        });


        $("#btn_start_game").on("click", function () {
            var username = $("#user_name").val();
            localStorage.setItem("username", username);
        });
    }
}