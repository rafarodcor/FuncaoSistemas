$(document).ready(function () {
    applyInputMask();
    carregarSelectEstado();

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        if ($("#formCadastro").valid()) {
            $.ajax({
                url: urlPost,
                method: "POST",
                data: {
                    "NOME": $(this).find("#Nome").val(),
                    "CPF": removeFormat($(this).find("#CPF").val()),
                    "CEP": removeFormat($(this).find("#CEP").val()),
                    "Email": $(this).find("#Email").val(),
                    "Sobrenome": $(this).find("#Sobrenome").val(),
                    "Nacionalidade": $(this).find("#Nacionalidade").val(),
                    "Estado": $(this).find("#Estado").val(),
                    "Cidade": $(this).find("#Cidade").val(),
                    "Logradouro": $(this).find("#Logradouro").val(),
                    "Telefone": removeFormat($(this).find("#Telefone").val()),
                    "Beneficiarios": beneficiarios
                },
                error:
                    function (r) {
                        if (r.status == 400)
                            ModalDialog("Ocorreu um erro", r.responseJSON);
                        else if (r.status == 500)
                            ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                    },
                success:
                    function (r) {
                        ModalDialog("Sucesso!", r);
                        $("#formCadastro")[0].reset();

                        beneficiarios = [];                        
                        $('#btnCadastrarBeneficiario').removeData();
                    }
            });
        }
    });
});