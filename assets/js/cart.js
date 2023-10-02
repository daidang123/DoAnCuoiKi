// Function to format price with commas
function formatPrice(price) {
    return price.toLocaleString('en-US');
  }
  
  // Function to update the total amount
  function updateTotalAmount() {
    var totalPriceElements = $('.line_total_price');
    var totalAmount = 0;
  
    totalPriceElements.each(function() {
      var price = parseFloat($(this).text().replace(/[^0-9.-]+/g, ""));
      totalAmount += price;
    });
  
    $('.total-amount').text(formatPrice(totalAmount) + ' VNĐ');
  }
  
  // Function to update the cart item total
  function updateCartItemTotal(cartItem, quantity) {
    var priceElement = cartItem.find('.line_price');
    var totalPriceElement = cartItem.find('.line_total_price');
    var price = parseFloat(priceElement.text().replace(',', ''));
    var totalPrice = price * quantity;
  
    totalPriceElement.text(formatPrice(totalPrice));
    updateTotalAmount();
  }
  
  // Function to update the local storage
  function updateLocalStorage() {
    var updatedCartItems = [];
  
    $('.popup_item').each(function() {
      var item = {
        image: $(this).find('img').attr('src'),
        name: $(this).find('.popup_item_info a').text(),
        size: $(this).find('.popup_item_info a').text().match(/Size (\d+)/)[1],
        color: $(this).find('.popup_item_info a').text().match(/Màu : (\w+)/)[1],
        price: $(this).find('.line_price').text(),
        value: $(this).find('.quantity').val()
      };
  
      updatedCartItems.push(item);
    });
  
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  }
  
  $(document).ready(function() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems'));
    var cartContentHTML = '';
  
    cartItems.forEach(function(item) {
      var price = parseFloat(item.price.replace(',', ''));
      var value = parseInt(item.value);
      var totalPrice = price * value;
  
      var itemHTML = `
        <div class="popup_item">
          <div class="popup_item_img">
            <a href="#"><img src="${item.image}" alt=""></a>
          </div>
          <div class="popup_item_info">
            <a href="#">${item.name} - Size ${item.size} - Màu : ${item.color}</a>
            <p class="remove-btn">Xóa</p>
          </div>
          <div class="popup_price">
            <span class="line_price">${item.price}</span>
          </div>
          <div class="newCart_quantity">
            <div class="input_number_product">
              <button class="btn-minus"><i class="fa fa-minus"></i></button>
              <input type="text" class="quantity" value="${item.value}" min="1">
              <button class="btn-plus"><i class="fa fa-plus"></i></button>
            </div>
          </div>
          <div class="popup_item_price">
            <span class="line_total_price colorMain1">${formatPrice(totalPrice)}</span>
          </div>
        </div>
      `;
      cartContentHTML += itemHTML;
    });
  
    $('#cartcontent').html(cartContentHTML);
  
    $('#cartcontent').on('click', '.remove-btn', function() {
      $(this).closest('.popup_item').remove();
      updateLocalStorage();
      updateTotalAmount();
    });
  
    $('#cartcontent').on('click', '.btn-minus', function() {
      var quantityInput = $(this).siblings('.quantity');
      var currentQuantity = parseInt(quantityInput.val());
  
      if (currentQuantity > 1) {
        currentQuantity--;
        quantityInput.val(currentQuantity);
        updateCartItemTotal(quantityInput.closest('.popup_item'), currentQuantity);
        updateLocalStorage();
      }
    });
  
    $('#cartcontent').on('click', '.btn-plus', function() {
      var quantityInput = $(this).siblings('.quantity');
      var currentQuantity = parseInt(quantityInput.val());
  
      currentQuantity++;
      quantityInput.val(currentQuantity);
      updateCartItemTotal(quantityInput.closest('.popup_item'), currentQuantity);
      updateLocalStorage();
    });
  
    $('#cartcontent').on('input', '.quantity', function() {
      var quantityInput = $(this);
      var currentQuantity = parseInt(quantityInput.val());
  
      if (isNaN(currentQuantity) || currentQuantity < 1) {
        currentQuantity = 1;
        quantityInput.val(currentQuantity);
      }
  
      updateCartItemTotal(quantityInput.closest('.popup_item'), currentQuantity);
      updateLocalStorage();
    });

      // Hàm cập nhật số lượng popup_item
    // Hàm cập nhật số lượng popup_item
   function updateCartItemCount() {
    var count = $('.popup_item').length;
    localStorage.setItem('cartItemCount', count);
    $('.count-cart').text(count);
  }
  
  // Gọi hàm khi cần cập nhật số lượng
  updateCartItemCount();
    updateTotalAmount();
  });


