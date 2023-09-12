// Call lib OwlCarousel
$(document).ready(function () {


  $('.owl-carousel').owlCarousel({
    loop: true, //Vong lap trong slider
    margin: 0, //Khoang cach giua cac item
    nav: true, //Dieu huong slider
    autoplay: true, //slider tu dong chay
    autoplayTimeout: 3500, //Toc do chay don vi ms
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });

});


$('.product-hot').owlCarousel({
  loop: true, //Vong lap trong slider
  margin: 30, //Khoang cach giua cac item
  nav: true, //Dieu huong slider
  autoplay: true, //slider tu dong chay
  autoplayTimeout: 3500, //Toc do chay don vi ms
  autoplayHoverPause: true,
  responsive:{
        0: {
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5,
            
        }
    }
});

$('.material').owlCarousel({
  loop: true, //Vong lap trong slider
  margin: 30, //Khoang cach giua cac item
  nav: true, //Dieu huong slider
  autoplay: true, //slider tu dong chay
  autoplayTimeout: 3500, //Toc do chay don vi ms
  autoplayHoverPause: true,
  responsive:{
        0: {
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5,
            
        }
    }
});


$(".menu-main li").hover(
  function() {
    $(this).find(".sub-menu").slideDown();
  },
  function() {
    $(this).find(".sub-menu").slideUp();
  }
);


