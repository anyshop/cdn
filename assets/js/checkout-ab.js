/*FECHAR PEDIDO*/
function capturePaymentPaypal(dados, preloader_tokens, installmentsValue){
  $.ajax({
    type: "POST",
    async: true,
    data:{dados:dados,preloader_tokens:preloader_tokens},
    url:BASE_URL+'checkout/capturePaymentPaypal/',
    dataType: "json",
    success: function(data){ 
      var dados   = $('#form-sessao-endereco').serialize() + '&id_pagamento=12'+'&capture='+data.dados+'&preloader='+data.preloader+'&installmentsValue='+installmentsValue;
      fecharPedido(dados, 12);
    }
  });
}
/*FECHAR PEDIDO*/


function parse_str(qstr) {
  var query = {};
  var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
  for (var i = 0; i < a.length; i++) {
    var b = a[i].split('=');
    query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
  }
  return query;
}

function number_format(number, decimals, dec_point, thousands_sep) {

  number = (number + '')
  .replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
  prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
  sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
  dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
  s = '',
  toFixedFix = function(n, prec) {
    var k = Math.pow(10, prec);
    return '' + (Math.round(n * k) / k)
    .toFixed(prec);
  };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
  .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || '';
  s[1] += new Array(prec - s[1].length + 1)
  .join('0');
}
return s.join(dec);
}

function utf8_decode (strData) { // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/utf8_decode/
  // original by: Webtoolkit.info (http://www.webtoolkit.info/)
  //    input by: Aman Gupta
  //    input by: Brett Zamir (http://brett-zamir.me)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Norman "zEh" Fuchs
  // bugfixed by: hitwork
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: kirilloid
  // bugfixed by: w35l3y (http://www.wesley.eti.br)
  //   example 1: utf8_decode('Kevin van Zonneveld')
  //   returns 1: 'Kevin van Zonneveld'

  var tmpArr = []
  var i = 0
  var c1 = 0
  var seqlen = 0

  strData += ''

  while (i < strData.length) {
    c1 = strData.charCodeAt(i) & 0xFF
    seqlen = 0

    // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
    if (c1 <= 0xBF) {
      c1 = (c1 & 0x7F)
      seqlen = 1
    } else if (c1 <= 0xDF) {
      c1 = (c1 & 0x1F)
      seqlen = 2
    } else if (c1 <= 0xEF) {
      c1 = (c1 & 0x0F)
      seqlen = 3
    } else {
      c1 = (c1 & 0x07)
      seqlen = 4
    }

    for (var ai = 1; ai < seqlen; ++ai) {
      c1 = ((c1 << 0x06) | (strData.charCodeAt(ai + i) & 0x3F))
    }

    if (seqlen === 4) {
      c1 -= 0x10000
      tmpArr.push(String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF)))
      tmpArr.push(String.fromCharCode(0xDC00 | (c1 & 0x3FF)))
    } else {
      tmpArr.push(String.fromCharCode(c1))
    }

    i += seqlen
  }

  return tmpArr.join('')
}
/* TROCA FORMA DE PAGAMENTO */
function gateway(gateway) { 
 $( ".paymentOptions svg" ).css( "fill", '#000' );
 $( ".paymentOptions_"+gateway+' svg' ).css( "fill", '#FFF' );

 $( ".paymentOptions" ).removeClass( "on" );
 $( ".paymentOptions_"+gateway ).addClass( "on" );

 $( ".paymentBox" ).removeClass( "on" );
 $( ".paymentBox_"+gateway ).addClass( "on" );

 $( ".end" ).attr('id-pagamento', '');
 $( ".end_"+gateway ).attr('id-pagamento', gateway);
}

