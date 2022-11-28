import { catsData } from '/data.js';
const emotionRadios = document.getElementById('emotion-radios');
const getImageBtn = document.getElementById('get-image-btn');
const gifsOnlyOption = document.getElementById('gifs-only-option')

renderEmotionsRadios();

emotionRadios.addEventListener('change', highlightCheckedOption);
getImageBtn.addEventListener('click', getMatchingCatsArray);

function highlightCheckedOption(e) {
  const radios = document.querySelectorAll('.radio');
  radios.forEach((radio) => radio.classList.remove('highlight'));
  let id = e.target.id;
  document.getElementById(id).parentElement.classList.add('highlight');
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

function getMatchingCatsArray() {
  const isGif = gifsOnlyOption.checked


  const selectedEmotion = document.querySelector('input[type="radio"]:checked');
  if (selectedEmotion) {
    console.log(selectedEmotion.value); 
  }
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
