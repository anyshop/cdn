function mostrarErros(dados){ 

	if(dados.code){
		var code = dados.code;
	}else if(dados.error) {
        var code = dados.error;
    }else {
		var code = dados;   
    }

	/*ERROS PAGSEGURO*/
	if(code=='10000'){ message = 'marca cartão de crédito inválido.'; }
    else if(code=='10001'){ message = 'número de cartão de crédito com comprimento inválido.'; }
    else if(code=='10002'){ message = 'formato de data inválido.'; }
    else if(code=='10003'){ message = 'campo de segurança inválido.'; }
    else if(code=='10004'){ message = 'CVV é obrigatória.'; }
    else if(code=='10005'){ message = 'campo de segurança com comprimento inválido.'; }
    else if(code=='53004'){ message = 'itens quantidade inválida.'; }
    else if(code=='53005'){ message = 'moeda é necessária.'; }
    else if(code=='53006'){ message = 'moeda valor inválido.'; }
    else if(code=='53007'){ message = 'referência comprimento inválido.'; }
    else if(code=='53008'){ message = 'notificationURL comprimento inválido.'; }
    else if(code=='53009'){ message = 'notificationURL valor inválido.'; }
    else if(code=='53010'){ message = 'e-mail do remetente é necessária.'; }
    else if(code=='53011'){ message = 'e-mail remetente comprimento inválido.'; }
    else if(code=='53012'){ message = 'e-mail remetente valor inválido.'; }
    else if(code=='53013'){ message = 'nome do remetente é necessária.'; }
    else if(code=='53014'){ message = 'nome do remetente comprimento inválido.'; }
    else if(code=='53015'){ message = 'nome do remetente valor inválido.'; }
    else if(code=='53017'){ message = 'remetente CPF valor inválido.'; }
    else if(code=='53018'){ message = 'código de área remetente é necessária.'; }
    else if(code=='53019'){ message = 'remetente valor inválido.'; }
    else if(code=='53020'){ message = 'telefone do remetente é necessária.'; }
    else if(code=='53021'){ message = 'telefone do remetente valor inválido.'; }
    else if(code=='53022'){ message = 'endereço de entrega é necessária.'; }
    else if(code=='53023'){ message = 'endereço de entrega código postal valor inválido.'; }
    else if(code=='53024'){ message = 'rua endereço de entrega é necessária.'; }
    else if(code=='53025'){ message = 'Endereço transporte rua comprimento inválido.'; }
    else if(code=='53026'){ message = 'número do endereço transporte é necessária.'; }
    else if(code=='53027'){ message = 'transporte número de endereço comprimento inválido.'; }
    else if(code=='53028'){ message = 'Endereço transporte complemento comprimento inválido.'; }
    else if(code=='53029'){ message = 'distrito de endereço transporte é necessária.'; }
    else if(code=='53030'){ message = 'transporte distrito endereço de comprimento inválido.'; }
    else if(code=='53031'){ message = 'cidade endereço de entrega é necessária.'; }
    else if(code=='53032'){ message = 'transporte da cidade de endereços comprimento inválido.'; }
    else if(code=='53033'){ message = 'Estado endereço transporte é necessária.'; }
    else if(code=='53034'){ message = 'transporte estado endereço valor inválido.'; }
    else if(code=='53035'){ message = 'país endereço de entrega é necessária.'; }
    else if(code=='53036'){ message = 'comprimento inválido transporte país endereço.'; }
    else if(code=='53037'){ message = 'token de cartão de crédito é exigido.'; }
    else if(code=='53038'){ message = 'quantidade parcela é necessária.'; }
    else if(code=='53039'){ message = 'quantidade parcela valor inválido.'; }
    else if(code=='53040'){ message = 'valor da prestação é necessária.'; }
    else if(code=='53041'){ message = 'valor parcela valor inválido.'; }
    else if(code=='53042'){ message = 'nome do titular do cartão de crédito é exigido.'; }
    else if(code=='53043'){ message = 'cartão de crédito: nome do titular comprimento inválido.'; }
    else if(code=='53044'){ message = 'cartão de crédito: nome do titular valor inválido.'; }
    else if(code=='53045'){ message = 'cartão de crédito: titular do cartão de CPF é necessário.'; }
    else if(code=='53046'){ message = 'cartão de crédito: titular do CPF valor inválido.'; }
    else if(code=='53047'){ message = 'cartão de crédito: titular do cartão de data de nascimento é necessária.'; }
    else if(code=='53048'){ message = 'cartão de crédito: titular data de nascimento valor inválido'; }
    else if(code=='53049'){ message = 'cartão de crédito: código de área titular é necessária.'; }
    else if(code=='53050'){ message = 'código de área titular do cartão de crédito valor inválido.'; }
    else if(code=='53051'){ message = 'telefone titular do cartão de crédito é exigido.'; }
    else if(code=='53052'){ message = 'cartão de crédito: telefone titular valor inválido.'; }
    else if(code=='53053'){ message = 'código postal endereço de cobrança é necessária.'; }
    else if(code=='53054'){ message = 'endereço de cobrança código postal valor inválido.'; }
    else if(code=='53055'){ message = 'rua endereço de cobrança é necessária.'; }
    else if(code=='53056'){ message = 'Endereço faturamento rua comprimento inválido.'; }
    else if(code=='53057'){ message = 'número de endereço de cobrança é necessária.'; }
    else if(code=='53058'){ message = 'faturamento número de endereço comprimento inválido.'; }
    else if(code=='53059'){ message = 'Endereço faturamento complemento comprimento inválido.'; }
    else if(code=='53060'){ message = 'distrito de endereço de cobrança é necessária.'; }
    else if(code=='53061'){ message = 'cobrança para o distrito endereço de comprimento inválido.'; }
    else if(code=='53062'){ message = 'cidade endereço de cobrança é necessária.'; }
    else if(code=='53063'){ message = 'facturação da cidade de endereços comprimento inválido.'; }
    else if(code=='53064'){ message = 'estado endereço de cobrança é necessária.'; }
    else if(code=='53065'){ message = 'faturamento estado endereço valor inválido.'; }
    else if(code=='53066'){ message = 'país do endereço de faturamento é necessária.'; }
    else if(code=='53067'){ message = 'comprimento inválido faturamento país endereço.'; }
    else if(code=='53068'){ message = 'receptor de e-mail comprimento inválido.'; }
    else if(code=='53069'){ message = 'receptor de e-mail valor inválido.'; }
    else if(code=='53070'){ message = 'ID de item é necessário.'; }
    else if(code=='53071'){ message = 'Item ID comprimento inválido.'; }
    else if(code=='53072'){ message = 'descrição do item é necessária.'; }
    else if(code=='53073'){ message = 'descrição do item comprimento inválido.'; }
    else if(code=='53074'){ message = 'quantidade do item é necessária.'; }
    else if(code=='53075'){ message = 'quantidade do item fora do intervalo.'; }
    else if(code=='53076'){ message = 'Item Quantidade valor inválido.'; }
    else if(code=='53077'){ message = 'é necessária montante item.'; }
    else if(code=='53078'){ message = 'montante item de padrão inválido.'; }
    else if(code=='53079'){ message = 'montante item para fora do intervalo.'; }
    else if(code=='53081'){ message = 'remetente está relacionada com receptor.'; }
    else if(code=='53084'){ message = 'receptor inválido., verifique o status da conta do destinatário e, se for uma conta de vendedor.'; }
    else if(code=='53085'){ message = 'método de pagamento indisponível.'; }
    else if(code=='53086'){ message = 'carrinho montante total fora do intervalo.'; }
    else if(code=='53087'){ message = 'dados de cartão de crédito inválidos.'; }
    else if(code=='53091'){ message = 'remetente de hash inválido.'; }
    else if(code=='53092'){ message = 'marca de cartão de crédito não é aceita.'; }
    else if(code=='53095'){ message = 'tipo de expedição padrão inválido.'; }
    else if(code=='53096'){ message = 'custo de transporte padrão inválido.'; }
    else if(code=='53097'){ message = 'custo de transporte fora do intervalo.'; }
    else if(code=='53098'){ message = 'carrinho valor total é negativa.'; }
    else if(code=='53099'){ message = 'quantia extra padrão inválido.'; }
    else if(code=='53101'){ message = 'modalidade de pagamento valor inválido, os valores válidos são padrão e gateway.'; }
    else if(code=='53102'){ message = 'Método pagamento valor inválido, os valores válidos são cartão de crédito, boleto e EFT.'; }
    else if(code=='53104'){ message = 'custo de transporte não foi fornecido, endereço de entrega deve ser completa.'; }
    else if(code=='53105'){ message = 'informações do remetente não foi fornecido, e-mail deve ser fornecido também.'; }
    else if(code=='53106'){ message = 'titular do cartão de crédito é incompleta.'; }
    else if(code=='53109'){ message = 'informações endereço de entrega não foi fornecido, e-mail do remetente deve ser fornecido também.'; }
    else if(code=='53110'){ message = 'banco EFT é necessária.'; }
    else if(code=='53111'){ message = 'banco EFT não é aceite.'; }
    else if(code=='53115'){ message = 'remetente data nascido valor inválido.'; }
    else if(code=='53117'){ message = 'remetente CNPJ valor inválido.'; }
    else if(code=='53122'){ message = 'e-mail remetente domínio inválido.. Você deve usar um e-mail @ sandbox.pagseguro.com.br'; }
    else if(code=='53140'){ message = 'quantidade parcela fora do intervalo.. O valor deve ser maior que zero.'; }
    else if(code=='53141'){ message = 'remetente é bloqueado.'; }
    else if(code=='53142'){ message = 'cartão de crédito inválido token.'; }
    else if(code=='11023'){ message = 'valor inválido: Paraná, deve caber o padrão: ("SP").'; }
    else if(code=='11017'){ message = 'Envio Código Postal inválido'; }
    else if(code==6)      { message = 'Unauthorized';  }
    else if(code==3)      { message = 'ID PEDIDO NÃO FOI EFETUADO NA TABELA PEDIDO';  }
    else if(code==2)      { message = 'CLIENTE NÃO EXISTE';  }
    else if(code==5)      { message = 'GATEWAY DESATIVADO';  }
    else if(code==4)      { message = 'SESSAO DOS PRODUTOS NÃO EXISTE';  }
    else if(code==7)      { message = 'DESCONTO DE CUPOM NÃO FOI ATRIBUIDO NO PEDIDO';  }
    else if(code==8)      { message = 'ACRESCIMO NÃO FOI ATRIBUIDO NO PEDIDO';  }
	else if(code==9)	  { message = 'UM OU MAIS PRODUTOS ACABARAM DE FICAR SEM ESTOQUE, POR FAVOR REMOVA O MESMO DO CARRINHO PARA CONTINUAR.';  }
    else if(code==10)     { message = 'PRODUTOS NÃO PUDERAM SER INSERIDOS.';  }
    else if(code==11)     { message = 'Ocorreu um erro ao gerar o Boleto, confira seu cadastro e tente novamente.';  }
    else                  { message = 'Por favor tente mais tarde!';  }
    
    return '<div class="alert alert-danger fade in">ERRO: '+message+'</div>';
}