/* VALIDA DADOS ENDERECO */
function valida_endereco() { 

  	// DADOS ENDERECO
    var nome      = $('#nome').val();
    if(nome == "" || nome.length < 5){ 
      $('#nome').focus();
      $('#nome').css({"border":"#F00 solid 1px"});
      return 'Por favor preencha seu o nome!';
    }

    var cep      = $('#cep').val();
    if(cep == ""){ 
      $('#cep').focus();
      $('#cep').css({"border":"#F00 solid 1px"});
      return 'Por favor preencha seu cep!';
    }

    var endereco      = $('#endereco').val();
    if(endereco == "" || endereco.length < 5){
      $('#endereco').focus();
      $('#endereco').css({"border":"#F00 solid 1px"});
      return 'Por favor preencha seu endereço!';
    }

    var numero      = $('#numero').val();
    if(numero == ""){ 
      $('#numero').focus();
      $('#numero').css({"border":"#F00 solid 1px"});
      return 'Por favor preencha seu numero!';
    }

    var bairro      = $('#bairro').val();
    if(bairro == "" || bairro.length < 2){ 
      $('#bairro').focus();
      $('#bairro').css({"border":"#F00 solid 1px"});
      return 'Por favor preencha seu bairro!';
    }

    var id_estado      = $('#id_estado').val();
    if(id_estado == "" || id_estado == null){ 
      $('#id_estado').focus();
      $('#id_estado').css({"border":"#F00 solid 1px"});
      return 'Por favor selecione seu estado!';
    }

    var id_cidade      = $('#id_cidade').val();
    if(id_cidade == "" || id_cidade == null){
      $('#id_cidade').focus();
      $('#id_cidade').css({"border":"#F00 solid 1px"});
      return 'Por favor selecione sua cidade!';
    }

    return 1;

  }

  /* VALIDA DADOS CIELO */
  function valida_cielo() { 

  	// DADOS ENDERECO
    var portador_nome      = $('#portador_nome_cielo').val();
    if(portador_nome == ""){ 
      $('#portador_nome_cielo').focus();
      $('#portador_nome_cielo').css({"border":"#F00 solid 1px"});
      return 'Por favor preencha seu o Nome impresso no cartão!';
    }

    var portador_bandeira      = $('#portador_bandeira_cielo').val();
    if(portador_bandeira == ""){ 
      $('#portador_bandeira_cielo').focus();
      $('#portador_bandeira_cielo').css({"border":"#F00 solid 1px"});
      return 'Por favor escolha a Bandeira do cartão!';
    }

    var portador_parcelas      = $('#portador_parcelas_cielo').val();
    if(portador_parcelas == ""){ 
      $('#portador_parcelas_cielo').focus();
      $('#portador_parcelas_cielo').css({"border":"#F00 solid 1px"});
      return 'Por favor escolha o Parcelamento!';
    }

    var portador_numero_cartao      = $('#portador_numero_cartao_cielo').val();
    if(portador_numero_cartao == ""){
      $('#portador_numero_cartao_cielo').focus();
      $('#portador_numero_cartao_cielo').css({"border":"#F00 solid 1px"});
      return 'Por favor preencha o Número do cartão!';
    }

    var portador_cvc      = $('#portador_cvc_cielo').val();
    if(portador_cvc == ""){
      $('#portador_cvc_cielo').focus();
      $('#portador_cvc_cielo').css({"border":"#F00 solid 1px"});
      return 'Por favor preencha o CVC 3/4 Últimos Dígitos!';
    }

    var portador_validade      = $('#portador_validade_cielo').val();
    if(portador_validade == ""){ 
      $('#portador_validade_cielo').focus();
      $('#portador_validade_cielo').css({"border":"#F00 solid 1px"});
      return 'Por favor preencha a Validade do cartão!';
    }

    return 1;

  }
  /* VALIDA DADOS CIELO */

  /*valida_rede_komerci_transparente*/
  function valida_rede_komerci_transparente() { 

  	// DADOS ENDERECO
    var rede_portador_nome = $('#rede_portador_nome').val();
    if(rede_portador_nome == ""){ 
      $('#rede_portador_nome').focus();
      $('#rede_portador_nome').css({"border":"#F00 solid 1px"});
      return 'Por favor preencha seu o Nome impresso no cartão!';
    }

    var rede_portador_bandeira = $('#rede_portador_bandeira').val();
    if(rede_portador_bandeira == ""){ 
      $('#rede_portador_bandeira').focus();
      $('#rede_portador_bandeira').css({"border":"#F00 solid 1px"});
      return 'Por favor escolha a Bandeira do cartão!';
    }

    var rede_portador_parcelas = $('#rede_portador_parcelas').val();
    if(rede_portador_parcelas == ""){ 
      $('#rede_portador_parcelas').focus();
      $('#rede_portador_parcelas').css({"border":"#F00 solid 1px"});
      return 'Por favor escolha o Parcelamento!';
    }

    var rede_portador_numero_cartao = $('#rede_portador_numero_cartao').val();
    if(rede_portador_numero_cartao == ""){
      $('#rede_portador_numero_cartao').focus();
      $('#rede_portador_numero_cartao').css({"border":"#F00 solid 1px"});
      return 'Por favor preencha o Número do cartão!';
    }

    var rede_portador_cvc = $('#rede_portador_cvc').val();
    if(rede_portador_cvc == ""){
      $('#rede_portador_cvc').focus();
      $('#rede_portador_cvc').css({"border":"#F00 solid 1px"});
      return 'Por favor preencha o CVC 3/4 Últimos Dígitos!';
    }

    var rede_portador_mes_validade = $('#rede_portador_mes_validade').val();
    if(rede_portador_mes_validade == ""){ 
      $('#rede_portador_mes_validade').focus();
      $('#rede_portador_mes_validade').css({"border":"#F00 solid 1px"});
      return 'Por favor selecione o Mês de Validade do cartão!';
    }

    var rede_portador_ano_validade = $('#rede_portador_ano_validade').val();
    if(rede_portador_ano_validade == ""){ 
      $('#rede_portador_mes_validade').focus();
      $('#rede_portador_mes_validade').css({"border":"#F00 solid 1px"});
      return 'Por favor selecione o Mês de Validade do cartão!';
    }

    return 1;

  }
  /*valida_rede_komerci_transparente*/

  /*VALIDA PAGASEGURO TRANSPARENTE*/
  function valida_pagseguro_transparente(){ 
    var tipo_pagamento      = $('.tipo_pagamento').val();
    if(tipo_pagamento == ""){ 
      return 'Por favor selecione a forma de Pagamento!';
    }

    return 1;
  }

  /*VALIDA PAGASEGURO TRANSPARENTE*/

  /*VALIDA FATURAMENTO*/
  function valida_faturamento_(){ 

    var radioValues = '';

    $('.id_faturamento:checked').each(function() {
      radioValues += $(this).val();
    });

    if(radioValues == ''){ 
      return 'Por favor selecione a forma de Faturamento!';
    }

    return 1;
  }
  /*VALIDA PAGASEGURO TRANSPARENTE*/

  /*VALIDA PAGASEGURO TRANSPARENTE*/
  function valida_pagseguro_transparente_cartao(){ 
   var portador_nome      = $('#portador_nome').val();
   if($("#portador_nome").val() == "" || $("#portador_nome").val() < 5){
    alert('Por favor digite o nome do titular!');  
    $("#portador_nome").focus();
    $("#portador_nome").css({"border":"#F00 solid 1px"});
    return false;
  }

  var portador_cpf      = $('#portador_cpf').val();
  if($("#portador_cpf").val() == "" || $("#portador_cpf").val() < 14){
    alert('Por favor digite o cpf do titular!');  
    $("#portador_cpf").focus();
    $("#portador_cpf").css({"border":"#F00 solid 1px"});
    return false;
  }

  var portador_data_nascimento      = $('#portador_data_nascimento').val();
  if($("#portador_data_nascimento").val() == "" || $("#portador_data_nascimento").val() < 10){
    alert('Por favor digite a data de nascimento do titular!');  
    $("#portador_data_nascimento").focus();
    $("#portador_data_nascimento").css({"border":"#F00 solid 1px"});
    return false;
  }

  var portador_ddd      = $('#portador_ddd').val();
  if($("#portador_ddd").val() == "" || $("#portador_ddd").val() < 2){
    alert('Por favor digite o DDD!');  
    $("#portador_ddd").focus();
    $("#portador_ddd").css({"border":"#F00 solid 1px"});
    return false;
  }

  var portador_telefone      = $('#portador_telefone').val();
  if($("#portador_telefone").val() == "" || $("#portador_telefone").val() < 5){
    alert('Por favor digite o Telefone!');  
    $("#portador_telefone").focus();
    $("#portador_telefone").css({"border":"#F00 solid 1px"});
    return false;
  }

  var portador_numero_cartao      = $('#portador_numero_cartao').val();
  if($("#portador_numero_cartao").val() == "" || $("#portador_numero_cartao").val() < 5){
    alert('Por favor digite o número do cartão!');  
    $("#portador_numero_cartao").focus();
    $("#portador_numero_cartao").css({"border":"#F00 solid 1px"});
    return false;
  }

  var tipo_pagamento_bandeira      = $('.tipo_pagamento_bandeira').val();
  if($(".tipo_pagamento_bandeira").val() == "" || $(".tipo_pagamento_bandeira").val() == ""){
    alert('Por favor escolha o cartão!');  
    $(".tipo_pagamento_bandeira").focus();
    $(".tipo_pagamento_bandeira").css({"border":"#F00 solid 1px"});
    $(".tipo_pagamento_bandeira").focus();
    return false;
  }

  var codigo      			  = $('#codigo').val();
  if($("#codigo").val() == "" || $("#codigo").val() == ""){
    alert('Por favor digite o codigo de seguranca!');  
    $("#codigo").focus();
    $("#codigo").css({"border":"#F00 solid 1px"});
    return false;
  }

  var validade_mes      			  = $('#validade_mes').val();
  if($("#validade_mes").val() == "" || $("#validade_mes").val() == ""){
    alert('Por favor digite o mes de validade!');  
    $("#validade_mes").focus();
    $("#validade_mes").css({"border":"#F00 solid 1px"});
    return false;
  }

  var validade_ano = $('#validade_ano').val();
  if($("#validade_ano").val() == "" || $("#validade_ano").val() == ""){
    alert('Por favor digite o ano de validade!');  
    $("#validade_ano").focus();
    $("#validade_ano").css({"border":"#F00 solid 1px"});
    return false;
  }

  var numeroParcelas = $('#numeroParcelas').val();
  if($("#numeroParcelas").val() == "" || $("#numeroParcelas").val() == ""){
    alert('Por favor seleciona a quantidade de parcelas!');  
    $("#numeroParcelas").focus();
    $("#numeroParcelas").css({"border":"#F00 solid 1px"});
    return false;
  }

  return 1;
}
/*VALIDA PAGASEGURO TRANSPARENTE*/

