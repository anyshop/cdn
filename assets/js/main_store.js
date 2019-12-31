


function controlarQtdeProdutoInfoExtra(){
    $('#product .variacao-opcao .variacao-tamanho select').change(function(){
        var idProduto = $(this).closest('.variacao-opcao').find('input[name*=idProduto]').val();
        var idVariacao = $(this).find('option:selected').val();
        var qtde = $(this).find('option:selected').attr('qtde');
        var titulo_cor = $(this).find('option:selected').attr('nome-cor');
        var titulo_info_extra = $(this).find('option:selected').attr('nome-info-extra');
        
        $(this).closest('.variacao-opcao').find('.variacao-qtde .wrapper input').val(0);
        $(this).closest('.variacao-opcao').find('input[name*=idVariacao]').val(idVariacao);
        $('#box-avise-me .head-avise-me').html();
        $('#box-avise-me .head-avise-me').html('<p><span>'+titulo_cor+'</span> | <span>'+titulo_info_extra+'</span></p>');
        $("#box-avise-me").addClass('hide').slideUp(500);

        $("#box-avise-me input[name*=idProduto]").val(idProduto);
        $("#box-avise-me input[name*=idVariacao]").val(idVariacao);

        if (qtde > 0){
            $(this).closest('.variacao-opcao').find('.variacao-qtde .wrapper').removeClass('hide');
            $(this).closest('.variacao-opcao').find('.variacao-qtde .btn-avise-me').addClass('hide');
            $(this).closest('.variacao-opcao').find('input[name*=idVariacao]').removeAttr('disabled');
            $(this).closest('.variacao-opcao').find('input[name*=idProduto]').removeAttr('disabled');
            $(this).closest('.variacao-opcao').find('.variacao-qtde input[name*=qtde]').removeAttr('disabled');
        }else{
            $(this).closest('.variacao-opcao').find('.variacao-qtde .wrapper').addClass('hide');
            $(this).closest('.variacao-opcao').find('.variacao-qtde .btn-avise-me').removeClass('hide');
            $(this).closest('.variacao-opcao').find('input[name*=idVariacao]').attr('disabled', true);
            $(this).closest('.variacao-opcao').find('input[name*=idProduto]').attr('disabled', true);
            $(this).closest('.variacao-opcao').find('.variacao-qtde input[name*=qtde]').attr('disabled', true);
        }

        controlarAddToCartButton();

    });
}

function controlarAddToCartButton(){
    
    var notAvailableBool = true;

    $('#product .variacao-opcao').each(function(index,value) {
        var notAvailable = $(value).find('.variacao-qtde .wrapper').hasClass('hide');
        notAvailableBool = notAvailableBool && notAvailable;
    });
    if (notAvailableBool){
        $('#product .pb-right-column .product-price-group .button-group .btn-add-cart').addClass('hide');
    }else{
        $('#product .pb-right-column .product-price-group .button-group .btn-add-cart').removeClass('hide');
    }

}

function clickAddToCartButton(){

    var qtde;
    var qtdeBool = false;

    $('#product .variacao-opcao').each(function(index,value) {
        var notAvailable = $(value).find('.variacao-qtde .wrapper').hasClass('hide');
        if (!notAvailable){
            qtde = $(value).find('.variacao-qtde .wrapper input').val();
            qtdeBool = qtdeBool || (qtde > 0);
            if (qtde == 0){
                $(value).find('.variacao-qtde .wrapper input').attr('disabled', true);
                $(value).find('input[name*=idVariacao]').attr('disabled', true);
                $(value).find('input[name*=idProduto]').attr('disabled', true);
            }
        }
    });

    isVisible = !$('#product .pb-right-column .product-price-group .button-group .btn-add-cart').hasClass('hide');
    if (isVisible && qtdeBool){
        $("#form-carrinho").submit();
    }else{
        alert("Selecione uma quantidade.");
    }
}

function scrollFavoritos(){
    $("#product .share .lista-desejo").click(function() {
        $('html, body').animate({
            scrollTop: $("#product .mensagem_retorno_desejo").offset().top
        }, 1000);
    });
}

function scrollComentarios(){
    $("#product .product-star a").click(function() {
        $('html, body').animate({
            scrollTop: $("#box-avaliacao-do-produto").offset().top
        }, 1000);
    });
}

function controlarQtdeProduto(){
    $('#product .variacao-opcao .variacao-qtde .wrapper i').click(function(){
        var which = $(this).hasClass('fa-plus');
        var currentValue = $(this).closest('.wrapper').find('input').val();
        currentValue = parseInt(currentValue);
        if (which){
            $(this).closest('.wrapper').find('input').val(currentValue+1);
        }else{
            if (currentValue > 0){
                $(this).closest('.wrapper').find('input').val(currentValue-1);
            }
        }
    });
}

function toogleSocialShare(){
    $('.share > ul > li > a').click(function(){
        var elHidden = $(this).closest('li').find('.inner').hasClass('hide');
        if (elHidden){
            $(this).closest('li').find('.inner').removeClass('hide');
        }else{
            $(this).closest('li').find('.inner').addClass('hide');
        }
    });
}


function socialShare(share){
    if(share == "facebook"){
        window.open("https://www.facebook.com/dialog/share?app_id=140586622674265&display=popup&href="+window.location,"_blank","toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=600,width=600,height=400");
    }

    if(share == "twitter"){
        window.open("https://twitter.com/intent/tweet?text="+window.location+"&source=webclient","_blank","toolbar=yes,scrollbars=yes,resizable=yes,top=50,left=600,width=600,height=270");
    }

    if(share == "google-plus"){
        window.open("https://plus.google.com/share?url="+window.location,"_blank","toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=600,width=600,height=400");
    }
}

function so_numeros() {
    $( 'input.numero' ).on( 'keydown', function(e) {
        var keyCode     = e.keyCode || e.which,
        pattern             = /\d/,
        keys                    = [ 46, 8, 9, 37, 39, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105 ];

        if( ! pattern.test( String.fromCharCode( keyCode ) ) && $.inArray( keyCode, keys ) === -1 ) {
            return false;
        }
    });
}


function carrega_passo4() {
    if(DISPOSITIVO == 'desktop'){
        $('.ContainerBanco').hide();
        $('.hidemask').hide();
        $("#portador_validade").mask('99/9999');
        $("#portador_validade_cielo").mask('99/9999');
        $("#rede_portador_validade").mask('99/9999');
        $("#portador_cvc").mask('999?9');
        $("#portador_cvc_cielo").mask('999?9');

        $('#portador_cpf').mask("999.999.999-99");
        $("#portador_data_nascimento").mask("99/99/9999");
        $('#portador_validade_ano').mask("9999");
        $('#portador_validade_mes').mask("99");
        $("#portador_ddd").mask("99");
        $("#portador_telefone").mask("99999999?9");
    }else {
        $('.ContainerBanco').hide();
        $('.hidemask').hide();
    }
}

function tableSummernot(){
    $(".tab-container .table-responsive table").addClass('table');
    $(".tab-container .table-responsive table").addClass('table-bordered');
}

/*### LISTA ####*/
function selecionaVariacaoProdutoIdInfoExtraSelectLista(key_lista, id_lista){
    var selecionado     = $('#product .produto-selectInfoExtra-'+key_lista).find('option:selected').val();
    if (selecionado != ''){
        selecionado     = selecionado.split(",");
        var idProduto   = selecionado[0];
        var idVariacao  = selecionado[1];
        var idInfoExtra = selecionado[2];
        if(id_lista){
            var id_lista    = id_lista;
        }else {
            var id_lista    = id_lista[3];
        }
        $.ajax({
            async: true,
            data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idInfoExtra:idInfoExtra,key_lista:key_lista,id_lista:id_lista},
            type:"POST",
            url:BASE_URL+"produto/getVariacaoProdutoIdInfoExtra",
            beforeSend: function (){
                $(".loader-carrinho-"+key_lista).css("display", "block");
            },
            success: function(htmlDados) {
                $(".loader-carrinho-"+key_lista).css("display", "none");
                $(".kit-de-produto-ajax-"+key_lista).html('').html(htmlDados);
            }
        });
    }
}

function selecionaSelectCorSelectLista(key_lista, id_lista){
    var selecionado     = $('#product .produto-cor-'+key_lista).find('option:selected').val();
    if (selecionado != ''){

        selecionado     = selecionado.split(",");
        var idProduto   = selecionado[0];
        var idVariacao  = selecionado[1];
        var idCor       = selecionado[2];
        if(id_lista){
            var id_lista    = id_lista;
        }else {
            var id_lista    = id_lista[3];
        }

        $.ajax({
            async: true,
            data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idCor:idCor,key_lista:key_lista,id_lista:id_lista},
            type:"POST",
            url:BASE_URL+"produto/getVariacoesProdutoInfoExtraIdCor",
            beforeSend: function (){
                $(".loader-carrinho-"+key_lista).css("display", "block");
            },
            success: function(htmlDados) {
                $(".loader-carrinho-"+key_lista).css("display", "none");
                $(".kit-de-produto-ajax-"+key_lista).html('').html(htmlDados);
            },
        })
    }       
}

function selecionaVariacaoProdutoIdInfoExtraIdCorSelectLista(key_lista, id_lista){
    var selecionado     = $('#product .produto-selectInfoExtra-'+key_lista).find('option:selected').val();
    if (selecionado != ''){

        selecionado         = selecionado.split(",");

        var idProduto   = selecionado[0];
        var idVariacao  = selecionado[1];
        var idInfoExtra = selecionado[2];
        var idCor       = selecionado[3];
        if(id_lista){
            var id_lista    = id_lista;
        }else {
            var id_lista    = id_lista[4];
        }

        $.ajax({
            async: true,
            data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idCor:idCor,idInfoExtra:idInfoExtra,key_lista:key_lista,id_lista:id_lista},
            type:"POST",
            url:BASE_URL+"produto/getVariacaoProdutoIdInfoExtraIdCor",
            beforeSend: function (){
                $(".loader-carrinho-"+key_lista).css("display", "block");
            },
            success: function(htmlDados) {
                $(".loader-carrinho-"+key_lista).css("display", "none");
                $(".kit-de-produto-ajax-"+key_lista).html('').html(htmlDados);
            }
        });
    }
}

