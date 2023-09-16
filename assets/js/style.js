
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

linkList.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định khi nhấn vào liên kết
    linkList.forEach((otherLink) => {
      otherLink.classList.remove('active');
    });
    link.classList.add('active');
  });
});