$(document).on("click",".end",function() {


	var valida = valida_endereco();

	if(valida!=1){
		alert(valida);
		return false;
	}

	var id_pagamento      = $(this).attr('id-pagamento');

  if(id_pagamento==''){
    alert("Selecione uma forma de pagamento.");
    return false;
  }

  /*################# REDE KOMMERCE ################*/
  if(id_pagamento==16){
    var valida_dados_rede_transparente = valida_rede_komerci_transparente();
    if(valida_dados_rede_transparente!=1){
     alert(valida_dados_rede_transparente);
     return false;
   }

   var dados = $('#form-sessao-endereco').serialize() + '&id_pagamento='+id_pagamento + '&' + $('#form-sessao-rede-transparente').serialize();
   fecharPedido(dados, id_pagamento);
 }
 /*################# REDE KOMMERCE ################*/

 /*################# FATURAMENTO ################*/
 else if(id_pagamento==20){
  var valida_faturamento = valida_faturamento_();
  if(valida_faturamento!=1){
    alert(valida_faturamento);
    return false;
  }

  $('.id_faturamento:checked').each(function() {
    id_faturamento = $(this).val();
  });

  var dados = $('#form-sessao-endereco').serialize() + '&id_pagamento='+id_pagamento + '&id_faturamento='+id_faturamento;
  fecharPedido(dados, id_pagamento);
}
else if(id_pagamento==8){
  var tipo_pagamento      = $(".tipo_pagamento").val();

  var valida_dados_pagseguro_transparente = valida_pagseguro_transparente();
  if(valida_dados_pagseguro_transparente!=1){
   alert(valida_dados_pagseguro_transparente);
   return false;
 }

 /*################# CREDIT_CARD ################*/
 if(tipo_pagamento=="CREDIT_CARD"){

   var tipo_pagamento_bandeira 	= $(".tipo_pagamento_bandeira").val();
   var portador_nome  				    = $('#portador_nome').val();
   var portador_cpf 				      = $('#portador_cpf').val();
   var portador_data_nascimento 	= $('#portador_data_nascimento').val();
   var portador_ddd 				      = $('#portador_ddd').val();
   var portador_telefone 			  = $('#portador_telefone').val();
   var portador_numero_cartao 		= $('#portador_numero_cartao').val();
   var portador_parcelas 			  = $('#portador_parcelas').val();
   var portador_cvc 				      = $('#portador_cvc').val();
   var portador_validade_mes 		= $('#portador_validade_mes').val();
   var portador_validade_ano 		= $('#portador_validade_ano').val();
   var parcelas_sem_juros        = $('.parcelas_sem_juros').val();
   var cep                       = $('#cep').val();
   var bandeira_name             = $('.tipo_pagamento_bandeira_name').val();

   var valida_dados_pagseguro_transparente_cartao = valida_pagseguro_transparente_cartao();
   if(valida_dados_pagseguro_transparente_cartao!=1){
    return false;
  }

  var hash = PagSeguroDirectPayment.getSenderHash();

  PagSeguroDirectPayment.createCardToken({
   cardNumber: portador_numero_cartao,
   brand: tipo_pagamento_bandeira.toLowerCase(),
   cvv: portador_cvc,
   expirationMonth: portador_validade_mes,
   expirationYear: portador_validade_ano,
   success: function(response){
    dados = $('#form-sessao-endereco').serialize() + '&id_pagamento='+id_pagamento + '&tipo_pagamento='+tipo_pagamento +  '&hash='+hash +  '&bandeira='+tipo_pagamento_bandeira  +  '&tokenCartao='+response.card.token   +  '&parcelas_sem_juros='+parcelas_sem_juros   +  '&cep='+cep +  '&bandeira_name='+bandeira_name + '&' + $('#form-sessao-pagseguro-transparente').serialize();
    fecharPedido(dados, id_pagamento);
  },
  error: function(response){
   $('.mensagem_retorno_'+id_pagamento).html('<div class="alert alert-danger fade in">ERRO: '+Object.values(response.errors)+'</div>');  
   $(".end").show();
 }
});
}	
/*################# CREDIT_CARD ################*/

/*################# ONLINE_DEBIT ################*/
if(tipo_pagamento=="ONLINE_DEBIT"){
 var tipo_pagamento_debito 		= $(".tipo_pagamento_debito").val();
 var tipo_pagamento_debito_name 	= $(".tipo_pagamento_debito_name").val();

 if(tipo_pagamento_debito == ""){ 
   alert( 'Por favor selecione o banco!' );
   return false;
 }

 var hash = PagSeguroDirectPayment.getSenderHash();
 var dados = $('#form-sessao-endereco').serialize() + '&id_pagamento='+id_pagamento + '&tipo_pagamento='+tipo_pagamento +  '&hash='+hash +  '&banco='+tipo_pagamento_debito  +  '&banco_name='+tipo_pagamento_debito_name + '&' + $('#form-sessao-pagseguro-transparente').serialize();
 fecharPedido(dados, id_pagamento);
}
/*################# ONLINE_DEBIT ################*/

/*################# BOLETO ################*/
if(tipo_pagamento=="BOLETO"){
 var hash = PagSeguroDirectPayment.getSenderHash();
 var dados = $('#form-sessao-endereco').serialize() + '&id_pagamento='+id_pagamento + '&tipo_pagamento='+tipo_pagamento +  '&hash='+hash + '&' + $('#form-sessao-pagseguro-transparente').serialize();
 fecharPedido(dados, id_pagamento);
}
/*################# BOLETO ################*/

/*################# DEPOSIT ################*/
if(tipo_pagamento=="DEPOSIT"){
 var tipo_pagamento_deposito 		= $(".tipo_pagamento_deposito").val();
 var tipo_pagamento_deposito_name 	= $(".tipo_pagamento_deposito_name").val();

 if(tipo_pagamento_deposito == ""){ 
  alert( 'Por favor selecione o banco!' );
  return false;
}

var hash = PagSeguroDirectPayment.getSenderHash();
var dados = $('#form-sessao-endereco').serialize() + '&id_pagamento='+id_pagamento + '&tipo_pagamento='+tipo_pagamento +  '&hash='+hash +  '&banco='+tipo_pagamento_deposito  +  '&banco_name='+tipo_pagamento_deposito_name + '&' + $('#form-sessao-pagseguro-transparente').serialize();
fecharPedido(dados, id_pagamento);
}
/*################# DEPOSIT ################*/

}

/*################# PAGEGURO TRANSPARENTE ################*/

/*################# CIELO API 3.0 ################*/
else if(id_pagamento==7){
  var forma_pagamento      = $('#portador_forma_pagamento').val();

  if(forma_pagamento=='Boleto' || forma_pagamento=='EletronicTransfer'){
    var valida_dados_cielo   = 1; 
  }else {
    var valida_dados_cielo   = valida_cielo(); 
  }
  if(valida_dados_cielo!=1){
    alert(valida_dados_cielo);
    return false;
  }
  var dados = $('#form-sessao-endereco').serialize() + '&id_pagamento='+id_pagamento + '&' + $('#form-sessao-cielo').serialize();
  fecharPedido(dados, id_pagamento);
}
/*################# CIELO API 3.0 ################*/

/*################# CREDITALL ################*/
else if(id_pagamento==19){
  var dados     = $('#form-sessao-endereco').serialize() + '&id_pagamento='+id_pagamento;
  var processar = processar_creditall_sessao(dados, id_pagamento);
  fecharPedido(dados, id_pagamento);
}
/*################# CREDITALL ################*/

/*################# PAYPAL PLUS ################*/
else if(id_pagamento==12){

}
/*################# PAYPAL PLUS ################*/

/*################# WIRECARD ################*/
else if(id_pagamento==21){
  var dados = $('#form-sessao-endereco').serialize() + '&id_pagamento='+id_pagamento + '&' + $('#form-sessao-wirecard-transparente').serialize();
  fecharPedido(dados, id_pagamento);
}
/*################# WIRECARD ################*/

/*################# GERAL ################*/
else {
 var dados = $('#form-sessao-endereco').serialize() + '&id_pagamento='+id_pagamento;
 fecharPedido(dados, id_pagamento);
}
/*################# GERAL ################*/

});

