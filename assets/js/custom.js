$(function () {
	$('#navbar').addClass('hide');

	/*############# AUTO HEIGH IMAGENS ################*/
	if ($("[class*='KuteShop']").length || $("[class*='kuteShop']").length || $("[class*='tema']").length) {
		$( ".table_produto" ).matchHeight();
		$( ".product-name" ).matchHeight();
		$( ".price small" ).matchHeight();
		$( ".price" ).matchHeight();
		$( ".product-info" ).matchHeight();
		$( ".right-block" ).matchHeight();
	}

	if ($("[class*='anygram']").length || $("[class*='shopse']").length) {
		$( ".product-container .thumb-info-wrapper" ).matchHeight();
		$( ".product-container .text-title-product" ).matchHeight();
		$( ".product-container .mb-0.pb-0.pt-0.text-cod" ).matchHeight();
		$( ".product-container .mb-0.mt-3.pbt-4.text-prod.text-prec.text-old" ).matchHeight();
		$( ".product-container .SEM_CLASSE" ).matchHeight();
		$( ".product-container .SEM_CLASSE2" ).matchHeight();
		$( ".product-container .mb-0.pbt-4.text-bold.text-prod.text-prec" ).matchHeight();
		$( ".mb-0.text-prod" ).matchHeight();
	}

	/*############# MENU SIZE ################*/
	if ($("[class*='anygram']").length || $("[class*='shopse']").length) {
		$('#navbar').removeClass('hide');
		setTimeout(function(){ menuSizeControl($('#navbar .navbar-nav'), 'li');}, 1000);
	}

	$(window).load(function() {
		if ($("#main-menu ul.navbar-nav > li").length) {
			console.log('ul');
			setTimeout(function(){ menuSizeControl($('#navbar .navbar-nav'), 'li');}, 1000);
		}

		if ($("#main-menu ol.navbar-nav > li").length) {
			console.log('ol');
			setTimeout(function(){ menuSizeControlOL($('#navbar ol'), 'li:not(:first-of-type)', ''); }, 1000);
		}
	});

});

function menuSizeControlOL(menu, childReference, tagExtra) {
    menu.removeClass("hide");
    var wi  = menu.width();
    var ref = menu.children(childReference);
    var x   = 0;
    ref.each(function() {
        x = parseInt( $(this).outerWidth(true) + x );
    });

    if( tagExtra !== undefined )
        x = parseInt(x + menu.children(tagExtra).outerWidth(true));

    if( x > wi ) {
        var  last = $('#navbar ol > li:last-child').addClass('hide');
        ref.last().remove();
        $(".links_restante").append(last);
        menuSizeControlOL(menu, childReference, tagExtra);
    }else{
        var clone = $(".links_restante").children('li').clone();
        var clone_plus = $(".menu_plus").children('li').clone();
        $(".header.style12 #main-menu .navbar .navbar-nav>li>a");
        $(".links_restante").remove();
        $(".menu_plus").remove();
        $("#navbar ol").append(clone);
        $("#navbar ol").append(clone_plus);
        alinhaMenu();
    }
}

function menuSizeControl(menu, childReference) {
	menu.removeClass("hide");
	var wi  = menu.width();
	var ref = menu.children(childReference);
	var x   = 0;

	ref.each(function() {
		x = parseInt( $(this).outerWidth(true) + x );
	});

	if( x > wi ) {
		var  last = $('#navbar ul > li:last-child').addClass('hide');
		ref.last().remove();
		menuSizeControl(menu, childReference);
	}else{
		var clone = $(".links_restante").children('li').clone();
        //$(".header #main-menu .navbar .navbar-nav>li>a").css("padding","0 20px");
        $(".links_restante").remove();
        $("#navbar ul").append(clone);
        $(".box-all-departamento").removeClass('hide');
        //alinhaMenu();
    }
}

