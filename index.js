const body = document.body;

//Main conatiner
const container = document.createElement("div");
container.setAttribute('id', 'container');
body.appendChild(container);

//Title of the app
const heading = document.createElement('h1');
heading.setAttribute('id', 'heading');
heading.textContent = 'IMDb Search'
container.appendChild(heading);

//Search bar
const searchBar = document.createElement('input');
searchBar.type = 'text';
searchBar.setAttribute('id', 'search-bar');
searchBar.placeholder = 'Search for a movie...'
container.appendChild(searchBar);

searchBar.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query.length > 2) {
        favoriteMovies.style.display = 'none'
        fetchMovies(query);
    } else {
        searchResults.innerHTML = '';
        favoriteMovies.style.display = ''
    }
});

//Favorite movies page link
const favoriteMovies = document.createElement('a');
favoriteMovies.href = 'favorites.html';
favoriteMovies.textContent = "My Favorite Movies >>>"
container.appendChild(favoriteMovies);

//search results container
const searchResults = document.createElement("div");
searchResults.setAttribute('id', 'search-results');
container.appendChild(searchResults);

//function to get movies based on the search query
async function fetchMovies(query) {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&plot=full&apikey=8eef8408`);
    const data = await response.json();
    displayMovies(data.Search);
}

//Display movies below search bar based on the search query
function displayMovies(movies) {
    searchResults.innerHTML = '';
    if (movies) {
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
            <div onclick="viewDetails('${movie.imdbID}')" class="movie-detail">
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h2>${movie.Title}</h2>
            </div>
            <div class="icons">
                <i onclick="addToFavorites('${movie.imdbID}')" class="far fa-star"></i>
                <i onclick="viewDetails('${movie.imdbID}')" class="far fa-eye"></i>
            </div>
            `;
            searchResults.appendChild(movieElement);
        });
    }
}

//Add movies to the favorites and update in local storage. 
function addToFavorites(imdbID) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(imdbID)) {
        favorites.push(imdbID);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Added to favorites');
    } else {
        alert('Already in favorites');
    }
}

//Open the movie.html page to show details of the selected movie using the id.
function viewDetails(imdbID) {
    window.location.href = `movie.html?id=${imdbID}`;
}