/*CIELO WEBSERVICE*/
function cielo_tipo_pagamento(tipo_pagamento){
	if(tipo_pagamento=="CreditCard"){
		$('.ContainerBanco').hide();
		$('.ContainerBandeiraCartao').show();
		$('.ContainerNomeCartao').show();
		$('.ContainerQtdeParcelas').show();
		$('.ContainerNumeroCartao').show();
		$('.ContainerCVC').show();
		$('.ContainerDataValidade').show();

		var preco_sem_desconto = $('.preco_sem_desconto').val();
		$('.valores').html("<span>Valor Total: <br><b>"+preco_sem_desconto+"</b></span>");
	}	

	if(tipo_pagamento=="DebitCard"){
		$('.ContainerBanco').hide();
		$('.ContainerBandeiraCartao').show();
		$('.ContainerNomeCartao').show();
		$('.ContainerQtdeParcelas').hide();
		$('.ContainerNumeroCartao').show();
		$('.ContainerCVC').show();
		$('.ContainerDataValidade').show();

		var desconto_vista_debito_cielo_webservice = $('.desconto_vista_debito_cielo_webservice').val();
		var desconto_vista_debito_cielo_webservice_final = $('.desconto_vista_debito_cielo_webservice_final').val();
		$('.valores').html("<span>Valor Total: <br><b>"+desconto_vista_debito_cielo_webservice_final+"</b></span>");
	}
	
	if(tipo_pagamento=="Boleto"){
		$('.ContainerBanco').show();
		$('.ContainerBandeiraCartao').hide();
		$('.ContainerNomeCartao').hide();
		$('.ContainerQtdeParcelas').hide();
		$('.ContainerNumeroCartao').hide();
		$('.ContainerCVC').hide();
		$('.ContainerDataValidade').hide();

		var desconto_vista_boleto_cielo_webservice = $('.desconto_vista_boleto_cielo_webservice').val();
		var desconto_vista_boleto_cielo_webservice_final = $('.desconto_vista_boleto_cielo_webservice_final').val();
		$('.valores').html("<span>Valor Total: <br><b>"+desconto_vista_boleto_cielo_webservice_final+"</b></span>");
	}

	if(tipo_pagamento=="EletronicTransfer"){
		$('.ContainerBanco').show();
		$('.ContainerBandeiraCartao').hide();
		$('.ContainerNomeCartao').hide();
		$('.ContainerQtdeParcelas').hide();
		$('.ContainerNumeroCartao').hide();
		$('.ContainerCVC').hide();
		$('.ContainerDataValidade').hide();

		var desconto_vista_transferencia_cielo_webservice = $('.desconto_vista_transferencia_cielo_webservice').val();
		var desconto_vista_transferencia_cielo_webservice_final = $('.desconto_vista_transferencia_cielo_webservice_final').val();
		$('.valores').html("<span>Valor Total: <br><b>"+desconto_vista_transferencia_cielo_webservice_final+"</b></span>");
	}
}

