/*------------------------------------
 *Author:MD ABU SAYED
 *Template:Booksworld Store
 *Version:1.0
 *-------------------------------------
 */


$(document).ready(function() {

  $(window).scroll(function(){
    if ($(this).scrollTop()>100){
      $('#header').addClass('fixed-header');
      $('.option-box').addClass('option-box-fixed');
    } 
    else {
      $('#header').removeClass('fixed-header');
      $('.option-box').removeClass('option-box-fixed');
    }
  });

  $('.pslider').owlCarousel({
    items:5,
    autoplay:true,
    dots:false,
    animateIn: 'fadeInRight',
    loop:true,
    margin:10,
    nav:true,
    navText:['<i class="icofont icofont-caret-left"></i>','<i class="icofont icofont-caret-right"></i>'],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
  })


  $('.clslider').owlCarousel({
    items:1,
    autoplay:true,
    dots:false,
    loop:true,
    margin:10,
    nav:true,
    navText:['<i class="icofont icofont-rounded-left"></i>','<i class="icofont icofont-rounded-right"></i>'],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
  })

  $('.body').on('shown.bs.collapse', function () {
    $(this).parent().find('.icofont-thin-down')
                    .removeClass('icofont-thin-down')
                    .addClass('icofont-thin-up');
  }).on('hidden.bs.collapse', function () {
      $(this).parent().find(".icofont-thin-up")
                      .removeClass("icofont-thin-up")
                      .addClass("icofont-thin-down");
  });
  
  
  $(".ajax_to_cart").submit(function(event) {
        event.preventDefault();
    
        var $form = $(this),
            quantity_val = $form.find('input[name="quantity"]').val(),
            url = $form.attr('action');
    
        var posting = $.post(url, {
            quantity: quantity_val
        });
    
        posting.done(function(data) {
            var $result = $(data).find('.cart-content');
            $(".cart-nav").html($result);
        });
    });
    
    $('.delete_cart_item').on('click', function(event){
        $.ajax({
          type: "GET", 
          url: $(this).attr('target'),
          dataType: 'html',
          success: function(data, textStatus, xhr){
             (".cart-nav").load(".cart-content");
          }
        });
    });
    
    $('.btn-qty').on('click',function(event){
      event.preventDefault();
    
      var button = $(this);
        var oldValue = button.parent().find("input").val();
        var newVal;
    
      if (button.text() == "+") {
          newVal = parseFloat(oldValue) + 1;
      } else{
        if (oldValue > 0) {newVal = parseFloat(oldValue) - 1;} else {newVal = 0;}
      }
        button.parent().find("input").val(newVal);
    });
  
  
  /* Start Quickview Modal*/
  
    $('.quickview').on('click', function(){
        $.ajax({
          type: "GET", 
          url: $(this).attr('href'),
          dataType: 'html',
          success: function(quickview_data){
            var $return_result = $(quickview_data).find('#storeQuickviewModal');
            $("#modal_div").html($return_result);
            
            $("#storeQuickviewModal .dropdown-list-quickview").change(function(){
                var selected_value1 = $("#option1").val();
                if(selected_value1 === undefined){selected_value1 = null;}
                
                var selected_value2 = $("#option2").val();
                if(selected_value2 === undefined){selected_value2 = null;}
                
                var selected_value3 = $("#option3").val();
                if(selected_value3 === undefined){selected_value3 = null;}
                
                var variant_data = $("#variant_data");
    
                var selected_variant = variant_data.data("variants").filter(function(variant){
                    return variant.option1 == selected_value1 && variant.option2 == selected_value2 && variant.option3 == selected_value3;
                });
                
                $("#selected_variant_hidden").val(selected_variant[0].id);
                
                $store_currency = variant_data.data("currency");
                var price = $store_currency + " " + parseInt(selected_variant[0].price).toFixed(1).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                $("#quickview_product_price").html(price);
                
            });
            
            addthis.toolbox('.addthis_toolbox');
            
            $("#quickview-carousel").owlCarousel({
              items : 4,
              itemsDesktop : [1199,3],
              itemsDesktopSmall : [979,3],
              pagination: false,
              navigation:true,
              navigationText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
            });
            $("#storeQuickviewModal").modal('show');
          }
        });
        return false;
    });
    
    /*End Quickview Modal*/
  
  
  $('span.stars').stars();



});


// rating
$.fn.stars = function() {
    return $(this).each(function() {
        var val = parseFloat($(this).html());
        var size = Math.max(0, (Math.min(5, val))) * 16;
        var $span = $('<span />').width(size);
        $(this).html($span);
    });
};


function openmenuSidenav() {
  if ($(window).width() > 360) {
    document.getElementById("menu-sidenav").style.width = "280px";
  }else{
    document.getElementById("menu-sidenav").style.width = "250px";
  }
}

function closemenuSidenav() {
  document.getElementById("menu-sidenav").style.width = "0";
}


function openOption() {
  document.getElementById("filter").style.width = "100%";
}

function closeOption() {
  document.getElementById("filter").style.width = "0";
}
