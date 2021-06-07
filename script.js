//TMDB

const API_KEY = "api_key=b2bf74a206028d7d9b2a2035b1c0717f";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/movie/popular?" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;
const detailsURL = BASE_URL + "/movie/{movie_id}" + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const prev = document.getElementById("prev");
const next = document.getElementById("next");
const current = document.getElementById("current");

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = "";
var totalPages = 100;

getMovies(API_URL);

function getMovies(url) {
  lastUrl = url;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      if (data.results.length !== 0) {
        showMovies(data.results);
        currentPage = data.page;
        nextPage = currentPage + 1;
        prevPage = currentPage - 1;
        totalPages = data.total_pages;

        current.innerText = currentPage;

        if (currentPage <= 1) {
          prev.parentNode.classList.add("disabled");
          next.parentNode.classList.remove("disabled");
        } else if (currentPage >= totalPages) {
          prev.parentNode.classList.remove("disabled");
          next.parentNode.classList.add("disabled");
        } else {
          prev.parentNode.classList.remove("disabled");
          next.parentNode.classList.remove("disabled");
        }
      } else {
        main.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
      }
    });
}

function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, id } = movie;
    const movieEl = document.createElement("div");
    main.classList.add("d-flex");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `  
        <div class="card movie-card" >
            <img  id ="${id}"
                   src="${
                     poster_path
                       ? IMG_URL + poster_path
                       : "http://via.placeholder.com/1080x1580"
                   }" 
                   class="card-img-top" alt="${title}">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text vote ${getColor(
                vote_average
              )} "> rate : ${vote_average}</p>
            </div>
          </div>

        `;

    main.appendChild(movieEl);

    document.getElementById(id).addEventListener("click", () => {
      movieSeleted(id);
    });
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});

prev.addEventListener("click", () => {
  if (prevPage > 0) {
    pageCall(prevPage);
  }
});

next.addEventListener("click", () => {
  if (nextPage <= totalPages) {
    pageCall(nextPage);
  }
});

function pageCall(page) {
  let urlSplit = lastUrl.split("?");
  let queryParams = urlSplit[1].split("&");
  let key = queryParams[queryParams.length - 1].split("=");
  if (key[0] != "page") {
    let url = lastUrl + "&page=" + page;
    getMovies(url);
  } else {
    key[1] = page.toString();
    let a = key.join("=");
    queryParams[queryParams.length - 1] = a;
    let b = queryParams.join("&");
    let url = urlSplit[0] + "?" + b;
    getMovies(url);
  }
}

function movieSeleted(id) {
  sessionStorage.setItem("movieId", id);
  window.location = " movie.html";
}
