const API_KEY = "api_key=b2bf74a206028d7d9b2a2035b1c0717f";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

function getMovieDetails() {
  let id = sessionStorage.getItem("movieId");
  console.log(id);
  let detailsURL = BASE_URL + "/movie/" + id + "?" + API_KEY;
  fetch(detailsURL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showMovieDetails(data);
    });
}

getMovieDetails();

function showMovieDetails(data) {
  const {
    title,
    poster_path,
    vote_average,
    overview,
    genres,
    release_date,
    vote_count,
    adult,
  } = data;
  const movieDetails = document.createElement("div");

  movieDetails.innerHTML = `
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1">${title}</span>
  </div>
</nav>
<div class="container">
  <div class="row pt-3">
    <div class="col-lg-3">
      <img  src="${
        poster_path
          ? IMG_URL + poster_path
          : "http://via.placeholder.com/1080x1580"
      }"  class="img-thumbnail" >  
    </div>
    <div  class="col-lg-9 mt-5">
      <h5>${overview}</h5>
         <div class="row pt-3">
           <div class="col-lg-4 d-flex flex-column ">
              <span> vote count : ${vote_count} </span>
              <span>  average vote :  ${vote_average} </span>
            </div>
           <div class="col-lg-4 ">
              <span> release date :  ${release_date}</span>
           </div>
           <div class="col-lg-4  ">
             <span>  ${adult ? "+18" : "family movie"}</span>
            </div>
         </div>
       <div class = "pt-2" > 
         <h5> genres  : ${genres
           .map((gen) => {
             return (
               "<span class='badge bg-secondary m-1 '>" + gen.name + "</span>"
             );
           })
           .join(" ")}
         <h5>
       </div> 
  </div>
</div>

`;
  main.appendChild(movieDetails);
}