/*### LISTA ####*/

$(function(){ 

    if(MODULO == 'produto') {
        tableSummernot();
    }

    if(MODULO == 'checkout') {
        $('.ContainerBanco').hide();
        carrega_passo4();
        so_numeros();
    }

    $('.open-popup-link').magnificPopup({
        type:'inline',
        midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });

    $('#produto_galeria_kit #gallery_01_kit').css('opacity', '1');
    $('#produto_galeria_kit #gallery_01_kit').css('height', 'inherit');

    $('#produto_galeria #gallery_01').css('opacity', '1');
    $('#produto_galeria #gallery_01').css('height', 'inherit');

    $.fn.andSelf = function() {
      return this.addBack.apply(this, arguments);
  }

  $(".cont-consulta").click(function(e) {
    $(".cont-consulta-itens").slideToggle("slow");
});

  $(".btn-finaliza-orcamento").click(function(event) {
    console.log("btn-finaliza-orcamento");
});

  $("input#cep").keypress(function(event) {
      if ( event.which == 13 ) {
        calculoFretePageProduto();
    }
});

  $(window).scroll(function(){
    /* Show hide scrolltop button */
    /* Main menu on top */
    var h = $(window).scrollTop();
    var width = $(window).width();
    if(width > 767 && MODULO != 'produto'){
        if(h > 35){
            $('#menu_global').addClass('main-header-ontop');
        }else{
            $('#menu_global').removeClass('main-header-ontop');
        }
    }
});

  $(document).on("click",".fancyboxMotrarTextos",function(event){
    event.preventDefault();
    $.fancybox({
        href        : $(this).attr('href'),
        maxWidth    : 500,
        maxHeight   : 300,
        fitToView   : false,
        width       : '70%',
        height      : '50%',
        autoSize    : false,
        closeClick  : false,
        openEffect  : 'none',
        closeEffect : 'none'
    });
});

  $(document).on('click', '.addServicoExtra', function() {
    var valor = $(this).val();
    if($(this).prop('checked')){
        $("#form-carrinho").append("<input type='hidden' class='servicos_extra' name='servicos_extra[]' value='"+valor+"' />");

    }else{
        $("#form-carrinho input.servicos_extra").each(function(index, el) {
            if($(this).val() == valor){
                $(this).remove();
            }                    
        });
    }

    /*Somar os valores dos serviços selecionados junto ao preço real do produto*/
    var precoServicoTotal  = 0;
    var precoRealDoProduto = parseFloat($(".product-price-group").find('.price').attr('data-preco-real')); 
    $("input.addServicoExtra").each(function(index, el) {
        if($(this).prop('checked')){
            var precoServico = parseFloat($(this).attr('data-preco'));
            precoServicoTotal = precoServicoTotal+precoServico; 
        }                    
    });
    var precoRealProdutoMaisServico = converterFloatReal(precoRealDoProduto+precoServicoTotal);
    $(".product-price-group").find('.price').html("R$"+precoRealProdutoMaisServico);

});

  $(document).on('click', '.owl-carousel.produtosDepartamentosLancamento li', function(e) {
    $('.owl-carousel.produtosDepartamentosLancamento li').removeClass('active');
    $(this).addClass('active');

    var tab_container = $(this).data('link');

    $('.block-tab-products.lancamentos .tab-container .tab-panel').removeClass('active');
    $('.'+tab_container).addClass('active');
}); 

  $(document).on('click', '.owl-carousel.produtosDepartamentosDestaques li', function(e) {
    $('.owl-carousel.produtosDepartamentosDestaques li').removeClass('active');
    $(this).addClass('active');

    var tab_container = $(this).data('link');

    $('.block-tab-products.destaques .tab-container .tab-panel').removeClass('active');
    $('.'+tab_container).addClass('active');
}); 

  $(document).on('click', '.owl-carousel.produtosDepartamentosPromocao li', function(e) {
    $('.owl-carousel.produtosDepartamentosPromocao li').removeClass('active');
    $(this).addClass('active');

    var tab_container = $(this).data('link');

    $('.block-tab-products.promocao .tab-container .tab-panel').removeClass('active');
    $('.'+tab_container).addClass('active');

}); 

  $(document).on('click','.form-search .icon',function(){
    $(this).closest('.form-search').find('.form').fadeIn(600);
})
  $(document).on('click','.form-search .close-form',function(){
    $(this).closest('.form').fadeOut(600);
});

  $('input#cep').keypress(function (e) {
    var code = null;
    code = (e.keyCode ? e.keyCode : e.which);                
    return (code == 13) ? false : true;

    calculoFretePageProduto();
});

    /// MODAL
    $("#myModal").on("show", function() {    // wire up the OK button to dismiss the modal when shown
        $("#myModal a.btn").on("click", function(e) {
            console.log("button pressed");   // just as an example...
            $("#myModal").modal('hide');     // dismiss the dialog
        });
    });
    $("#myModal").on("hide", function() {    // remove the event listeners when the dialog is dismissed
        $("#myModal a.btn").off("click");
    });

    $("#myModal").on("hidden", function() {  // remove the actual elements from the DOM when fully hidden
        $("#myModal").remove();
    });

    $("#myModal").modal({                    // wire up the actual modal functionality and show the dialog
      "backdrop"  : "static",
      "keyboard"  : true,
      "show"      : true                     // ensure the modal is shown immediately
  });

    $(document).on("click",".modal-content .voltar_form",function(){
        var i_loader = "<i class='fa fa-spinner fa-spin fa-1x fa-fw'></i>";

        $(".result-loader").removeClass('hide').html(i_loader);

        $(".result-cep-nao-encontro-faixa").addClass('hide');
        $(".result-cep-nao-tem-faixa-cadastrada").addClass('hide');
        $(".result-cep-vazio").addClass('hide');

        $(".result-cep").removeClass('hide');

        $(".result-loader").addClass('hide');

    });

    $(document).on("click",".modal-content .result-cep a",function(){

        var i_loader = "<i class='fa fa-spinner fa-spin fa-1x fa-fw'></i>";

        $(".result-loader").removeClass('hide').html(i_loader);

        var gera_ajax = BASE_URL+'frete/calcularFaixaCepSessao/';

        $.ajax({
            type: "POST",
            async: true,
            data: {csrf_test_name:CSRF_TEST_NAME},
            url: gera_ajax,
            dataType: "json",
            success: function(data){
                window.location.href = BASE_URL+"login";
            }
        });
    });

    $(document).on("click",".result-cep-nao-encontro-faixa a",function(){

        var i_loader = "<i class='fa fa-spinner fa-spin fa-1x fa-fw'></i>";

        $(".result-loader").removeClass('hide').html(i_loader);

        var gera_ajax = BASE_URL+'frete/calcularFaixaCepSessao/';

        $.ajax({
            type: "POST",
            async: true,
            data: {csrf_test_name:CSRF_TEST_NAME},
            url: gera_ajax,
            dataType: "json",
            success: function(data){
                window.location.href = BASE_URL+"inicial";
            }
        });
    });

    /// MODAL

    if ( $( ".multipleSelect_cor" ).length ) {
        $(".multipleSelect_cor").multipleSelect({'refresh':true,'single': true,'maxHeight':169});
    }

    
    $(document).on("click", ".fancy_cor", function(b) {
        b.preventDefault();
        $.fancybox({
            href: $(this).attr("href"),
            title: $(this).data("caption"),
            openEffect: "none",
            closeEffect: "none"
        })
    });

    // $(document).on("click",".btn-mostra-f_c",function(){

    //     $(this).closest(".block").find(".block_content_f_c").slideToggle("slow");

    // });

    $(document).on("click", "a.p_cat i",function(e){
        e.preventDefault();
        if($(this).is(".active")){
            $(this).removeClass('active');
            $(this).closest("li").find("ul.cat").slideUp("fast");
        }else{
            $('a.p_cat i').removeClass('active');
            $("ul.cat").slideUp("fast");
            $('a.p_sub i').removeClass('active');
            $("ul.sub").slideUp("fast");
            $(this).addClass('active');
            $(this).closest("li").find("ul.cat").slideDown("fast");
        }
    });
    $(document).on("click","a.p_sub i",function(e){
        e.preventDefault();
        if($(this).is(".active")){
            $(this).removeClass('active');
            $(this).closest("li").find("ul.sub").slideUp("fast");
        }else{
            $('a.p_sub i').removeClass('active');
            $("ul.sub").slideUp("fast");
            $(this).addClass('active');
            $(this).closest("li").find("ul.sub").slideDown("fast");
        }
    });

    productZoom();
    OWLCarousel();
    OWLCarouselVertical();

    $(document).on("click",".search-busca",function(event) {
        event.preventDefault();
        $(".search-container").slideToggle("slow");
        $(".search-container input").focus();
    });

    $(document).on('click', ".icon-search", function(e) {
        e.preventDefault();
        $("#pesquisa-desktop").slideToggle(500);
        $("#SearchTopo").slideToggle("slow");
        $("#SearchTopo input").focus();
    });

    $(document).on("click","#monstrarTermosDeUso",function(event){
        event.preventDefault();
        $.fancybox({
            href        : $(this).attr('href'),
            maxWidth    : 500,
            maxHeight   : 300,
            fitToView   : false,
            width       : '70%',
            height      : '70%',
            autoSize    : false,
            closeClick  : false,
            openEffect  : 'none',
            closeEffect : 'none'
        });
    });



    $('[data-toggle="tooltip"]').tooltip();

    telFocus();
    maskCampo();
    fancyboxGaleria();

    /*REDIRECIONAMENTO VIA INPUT RADIO OU CHECKBOX*/

    $('input[type="checkbox"].radio-checkbox-filter, input[type="radio"].radio-checkbox-filter').on('click', function () {

        var url = $(this).val();

        window.location.href = url;

    });



    /*REDIRECIONAMENTO VIA INPUT RADIO OU CHECKBOX*/

    $('select.selected-filter').on('change', function () {

        var url = $(this).val();

        window.location.href = url;

    });



    /*Finalizar carrinho de compras*/

    $(document).on("submit","#form-carrinho-finaliza",function(event) {

        var idProdutoConsulta   = $("#content-car-consulta input[name='idProduto']").val();
        var idVariacaoConsulta  = $("#content-car-consulta input[name='idVariacao']").val();

        $(this).find("button").html('Aguarde...').removeAttr("type");

        var freteCodigo  = $(this).find('input#freteCodigo').val();
        var freteTipo  = $(this).find('input#freteTipo').val();

        var freteValor = $(this).find('input#freteValor').val();

        var fretePrazo      = $(this).find('input#fretePrazo').val();
        var loja_id_ramo    = $(this).find('input#loja_id_ramo').val();

        if(loja_id_ramo == 32){
            return true;
        }
        
        if(freteTipo != "" && freteValor != "" && fretePrazo != ""){
            return true;
        }else{
            alert("Calcule o frete e selecione uma forma de entrega!");

            $(this).find("button").html('Finalizar Compra').attr("type","submit");
        }

        event.preventDefault();

    });

    /* Submeter o formulario de comentario do blog*/
    $(document).on("submit","#form-blog-post",function() {
        $(this).find("button").html('Aguarde Enviando...').removeAttr("type");
        var items   = $(this).serialize();
        var action  = $(this).attr('action');
        $.ajax({
            type: "POST",
            async: true,
            data: items,
            url: action,
            dataType: "json",
            success: function(data){
             if(data == 0){
                window.location.reload();
            }else{
                if(data['erro'] == 0){
                    $("#form-blog-post input[type='text']").val("");
                    $("#form-blog-post input[type='email']").val("");
                    $("#form-blog-post textarea").val("");
                }
            }
            $("#form-blog-post .mensagem_retorno").hide().html(data['mensagem']).slideDown(500);
            $("#form-blog-post button").html('Enviar Comentário').attr("type","submit");
            setTimeout(function(){ $("#form-blog-post .mensagem_retorno").slideUp(500); }, 5000);
        }
    });
        return false;
    });

    $(document).on("change","#id_estado",function() {

        var option_cidades = "<option value=''>Selecione</option>"; 

        $("#id_cidade").html('').html(option_cidades);   

        var id_estado = $(this).find("option:selected").val();

        $.ajax({

            url: BASE_URL+"cadastre-se/getCidadesAjax",

            method: "POST",

            data: {

                'id_estado': id_estado,

                'csrf_test_name': CSRF_TEST_NAME

            },

            success: function(result){

                if (result != '0'){

                    var data = $.parseJSON(result);

                    var i;

                    for (i = 0; i < data.length; i++){

                        option_cidades += "<option nome='"+data[i].nome+"' value='"+data[i].id+"'>"+data[i].nome+"</option>";

                    }

                }

                $("#id_cidade").html('');

                $("#id_cidade").append(option_cidades);

            }

        });

    });



    /* Submeter o formulario de avise me do produto em falta*/

    $(document).on("submit","#form-aviseMe",function() {

        $(this).find("button").html('Aguarde Enviando...').removeAttr("type");

        var items   = $(this).serialize();

        var action  = $(this).attr('action');

        $.ajax({

            type: "POST",

            async: true,

            data: items,

            url: action,

            dataType: "json",

            success: function(data){

                if(data == 1){

                    var htmlResult = "<br/><div class='alert text-center alert-success' role='alert'>Enviado com sucesso.</div>";

                    setTimeout(function(){ 

                        $("#form-aviseMe input[type='text']").val("");

                        $("#form-aviseMe input[type='email']").val("");

                        $("#form-aviseMe input[type='number']").val("");

                        $("#form-aviseMe textarea").val("");

                        mostraFormAviseMe(); 

                    }, 3000);

                }else if(data == 2){

                    var htmlResult = "<br/><div class='alert text-center alert-danger' role='alert'>Erro ao enviar.</div>";

                }else{

                    var htmlResult = "<br/><div class='alert text-center alert-danger' role='alert'>Erro ao enviar seus dados. Tente novamente</div>";

                }

                $("#form-aviseMe .mensagem_retorno").hide().html(htmlResult).slideDown(500);

                $("#form-aviseMe button").html('Enviar').attr("type","submit");

                setTimeout(function(){ 

                    $("#form-aviseMe .mensagem_retorno").slideUp(500); 

                }, 2000);

            }

        });

        return false;

    });

    /* Submeter o formulario de alterar o cliente*/

    $(document).on("submit","#form-alterar-cliente",function() {



        $(this).find("button").html('Aguarde Enviando...').removeAttr("type");

        var items   = $(this).serialize();

        var action  = $(this).attr('action');



        $.ajax({

            type: "POST",

            async: true,

            data: items,

            url: action,

            dataType: "json",

            success: function(data){



                if(data == 0){

                    window.location.reload();

                }else{

                    if(data['erro'] == 1){

                        var htmlResult = "<div class='alert alert-danger' role='alert'>"+data['mensagem']+"</div>";

                    }else if(data['erro'] == 0){

                        var htmlResult = "<div class='alert alert-success' role='alert'>Dados Alterado com Sucesso.</div>";

                    }

                }

                $(".scroll_top").trigger("click");

                $("#form-alterar-cliente .mensagem_retorno").hide().html(htmlResult).slideDown(500);

                $("#form-alterar-cliente button").html('SALVAR DADOS').attr("type","submit");

                setTimeout(function(){ $("#form-alterar-cliente .mensagem_retorno").slideUp(500); }, 5000);

            }

        });



        return false;

    });

    /* Submeter o formulario de alterar o senha*/

    $(document).on("submit","#form-alterar-senha",function() {



        $(this).find("button").html('Aguarde Enviando...').removeAttr("type");

        var items   = $(this).serialize();

        var action  = $(this).attr('action');



        $.ajax({

            type: "POST",

            async: true,

            data: items,

            url: action,

            dataType: "json",

            success: function(data){



                if(data == 0){

                    window.location.reload();

                }else{

                    if(data['erro'] == 1){

                        var htmlResult = "<div class='alert alert-danger' role='alert'>"+data['mensagem']+"</div>";

                    }else if(data['erro'] == 0){

                        var htmlResult = "<div class='alert alert-success' role='alert'>Senha Alterada com Sucesso.</div>";

                    }

                }

                $("#form-alterar-senha .mensagem_retorno").hide().html(htmlResult).slideDown(500);

                $("#form-alterar-senha button").html('ALTERAR SENHA').attr("type","submit");

                setTimeout(function(){ $("#form-alterar-senha .mensagem_retorno").slideUp(500); }, 5000);

            }

        });



        return false;

    });



    /* Submeter o formulario de avaliação do produto*/

    $(document).on("submit","#form-avaliacao-do-produto",function() {

        $(this).find("button").html('Aguarde Enviando...').removeAttr("type");

        var items   = $(this).serialize();

        var action  = $(this).attr('action');

        $.ajax({

            type: "POST",

            async: true,

            data: items,

            url: action,

            dataType: "json",

            success: function(data){

                if(data == 1){

                    var htmlResult = "<br/><div class='alert text-center alert-success' role='alert'>Avaliação enviada com sucesso.<br/>Obrigado por avaliar nosso produto isso suma importância para melhorar nosso atendimento.</div>";

                    setTimeout(function(){ 

                        $("#form-avaliacao-do-produto textarea").val("");

                        mostrarFormAvaliacao();

                    }, 6000);

                }else if(data == 2){

                    var htmlResult = "<br/><div class='alert text-center alert-danger' role='alert'>Erro ao enviar.</div>";

                }else{

                    var htmlResult = "<br/><div class='alert text-center alert-danger' role='alert'>Erro ao enviar sua avaliação. Tente novamente</div>";

                }

                $("#form-avaliacao-do-produto .mensagem_retorno").hide().html(htmlResult).slideDown(500);

                $("#form-avaliacao-do-produto button").html('Enviar').attr("type","submit");

                setTimeout(function(){ $("#form-avaliacao-do-produto .mensagem_retorno").slideUp(500); }, 5000);

            }

        });

        return false;

    });

    /*########################## ADICIONAR PRODUTO DIRETO NO CARRINHO VIA AJAX */
    /*ADCIONAR PRODUTO DIRETO NO CARRINHO APARTIR DA LISTA*/
    $(document).on('click','.increment span.plus', function() {
        var valor = parseInt($(this).closest(".input-group").find("input.qtde").val());
        var qtde_max_estoque = parseInt($(this).closest('.input-group').find('input[name=qtde_max_estoque]').val());
        var qtde = parseInt($(this).closest('.input-group').find('input[name=quantidade]').val());
        if (qtde < qtde_max_estoque){
            $(this).closest(".input-group").find("input.qtde").val(valor+1);
            $('.idProdutoQtde').val(qtde);
        }else{
            alert('Quantidade selecionada é maior que a disponível em estoque, disponível '+qtde_max_estoque+ '.')
        }
    });

    $(document).on('click','.increment span.minus', function() {
        var valor = parseInt($(this).closest(".input-group").find("input.qtde").val());
        var qtde = $("input[name=quantidade]").val();
        if(valor > 1){
            if (qtde >= 1){
                $(this).closest(".input-group").find("input.qtde").val(valor-1);
                $('.idProdutoQtde').val(qtde);
            }else{
                alert('Quantidade não pode ser menor que zero.')
            }
        }
    });

    $(document).on("submit",".increment",function(event) {
        // console.log('alou');
        var form = $(this);
        var button = form.find("button");
        button.html('<i class="fa fa-spinner fa-spin fa-1x fa-fw" style="color:#FFF"></i>').removeAttr("type");
        var items   = $(this).serialize();
        var action  = $(this).attr('action');
        $.ajax({
            type: "POST",
            async: true,
            data: items,
            url: action,
            dataType: "json",
            success: function(data){
                if(data['erro']){
                    alert(data['alert']);
                    button.html('Adicionar').attr("type","submit");
                }else{
                    button.addClass('hide');
                    form.find(".box-add").addClass('hide');
                    form.find(".btn-add-cart1").addClass('hide');
                    form.find(".produto_adicionado").removeClass('hide');
                    form.find(".produto_adicionado").addClass('adicionado');
                    form.find(".ver_carrinho").removeClass('hide');
                    form.find(".ver-carrinho").removeClass('hide');
                    setCarrinhoTopoAjax();
                }
            }
        });
        return false;
    });


    /*########################## ADICIONAR PRODUTO DIRETO NO CARRINHO VIA AJAX */

});

