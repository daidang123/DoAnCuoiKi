var hashString = window.location.hash;
var hashParams = new URLSearchParams(hashString.slice(1));
var productId = hashParams.get('product-id');

console.log(productId);

const API_URL = 'https://api-doan-rrbe.vercel.app/posts'
var product = '';
var content = '';
fetch(API_URL)
.then(response => response.json())
.then(data => {
  product = data[productId];
  $('#mainImage').attr('src', product.src)
  $('.images-right').empty();
  var imageCount = 0;
  $.each(product.colors, function(index, item) {

    $.each(item.imgs_path, function(i,imgs_path) {
      
      if (imageCount < 5) { // Chỉ thêm ảnh khi số lượng chưa đạt tới 5
        content = `
          <img src="${imgs_path}" alt="" data-color="${item.color}">
        `;
        $('.images-right').append(content);
        imageCount++;
      } else {
        return false; // Dừng việc lặp nếu số lượng ảnh đã đạt tới 5
      }

    });
  
  });
  $('#reviewProductBlock').show();
  $('#reviewProductTitle').text(product.title_product);
  $('#product-code').text('Mã sản phẩm: ' + product.author);
  $('#reviewProductPrice').text(product.price_current);
  $('#materialDetail').text(product.material);
   

  $('#req').empty(); // Xóa nội dung hiện tại
$.each(product.colors, function(index, item) {
  var span = $('<span>').text(item.title);
  var a = $('<a>').attr('href', '#').append(span);
  var color = item.color;
  a.css('background-color', color);
  a.on('click', function(event) {
    event.preventDefault();
   
    // Xóa lớp active của tất cả các thẻ a trong #req
    $('#req a').removeClass('active');

    // Thêm lớp active cho thẻ a được chọn
    a.addClass('active');

    // Truyền nội dung của thẻ span vào thẻ span có lớp "appendColor"
    $('.appendColor').text(a.find('span').text());
  });

  // Thêm thẻ a vào khối #req
  $('#req').append(a);
});
const sizeContainer = $('#size');
sizeContainer.empty();
$.each(product.size, function(index, size) {
  const link = $('<a>').attr('href', '#').text(size);
  sizeContainer.append(link);
  link.on('click', function(event) {
    event.preventDefault();

    $('#size a').removeClass('active');

    // Thêm lớp active cho thẻ a được chọn
    link.addClass('active');

    // Truyền nội dung của thẻ a vào khối appendSize
    $('.appendSize').text(link.text());
  });
});

$('.images-right img').click(function() {
    var selectedImage = $(this).attr('src');
    $('#mainImage').attr('src', selectedImage);

    // Xóa viền đỏ từ ảnh trước đó được chọn
    $('.images-right img').removeClass('selected');

    // Thêm viền đỏ vào ảnh được nhấp chuột
    $(this).addClass('selected');
  });

   // Xử lý sự kiện khi nhấp chuột vào slick-next-2
   $('.slick-next-2').click(function() {
    var selectedImage = $('.images-right img.selected');
    var nextImage = selectedImage.next('img');
    if (nextImage.length === 0) {
      nextImage = $('.images-right img').first();
    }
    var nextImageSrc = nextImage.attr('src');
    $('#mainImage').attr('src', nextImageSrc);
    selectedImage.removeClass('selected');
    nextImage.addClass('selected');
  });

  // Xử lý sự kiện khi nhấp chuột vào slick-next-1
  $('.slick-next-1').click(function() {
    var selectedImage = $('.images-right img.selected');
    var prevImage = selectedImage.prev('img');
    if (prevImage.length === 0) {
      prevImage = $('.images-right img').last();
    }
    var prevImageSrc = prevImage.attr('src');
    $('#mainImage').attr('src', prevImageSrc);
    selectedImage.removeClass('selected');
    prevImage.addClass('selected');
  });

})
.catch(error => {
    console.log("Co loi");
  });

  document.addEventListener('DOMContentLoaded', function() {
    const minusButton = document.querySelector('#minus-button');
    const plusButton = document.querySelector('#plus-button');
    const quantityInput = document.querySelector('.input_number_product input');
    // Xử lý sự kiện khi người dùng nhấp vào nút "minus"
    minusButton.addEventListener('click', function() {
      let quantity = parseInt(quantityInput.value);
      if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
      }
    });
  
    // Xử lý sự kiện khi người dùng nhấp vào nút "plus"
    plusButton.addEventListener('click', function() {
      let quantity = parseInt(quantityInput.value);
      quantity++;
      quantityInput.value = quantity;
    });
  
    // Các xử lý sự kiện khác ở đây
  
  });


  
// Xử lý sự kiện khi nhấn vào nút "Thêm vào giỏ hàng"
// Kiểm tra xem đã chọn màu và kích thước chưa
$('#addtoCart').on('click', function(event) {
    event.preventDefault();
  
    var selectedColor = $('.appendColor').text();
    var selectedSize = $('.appendSize').text();
  
    if (selectedColor !== '' && selectedSize !== '') {
      // Thực hiện sự kiện "Add to Cart" chỉ khi đã chọn màu và kích thước
      addToCart();
      quickViewModal.style.display = 'none';
      $('.appendColor').empty();
      $('.appendSize').empty();
    } else {
      // Hiển thị thông báo cho người dùng rằng họ cần chọn màu và kích thước
      alert('Vui lòng chọn màu và kích thước sản phẩm trước khi thêm vào giỏ hàng.');
    }
  
  });
  // Hàm thực hiện sự kiện "Add to Cart"
  function addToCart() {
    // Lấy thông tin sản phẩm
    var productName = $('#reviewProductTitle').text();
    var productPrice = $('#reviewProductPrice').text();
    var productImage = $('#mainImage').attr('src');
    var productCode = $('#product-code').text();
    var selectedColor = $('.appendColor').text();
    var selectedSize = $('.appendSize').text();
    var quantityValue =  $('#quantity input').val();
  
    // Kiểm tra xem mảng cartItems đã tồn tại trong Local Storage chưa
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
    var existingItem = cartItems.find(function(item) {
      return item.name === productName;
    });
  
    if (existingItem) {
      alert('Sản phẩm đã có trong giỏ hàng');
    } else {
      alert('Đã thêm sản phẩm vào giỏ hàng');
      var newItem = {
        name: productName,
        price: productPrice,
        image: productImage,
        code: productCode,
        color: selectedColor,
        size: selectedSize,
        value: quantityValue,
      };
      cartItems.push(newItem);
  
      // Lưu mảng cartItems vào Local Storage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      console.log('Sản phẩm đã được thêm vào giỏ hàng.');
    }
  }
   

 



  
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
