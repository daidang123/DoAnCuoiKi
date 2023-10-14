
// Call lib OwlCarousel
$(document).ready(function () {

// <!-- Main menu. Search /Start / -->

const input = document.getElementById('search');
const placeholderText = input.getAttribute('placeholder');
let placeholderIndex = 0;

function showPlaceholder() {
  input.setAttribute('placeholder', placeholderText.slice(0, placeholderIndex));
  placeholderIndex++;
  if (placeholderIndex > placeholderText.length) {
    placeholderIndex = 0;
  }
}

const placeholderInterval = setInterval(showPlaceholder, 200);



// <!-- Top-Header./Start -->

const closeTopHeader = document.querySelector('.close-top-header');
const topHeader = document.querySelector('.top-header');

closeTopHeader.addEventListener('click', () => {
  topHeader.style.display='none'
});

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





$('.openMenuMobile').click(function (e) {
  e.preventDefault();
  $('.backdrop_body, .closeMenuMobile, .menu-main-mobile').addClass('active');
  $('body').addClass('overflow-y')
});
$('.closeMenuMobile ').click(function (e) {
  e.preventDefault();
  $('body').removeClass('overflow-y')
  $('.backdrop_body, .closeMenuMobile, .menu-main-mobile').removeClass('active');
});
$('.menuList-links li i').click(function (e) {
  e.preventDefault();
  // $('.tabLeftMenu').removeClass('active')
  $(this).addClass('active').next('.tabLeftMenu').addClass('active');
});
$('.headerMenuItem .c1Item').click(function (e) {
  e.preventDefault();
  $(this).parent('.headerMenuItem').parent('.tabLeftMenu').removeClass('active')
  //  $('.tabLeftMenu').removeClass('active')
});
var pathname = window.location.pathname;
if ($('.menu-item').length) {
  $('.menu-item').each(function () {
      if ($(this).attr('data-link') === pathname) {
          $(this).addClass('activeItems');
      }
  })
}