function select_bandeira(bandeira) {
	$('#'+bandeira).show();
}

function reseta_cielo() {
  $('#portador_nome_cielo').val('');
  $('#portador_numero_cartao_cielo').val('');
  $('#portador_cvc_cielo').val('');
  $('#portador_validade_cielo').val('');
}

/*PAGSEGURO TRANSPARENTE - SELECIONA FORMA DE PAGAMENTO*/
$(document).on('click', '.select-item-pagseguro', function(e) { 
  var tipo          = $(this).attr('data-tipo');

  $('.select-item-pagseguro').css("background", "transparent");
  $('.select-item-pagseguro').css("border-color", "#E6E6E6");
  $(this).css("background", "#E6E6E6");
  $(this).css("border-color", "#adadad");
  $('.container-sub-pagseguro').hide();
  $('.pagseguro-'+tipo).show();
  $('.tipo_pagamento').val(tipo);

    //if(tipo=="CREDIT_CARD"){
      var preco_sem_desconto = $('.preco_sem_desconto_pagseguro_transparente').val();
      $('.valores').html("<span>Valor Total: <br><b>"+preco_sem_desconto+"</b></span>");
	  //}	

    /*
  	if(tipo=="ONLINE_DEBIT"){
  		var desconto_vista_debito_pagseguro_transparente 		 = $('.desconto_vista_debito_pagseguro_transparente').val();
  		var desconto_vista_debito_pagseguro_transparente_final 	 = $('.desconto_vista_debito_pagseguro_transparente_final').val();
  		$('.valores').html("<span>Valor Total: <br><b>"+desconto_vista_debito_pagseguro_transparente_final+"</b></span>");
  	}
  	
  	if(tipo=="BOLETO"){
  		var desconto_vista_boleto_pagseguro_transparente 		= $('.desconto_vista_boleto_pagseguro_transparente').val();
  		var desconto_vista_boleto_pagseguro_transparente_final 	= $('.desconto_vista_boleto_pagseguro_transparente_final').val();
  		$('.valores').html("<span>Valor Total: <br><b>"+desconto_vista_boleto_pagseguro_transparente_final+"</b></span>");
  	}
  	
  	if(tipo=="DEPOSIT"){
  		var desconto_vista_transferencia_pagseguro_transparente 		= $('.desconto_vista_transferencia_pagseguro_transparente').val();
  		var desconto_vista_transferencia_pagseguro_transparente_final 	= $('.desconto_vista_transferencia_pagseguro_transparente_final').val();
  		$('.valores').html("<span>Valor Total: <br><b>"+desconto_vista_transferencia_pagseguro_transparente_final+"</b></span>");
  	}*/

  });