function consultaFaixaCepAtendimento(cep) {
    var i_loader = "<i class='fa fa-spinner fa-spin fa-1x fa-fw'></i>";
    $(".result-loader").removeClass('hide').html(i_loader);
    var gera_ajax = BASE_URL+'frete/calcularFaixaCep/';  
    $.ajax({
        type: "POST",
        async: true,
        data: {csrf_test_name:CSRF_TEST_NAME,cep:cep},
        url: gera_ajax,
        dataType: "json",
        success: function(data){
            $(".result-cep-vazio").addClass('hide');
            if(data.paran!=4){
                $(".result-cep").addClass('hide');
            }
            $("."+data.mensagem).removeClass('hide');
            $(".result-loader").addClass('hide');
        }
    });
}

function selecionaVariacaoProdutoIdInfoExtra(idPV){

    if(idPV){
        var res = idPV.split(",");
    }else {  
        var ids = $("#selectInfoExtra option:selected").attr("data-variacao");
        var res = ids.split(","); 
    }

    var idProduto   = res[0];
    var idVariacao  = res[1];
    var idInfoExtra = res[2];
    
    $.ajax({
        async: true,
        data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idInfoExtra:idInfoExtra},
        type:"POST",
        url:BASE_URL+"produto/getVariacaoProdutoIdInfoExtra",
        beforeSend: function (){
            $("#produto_informacao .loader-carrinho").fadeIn("slow");
        },
        success: function(htmlDados) {
            $("#produto_informacao").html('').html(htmlDados);
            seleiconaGaleriaPorIdVariacao(idVariacao,idProduto);
            telFocus();
            ajaxTootipCor();
        },
    });
    // }).complete(function() {
    //     telFocus();
    //     ajaxTootipCor();
    // });
}


