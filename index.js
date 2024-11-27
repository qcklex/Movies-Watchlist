
let title = ''
let movies = []
let moviesInfo = []
let watchListMovies = []

const apiKey = "994f08ee"

const defaultMessage = document.getElementById('default-message')
const defaultImage = document.getElementById('default-image')
const search = document.getElementById('my-input')
const movieSearchList = document.getElementById('movie-search-list')
const movieCard = document.getElementById('movie-card')
const addWatchListBtn = document.getElementById('add-watchlist-btn')

// import filmImage from "/assets/film-image.png" TO DO THIS YOU NEED TO WORK WITH VITE OR
// A FRAMEWORK LIKE REACT


document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault()
    document.getElementById('btn').addEventListener('click', () => {
        title = search.value  
        getMoviesSearch()
    })
    // addWatchListBtn.addEventListener('click', () => {
    //     watchList()
    // })
})
        


async function getMoviesSearch() {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`)
    const data = await res.json()

    if (data.Response === 'True'){
         movies = data.Search
         await getMoviesInfo()
     }

    
    else {
            mainBody.innerHTML = `<div id="default-message">
            <p id="error-message" class="error-message">
             Unable to find what you’re looking for. Please try another search.
             </p></div>`
    }
    console.log(movies)
}



 async function getMoviesInfo() {
     let movieHTML = ''
     for (let movie of movies){
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=short`)
        const data = await res.json()
        // if (data.Type === 'movie' & data.Title !== moviesInfo.Title) {
        // as the database also contains TV shows and series, we want to filter out only movies
        moviesInfo.push(data)
        movieHTML = `
            <div class="movie-container">
                    <img class="poster" src="${data.Poster}" />
                    <div class="movie-info">
                        <div class="movie-header">
                            <h2 class="movie-title">${data.Title}</h2>
                            <p class="rating"><img src="assets/star.png" />${data.imdbRating}</p>
                            </p>
                        </div>
                        <ul class="movie-details">
                             <li class="runtime">${data.Runtime}</p>
                             <li class="genre">${data.Genre}</p>
                            <div class="add-container">
                                <img class="add-icon" src="assets/add-icon.png"  data-add="${data.imdbID}">
                                <p>Watchlist</p>
                            </div>
                        </ul>
                       
                        <p class="plot">${data.Plot}</p>
            </div>
        `
                // to add the movie data that we want to add to the watchlist 
                // we use the data-add attribute to store the imdbID of the movie
                // that later is going to be rendered to the watchlist

    // }
    }  
        movieSearchList.innerHTML = movieHTML
}

movieSearchList.innerHTML = `
<div id="message-container" class="message-container">
           <img src="assets/film-image.png" />
        </div>
        `



// To change the watchlist button to a remove button when clicked

// document.addEventListener("DOMContentLoaded", () => {
//     const addButton = document.getElementById("add-watchlist-btn");

//     addButton.addEventListener("click", () => {
//         const icon = addButton.querySelector("i");

//         if (addButton.classList.contains("added")) {
//             // Remove from Watchlist
//             icon.className = "fa-regular fa-circle-plus";
//             addButton.textContent = " Watchlist";
//             addButton.prepend(icon); // Ensure the icon stays before the text
//             addButton.classList.remove("added");
//             console.log("Item removed from Watchlist");
//         } else {
//             // Add to Watchlist
//             icon.className = "fa-thin fa-circle-minus";
//             addButton.textContent = " Watchlist";
//             addButton.prepend(icon); // Ensure the icon stays before the text
//             addButton.classList.add("added");
//             console.log("Item added to Watchlist");
//         }
//     });
// });

// async function watchList() {
//     watchListMoviespush(data)}
//     let watchListMovieHTML = ''
//     forEach(watchListMovie => {
//     watchListMovieHTML = `
//         <div class="movie-info">
//             <img class="poster" src="${moviesInfo.Poster}">
//                 <div class="movie-header">
//                     <h2 class="movie-title">${moviesInfo.Title}</h2>
//                     <p class="rating">${moviesInfo.imdbRating}</p>
//                 </div>
//                 <div class="movie-details">
//                     <p class="runtime">${moviesInfo.Runtime}</p>
//                     <p> class="genre"${moviesInfo.Genre}</p>
//                     <p class="add-btn" id="add-watchlist-btn"><i class="fa-regular fa-circle-plus"></i>Watchlist</p>
//                 </div>
//             </div>
//             <p class="plot">${moviesInfo.Plot}</p>
//         </div>
//     `
//     }
// }     console.log(moviesInfo)
//     movieCard.innerHTML = movieHTML
//      return 
//  }