/*PAGSEGURO TRANSPARENTE - SELECIONA FORMA DE PAGAMENTO*/

/*PAGSEGURO TRANSPARENTE - SELECIONA O BANCO*/
$(document).on('click', '.select-item-banco', function(e) { 
  var banco          = $(this).attr('data-banco');
  var banco_name     = $(this).attr('data-name-banco');

  $('.select-item-banco').css("background", "transparent");
  $('.select-item-banco').css("border-color", "#E6E6E6");
  $(this).css("background", "#E6E6E6");
  $(this).css("border-color", "#adadad");
  $('.tipo_pagamento_debito').val(banco);
  $('.tipo_pagamento_debito_name').val(banco_name);

});
/*PAGSEGURO TRANSPARENTE - SELECIONA O BANCO*/

/*PAGSEGURO TRANSPARENTE - SELECIONA O BANCO DEPOSITO*/
$(document).on('click', '.select-item-banco-deposito', function(e) { 
  var banco          = $(this).attr('data-banco-deposito');
  var banco_name     = $(this).attr('data-name-banco-deposito');

  $('.select-item-banco-deposito').css("background", "transparent");
  $('.select-item-banco-deposito').css("border-color", "#E6E6E6");
  $(this).css("background", "#E6E6E6");
  $(this).css("border-color", "#adadad");
  $('.tipo_pagamento_deposito').val(banco);
  $('.tipo_pagamento_deposito_name').val(banco_name);

});
/*PAGSEGURO TRANSPARENTE - SELECIONA O BANCO DEPOSITO*/

