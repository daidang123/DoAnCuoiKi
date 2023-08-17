
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