function selecionaVariacaoProdutoIdInfoExtraIdCor(idPVC){
    // console.log(idPVC);

    if(idPVC){
        var res = idPVC.split(",");
    }else {  
        var ids = $("#selectInfoExtra option:selected").attr("data-variacao");
        var res = ids.split(",");   
    }
    
    var idProduto   = res[0];
    var idVariacao  = res[1];
    var idInfoExtra = res[2];
    var idCor       = res[3];
    $.ajax({
        async: true,
        data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idCor:idCor,idInfoExtra:idInfoExtra},
        type:"POST",
        url:BASE_URL+"produto/getVariacaoProdutoIdInfoExtraIdCor",
        beforeSend: function (){
            $("#produto_informacao .loader-carrinho").fadeIn("slow");
        },
        success: function(htmlDados) {
            $("#produto_informacao").html('').html(htmlDados);
            seleiconaGaleriaPorIdVariacao(idVariacao,idProduto);
            telFocus();
            ajaxTootipCor();
        },
    });
    // }).complete(function() {
    //     telFocus();
    //     ajaxTootipCor();
    // });
}

function selecionaVariacaoProdutoInfExtraIdCor(idProduto,idVariacao,idCor){
    $("#box-lateral-kit .loader-carrinho, div#box-bottom-kit .loader-carrinho").fadeIn(500);
    $.ajax({
        async: true,
        data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idCor:idCor},
        type:"POST",
        url:BASE_URL+"produto/getVariacoesProdutoInfoExtraIdCor",
        beforeSend: function (){
            $("#produto_informacao .loader-carrinho").fadeIn("slow");
        },
        success: function(htmlDados) {
            $("#produto_informacao").html('').html(htmlDados);
            seleiconaGaleriaPorIdVariacao(idVariacao,idProduto);
            telFocus();
            ajaxTootipCor();
            OWLCarousel();
        },
    });
}

function selecionaVariacaoProdutoIdCor(idProduto,idVariacao,idCor){
    $.ajax({
        async: true,
        data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idCor:idCor},
        type:"POST",
        url:BASE_URL+"produto/getVariacoesProdutoIdCor",
        beforeSend: function (){
            $("#produto_informacao .loader-carrinho").fadeIn("slow");
        },
        success: function(htmlDados) {
            $("#produto_informacao").html('').html(htmlDados);
            seleiconaGaleriaPorIdVariacao(idVariacao,idProduto);
            telFocus();
            ajaxTootipCor();
        },
    });
    // }).complete(function() {
    //     telFocus();
    //     ajaxTootipCor();
    // });
}

function seleiconaGaleriaPorIdVariacao(idVariacao,idProduto){
    $.ajax({
        async: true,
        data: {csrf_test_name:CSRF_TEST_NAME,idVariacao:idVariacao,idProduto:idProduto},
        type:"POST",
        url:BASE_URL+"produto/getGaleriaPorIdVariacao",
        beforeSend: function (){
            $("#produto_galeria .loader-carrinho").fadeIn("slow");
        },
        success: function(htmlDados) {
            $("#produto_galeria").html('').html(htmlDados);
            
            $('#produto_galeria #gallery_01').css('opacity', '1');
            $('#produto_galeria #gallery_01').css('height', 'inherit');
            productZoom();
            OWLCarousel();
        },
    });
    // }).complete(function() {
    //     productZoom();
    //     OWLCarousel();
    // });
}

function verInformativo(idInformativo){
    if($("#informativo-"+idInformativo+" span").is(".hide")){   
        $("#informativo-"+idInformativo+" span").hide().removeClass('hide').slideDown(500);
        $.ajax({
            type: "POST",
            async: true,
            data: {csrf_test_name:CSRF_TEST_NAME,idInformativo:idInformativo},
            url: BASE_URL+"minha-conta/informativo-salva-id",
            dataType: "json",
            success: function(data){
            }
        }); 
    }else{
        if($("#informativo-"+idInformativo+" span").is(".mostra")){
            $("#informativo-"+idInformativo+" span").slideDown(500).removeClass('mostra');
        }else{
            $("#informativo-"+idInformativo+" span").slideUp(500).addClass('mostra');
        }
    }
}

function fancyboxGaleria(){
    $('.fancyboxGaleria').fancybox({
        openEffect  : 'none',
        closeEffect : 'none'
    });
}

function maskCampo(){
    $(".data").mask("99/99/9999");
    $("#data").mask("99/99/9999");
    $("#cep").mask("99999-999");
    $("#cpf, .cpf").mask("999.999.999-99");
    $("#cnpj, .cnpj").mask("99.999.999/9999-99");
    $("#hora").mask("99:99");
    $(".hora").mask("99:99");
}

function soma_frete(codigo, tipo, frete, total, prazo, decimal,link_rastreio, tabela){ 
    $("#vlfrete").removeClass("hide");
    $("#vlprazo").removeClass("hide");
    $("#vlfrete td:last-child").html('').html(frete);
    
    if(tabela != 'table_cliente_transportadoras'){
        $("#vlprazo td:last-child").html('').html(prazo+" dia(s)");
    }else {
        $("#vlprazo td:last-child").html('').html(prazo);
    }

    console.log(TEMPLATE);
    $("#vltotal,.total-btn-topo").html('').html(total);
    if (TEMPLATE != 'tema27') {
        $('.result-calculo-frete').html('').addClass('hide');
    }

    if(link_rastreio == 'undefined'){
        link_rastreio = 0;
    }

    $('#form-carrinho-finaliza input#freteCodigo').val(codigo);
    $('#form-carrinho-finaliza input#freteLinkRastreio').val(link_rastreio);
    $('#form-carrinho-finaliza input#freteTipo').val(tipo);
    $('#form-carrinho-finaliza input#freteValor').val(decimal);
    $('#form-carrinho-finaliza input#fretePrazo').val(prazo);
    $('#form-carrinho-finaliza input#tabela').val(tabela);
}





function calcularFrete(val){

    var i_loader = "<i class='fa fa-spinner fa-spin fa-1x fa-fw'></i> Carregando...";

    $(".result-calculo-frete").removeClass('hide').html("<p>"+i_loader+"</p>");

    $('#form-carrinho-finaliza input#freteCodigo').val('');
    $('#form-carrinho-finaliza input#freteLinkRastreio').val('');

    $('#form-carrinho-finaliza input#freteTipo').val('');

    $('#form-carrinho-finaliza input#freteValor').val('');

    $('#form-carrinho-finaliza input#fretePrazo').val('');

    $("#vlfrete td:last-child").html('---');

    $("#vlprazo td:last-child").html('---');

    $("#vltotal").html('').html('---');
    $.ajax({
        type: "POST",
        async: true,
        data: {csrf_test_name:CSRF_TEST_NAME,cep:val},
        url: BASE_URL+"frete/calcularFrete",
        dataType: "json",
        success: function(data){
            if(data['html']){
                $(".result-calculo-frete").html(data['html']);    
            }
            if(data['mensagem']){
                if(data['mensagem'] != '0'){
                    $(".result-calculo-frete").html(data['mensagem']);
                }else{   
                    window.location.reload();
                }
            }
        }
    });
}

