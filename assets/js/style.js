// quickViewModal
// $(document).on('click', function(event) {
//   if(!$('.quickViewModal').get(0).contains(event.target) && !$(event.target).hasClass('quickView')) {
//     $('.quickViewModal').hide();
//   }
// });

// $('.quickView').each(function(){
//   $(this).click(function(){
//   $('.quickViewModal').toggle();
// })


// });

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




/* <!-- review-product--> */

const imagesRight = document.querySelector('.images-right');
const imagesLeft = document.querySelector('.images-left');

// Lấy danh sách tất cả các ảnh trong phần images-right
const imageList = imagesRight.querySelectorAll('img');
const prevButton = imagesLeft.querySelector('.slick-next-1');
const nextButton = imagesLeft.querySelector('.slick-next-2');

let currentIndex = 0;

// Hiển thị ảnh đầu tiên trong phần images-left
imagesLeft.querySelector('img').src = imageList[currentIndex].src;

// Thêm sự kiện click vào từng ảnh trong danh sách
imageList.forEach((image, index) => {
  image.addEventListener('click', () => {
    currentIndex = index;
    updateSelectedImage();
  });
});

// Sự kiện click nút previous
prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSelectedImage();
  }
});

// Sự kiện click nút next
nextButton.addEventListener('click', () => {
  if (currentIndex < imageList.length - 1) {
    currentIndex++;
    updateSelectedImage();
  }
});






// Hàm cập nhật ảnh và đường viền
function updateSelectedImage() {
  const selectedImage = imageList[currentIndex];
  imagesLeft.querySelector('img').src = selectedImage.src;

  // Xóa lớp CSS "selected" của tất cả các ảnh trong danh sách
  imageList.forEach((img) => {
    img.classList.remove('selected');
  });

  // Thêm lớp CSS "selected" cho ảnh hiện tại
  selectedImage.classList.add('selected');
}






//chon mau san pham

const linkList = document.querySelectorAll('.req a');

linkList.forEach((link) => {
  link.addEventListener('mouseenter', () => {
    link.querySelector('span').style.display = 'inline-block';
  });

  link.addEventListener('mouseleave', () => {
    link.querySelector('span').style.display = 'none';

  });
  
});




const goToDetail = (event) => {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
  const detailPageURL = 'detail-product.html'; // Thay thế bằng đường dẫn thực tế đến trang chi tiết
  window.location.href = detailPageURL;
};









const API_URL = 'https://api-doan-vskd.vercel.app/posts'
const productEl = document.querySelector('#product-hot');
const newProductList =document.querySelector('#new-product-list')
const getApi= async(API_URL)=>{
  const response = await axios.get(API_URL);
  showData(response.data)
}
getApi(API_URL);

const showData = (data) => {
  let HTML = ``;
  data.forEach((item,index) => {
    console.log(item ,'gia tri cua mang');
    if (index < 4)  {
      HTML +=
     `
     <div class="item product col-12 col-sm-4 col-md-3">
      <div class="product-image">
        <a href="#" onclick="goToDetail(event)">
        <img src="${item.src}" alt="">
        </a>
        <div class="box_action">
          <div class="quickView"  onclick="showQuickViewModal(${index})">
            Xem Nhanh
            <i class="fas fa-eye"></i>
          </div>
          <div class="quickLink" onclick="goToDetail(event)">
            Chi tiết
            <i class="fas fa-shopping-cart"></i>
          </div>
        </div>
        <div class="boxTagIcon">
          <div class="tagProItem tagCalcItem">
            <span>-30%</span>
          </div>
          <div class="tagProItem tagNewItem">
            <span>New</span>
          </div>
        </div>
      </div>
      <div class="product-title">
        <a href="#" onclick="goToDetail(event)">Bộ pijamas linen áo dài quần dài ST9083</a>
      </div>
      <div class="product-price">
        <s class="product-price-old">292,250₫</s>
        <span class="product-price-current">242,250₫</span>
      </div>
    </div>  
     `;
    } 
     productEl.innerHTML=HTML
     newProductList.innerHTML=HTML
  });
  
}
const showQuickViewModal = (index) => {
  const quickViewModal = document.querySelector('#quickViewModal');
  quickViewModal.style.display = 'block';

  // Các logic khác để hiển thị thông tin chi tiết sản phẩm
};

const quickViewModal = document.querySelector('#quickViewModal');
const reviewProduct = document.querySelector('.review-product');

quickViewModal.addEventListener('mousedown', (event) => {
  event.stopPropagation();
});

reviewProduct.addEventListener('mousedown', (event) => {
  event.stopPropagation();
});

document.addEventListener('mousedown', (event) => {
  if (!reviewProduct.contains(event.target)) {
    quickViewModal.style.display = 'none';
  }
});











