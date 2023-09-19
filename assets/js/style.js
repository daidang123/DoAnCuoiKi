
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

const quickViewClicked = (event) => {
  event.stopPropagation();

  const modal = document.querySelector('.quickViewModal');
  modal.classList.add('show');
};

// Lắng nghe sự kiện click trên trang web
document.addEventListener('click', (event) => {
  const target = event.target;

  // Kiểm tra xem sự kiện click xảy ra bên trong hoặc là khối quickViewModal
  if (target.closest('.quickViewModal')) {
    return; // Nếu là bên trong quickViewModal, không làm gì cả
  }

  // Nếu không, ẩn khối quickViewModal
  modal.classList.remove('show');
});



const quickViewButtons = document.querySelectorAll('.quickView');
quickViewButtons.forEach((button) => {
  button.addEventListener('click', quickViewClicked);
});