/*A função em php esta no MYCONTROLLER*/

function setCarrinhoTopoAjax(){

    $.ajax({

        type: "POST",

        async: true,

        data: {csrf_test_name:CSRF_TEST_NAME},

        url: BASE_URL+"carrinho/setCarrinhoTopoAjax",

        dataType: "json",

        success: function(data){

            if(data['html']){
                $(".bt-carrinho").html('').html(data['html']);    
            }
        }
    });
}

function aplicarCupomDesconto(val){

    $.ajax({

        type: "POST",

        async: true,

        data: {csrf_test_name:CSRF_TEST_NAME,cupom:val},

        url: BASE_URL+"carrinho/aplicarCupomDesconto",

        dataType: "json",

        beforeSend: function(){

            $(".loader-carrinho").fadeIn("300");

        },
        success: function(data){
            if(data['html']){
                $("#content-car").html('').html(data['html']);    
            }
            if(data['mensagem'] == '0'){
                window.location.reload();
            }
            if(data['mensagem']){
                alert(data['mensagem']);
            }
            maskCampo();
            setCarrinhoTopoAjax();
            $(".loader-carrinho").fadeOut("300");
        }
    // }).complete(function() {
    //     maskCampo();
    //     setCarrinhoTopoAjax();
    //     $(".loader-carrinho").fadeOut("300");
});
}

function updadeQtdeProdCar(key,tipo){

    var idVariacao = $(".produto_"+key+" input[name='idVariacao']").val();

    var idProduto  = $(".produto_"+key+" input[name='idProduto']").val();
    var id_servicos_extra   = $(".produto_"+key+" input[name='id_servicos_extra']").val();
    var id_cor_selecionada  = $(".produto_"+key+" input[name='id_cor_selecionada']").val();

    var min        = parseInt($(".produto_"+key+" input[name='min']").val());

    var max        = parseInt($(".produto_"+key+" input[name='max']").val());

    var qtd        = parseInt($(".produto_"+key+" input[name='qtde']").val());

    if(tipo == 'somar'){

        qtd = qtd + 1;

    }else if(tipo == 'subtrair'){

        qtd = qtd - 1;

    }

    if(qtd < min){

        $("#produto_"+key+" input[name='qtde']").val(min);

        alert("A quantidade mínima de compra para este produto é: "+min+" unidade(s).");

        qtd = min;

    }else if(qtd > max){

        $("#produto_"+key+" input[name='qtde']").val(max);

        alert("A quantidade escolhida excede o limite do produto em estoque.\nO estoque atual contem: "+max+" unidade(s).");

        qtd = max;

    }
    $.ajax({

        type: "POST",

        async: true,

        data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,id_servicos_extra:id_servicos_extra,id_cor_selecionada:id_cor_selecionada,quantidade:qtd,tipo:'atualizar'},

        url: BASE_URL+"carrinho/atualizaValorProdutoCarrinho",

        dataType: "json",

        beforeSend: function(){

            $(".loader-carrinho").fadeIn("300");

        },
        success: function(data){
            if(data['html']){
                $("#content-car").html('').html(data['html']);    
            }
            if(data['mensagem'] == 0){
                window.location.reload();
            }
            if(data['mensagem'] == 1){
                alert("A quantidade mínima de compra para este produto é: "+min+" unidade(s)."); 
                window.location.reload();
            }

            if(data['mensagem'] == 2){
                alert("A quantidade escolhida excede o limite do produto em estoque.\nO estoque atual contem: "+max+" unidade(s).");
                window.location.reload();
            }
            maskCampo();
            setCarrinhoTopoAjax();
            $(".loader-carrinho").fadeOut("300");
        }
    // }).complete(function() {
    //     maskCampo();
    //     setCarrinhoTopoAjax();
    //     $(".loader-carrinho").fadeOut("300");
});
}

function removerProdCar(key){

    var idVariacao = $(".produto_"+key+" input[name='idVariacao']").val();

    var idProduto  = $(".produto_"+key+" input[name='idProduto']").val();
    var id_servicos_extra   = $(".produto_"+key+" input[name='id_servicos_extra']").val();
    var id_cor_selecionada  = $(".produto_"+key+" input[name='id_cor_selecionada']").val();

    $.ajax({

        type: "POST",

        async: true,

        data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,id_servicos_extra:id_servicos_extra,id_cor_selecionada:id_cor_selecionada,quantidade:0,tipo:'remover'},

        url: BASE_URL+"carrinho/atualizaValorProdutoCarrinho",

        dataType: "json",

        beforeSend: function(){

            $(".loader-carrinho").fadeIn("300");

        },

        success: function(data){

            if(data['html']){

                $("#content-car").html('').html(data['html']);    
            }
            if(data['mensagem']){
                window.location.reload();
            }
            maskCampo();
            setCarrinhoTopoAjax();
            $(".loader-carrinho").fadeOut("300");
        }
    // }).complete(function() {
    //     maskCampo();
    //     setCarrinhoTopoAjax();
    //     $(".loader-carrinho").fadeOut("300");
});
}

function ajaxTootipCor(){

    $(".list-color li a").tooltip({ selector: '[data-toggle="tooltip"]' });

}

function marcaAvaliacaoStar(avaliacao) {
    $('#box_avaliacao_star i').removeClass('fa-star').addClass('fa-star-o');
    for (var i = 1; i <= avaliacao; i++) {
        $('#box_avaliacao_star i:nth-child('+i+')').removeClass('fa-star-o').addClass('fa-star');
    }
}

function marcaAvaliacaoClassificacao(el, avaliacao) {


    $(el).closest('.product-radio').find('i').removeClass('fa-circle').addClass('fa-circle-o');

    $(el).find('i').removeClass('fa-circle-o').addClass('fa-circle');

    for (var i = 1; i <= avaliacao; i++) {
        $(el).closest('.product-radio').find('.bolas:nth-of-type('+i+') i').removeClass('fa-circle-o').addClass('fa-circle');
    };

}


function marcaAvaliacaoClassificacaoRecomendacao(el, valor) {


    if(valor=='1'){
        $('.nao').removeClass('sim_nao_active');
        $('.sim').addClass('sim_nao_active');
        $('.nao input').removeAttr('checked');
        $('.sim input').attr('checked', true);
    }else {
        $('.sim').removeClass('sim_nao_active');
        $('.nao').addClass('sim_nao_active');
        $('.sim input').removeAttr('checked');
        $('.nao input').attr('checked', true);
    }

}


function mensagemListaDesejo(mensagem,tipo,id_local_mensagem){

    var t = (tipo == 1) ? 'success' : 'danger';

    var htmlResult = "<div class='alert alert-"+t+"' role='alert'>"+mensagem+"</div>";

    if(id_local_mensagem){

        var res = id_local_mensagem;

        var tm  = 5000;

    }
    $(res).hide().html(htmlResult).slideDown(500,function(){

        setTimeout(function(){ $(res).slideUp(500); }, tm); 

    });

}

function salvarProdutoListaDesejo(idProduto,idVariacao,idCliente,id_local_mensagem){

    var res = null;

    if(id_local_mensagem){

        var res = id_local_mensagem; 

    }

    $.ajax({

        async: true,

        data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idCliente:idCliente},

        type:"POST",

        url:BASE_URL+"produto/salvarProdutoListaDesejo",

        beforeSend: function (){

            mensagemListaDesejo("Aguarde...",1);

        },

        success: function(dados) {

            if(dados == 1){   

                mensagemListaDesejo("O produto foi salvo em sua lista de desejo.",1,res);

            }else if(dados == 2){

                mensagemListaDesejo("Não é possível salvar o produto na lista de desejo.",0,res);

            }else if(dados == 3){

                mensagemListaDesejo("Esse produto já está na sua lista de desejo.",0,res);

            }else{

                mensagemListaDesejo("Erro ao tentar salvar o produto em sua lista de desejo. Tente novamente.",0,res);

            }

        },

    }).complete(function() {
    });

}

function telFocus(){

    $('.tel').focusout(function(){
        var phone, element;
        element = $(this);
        //element.unmask();
        phone = element.val().replace(/\D/g, '');
        if(phone.length > 10) {
            element.mask("(99) 99999-999?9");
        } else {
            element.mask("(99) 9999-9999?9");
        }
    }).trigger('focusout');

}


function OWLCarouselVertical(){
    $(".owl-carousel-vertical").each(function(index, el) {
        var config = $(this).data();

        config.navText = ['<span class="icon-up"></spam>','<span class="icon-down"></span>'];

        config.smartSpeed="900";

        config.animateOut="";

        config.animateIn="fadeInUp";

        $(this).owlCarousel(config);

    });

}

function OWLCarousel(){
    $(".owl-carousel").each(function(index, el) {
        var config = $(this).data();

        config.navText = ['<i class="fa fa-arrow-left"></i>','<i class="fa fa-arrow-right"></i>'];

        config.smartSpeed="300";

        if($(this).hasClass('owl-style2')){

            config.animateOut="fadeOut";

            config.animateIn="fadeIn";    

        }

        $(this).owlCarousel(config);

    });

}

