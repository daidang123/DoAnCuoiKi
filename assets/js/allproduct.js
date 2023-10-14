
const goToDetail = (event, index = null) => {
  event.preventDefault();
 var urlParams = new URLSearchParams(window.location.search);
 urlParams.set('product-id', index); // Set the new value for 'product-id'

 var detailPageURL = 'detail-product.html' + '#' + urlParams.toString();
 window.location.href = detailPageURL;
};

function updateCartItemCount() {
 var count = localStorage.getItem('cartItemCount') || 0;
 $('.count-cart').text(count);
}

updateCartItemCount();










const API_URL = 'https://api-doan-cizl.vercel.app/posts';
const imagesLeft = document.getElementById("images-left");
const productAll = document.getElementById("productAll");
const menuAllProduct = document.querySelector(".menu-allproduct");

const getApi = async (API_URL) => {
  try {
    const response = await axios.get(API_URL);
    showData(response.data);
  } catch (error) {
    console.error(error);
  }
};

getApi(API_URL);

const showData = (data) => {
  let HTML = '';

  data.forEach((item, index) => {
    const tagNewItemHTML = item.tagNewItem == "new" ? `
        <div class="tagProItem tagNewItem">
          <span>New</span>
        </div>
      ` : '';

    HTML += `
      <div class="item product col-12 col-sm-6 col-md-3" data-material="${item.material}" data-author="${item.author}" data-category="${item.category}">
        <div class="product-image">
          <a href="#" onclick="goToDetail(event)">
            <img src="${item.src}" alt="">
          </a>
          <div class="box_action">
            <div class="quickView" onclick="showPopup(${index})">
              Xem Nhanh
              <i class="fas fa-eye"></i>
            </div>
            <div class="quickLink" onclick="goToDetail(event,${index})">
              Chi tiết
              <i class="fas fa-shopping-cart"></i>
            </div>
          </div>
          <div class="boxTagIcon">
            <div class="tagProItem tagCalcItem">
              <span>-30%</span>
            </div>
            ${tagNewItemHTML}
          </div>
        </div>
        <div class="product-title">
          <a href="#" onclick="goToDetail(event)">${item.title_product}</a>
        </div>
        <div class="product-price">
          <s class="product-price-old">${item.price_old} VNĐ</s>
          <span class="product-price-current">${item.price_current} VNĐ</span>
        </div>
      </div>
    `;
  });

  productAll.innerHTML = HTML;
};

// const form = document.querySelector('#form');
//   const input = document.querySelector('#search');

// // Function Search Film
// form.addEventListener('submit', (event) => {
//   event.preventDefault();

//   let valueInput = input.value;
//   // console.log(valueInput);

//   if(valueInput && valueInput !== '') {    
//     const apiSearch = URL_API + `?title_like=${valueInput}`;
//     getApi(apiSearch);
//     input.value = '';
//   }else {
//     window.location.reload();
//   }
// });





menuAllProduct.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
      const category = event.target.dataset.category;
      const products = document.querySelectorAll(".item.product");
  
      products.forEach((product) => {
        if (category === "all" || !product.dataset.category) {
          product.style.display = "block"; // Hiển thị tất cả sản phẩm và các sản phẩm không có dữ liệu category
        } else {
          const productCategory = product.dataset.category;
          product.style.display = productCategory === category ? "block" : "none";
        }
      });
    }
  });   
  
  const menuItems = menuAllProduct.querySelectorAll('.item');

  menuItems.forEach((item) => {
    const link = item.querySelector('a');
  
    link.addEventListener('click', (event) => {
      // Xóa lớp "active" khỏi tất cả các mục
      menuItems.forEach((menuItem) => {
        menuItem.classList.remove('active');
      });
  
      // Thêm lớp "active" vào mục được nhấp vào
      item.classList.add('active');
    });
  });

  function showPopup(index) {
    var product = '';
    var content = '';
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      product = data[index];
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
      $('#quickViewModal').show();
      $('#reviewProductTitle').text(product.title_product);
      $('#product-code').text('Mã sản phẩm: ' + product.author);
      $('#reviewProductPrice').text(product.price_current);
      $('#materialDetail').text(product.material);
  
  
  
      
  
  
  
  
  
      // chon mau san pham
      // Cập nhật phần 'req' với các màu
   
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
  
    // chọn size sản phẩm
  
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
  
  
    
    const closeModal = document.querySelector('.close-modal');
    const quickViewModal = document.querySelector('#quickViewModal');
    closeModal.addEventListener('click', () => {
      quickViewModal.style.display = 'none';
    });
    
  
  
  }
  
  
  
  
  
  
  
  
  
  document.addEventListener('DOMContentLoaded', function() {
    const minusButton = document.querySelector('#minus-button');
    const plusButton = document.querySelector('#plus-button');
    const quantityInput = document.querySelector('.input_number_product input');
    const addtoCartButtons = document.querySelectorAll('.addtoCart');
  
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
  



