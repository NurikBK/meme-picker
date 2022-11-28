import { catsData } from '/data.js';

const emotionRadios = document.getElementById('emotion-radios');
const getImageBtn = document.getElementById('get-image-btn');
const gifsOnlyOption = document.getElementById('gifs-only-option');
const memeModal = document.getElementById('meme-modal');
const memeModalInner = document.getElementById('meme-modal-inner');
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');

emotionRadios.addEventListener('change', highlightCheckedOption);

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat);

function highlightCheckedOption(e) {
  const radios = document.querySelectorAll('.radio');
  radios.forEach((radio) => radio.classList.remove('highlight'));
  let id = e.target.id;
  document.getElementById(id).parentElement.classList.add('highlight');
}

function closeModal(){
  memeModal.style.display = 'none'
}

function renderCat() {
  const catObject = getSingleCatObject();
  memeModalInner.innerHTML = `
      <img 
      class="cat-img" 
      src="./images/${catObject.image}"
      alt="${catObject.alt}"
      >
      `;
  memeModal.style.display = 'flex';
}


function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();

  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    const randomNumber = Math.floor(Math.random() * catsArray.length);
    return catsArray[randomNumber];
  }
}

function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const isGif = gifsOnlyOption.checked;

    const matchingCatsArray = catsData.filter((cat) => {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingCatsArray;
  }
}

function getEmotionsArray(cats) {
  const emotionsArr = [];
  for (let cat of cats) {
    for (let emotionTag of cat.emotionTags) {
      if (!emotionsArr.includes(emotionTag)) {
        emotionsArr.push(emotionTag);
      }
    }
  }

  return emotionsArr;
}

function renderEmotionsRadios() {
  const emotions = getEmotionsArray(catsData);

  let radioItems = ``;
  for (let emotion of emotions) {
    radioItems += `
      <div class="radio">
          <label for="${emotion}"><span>${emotion}</span></label>
          <input
          class="radio"
          type="radio"
          id="${emotion}"
          value="${emotion}"
          name="emotions"
          >
      </div>`;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(); 