/*PAGSEGURO TRANSPARENTE - SELECIONA O BANCO DEPOSITO*/
$(document).on('click', '.select-item-bandeira', function(e) { 
  var bandeira          = $(this).attr('data-bandeira');
  var bandeira_name     = $(this).attr('data-name-bandeira');

  $('.select-item-bandeira').css("background", "transparent");
  $('.select-item-bandeira').css("border-color", "#E6E6E6");
  $(this).css("background", "#E6E6E6");
  $(this).css("border-color", "#adadad");
  $('.tipo_pagamento_bandeira').val(bandeira);
  $('.tipo_pagamento_bandeira_name').val(bandeira_name);

  var res 				= $('.preco_sem_desconto_pagseguro_transparente').val().replace("R$", "");
  var res1 				= res.replace(",", ".");
  var preco_sem_desconto  = number_format(res1, 2, '.', '');
  var parcelas_sem_juros  = $('.parcelas_sem_juros').val();
  var id_pagamento      = $(this).attr('id-pagamento');
  
  var cartao = bandeira.toLowerCase();   

  if(parcelas_sem_juros > 1){

    PagSeguroDirectPayment.getInstallments({

      amount: preco_sem_desconto,
      maxInstallmentNoInterest: parcelas_sem_juros,
      brand: cartao,  

      success: function(response){
        console.log(response);
        var juros = '';
        var numeroParcelasSelect = '';

        var installment = response.installments[cartao];

        $.each(installment, function(key,value){
          if(value.interestFree){
            juros = 'sem juros'; 
          }else {
            juros = 'com juros'; 
          }

          var valor_parcela_mostra  = number_format(value.installmentAmount, 2, ',', '.');
          var valor_parcela_post    = number_format(value.installmentAmount, 2, '.', '');
          var total_post            = number_format(value.installmentAmount * value.quantity, 2, ',', '');
          numeroParcelasSelect+= '<option value='+value.quantity+'-'+valor_parcela_post+'>'+value.quantity+'x de R$ '+valor_parcela_mostra+' '+juros+' - R$ '+total_post+'</option>';
        });

        $('.ContainerQtdeParcelas').show();
        $('#portador_parcelas').html(numeroParcelasSelect);

      },
      error: function(response){
        //alert(Object.values(response.errors));
        $('.mensagem_retorno_'+id_pagamento).html('<div class="alert alert-danger fade in">ERRO: '+Object.values(response.errors)+'</div>');  
        $(".end").show();
      }

    });

  }else {

    PagSeguroDirectPayment.getInstallments({

      amount: preco_sem_desconto,
      brand: cartao,  

      success: function(response){
        console.log(response);
        var juros = '';
        var numeroParcelasSelect = '';

        var installment = response.installments[cartao];

        $.each(installment, function(key,value){
          if(value.interestFree){
            juros = 'sem juros'; 
          }else {
            juros = 'com juros'; 
          }

          var valor_parcela_mostra  = number_format(value.installmentAmount, 2, ',', '.');
          var valor_parcela_post    = number_format(value.installmentAmount, 2, '.', '');
          var total_post            = number_format(value.installmentAmount * value.quantity, 2, ',', '');
          numeroParcelasSelect+= '<option value='+value.quantity+'-'+valor_parcela_post+'>'+value.quantity+'x de R$ '+valor_parcela_mostra+' '+juros+' - R$ '+total_post+'</option>';
        });

        $('.ContainerQtdeParcelas').show();
        $('#portador_parcelas').html(numeroParcelasSelect);

      },
      error: function(response){
        //alert(Object.values(response.errors));
        $('.mensagem_retorno_'+id_pagamento).html('<div class="alert alert-danger fade in">ERRO: '+Object.values(response.errors)+'</div>');  
        $(".end").show();
      }

    });

  }    



});
/*PAGSEGURO TRANSPARENTE - SELECIONA O BANCO DEPOSITO*/

/*FECHAR PEDIDO*/
function fecharPedido(dados, id_pagamento){
  $.ajax({
    type: "POST",
    async: true,
    data:dados,
    url:BASE_URL+'checkout/finalizar_transacao/',
    dataType: "json",
    beforeSend: function(){
      $("#pageloader").fadeIn('fast');
      $(".end").hide();
      //$('.mensagem_retorno_'+id_pagamento).html('<div class="conteudo_retorno alert alert-warning fade in"></div>');
      //$('.mensagem_retorno_'+id_pagamento+' .conteudo_retorno').append('<span class="loader"></span><br><br>Aguarde enquanto estamos finalizando a compra.');
      //setTimeout(function(){ }, 5000);

    },
    success: function(data){ 
      if(data.status==1){

        Swal.fire({
          title:  "Sucesso!",
          type:   "success",
          text:   data.Message,
          timer:  10000,
          showConfirmButton: false,
        });

        //$('.mensagem_retorno_'+id_pagamento).html('<div class="conteudo_retorno alert alert-success fade in"></div>');
        //$('.mensagem_retorno_'+id_pagamento+' .conteudo_retorno').append('<span class="loader"></span><br><br>'+data.Message+'');

        if(data.form_itau){
          //$('.mensagem_retorno_'+id_pagamento+' .conteudo_retorno').append('<form method="post"  name="itau_shop" action="https://shopline.itau.com.br/shopline/shopline.asp" id="itau_shop"><INPUT type="hidden" name="DC" value="'+data.form_itau+'"></form>');
          //setTimeout(function(){ document.getElementById("itau_shop").submit(); }, 3000);
        }else {
          //setTimeout(function(){ window.location.href = data.link; }, 5000);
        }
        setTimeout(function(){ window.location.href = data.link; }, 3000);

        $("#pageloader").delay(400).fadeOut("fast");

      }
      else {

        Swal.fire({
          title:  "Erro!",
          type:   "error",
          text:   data.error,
          timer:  10000,
          showConfirmButton: false
        });

        if(id_pagamento==7){
          reseta_cielo();
        }

        $('.mensagem_retorno_'+id_pagamento).html('<div class="alert alert-danger fade in">ERRO: '+data.error+'</div>');  
        $(".end").show();

        $("#pageloader").delay(400).fadeOut("fast");
        $('.doContinue').css('display', 'block');
      }

    }

  });
}
/*FECHAR PEDIDO*/

