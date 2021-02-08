
const SearchBtn = document.querySelector('#SearchBtn');
const songContainer = document.querySelector('#songContainer');
SearchBtn.addEventListener('click', getSearchResult);

 async function getSearchResult () {
    const SearchInput = document.querySelector('#SearchInput').value;
    const url = ` https://api.lyrics.ovh/suggest/${SearchInput}`;
    const res = await fetch(url)
    const data = await res.json();
    displaySongs(data.data)

    document.getElementById('SearchInput').value = "";
}

function displaySongs (songs) {
    let html = '';
    songs.map( song => {
        html += `
        <div
        class="single-result row align-items-center my-3 p-3"
      >
        <div class="col-md-9">
          <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span> ${song.artist.name} </span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
          <button onClick = "displayLyrics('${song.artist.name}', '${song.title}')"  class="btn btn-success">Get Lyrics</button>
        </div>
        <audio controls>
            <source src="${song.preview}" type="audio/mpeg">
        </audio>
      </div>
        
        `
    })

    songContainer.innerHTML = html;
}

  async function displayLyrics (artist, title){
    const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`;
    const res = await fetch(url);
    const data = await res.json();
    // getLyrics(data.lyrics)
    console.log(data);
}

// function getLyrics(lyrics){
//    const lyricsDiv = document.getElementById('lyricsDiv');
//    lyricsDiv.innerText = lyrics
// }