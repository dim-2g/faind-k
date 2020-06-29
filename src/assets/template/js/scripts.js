var fixedHeaderContainer = '.fixed-header-box';
var fixedHeader = '.fixed-header';

$(function() {
    //маска телефонов
    $('[data-mask]').each(function() {
        input = $(this);
        mask = input.attr('data-mask');
        input.inputmask({"mask": mask});
    });
    //сворачивание мобильного меню
    $('.toggle-menu-js').on('click', function (e) {
        e.preventDefault();
        $('body').removeClass('show-phones-menu')
        if ($('body').hasClass('show-slide-menu')) {
            $('body').removeClass('show-slide-menu')
        } else {
            $('body').addClass('show-slide-menu')
        }
    });

    //сворачивание меню с телефонами
    $('.toggle-phones-menu-js').on('click', function (e) {
        e.preventDefault();
        $('body').removeClass('show-slide-menu')
        if ($('body').hasClass('show-phones-menu')) {
            $('body').removeClass('show-phones-menu')
        } else {
            $('body').addClass('show-phones-menu')
        }
    });

    //разворачивание второго уровня меню в мобильной версии
    $('body').on('click', '.mobile-menu__item--parent > a', function(e) {
        e.preventDefault();
        var parent = $(this).closest('.mobile-menu__item--parent');
        if (parent.hasClass('open')) {
            parent.find('.mobile-menu__childs').slideUp(300, function() {
                $('.mobile-menu__childs').stop(true, true);
            });
            parent.removeClass('open')
        } else {
            parent.find('.mobile-menu__childs').slideDown(300, function() {
                $('.mobile-menu__childs').stop(true, true);
            });
            parent.addClass('open')
        }
    });

    //разворачивание второго уровня вертикального меню
    $('body').on('click', '.catalog-menu__arrow', function(e) {
        e.preventDefault();
        var parent = $(this).closest('li');
        var ul = parent.find('ul');
        if (parent.hasClass('active')) {
            console.log('hasClass');
            ul.slideUp(300, function() {
                ul.stop(true, true);
                parent.removeClass('active')
            });
        } else {
            ul.slideDown(300, function() {
                ul.stop(true, true);
                parent.addClass('active');
            });
        }
    });

    //разворачивание второго уровня мобильного меню
    $('body').on('click', '.mobmenu__arrow', function(e) {
        e.preventDefault();
        var parent = $(this).closest('li');
        var ul = parent.find('ul');
        if (parent.hasClass('open')) {
            ul.slideUp(300, function() {
                ul.stop(true, true);
                parent.removeClass('open')
            });
        } else {
            ul.slideDown(300, function() {
                ul.stop(true, true);
                parent.addClass('open');
            });
        }
    });

    //разворачивание в каталоге готовых коробок
    $('body').on('click', '.catalog-table-row__caption', function(e) {
        e.preventDefault();
        var parent = $(this).closest('.catalog-table-row');
        var ul = parent.find('.catalog-table-row__grid');
        if (parent.hasClass('open')) {
            ul.slideUp(300, function() {
                ul.stop(true, true);
                parent.removeClass('open')
            });
        } else {
            ul.slideDown(300, function() {
                ul.stop(true, true);
                parent.addClass('open');
            });
        }
    });

    //плавный переход по контенту
    $('body').on('click', '[data-goto]', function(e) {
        e.preventDefault();
        $('.mobile-menu').slideUp();
        var hx = 0;
        var selector = $(this).attr('data-goto');
        $('html, body').animate({ scrollTop: $(selector).offset().top + hx}, 1200);
    });

    //обрабатываем событие клика по табу
    $('[data-tab]').click(function(e){
        e.preventDefault();
        if ($(this).hasClass('active')) return false;
        var parent = $(this).parents('.xtab-container');
        var xtab = parent.find('.xtab');
        xtab.stop(true, true);
        parent.find('[data-tab]').removeClass('active');
        //$(this).addClass('active');
        var data_tab = $(this).attr('data-tab');
        $('[data-tab="'+data_tab+'"]').addClass('active');
        xtab.animate({"opacity": 0.2}, 300, function() {
            xtab.removeClass('active');
            xtab.animate({"opacity": 1});
            $(data_tab).addClass('active');
        });
        return false;
    });

    //сабмит форм при клике по ссылкам с аттрибутом data-ms2form-submit
    $('body').on('click', '[data-ms2form-submit]', function(e) {
        e.preventDefault();
        var parent = $(this).attr('data-ms2form-submit');
        $(this).closest(parent).find('form.ms2_form').trigger('submit');
    });

    //инициализация верхнего слайдера
    initMainSlider();
    //инициализация слайдера у товара
    //initProductSlider();
    //инициализация слайдера похожих статей
    //initRelatedArticles();
    //инициализация всех табов
    //initXtab();
    //установка высоты плавающего хедера
    //setHeaderHeight();
    //установка высоты страницы 404
    //initErrorPageHeigth();
    //установка видимости кнопки наверх
    //initGotoTopButton();
    //инициализация слайдера в карточке товара
    initProductCardSlider();

    //показ всех товаров в каталоге при клике на "Показать еще"
    $('body').on('click', '.more-js', function(e) {
        e.preventDefault();
        var box = $(this).parents('.services').find('.hidden').removeClass('hidden');
        $(this).addClass('hidden');
    });

    $('select.styler').styler();
    $('.checkbox-styler').styler();

    //устанавливаем координаты выпадающего списка с телефонами
    setPositionPhonesMenu();
    //устанавливаем заголовок модального окна
    $('body').on('click', '[data-product-name]', function() {
        var productName = $(this).attr("data-product-name");
        $(".addproduct-popup__name").text(productName);
    });


});