/*CREDIALL*/
function processar_creditall_sessao(dados, id_pagamento){
  $.ajax({
    type: "POST",
    async: true,
    url:BASE_URL+'store_gateway/processar_creditall/',
    dataType: "json",
    success: function(data){ 
      dados = parse_str(dados);
      processar_creditall(dados, id_pagamento, data);
    }

  });
}


function processar_creditall(dados, id_pagamento, creditall){
  var time = $.now();
  console.log(creditall);
  console.log(creditall.cliente);

  var desconto_vista_creditall  = creditall.creditall.token_creditall;
  if(creditall.creditall.pag_parcial_creditall){
    var pag_parcial_creditall   = "1";
  }else {
    var pag_parcial_creditall   = "0";
  }
  var token_creditall           = creditall.creditall.token_creditall;

  var celular                   = creditall.cliente.celular.split(' ');
  var dddcelular                = celular[0].replace("(", "");
  var ddd_finalcelular          = dddcelular.replace(")", "");

  var telefone                  = creditall.cliente.telefone.split(' ');
  var ddd                       = telefone[0].replace("(", "");
  var ddd_final                 = ddd.replace(")", "");

  var data                      = creditall.cliente.nascimento.split('-');
  var ano                       = data[0];
  var mes                       = data[1];
  var dia                       = data[2];
  var token                     = token_creditall;
  if(creditall.cliente.tipo=='f'){
    var documento               = creditall.cliente.cpf;
    var nome                    = creditall.cliente.nome;
  }else {
    var documento               = creditall.cliente.cnpj;
    var nome                    = creditall.cliente.razao_social;
  }
  var pag_parcial               = pag_parcial_creditall;
  var codigo_controle           = time;
  var datanascimento            = dia+'/'+mes+'/'+ano;
  var ddd_celular               = ddd_finalcelular;
  var fone_celular              = celular[1];
  var ddd_fixo                  = ddd_final;
  var fone_fixo                 = telefone[1];
  var email                     = creditall.cliente.email
  var cep                       = creditall.cliente.cep;
  var endereco                  = creditall.cliente.endereco
  var endereco_numero           = creditall.cliente.numero;
  var bairro                    = creditall.cliente.bairro;
  var cidade                    = creditall.cidade.nome;
  var estado                    = creditall.estado.uf;

  var Produtos                  = new Array();
  $.each(creditall.carrinhoFinaliza.listaProduto, function(key,value){
    key = key+1;
    Produtos['codigo_produto_'+key]     = value.id_produto; 
    Produtos['descricao_produto_'+key]  = value.produto_titulo+' - '+value.titulo_infoExtra+' - '+value.variacao_descricao_titulo; 
    Produtos['qtde_produto_'+key]       = value.quantidade_sessao; 
    if(creditall.cliente.tipo=='f'){
      Produtos['valor_produto_'+key]    = value.variacao_preco_pf;
    }else {
      Produtos['valor_produto_'+key]    = value.variacao_preco_pj;
    }
  });

  console.log(Produtos);

  var desconto                  = "0.00";
  if(creditall.carrinho_frete_valor){
    var frete   = creditall.carrinho_frete_valor;
  }else {
    var frete   = "0.00";
  }

  $.post('https://www.siscredit.com.br/ecommerce/index.php', { token:token, pag_parcial:pag_parcial, documento: documento, codigo_controle:codigo_controle, nome:nome, datanascimento:datanascimento,ddd_celular:ddd_celular, fone_celular:fone_celular, ddd_fixo:ddd_fixo, fone_fixo:fone_fixo, email:email, cep:cep, endereco:endereco, endereco_numero:endereco_numero, bairro:bairro, cidade:cidade, estado:estado, codigo_produto_1:"121", descricao_produto_1:"teste", qtde_produto_1:"1", valor_produto_1:"180.00", frete:frete, desconto:desconto}, function(retorno){
    var retorno = $.trim(retorno);
    CheckoutCreditall(retorno);
  });
  
}

/*CREDIALL*/