function enviarNewsletter(){
    var email = $(".email-newsletter").val();
    if ( $( ".nome-newsletter" ).length ) {
        var nome = $(".nome-newsletter").val();
    }

    if (nome == ''){
        alert("Nome é inválido. Por favor, digite um nome!");
        return false;
    }

    else if (!validateEmail(email)){
        if ( $( ".nome-newsletter" ).length ) {
            alert("E-mail é inválido. Por favor, digite um email!");
            return false;
        }
    }
    
    else {

        if ( $( ".nome-newsletter" ).length ) {
            $.ajax({
                url: BASE_URL+"inicial/enviarNewsletterAjax",
                method: "POST",
                data: {
                    'email': email,
                    'nome': nome,
                    'csrf_test_name': CSRF_TEST_NAME
                },
                success: function(result){
                    if (result == '1'){
                        alert("PRONTO! Seu email foi cadastrado com sucesso.");
                    }else if (result == '2'){
                        alert("E-mail já cadastrado!");
                    }else{
                        alert("Não foi possível registrar a newsletter!");
                    }
                }
            });
        }else {
            $.ajax({
                url: BASE_URL+"inicial/enviarNewsletterAjax",
                method: "POST",
                data: {
                    'email': email,
                    'csrf_test_name': CSRF_TEST_NAME
                },
                success: function(result){
                    if (result == '1'){
                        alert("PRONTO! Seu email foi cadastrado com sucesso.");
                    }else if (result == '2'){
                        alert("E-mail já cadastrado!");
                    }else{
                        alert("Não foi possível registrar a newsletter!");
                    }
                }
            });
        }
    }
}



function validateEmail(email) {

    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    return re.test(email);

}



function mostraFormAviseMe(){

    if($("#box-avise-me").is(".active")){

        $("#box-avise-me").removeClass('active').slideUp(500);

    }else{

        $("#box-avise-me").hide().removeClass('hide').slideDown(500).addClass('active');

    }

}



function mostrarFormAvaliacao(){

    if($("#box-avaliacao-do-produto").is(".active")){

        $("#box-avaliacao-do-produto").removeClass('active').slideUp(500);

    }else{

        $("#box-avaliacao-do-produto").hide().removeClass('hide').slideDown(500).addClass('active');

    }

}



function productZoom(){

    if($('#product-zoom').length >0){

        $(".zoomContainer").remove();

        $('#product-zoom').elevateZoom({

            zoomType: "inner",

            cursor: "crosshair",

            zoomWindowFadeIn: 500,

            zoomWindowFadeOut: 750,

            gallery:'gallery_01'

        }); 

    }

}

function ismobile(){
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return 1;
    }
}

function chamaFuncaoDeLike(){
    $("#heartO").trigger('click');
}


function calculoFretePageProduto(){
    var cep   = $("section#consultePrazo form input[name='cep']").val();
    var id_p  = $("section#consultePrazo form input[name='p_variacao_id_produto']").val();
    var id_v  = $("section#consultePrazo form input[name='p_variacao_id_variacao']").val();
    $("section#consultePrazo #tableResposta .conteudo").html("");
    $("section#consultePrazo #tableResposta p#loader").slideDown(500);
    $("section#consultePrazo #tableResposta").slideDown(500);
    $.ajax({
        type: "POST",
        async: true,
        data: {csrf_test_name:CSRF_TEST_NAME,cep:cep,id_v:id_v,id_p:id_p,cepPgProduto:1},
        url: BASE_URL+"frete/calcularFrete",
        dataType: "json",
        success: function(data){
            $("section#consultePrazo #tableResposta p#loader").slideUp(500,function(){
                if(data['html']){
                    $("section#consultePrazo #tableResposta .conteudo").html(data['html']);    
                }
                if(data['mensagem']){
                    if(data['mensagem'] != '0'){
                        $("section#consultePrazo #tableResposta .conteudo").html(data['mensagem']);
                    }else{   
                        $("section#consultePrazo #tableResposta .conteudo").html("Frete indisponivel");
                    }
                }
            });

        }
    });
}
function closeCalculoFretePageProduto(){
    $("section#consultePrazo #tableResposta").slideUp(400);
}

function irAoFormDeAvaliacao(){
    $('html, body').animate({scrollTop: $("#box-depoimento").offset().top-50 }, 1000);
    
}

function selecionaSelectCor(){
    var selecionado = $('#product .produto-cor').find('option:selected').val();
    if (selecionado != ''){
        selecionado = selecionado.split(",");
        var idProduto = selecionado[0];
        var idVariacao = selecionado[1];
        var idCor = selecionado[2];
        $.ajax({
            async: true,
            data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idCor:idCor},
            type:"POST",
            url:BASE_URL+"produto/getVariacoesProdutoInfoExtraIdCor",
            beforeSend: function (){
                $("#produto_informacao .loader-carrinho").fadeIn("slow");
            },
            success: function(htmlDados) {
                $("#produto_informacao").html('').html(htmlDados);
                telFocus();
                ajaxTootipCor();
            },
        // }).complete(function() {
        //     telFocus();
        //     ajaxTootipCor();
    });
    }
}

function selecionaSelectCorSelect(){
    var selecionado = $('#product .produto-cor').find('option:selected').val();
    if (selecionado != ''){
        selecionado = selecionado.split(",");
        var idProduto = selecionado[0];
        var idVariacao = selecionado[1];
        var idCor = selecionado[2];
        $.ajax({
            async: true,
            data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idCor:idCor},
            type:"POST",
            url:BASE_URL+"produto/getVariacoesProdutoInfoExtraIdCor",
            beforeSend: function (){
                $("#produto_informacao .loader-carrinho").fadeIn("slow");
            },
            success: function(htmlDados) {
                $("#produto_informacao").html('').html(htmlDados);
                seleiconaGaleriaPorIdVariacao(idVariacao,idProduto);
                telFocus();
                ajaxTootipCor();
            },
        /*}).complete(function() {
            telFocus();
            ajaxTootipCor();*/
        });
    }
}

function selecionaVariacaoProdutoIdInfoExtraIdCorSelect(idPVC){

    if(idPVC){
        var res = idPVC.split(",");
    }else {  
        var ids = $("#selectInfoExtra option:selected").attr("data-variacao");
        var res = ids.split(","); 
    }

    var idProduto   = res[0];
    var idVariacao  = res[1];
    var idInfoExtra = res[2];
    var idCor       = res[3];
    $.ajax({
        async: true,
        data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idCor:idCor,idInfoExtra:idInfoExtra},
        type:"POST",
        url:BASE_URL+"produto/getVariacaoProdutoIdInfoExtraIdCor",
        beforeSend: function (){
            $("#produto_informacao .loader-carrinho").fadeIn("slow");
        },
        success: function(htmlDados) {
            $("#produto_informacao").html('').html(htmlDados);
            seleiconaGaleriaPorIdVariacao(idVariacao,idProduto);
            telFocus();
            ajaxTootipCor();
        },
    // }).complete(function() {
    //     telFocus();
    //     ajaxTootipCor();
});
}

function selecionaVariacaoProdutoIdInfoExtraSelect(idPV, key){
    var ids = $("#selectInfoExtra option:selected").attr("data-variacao");
    var res = ids.split(",");
    //var res = idPVC.split(",");
    var idProduto   = res[0];
    var idVariacao  = res[1];
    var idInfoExtra = res[2];
    $.ajax({
        async: true,
        data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idInfoExtra:idInfoExtra},
        type:"POST",
        url:BASE_URL+"produto/getVariacaoProdutoIdInfoExtra",
        beforeSend: function (){
            $("#produto_informacao .loader-carrinho").fadeIn("slow");
        },
        success: function(htmlDados) {
            $("#produto_informacao").html('').html(htmlDados);
            seleiconaGaleriaPorIdVariacao(idVariacao,idProduto);
            telFocus();
            ajaxTootipCor();
            OWLCarousel();
        },
    // }).complete(function() {
    //     telFocus();
    //     ajaxTootipCor();
    //     OWLCarousel();
});
}

$(document).ready(function(){

    // if (!ismobile()) {
    //     $('.block.left-module .block_content').addClass('active');        
    // }
    if (!$('.block.left-module .block_content').hasClass('active')) {
        $('.block.left-module .block_content').addClass('active'); 
    }

    $('.block.left-module .title_block').click(function(){
        var blocoAtivo = $(this).closest('.block').find('.block_content').hasClass('active');
        if (blocoAtivo){
            $(this).closest('.block').find('.block_content').slideUp('slow').removeClass('active');
            $(this).find('.fa').remove();
            $(this).append('<i class="fa fa-plus">');
        }else{
            $(this).closest('.block').find('.block_content').slideDown('slow').addClass('active');
            $(this).find('.fa').remove().append('<i class="fa fa-minus">');
            $(this).append('<i class="fa fa-minus">');
        }
    }); 

    $('.layered-content').addClass('active');
    $('.layered_subtitle').click(function(){
        var blocoAtivo = $(this).next().hasClass('active');
        if (blocoAtivo){
            $(this).next().slideUp('slow').removeClass('active');
            $(this).find('.fa').remove();
            $(this).append('<i class="fa fa-plus">');
        }else{
            $(this).next().slideDown('slow').addClass('active');
            $(this).find('.fa').remove().append('<i class="fa fa-minus">');
            $(this).append('<i class="fa fa-minus">');
        }
    }); 

    $('.product-qtde').change(function(){

    });

   /*
   $('.page-product-box .button-control, .products-style8 .button-control').mouseenter(function(){
        $(this).find('.add-to-cart').fadeIn('slow');
        $(this).find('.add-to-cart').css('display', 'block');
    }).mouseleave(function(){
        $(this).find('.add-to-cart').fadeOut('slow');
        $(this).find('.add-to-cart').css('display', 'none');
    });

    */

});

function addQtdeSelect(el){
    var selected = $(el).find('option:selected').val();
    $('.idProdutoQtde').val(selected);
}


function atualizarBoxLateralKit(){
    var cnt = $('.preco_sem_formatar').length;
    var soma = null;
    var totalFormatado = null;
    $('input.preco_sem_formatar').each(function() {
        soma += parseFloat($(this).val());
    });
    totalFormatado = "R$"+soma.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1');
    $("div#box-lateral-kit h3").html("").html(totalFormatado);
    $("div#box-bottom-kit  h3").html("").html(totalFormatado);
    $("#box-lateral-kit .loader-carrinho, div#box-bottom-kit .loader-carrinho").fadeOut(500);
}

