import { catsData } from '/data.js';
const emotionRadios = document.getElementById('emotion-radios');

renderEmotionsRadios();

emotionRadios.addEventListener('change', highlightCheckedOption);

function highlightCheckedOption(e) {
  let id = e.target.id;
  document.getElementById(id).parentElement.classList.toggle('highlight');
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