$( document ).ready(function() {
	var survey = [];

	$(".rb-tab").click(function(){
		$(this).parent().find(".rb-tab").removeClass("rb-tab-active");
		$(this).addClass("rb-tab-active");
	});

	$(".trigger").click(function(){
		survey = [];
		for (i=1; i<=$(".rb").length; i++) {
			var rb = "rb" + i;
			var rbValue = parseInt($("#rb-"+i).find(".rb-tab-active").attr("data-value"));
			survey.push([i, rbValue]); 
		};
		debug();
	});

	function debug(){
		var debug = "";
		for (i=0; i<survey.length; i++) {
			debug += "Nº " + survey[i][0] + " = " + survey[i][1] + "\n";
		};
		alert(debug);
	};

	$('#carousel').owlCarousel({
		loop: true,
		responsiveClass:true,
		responsive: {
			0: { items: 4 },
			479: { items: 4 },
			768: { items: 4 },
			979: { items: 4 },
			1199: { items: 6 }
		},
		navText: [],
		margin: 10,
		autoWidth: false,
		items: 6,
		rtl: ( $('html').attr('dir') == 'rtl' ) ? true : false
	});

	$('.popup-with-zoom-anim').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,

		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});

	$(document).on('click', '.number-spinner button', function () {    
		var btn = $(this), oldValue = btn.closest('.number-spinner').find('input').val().trim(), newVal = 0;

		if (btn.attr('data-dir') == 'up') {
			newVal = parseInt(oldValue) + 1;
		} else {
			if (oldValue > 1) {
				newVal = parseInt(oldValue) - 1;
			} else {
				newVal = 1;
			}
		}

		btn.closest('.number-spinner').find('input').val(newVal);
	});

	$('.minus-button').click( (e) => {
		const minValue = 0
		const currentInput = $(e.currentTarget).parent().prev()[0];
		let minusInputValue = $(currentInput).html();

		if (minusInputValue > minValue) {
			minusInputValue --;
			$($(e.currentTarget).next()).removeAttr('disabled');
			$(currentInput).html(minusInputValue);

			if (minusInputValue <= minValue) {
				$(e.currentTarget).attr('disabled', 'disabled');
			}
		}
	});

	$('.plus-button').click( (e) => {
		const maxValue = 10
		const currentInput = $(e.currentTarget).parent().prev()[0];
		let plusInputValue = $(currentInput).html();

		if (plusInputValue < maxValue) {
			plusInputValue ++;
			$($(e.currentTarget).prev()[0]).removeAttr('disabled');
			$(currentInput).html(plusInputValue);

			if (plusInputValue >= maxValue) {
				$(e.currentTarget).attr('disabled', 'disabled');
			}
		}
	});

	var $main_nav = $('#main-nav');
	var $toggle = $('.toggle');

	if (TEMPLATE == 'tema27') {
		var defaultData = {
			maxWidth: false,
			customToggle: $toggle,
			navTitle: '',
			levelTitles: true,
			pushContent: '#container',
			insertClose: false,
			position: 'right', 
			labelBack: 'Voltar',
		};	
	}else {
		var defaultData = {
			maxWidth: false,
			customToggle: $toggle,
			navTitle: '',
			levelTitles: true,
			pushContent: '#container',
			insertClose: false,
			position: 'left', 
			labelBack: 'Voltar',
		};		
	}

	$main_nav.find('li.add').children('a').on('click', function() {
		var $this = $(this);
		var $li = $this.parent();
		var items = eval('(' + $this.attr('data-add') + ')');

		$li.before('<li class="new"><a>'+items[0]+'</a></li>');

		items.shift();

		if (!items.length) {
			$li.remove();
		}
		else {
			$this.attr('data-add', JSON.stringify(items));
		}

		Nav.update(true);
	});

	var Nav = $main_nav.hcOffcanvasNav(defaultData);

	const update = (settings) => {
		if (Nav.isOpen()) {
			Nav.on('close.once', function() {
				Nav.update(settings);
				Nav.open();
			});

			Nav.close();
		}
		else {
			Nav.update(settings);
		}
	};

	$main_nav.on('close', function(event, settings) {
		$( "#toggle-mobile" ).animate({
			opacity: 1,
			right: "0",
			top: "0",
			width: "42",
			height: "42"
		}, 500, function() {
		});

		$( "#toggle-mobile span" ).animate({
			left: 10,
		}, 5, function() {
		});
	});

	$main_nav.on('open', function(event, settings) {
		$( "#toggle-mobile" ).animate({
			// opacity: 0,
		}, 500, function() {
		});

		$( "#toggle-mobile span" ).animate({
			left: 10,
		}, 5, function() {
		});
	});

	var staticWidth = $(window).width();
	
	if(staticWidth < 990) {
		function myFunctionADD() {
			$("#header").css('position', 'fixed');
			$("#header").css('width', '100%');
			$("#header").css('background-color', '#f8f8f8');
			$("#header").css('top', '0');
			$("#header").css('transition', 'opacity 2s ease-in');
			$("#header").fadeIn( "fast" );
		}

		function myFunctionREM() {
			$("#header").removeAttr("style");
		}

		window.onscroll = function() { 
			var vPosition = $(window).scrollTop();
			if(vPosition < 73) {
				myFunctionREM();
			} else {
				myFunctionADD();
			}
		};
	}

	$(window).resize(function() {
		var vWidth = $(this).width();
		var vHeight = $(this).height();

		if(vWidth < 990) {		
		}
	});

	window.addEventListener('orientationchange', function() {
		switch(window.orientation) { 
			case -90: 
			case 90: 
			setTimeout(function(){ menuSizeControl($('#navbar .navbar-nav'), 'li');}, 1000);
			// case 90: location.reload();
			// resizeMenu();
			break; 
			default:
			// 	console.log(''); 
			break;
		}
	});

	$(document).ready(function () {

		$('#sidebarCollapse').on('click', function () {
			$('.sidebar_pai #sidebar').toggleClass('active');
			$('body').addClass('noscroll');
		});
		$('#sidebarCollapse2').on('click', function () {
			$('.sidebar_pai #sidebar').toggleClass('active');
			$('body').addClass('noscroll');
		});

	});

});