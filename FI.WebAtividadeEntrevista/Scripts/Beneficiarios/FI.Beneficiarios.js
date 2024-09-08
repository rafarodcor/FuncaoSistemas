let beneficiarios = [];

$(document).ready(function () {
    $('#formCadastroBeneficiario').submit(function (e) {
        e.preventDefault();

        if ($("#formCadastroBeneficiario").valid()) {
            var cpf = removeFormat($(this).find("#beneficiarioCPF").val()),
                nome = $(this).find("#beneficiarioNome").val();

            let beneficiario = {};

            var dataCliente = $('#btnCadastrarBeneficiario').data();
            var idCliente = dataCliente == undefined ? 0 : dataCliente.idCliente;

            //verifico se o registro já existe e está sendo editado
            var idBeneficiario = $("#beneficiarioId").val();
            if (idBeneficiario) {
                let index = beneficiarios.findIndex(b => b.Id == idBeneficiario);
                if (index > -1) {
                    beneficiarios.splice(index, 1);

                    beneficiario = {
                        Id: idBeneficiario,
                        Nome: nome,
                        CPF: cpf,
                        idCliente: idCliente,
                        IsEdited: true
                    };
                }
            }
            else {
                beneficiario = {
                    Id: Math.floor(Math.random() * 100000),
                    Nome: nome,
                    CPF: cpf,
                    idCliente: idCliente,
                    IsNew: true
                };
            }

            //Verifico o CPF
            let existeCPF = beneficiarios.findIndex(b => b.CPF == cpf && !b.IsEdited);
            if (existeCPF > -1) {
                ModalDialog("Ocorreu um erro", "Já existe um beneficiário cadastrado com o CPF informado. Por favor, verifique!");
                return;
            }

            incluirBeneficiario(beneficiario);
        }
    });
});

function incluirBeneficiario(beneficiario) {
    $("#formCadastroBeneficiario")[0].reset();
    $("#tableBeneficiarios tbody tr").remove();

    beneficiarios.push(beneficiario);
    montarTabela(beneficiarios);
};

function editarBeneficiario(id) {
    const obj = beneficiarios.find((c) => c.Id == id);
    $("#beneficiarioId").val(obj.Id);
    $("#beneficiarioNome").val(obj.Nome);
    $("#beneficiarioCPF").val(obj.CPF);
};

function excluirBeneficiario(id) {
    const index = beneficiarios.findIndex((c) => c.Id == id);
    beneficiarios[index].IsDeleted = true;

    if (beneficiarios.filter(c => !c.IsDeleted).length == 0) {
        $('#tableBeneficiarios thead').hide();
        $("#divTableBeneficiarios").append('<p class="text-center">Não existe(m) beneficiário(s) cadastrado(s).</p>');
    }

    $('#tr_' + id + '').remove();
};

function abrirModalBeneficiarios() {
    $('#modalBeneficiarios').modal('show');
    carregarListaBeneficiarios();
};

function carregarListaBeneficiarios() {
    resetForm();
    
    if (beneficiarios.length > 0)
        montarTabela(beneficiarios);
    else {
        var dataCliente = $('#btnCadastrarBeneficiario').data();
        var idCliente = dataCliente == undefined ? 0 : dataCliente.idCliente;
        if (idCliente > 0) {
            $.ajax({
                url: urlBeneficiarioList,
                method: "POST",
                data: {
                    idCliente: idCliente
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
                        if (r.Result == "OK") {
                            beneficiarios = r.Records;
                            montarTabela(r.Records);
                        }
                        else {
                            $("#divTableBeneficiarios").append('<p class="text-center">Não existe(m) beneficiário(s) cadastrado(s).</p>');
                        }
                    }
            });
        }
    }
};

function montarTabela(listaBeneficiarios) {
    if (listaBeneficiarios.length > 0) {
        $("#divTableBeneficiarios p").remove();
        $('#tableBeneficiarios thead').show();

        for (var i = 0; i < listaBeneficiarios.length; i++) {
            var beneficiario = listaBeneficiarios[i];
            $("#tableBeneficiarios tbody").append(
                '<tr id="tr_' + beneficiario.Id + '">\
                    <td class="cpf-mask">' + beneficiario.CPF + '</td>\
                    <td>' + beneficiario.Nome + '</td>\
                    <td>\
                        <button onclick="editarBeneficiario(\'' + beneficiario.Id + '\')" type="button" class="btn btn-sm btn-primary">Alterar</button>\
                        <button onclick="excluirBeneficiario(\'' + beneficiario.Id + '\')" type="button" class="btn btn-sm btn-primary">Excluir</button>\
                    </td>\
                </tr>');
        }

        $('.cpf-mask').inputmask("99[9].999.999-99");
    }
    else {
        $("#divTableBeneficiarios").append('<p class="text-center">Não existe(m) beneficiário(s) cadastrado(s).</p>');
    }
};

function resetForm() {
    $("#beneficiarioId").val("");
    $("#formCadastroBeneficiario")[0].reset();
    $("#formCadastroBeneficiario input").removeClass('error');
    $('#tableBeneficiarios thead').hide();
    $("#tableBeneficiarios tbody tr").remove();
    $("#divTableBeneficiarios p").remove();
    validatorCadastroBeneficiario.resetForm();
};