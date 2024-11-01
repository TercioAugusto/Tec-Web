$(document).ready(function() {
    let dadosCarro = [];
    let cidade = "";
    let endereco = "";

    $("#verificarCep").click(function() {
        let cep = $("#cep").val();
        let urlCep = `https://viacep.com.br/ws/${cep}/json/`;

        $.get(urlCep, function(data, status) {
            if (status === "success" && !data.erro) {
                cidade = data.localidade;
                endereco = `Seu endereço é: ${data.logradouro}, Bairro: ${data.bairro}, na cidade ${data.localidade}`;

                if (cidade.toLowerCase() === "rio de janeiro") {
                    $("#resultado").html("<p>CEP verificado: cobertura disponível para Rio de Janeiro.</p>");
                    $("#fipe").prop("disabled", false);
                    $("#buscarFipe").prop("disabled", false);
                } else {
                    $("#resultado").html("<p>Essa cidade não tem cobertura de seguros.</p>");
                }
            } else {
                $("#resultado").html("<p>CEP inválido ou erro na busca. Tente novamente.</p>");
            }
        }).fail(function() {
            $("#resultado").html("<p>Erro ao acessar a API de CEP. Tente mais tarde.</p>");
        });
    });

    $("#buscarFipe").click(function() {
        let fipe = $("#fipe").val();
        let urlFipe = `https://brasilapi.com.br/api/fipe/preco/v1/${fipe}`;

        $.get(urlFipe, function(data, status) {
            if (status === "success" && data.length > 0) {
                $("#resultado").empty();
                $("#ano").empty().append('<option value="">Selecione um ano</option>');

                dadosCarro = data;

                data.forEach(function(carro) {
                    $("#ano").append(`<option value="${carro.anoModelo}">${carro.anoModelo}</option>`);
                });

                $("#ano").prop("disabled", false);
                $("#consultarSeguro").prop("disabled", false);
                $("#resultado").html("<p>Selecione um ano para ver os detalhes do carro.</p>");
            } else {
                $("#resultado").html("<p>Erro ao buscar os dados da Tabela Fipe. Verifique o código e tente novamente.</p>");
            }
        }).fail(function() {
            $("#resultado").html("<p>Erro ao acessar a API da Tabela Fipe. Tente mais tarde.</p>");
        });
    });

    $("#consultarSeguro").click(function() {
        let anoSelecionado = $("#ano").val();

        if (anoSelecionado) {
            let carro = dadosCarro.find(c => c.anoModelo == anoSelecionado);

            if (carro) {
                let valorCarro = parseFloat(carro.valor.replace("R$", "").replace(".", "").replace(",", "."));

                if (cidade.toLowerCase() === "rio de janeiro" && valorCarro > 30000) {
                    let resultadoHtml = `
                        <p>${endereco}</p>
                        <p>Seu carro é: ${carro.marca} ${carro.modelo}, ano ${carro.anoModelo}, com o valor de mercado de R$ ${carro.valor}.</p>
                        <p>Seu seguro foi liberado.</p>
                    `;
                    $("#resultado").html(resultadoHtml);
                } else {
                    $("#resultado").html("<p>Infelizmente o seguro não foi aceito, devido ao valor do seu carro.</p>");
                }
            } else {
                $("#resultado").html("<p>Dados não encontrados para o ano selecionado.</p>");
            }
        } else {
            $("#resultado").html("<p>Por favor, selecione um ano.</p>");
        }
    });
});