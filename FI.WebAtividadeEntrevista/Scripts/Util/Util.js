function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto =
        '<div id="' + random + '" class="modal fade">                                                                       ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                            ';

    $('body').append(texto);
    $('#' + random).modal('show');
};

function applyInputMask() {
    $("#CPF, #beneficiarioCPF").inputmask("99[9].999.999-99");
    $("#CEP").inputmask("99999-999");
    $("#Telefone").inputmask("(99) 9999[9]-9999");
};

$.validator.addMethod("CPF", function (value, element) {
    return this.optional(element) || validarCPF(value);
}, "Por favor, insira um CPF válido.");

var validatorCadastro = $("#formCadastro").validate({
    rules: {
        CPF: {
            CPF: true
        }
    },
    messages: {
        Logradouro: {
            required: "O campo é obrigatório."
        },
        Cidade: {
            required: "O campo é obrigatório."
        },
        Estado: {
            required: "O campo é obrigatório."
        },
        CEP: {
            required: "O campo é obrigatório."
        },
        Nacionalidade: {
            required: "O campo é obrigatório."
        },
        Sobrenome: {
            required: "O campo é obrigatório."
        },
        Nome: {
            required: "O campo é obrigatório."
        },
        CPF: {
            required: "O campo é obrigatório.",
            CPF: "Por favor, insira um CPF válido."
        }
    }
});

var validatorCadastroBeneficiario = $('#formCadastroBeneficiario').validate({
    rules: {
        beneficiarioCPF: {
            CPF: true
        }
    },
    messages: {
        beneficiarioCPF: {
            required: "O campo é obrigatório.",
            CPF: "Por favor, insira um CPF válido."
        },
        beneficiarioNome: {
            required: "O campo é obrigatório."
        }
    }
});

function validarCPF(cpf) {
    var soma = 0;
    var resto;

    var strCPF = removeFormat(cpf);

    if (strCPF.length !== 11)
        return false;

    if ([
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ].indexOf(strCPF) !== -1)
        return false;

    for (i = 1; i <= 9; i++)
        soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))
        resto = 0;

    if (resto != parseInt(strCPF.substring(9, 10)))
        return false;

    soma = 0;

    for (i = 1; i <= 10; i++)
        soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);

    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))
        resto = 0;

    if (resto != parseInt(strCPF.substring(10, 11)))
        return false;

    return true;
};

function removeFormat(string) {
    return String(string).replace(/[^\d]/g, '');
};

function limpa_formulário_cep() {
    $("#Logradouro").val("");
    $("#Cidade").val("");
    $("#Estado").val("");
};

$("#CEP").blur(function () {
    var cep = $(this).val().replace(/\D/g, '');

    if (cep != "") {
        var validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {
            $("#Logradouro").val("...");
            $("#Cidade").val("...");
            $("#Estado").val("...");

            $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                if (!("erro" in dados)) {
                    $("#Logradouro").val(dados.logradouro);
                    $("#Cidade").val(dados.localidade);
                    $("#Estado").val(dados.uf);
                }
                else {
                    limpa_formulário_cep();
                    //alert("CEP não encontrado.");
                }
            });
        }
        else {
            limpa_formulário_cep();
            //alert("Formato de CEP inválido.");
        }
    }
    else {
        limpa_formulário_cep();
    }
});