function btMenuMobile(){
    $("#menu-mobile-retratil ul.dep").slideToggle("fast",function(){
        $('a.p_cat i,a.p_sub i').removeClass('active');
        $("ul.cat,ul.sub").slideUp("fast");
    });

}



$("#menu-mobile-retratil ul.dep li a.p_cat i").click(function(e){
    e.preventDefault();
    if($(this).is(".active")){
        $(this).removeClass('active');
        $(this).closest("li").find("ul.cat").slideUp("fast");
    }else{

        $('a.p_cat i').removeClass('active');
        $("ul.cat").slideUp("fast");

        $('a.p_sub i').removeClass('active');
        $("ul.sub").slideUp("fast");

        $(this).addClass('active');
        $(this).closest("li").find("ul.cat").slideDown("fast");
    }

});

$("#menu-mobile-retratil ul.cat li a.p_sub i").click(function(e){
    e.preventDefault();
    if($(this).is(".active")){
        $(this).removeClass('active');
        $(this).closest("li").find("ul.sub").slideUp("fast");
    }else{

        $('a.p_sub i').removeClass('active');
        $("ul.sub").slideUp("fast");

        $(this).addClass('active');
        $(this).closest("li").find("ul.sub").slideDown("fast");
    }

});

/*Nova Funcçoes Variação bolinha*/
function selecionaVariacaoProdutoIdInfoExtraIdCorBol(idPVC){
    /*var ids = $("#selectInfoExtra option:selected").attr("data-variacao");*/
    /*var res = ids.split(",");*/
    var res = idPVC.split(",");
    var idProduto   = res[0];
    var idVariacao  = res[1];
    var idInfoExtra = res[2];
    var idCor       = res[3];
    $.ajax({
        async: true,
        data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idCor:idCor,idInfoExtra:idInfoExtra},
        type:"POST",
        url:BASE_URL+"produto/getVariacaoProdutoIdInfoExtraIdCor",
        beforeSend: function (){
            $("#produto_informacao .loader-carrinho").fadeIn("slow");
        },
        success: function(htmlDados) {
            $("#produto_informacao").html('').html(htmlDados);
            seleiconaGaleriaPorIdVariacao(idVariacao,idProduto);
            telFocus();
            ajaxTootipCor();
        },
    // }).complete(function() {
    //     telFocus();
    //     ajaxTootipCor();
});
}

function selecionaVariacaoProdutoIdInfoExtraBol(idPV){
    /*var ids = $("#selectInfoExtra option:selected").attr("data-variacao");*/
    /*var res = ids.split(",");*/
    var res = idPV.split(",");
    var idProduto   = res[0];
    var idVariacao  = res[1];
    var idInfoExtra = res[2];
    $.ajax({
        async: true,
        data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idInfoExtra:idInfoExtra},
        type:"POST",
        url:BASE_URL+"produto/getVariacaoProdutoIdInfoExtra",
        beforeSend: function (){
            $("#produto_informacao .loader-carrinho").fadeIn("slow");
        },
        success: function(htmlDados) {
            $("#produto_informacao").html('').html(htmlDados);
            seleiconaGaleriaPorIdVariacao(idVariacao,idProduto);
            telFocus();
            ajaxTootipCor();
        },
    // }).complete(function() {
    //     telFocus();
    //     ajaxTootipCor();
});
}


$(document).ready(function(){
    $(document).on('click', '#product .qtde-wrapper .fa-minus', function(){
        var valor = parseInt($('#product .qtde-wrapper input').val());
        if (valor > 1){
            $('#product .qtde-wrapper input').val(valor - 1);
            $('#product form input[name=qtde]').val(valor - 1);
        }
    });

    $(document).on('click', '#product .qtde-wrapper .fa-plus', function(){
        var valor = parseInt($('#product .qtde-wrapper input').val());    
        $('#product .qtde-wrapper input').val(valor + 1);
        $('#product form input[name=qtde]').val(valor + 1);
    });
});


function selecionarVariacao(el){
    var idProduto = $(el).closest('.variacao-opcao').find('input[name*=idProduto]').val();
    var idVariacao = $(el).closest('.variacao-opcao').find('.variacao-tamanho select option:selected').val();
    seleiconaGaleriaPorIdVariacao(idVariacao, idProduto);
}

function trocarImagemColorSwatch(el){
    var idProduto = $(el).attr('id-produto');
    var idVariacao = $(el).attr('id-variacao');
    $.ajax({
        url: BASE_URL+"produto/trocarImagemColorSwatch",
        method: "POST",
        data: {
            'idProduto': idProduto,
            'idVariacao': idVariacao
        },
        beforeSend: function(){
            var img = "<img class='loader-prod' style='width:200px;position:absolute;left:50%;margin-left:-100px;top:45%' src='"+BASE_URL+"templates/tema28/assets/images/ajax-loader.gif' />";
            $(el).closest('.product-container').find('.product-thumb').append(img);
        },
        success: function(result){
            $(el).closest('.product-container').find('.product-thumb > a').remove();
            $(el).closest('.product-container').find('.product-thumb').prepend(result);
            $(el).closest('.product-container').find('.product-thumb .loader-prod').remove();
        }
    });
}

function trocarImagemColorSwatchDepartamento(el){
    var idProduto = $(el).attr('id-produto');
    var idVariacao = $(el).attr('id-variacao');
    $.ajax({
        url: BASE_URL+"produto/trocarImagemColorSwatch",
        method: "POST",
        data: {
            'idProduto': idProduto,
            'idVariacao': idVariacao
        },
        beforeSend: function(){
            var img = "<img class='loader-prod' style='width:200px;position:absolute;left:50%;margin-left:-100px;top:45%' src='"+BASE_URL+"templates/tema28/assets/images/ajax-loader.gif' />";
            $(el).closest('.product-container').find('.left-block').append(img);
        },
        success: function(result){
            $(el).closest('.product-container').find('.left-block .table_produto').remove();
            $(el).closest('.product-container').find('.left-block').prepend(result);
            $(el).closest('.product-container').find('.left-block .loader-prod').remove();
        }
    });
}


// $(function(){
//     $(document).on("click",".cbp-spmenu ul > li:first-child > a",function(event) {
//         event.preventDefault();
//         if($(this).hasClass('active')){
//             $(this).removeClass('active');
//         }else{
//             $(this).addClass('active');
//         }
//         $(".cbp-spmenu ul > li ol").slideToggle("slow");
//     });
// });


function controlarListaDesejos(clienteLogadoId, el){

    var idProduto = $(el).closest('.variacao-opcao').find('input[name*=idProduto]').val();
    var idVariacao = $(el).closest('.variacao-opcao').find('.variacao-tamanho select option:selected').val();

    if (clienteLogadoId != ''){
        $(el).attr('onclick', 'controlarListaDesejos("'+clienteLogadoId+'",this);salvarProdutoListaDesejo("'+idProduto+'","'+idVariacao+'","'+clienteLogadoId+'",".mensagem_retorno_desejo")');
    }else{
        $(el).attr('onclick', 'mensagemListaDesejo("Efetue seu login para inserir o produto na sua lista de desejos.","0",".mensagem_retorno_desejo")');
    }
}

function converterFloatReal(valor){
    var inteiro = null, decimal = null, c = null, j = null;
    var aux = new Array();
    valor = ""+valor;
    c = valor.indexOf(".",0);
    /*encontrou o ponto na string*/
    if(c > 0){
        /*separa as partes em inteiro e decimal*/
        inteiro = valor.substring(0,c);
        decimal = valor.substring(c+1,valor.length);
    }else{
        inteiro = valor;
    }

    /*pega a parte inteiro de 3 em 3 partes*/
    for (j = inteiro.length, c = 0; j > 0; j-=3, c++){
        aux[c]=inteiro.substring(j-3,j);
    }

    /*percorre a string acrescentando os pontos*/
    inteiro = "";
    for(c = aux.length-1; c >= 0; c--){
        inteiro += aux[c]+'.';
    }
    /*retirando o ultimo ponto e finalizando a parte inteiro*/

    inteiro = inteiro.substring(0,inteiro.length-1);

    inteiro = inteiro.replace(".", "");

    decimal = parseInt(decimal);
    if(isNaN(decimal)){
        decimal = "00";
    }else{
        decimal = ""+decimal;
        if(decimal.length === 1){
            decimal = decimal+"0";
        }
    }
    valor = parseFloat(inteiro+"."+decimal);
    valor = valor.toFixed(2);
    valor = valor.replace(".", ",");
    return valor;
}


/*CONSULTA */
function removerProdCarConsulta(key){

    var idVariacao = $(".produto_consulta_"+key+" input[name='idVariacao']").val();

    var idProduto  = $(".produto_consulta_"+key+" input[name='idProduto']").val();

    $.ajax({

        type: "POST",

        async: true,

        data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,quantidade:0,tipo:'remover'},

        url: BASE_URL+"carrinho/atualizaValorProdutoCarrinhoConsulta",

        dataType: "json",

        beforeSend: function(){

            $(".loader-carrinho-consulta").fadeIn("300");

        },

        success: function(data){

            if(data['html']){
                $("#content-car-consulta").html('').html(data['html']);    
            }

            if(data['mensagem'] == 0 || data['mensagem'] == null || data['mensagem'] == 'null'){
                window.location.reload();
            }
            maskCampo();
            $(".loader-carrinho-consulta").fadeOut("300");
        }
    // }).complete(function() {
    //     maskCampo();
    //     setCarrinhoTopoAjax();
    //     $(".loader-carrinho").fadeOut("300");
});
}

