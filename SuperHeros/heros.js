

// http://www.omdbapi.com/?i=${info.imdbID}&apikey=c01e19ad

const movieURL = 'http://www.omdbapi.com/?s=lego&apikey=c01e19ad'

const searchTerm = document.getElementById("searchTerm")
const searchButton = document.getElementById("searchButton")

const movieDotsContainer = document.getElementById("movieDotsContainer")
const movieGush = document.getElementById("movieGush")

searchButton.addEventListener('click', function() {
    // let searchfor = searchTerm.value
    searchDB(searchTerm.value)

})


function searchDB(sItem) {
    simdbURL = `http://www.omdbapi.com/?s=${sItem}&apikey=c01e19ad`
    let dotRequest = new XMLHttpRequest()
    dotRequest.addEventListener('load', function () {
        let dotj = JSON.parse(this.responseText)

        let dotsList = dotj.Search.map(function (info) {
            return `
        <div class="movieDot">
        <div class="posterThumb"><img src="${info.Poster}" class="smallPoster"></div>
        <div class="title"><a href="#movieGush" onclick="gush('${info.imdbID}')">${info.Title}</a></div>
        </div>
        `

        })

        movieDotsContainer.innerHTML = dotsList.join("")


    })

    dotRequest.open('GET', simdbURL)
    dotRequest.send()
}

function gush(imdb) {
    // event.preventDefault()
    imdbURL = `http://www.omdbapi.com/?i=${imdb}&apikey=c01e19ad`
    console.log(imdb)
    let gushRequest = new XMLHttpRequest()

    gushRequest.addEventListener('load', function () {
        let gushj = JSON.parse(this.responseText)
        console.log(gushj)
        let gushing = `
        <div class="mainAttraction">
        <img src="${gushj.Poster}" class="largePoster">
        <div class="mainInfoBox">
        <div class="mainTitle">${gushj.Title}</div>
        <div class="mainRelease">${gushj.Released}</div>
        <div class="mainRated">${gushj.Rated}</div>
        </div>
        </div>
        `
        movieGush.innerHTML = gushing

    })
    gushRequest.open('get', imdbURL)
    gushRequest.send()
}

searchDB('my little pony')