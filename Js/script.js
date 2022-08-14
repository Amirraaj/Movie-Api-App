const apiUrl =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const imgPath = "https://image.tmdb.org/t/p/w1280";

const searchApi =
"https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const movieDisplay = document.getElementById("movie-display");

function disMovies(data){
  movieDisplay.innerHTML = "";
  data.results.forEach(
    (items) => {
      console.log(items)
      const image = items.poster_path === null ? "images/no-image.jpg" : imgPath + items.poster_path;
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
          
          <img src=${image} alt="" class="card--image">
          <div class="card--description">
              <div class="card--title">
                  <h2 class="movie--title">${items.original_title}</h2>
                  <span class="movie--rate">${items.vote_average}</span>
              </div>
              <h3 class="Overview"> Overview:</h3>
              <p class="card--review">
                  ${items.overview}
              </p>  
          </div>
      `
      movieDisplay.appendChild(card);
    }
  )
}

  const getMovies = async(api) => {
    const response = await fetch(api)
    const date = await response.json()
    disMovies(date)
  
  }
  getMovies(apiUrl);

  document.getElementById("search").addEventListener(
    "keyup",
    function(event) {
      if(event.target.value != ""){
        getMovies(searchApi + event.target.value)
      }else{
        getMovies(apiUrl)
      }
    }
  )



