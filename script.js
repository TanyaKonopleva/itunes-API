const container = document.querySelector('.container');
const search = document.querySelector('#search');
const media = document.querySelector('.media');

const getContent = (search) => {
  const url = new URL('https://itunes.apple.com/search');
  const params = {term: search, media: 'music'};
  url.search = new URLSearchParams(params);
  fetch(url, { method: 'POST'})
      .then(response => response.json())
      .then(data => {
        let results = data.results;
        let resultsHTML = results.map((result) => `<div 
          style="background-image: url(${result.artworkUrl100})" 
          onclick="openMedia('${result.previewUrl}', '${result.trackCensoredName}')" 
          class="photo"></div>`).join('');
        container.innerHTML = resultsHTML;
      }
        )    
}

function openMedia(url, title) {
  media.innerHTML = `<p>${title}</p><audio src='${url}' autoplay controls></audio>`;
}

search.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    getContent(search.value);
  }
});