var setPositionPhonesMenu = function() {
    var etalon = $('.header-mobile__phone');
    var menu = $('.phones-menu');
    var left = etalon.offset().left - 12;
    menu.css({"left": left});
};

var setOneClickData = function(elem) {
    var productId = elem.attr('data-product-id');
    var productName = elem.attr('data-product-name');
    var productImage = elem.attr('data-product-image');

    $('.oneclick-popup__name').text(productName);
    $('.oneclick-form [name="product_id"]').val(productId);
    $('.oneclick-form [name="product_name"]').val(productName);
    $('.oneclick-popup__image').css({ "background-image": "url('"+productImage+"')" });
}

var initXtab = function() {
    setTimeout(function() {
        $('.xtab-container').each(function() {
            $(this).addClass('xtab-initialized');
        });
    }, 100);
};

/*
var isInitMainSlider = false;
var initMainSlider = function() {
    var selector = '.main-slider-js';
    $(selector).owlCarousel({
        loop: true,
        margin: 0,
        responsiveClass:true,
        dotsClass: 'owl-dots container',
        dotsContainer: '#carousel-custom-dots',
        responsive:{
            0:{
                items: 1,
                nav: false,
                dots: true,
            }
        }
    });
};

 */


var slider_main = false;
initMainSlider  = function(selector = '.main-slider-js') {
    console.log('start');
    if (!slider_main) {
        $(selector).slick({
            'autoplay': false,
            'arrows': false,
            'dots': true,
            'slidesToShow': 1,
            'slidesToScroll': 1,
            'appendDots': $('.main-slider-dots__items'),
            'fade': false
        });
        slider_main = true;
    }
};

var initProductSlider = function () {
    var selector = '.product-gallery-js';
    $(selector).owlCarousel({
        loop: true,
        margin: 0,
        responsiveClass:true,
        //autoWidth:true,
        responsive:{
            0:{
                items: 1,
                nav: false,
                dots: true,
            }
        }
    });
};

var initProductCardSlider = function() {
    $('.product-gallery-js').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        fade: true,
        asNavFor: '.product-prevs-js',
        responsive: [
            {
                breakpoint: 750,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    $('.product-prevs-js').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.product-gallery-js',
        dots: false,
        focusOnSelect: true,
        arrows: true,
        variableWidth: false,
        responsive: [
            {
                breakpoint: 750,
                settings: {
                    arrows: false,
                    vertical: false
                }
            }
        ]
    });
};
/*
var initProductCardSlider = function() {
    var selector = '.product-gallery-js';
    $(selector).owlCarousel({
        loop: true,
        margin: 0,
        responsiveClass:true,
        //autoWidth:true,
        responsive:{
            0:{
                items: 1,
                nav: false,
                dots: true,
            },
            750:{
                items: 1,
                nav: false,
                dots: true,
            },
            1000:{
                items: 1,
                nav: false,
                dots: true,
            }
        }
    });

    var prevsSelector = '.product-prevs-js';
    var prevs = $(prevsSelector).owlCarousel({
        loop: false,
        margin: 0,
        responsiveClass:true,
        //autoWidth:true,
        responsive:{
            0:{
                items: 2,
                nav: false,
                dots: false,
            }
        }
    });

    prevs.on('translated.owl.carousel', function(event) {
        console.log('changed');
    });
};
*/
var hideSlideMenu = function() {
    $('body').removeClass('show-slide-menu');
};

var setHeaderHeight = function() {
  var headerHeight = $(fixedHeader).height();
  $(fixedHeaderContainer).css({'height': headerHeight});
};

var setFixedHeader = function() {
    var topFixedStart = parseInt($('.topline').offset().top) + parseInt($('.topline').height());
    var scroll = $(window).scrollTop();
    if (scroll > topFixedStart) {
        $('body').addClass('fix-header');
    } else {
        $('body').removeClass('fix-header');
    }
};

var initErrorPageHeigth = function() {
  var errorPageBody = $('.fix-height');
  if (errorPageBody.length == 1) {
      var windowHeight = $(window).outerHeight();
      var bodyHeight = $('body').outerHeight();
      var errorPageBodyHeight = errorPageBody.outerHeight();
      var newErrorPageHeight = windowHeight - (bodyHeight - errorPageBodyHeight);
      if (bodyHeight < windowHeight) {
          errorPageBody.css({'min-height': newErrorPageHeight});
      }
  }
};

var initGotoTopButton = function() {
    var scroll = $(window).scrollTop();
    if (scroll > 400) {
        $('.goto-top').addClass('goto-top--visible');
    } else {
        $('.goto-top').removeClass('goto-top--visible');
    }
};

var doit;
$(window).resize(function(){
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
});

var resizedw = function(){
    //setCountProducts();
    //setHeaderHeight();
    //setFixedHeader();
    $('body').removeClass('show-slide-menu');
    $('body').removeClass('show-phones-menu');
    setPositionPhonesMenu();
    //$('.mobile-menu').slideUp();
};

$(document).scroll(function(){
    setFixedHeader();
    initGotoTopButton();
});

$(window).on("load",function(){
    $(".filter__items").mCustomScrollbar({
        setHeight: 116,
        theme: "dark"
    });
});

