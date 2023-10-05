// Call lib OwlCarousel
$(document).ready(function () {


  $('.main-top-header').owlCarousel({
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


$('.banner-main').owlCarousel({
  loop: true, //Vong lap trong slider
  margin: 0, //Khoang cach giua cac item
  nav: true, //Dieu huong slider
  autoplay: true, //slider tu dong chay
  autoplayTimeout: 5000, //Toc do chay don vi ms
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


$('.material').owlCarousel({
  loop: true, //Vong lap trong slider
  margin: 30, //Khoang cach giua cac item
  nav: true, //Dieu huong slider
  autoplay: true, //slider tu dong chay
  autoplayTimeout: 3500, //Toc do chay don vi ms
  autoplayHoverPause: true,
  responsive:{
        0: {
            items:3,
        },
        600:{
            items:3,
        },
        1000:{
            items:5,
            
        }
    }
});


$('.list-clothes').owlCarousel({
  loop: true, //Vong lap trong slider
  margin: 0, //Khoang cach giua cac item
  nav: true, //Dieu huong slider
  autoplay: false, //slider tu dong chay
  autoplayTimeout: 3500, //Toc do chay don vi ms
  autoplayHoverPause: true,
  responsive:{
        0: {
            items:3,       
        },
        600:{
            items:3,
        },
        1000:{
            items:8,
            loop:false,
            autoplay: false, 

            
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



const handleScroll = () => {
  if ($(window).scrollTop() > 5) {
    $('.back_top').fadeIn();
    if ($('.scrollLogo').length) {
      $('header').addClass('stickyHeader');
    }
  } else {
    $('.back_top').fadeOut();
    $('header').removeClass('stickyHeader');
  }
};

const handleBackToTop = (event) => {
  $('html, body').animate({ scrollTop: 0 }, 1000);
};

$(window).scroll(handleScroll);
$('.back_top').click(handleBackToTop);