function updadeQtdeProdCarConsulta(key,tipo){

    var idVariacao          = $(".produto_consulta_"+key+" input[name='idVariacao']").val();

    var idProduto           = $(".produto_consulta_"+key+" input[name='idProduto']").val();
    var id_servicos_extra   = $(".produto_consulta_"+key+" input[name='id_servicos_extra']").val();
    var id_cor_selecionada  = $(".produto_consulta_"+key+" input[name='id_cor_selecionada']").val();

    var qtd                 = parseInt($(".produto_consulta_"+key+" input[name='qtde']").val());
    // console.log(qtd);

    if(tipo == 'somar'){
        qtd = qtd + 1;
    }else if(tipo == 'subtrair'){
        qtd = qtd - 1;
    }

    if(qtd <= 0){
        alert("A quantidade mínima é: 1 unidade.");
    }


    $.ajax({

        type: "POST",

        async: true,

        data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,quantidade:qtd,tipo:'atualizar'},

        url: BASE_URL+"carrinho/atualizaValorProdutoCarrinhoConsulta",

        dataType: "json",

        beforeSend: function(){

            $(".loader-carrinho-consulta").fadeIn("300");

        },
        success: function(data){
            if(data['html']){
                $("#content-car-consulta").html('').html(data['html']);    
            }
            if(data['mensagem'] == 0){
                window.location.reload();
            }
            maskCampo();
            $(".loader-carrinho-consulta").fadeOut("300");
        }
    // }).complete(function() {
    //     maskCampo();
    //     setCarrinhoTopoAjax();
    //     $(".loader-carrinho").fadeOut("300");
});

}



/*######################### KIT ####################################*/

function selecionaVariacaoProdutoIdInfoExtraIdCorSelectKit(key_kit){
    var selecionado     = $('#product .produto-selectInfoExtra-'+key_kit).find('option:selected').val();
    if (selecionado != ''){

        selecionado         = selecionado.split(",");

        var idProduto   = selecionado[0];
        var idVariacao  = selecionado[1];
        var idInfoExtra = selecionado[2];
        var idCor       = selecionado[3];

        $.ajax({
            async: true,
            data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idCor:idCor,idInfoExtra:idInfoExtra,key_kit:key_kit},
            type:"POST",
            url:BASE_URL+"produto/getVariacaoProdutoIdInfoExtraIdCor",
            beforeSend: function (){
                $(".loader-carrinho-"+key_kit).fadeIn("slow");
            },
            success: function(htmlDados) {
                $('.kit-de-produto-ajax-'+key_kit).css('border', 'none');
                $('.kit-de-produto-ajax-'+key_kit).css('margin-bottom', '0');
                $("#kit-de-produto-"+key_kit).html('').html(htmlDados);
                atualizaTotalKit();
            }
        });
    }
}

function selecionaVariacaoProdutoIdInfoExtraSelectKit(key_kit){
    var selecionado     = $('#product .produto-selectInfoExtra-'+key_kit).find('option:selected').val();
    if (selecionado != ''){

        selecionado         = selecionado.split(",");

        var idProduto       = selecionado[0];
        var idVariacao      = selecionado[1];
        var idInfoExtra     = selecionado[2];

        $.ajax({
            async: true,
            data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idInfoExtra:idInfoExtra,key_kit:key_kit},
            type:"POST",
            url:BASE_URL+"produto/getVariacaoProdutoIdInfoExtra",
            beforeSend: function (){
                $(".loader-carrinho-"+key_kit).fadeIn("slow");
            },
            success: function(htmlDados) {
                $('.kit-de-produto-ajax-'+key_kit).css('border', 'none');
                $('.kit-de-produto-ajax-'+key_kit).css('margin-bottom', '0');
                $("#kit-de-produto-"+key_kit).html('').html(htmlDados);
                atualizaTotalKit();
            }
        });

    }
}

function selecionaSelectCorSelectKit(key_kit){
    var selecionado     = $('#product .produto-cor-'+key_kit).find('option:selected').val();
    if (selecionado != ''){

        selecionado     = selecionado.split(",");
        var idProduto   = selecionado[0];
        var idVariacao  = selecionado[1];
        var idCor       = selecionado[2];

        $.ajax({
            async: true,
            data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idCor:idCor,key_kit:key_kit},
            type:"POST",
            url:BASE_URL+"produto/getVariacoesProdutoInfoExtraIdCor",
            beforeSend: function (){
                $(".loader-carrinho-"+key_kit).fadeIn("slow");
            },
            success: function(htmlDados) {
                $('.kit-de-produto-ajax-'+key_kit).css('border', 'none');
                $('.kit-de-produto-ajax-'+key_kit).css('margin-bottom', '0');
                $("#kit-de-produto-"+key_kit).html('').html(htmlDados);
                atualizaTotalKit();
            },
        })
    }       
}

function selecionaVariacaoProdutoInfExtraIdCorBolasKit(idProduto,idVariacao,idCor, key_kit){
    $.ajax({
        async: true,
        data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idCor:idCor,key_kit:key_kit},
        type:"POST",
        url:BASE_URL+"produto/getVariacoesProdutoInfoExtraIdCor",
        beforeSend: function (){
            $(".loader-carrinho-"+key_kit).fadeIn("slow");
        },
        success: function(htmlDados) {

            $('.kit-de-produto-ajax-'+key_kit).css('border', 'none');
            $('.kit-de-produto-ajax-'+key_kit).css('margin-bottom', '0');
            $("#kit-de-produto-"+key_kit).html('').html(htmlDados);
            atualizaTotalKit();

        },
    });
}

function selecionaVariacaoProdutoIdCorBolasKit(idProduto,idVariacao,idCor, key_kit){
    $.ajax({
        async: true,
        data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idCor:idCor,key_kit:key_kit},
        type:"POST",
        url:BASE_URL+"produto/getVariacoesProdutoIdCor",
        beforeSend: function (){
            $(".loader-carrinho-"+key_kit).fadeIn("slow");
        },
        success: function(htmlDados) {
            $('.kit-de-produto-ajax-'+key_kit).css('border', 'none');
            $('.kit-de-produto-ajax-'+key_kit).css('margin-bottom', '0');
            $("#kit-de-produto-"+key_kit).html('').html(htmlDados);
            atualizaTotalKit();
        },
    });
}

function selecionaVariacaoProdutoIdInfoExtraIdCorBolasKit(idPVC){

    var res = idPVC.split(",");
    
    var idProduto   = res[0];
    var idVariacao  = res[1];
    var idInfoExtra = res[2];
    var idCor       = res[3];
    var key_kit     = res[4];

    $.ajax({
        async: true,
        data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idCor:idCor,idInfoExtra:idInfoExtra,key_kit:key_kit},
        type:"POST",
        url:BASE_URL+"produto/getVariacaoProdutoIdInfoExtraIdCor",
        beforeSend: function (){
            $(".loader-carrinho-"+key_kit).fadeIn("slow");
        },
        success: function(htmlDados) {
            $('.kit-de-produto-ajax-'+key_kit).css('border', 'none');
            $('.kit-de-produto-ajax-'+key_kit).css('margin-bottom', '0');
            $("#kit-de-produto-"+key_kit).html('').html(htmlDados);
            atualizaTotalKit();
        },
    });
}

function selecionaVariacaoProdutoIdInfoExtraBolasKit(idPV){

    var res = idPV.split(",");

    var idProduto   = res[0];
    var idVariacao  = res[1];
    var idInfoExtra = res[2];
    var key_kit     = res[3];
    
    $.ajax({
        async: true,
        data: {csrf_test_name:CSRF_TEST_NAME,idProduto:idProduto,idVariacao:idVariacao,idInfoExtra:idInfoExtra,key_kit:key_kit},
        type:"POST",
        url:BASE_URL+"produto/getVariacaoProdutoIdInfoExtra",
        beforeSend: function (){
            $(".loader-carrinho-"+key_kit).fadeIn("slow");
        },
        success: function(htmlDados) {
            $('.kit-de-produto-ajax-'+key_kit).css('border', 'none');
            $('.kit-de-produto-ajax-'+key_kit).css('margin-bottom', '0');
            $("#kit-de-produto-"+key_kit).html('').html(htmlDados);
            atualizaTotalKit();
        },
    });
}

function atualizaTotalKit(){
    $('#box-bottom-kit button').css('display', 'none');

    var total = 0;
    $('.preco_produto').each(function(index) {
        var valor = parseInt($(this).val());
        total += valor;
    });

    $.ajax({
        async: true,
        data: {csrf_test_name:CSRF_TEST_NAME,total:total},
        type:"POST",
        url:BASE_URL+"produto/getAtualizaTotalKit",
        beforeSend: function (){
            $(".loader-carrinho-total").fadeIn("slow");
        },
        success: function(htmlDados) {
            $(".total_kit").html('').html(htmlDados);
        },
    })
}


function addConjuntoKitBottomCompraCasada(){
    addConjuntoKit();
}

function addConjuntoKit(){
    var sumitLook   = true;
    var xc          = 0;

    $(".form-carrinho-kit").each(function() {
        var idVariacao  = $(this).find('.idVariacao').val();
        var idProduto   = $(this).find('.idProduto').val();

        $(this).find('button').trigger('click');
    });


    $(".loader-look-completo").fadeIn(300,function(){

        $("form.form-carrinho-kit input.idVariacao").each(function(){
            var Boxkit              = $(this).closest('.kit-de-produto');
            var form                = $(this).parent("form");
            var items               = form.serialize();
            var action              = form.attr('action');
            var ponteiraMensagem    = Boxkit.attr("data-kit");
            ponteiraMensagem        = '.mensagem_retorno_desejo-'+ponteiraMensagem;
            $.ajax({
                type: "POST",
                async: false,
                data: items,
                url: action,
                dataType: "json",
                success: function(data){}
            });
        });

        window.location.href = BASE_URL+"carrinho";

    });
}