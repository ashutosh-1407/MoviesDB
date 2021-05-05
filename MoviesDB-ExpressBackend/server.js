//jshint esversion:6

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { request, response } = require("express");
const app = express();
const path = require("path");
// const PORT = 8080;

app.use(cors());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(express.static(path.join(__dirname, 'dist/MoviesDB-AngularFrontend')))

const api_key = "f388f73d7e77b35d3141400b40dfbd91";
const current_playing_url = "https://api.themoviedb.org/3/movie/now_playing?api_key=";
const search_url = "https://api.themoviedb.org/3/search/multi?api_key="
const popular_movies_url = "https://api.themoviedb.org/3/movie/popular?api_key=";
const top_rated_movies_url = "https://api.themoviedb.org/3/movie/top_rated?api_key=";
const trending_movies_url = "https://api.themoviedb.org/3/trending/movie/day?api_key=";
const popular_tv_shows_url = "https://api.themoviedb.org/3/tv/popular?api_key=";
const top_rated_tv_shows_url = "https://api.themoviedb.org/3/tv/top_rated?api_key=";
const trending_tv_shows_url = "https://api.themoviedb.org/3/trending/tv/day?api_key=";
const movie_tv_details_url = "https://api.themoviedb.org/3/";

const end_url = "&language=en-US"

app.get("/apis", function(req, res) {
    res.send("<h1>First Node Web Server</h1>");
});

app.get("/apis/cpSearch", (request, response) => {
    var url = current_playing_url + api_key + end_url + "&page=1";
    var response_data = [];
    var cnt = 0;
    axios.get(url)
    .then(res => {
        for (var i=0; i<res.data['results'].length; i++){
            if (cnt == 5) break;
            var backdrop_path = res.data['results'][i].backdrop_path;
            var name = "";
            name = res.data['results'][i].original_title;
            if (backdrop_path !== null && name !== "") {
                backdrop_path = "https://image.tmdb.org/t/p/w780" + res.data['results'][i].backdrop_path;
                poster_path = "https://image.tmdb.org/t/p/w780" + res.data['results'][i].poster_path;
                var id = res.data['results'][i].id;
                response_data.push({"id": id,
                                    "name": name,
                                    "backdrop_path": backdrop_path,
                                    "poster_path": poster_path});
                cnt+=1
            }
            else continue;   
        }
        response.json(response_data);
        // console.log(response_data);
    })
    .catch(err => {
        console.log(err.message);
    });

})

app.get("/apis/search/:query", (request, response) => {
    var url = search_url + api_key + "&query=" + request.params.query + end_url;
    var response_data = [];
    var cnt = 0;
    axios.get(url)
    .then(res => {
        for (var i=0; i<res.data['results'].length; i++){
            if (cnt == 7) break;
            var backdrop_path = res.data['results'][i].backdrop_path;
            var name = "";
            var media_type = res.data['results'][i].media_type;
            if (media_type === "movie") name = res.data['results'][i].title;
            else if (media_type === "tv") name = res.data['results'][i].name;
            if (backdrop_path !== null && name !== "") {
                backdrop_path = "https://image.tmdb.org/t/p/w780" + res.data['results'][i].backdrop_path;
                var id = res.data['results'][i].id;
                var media_type = res.data['results'][i].media_type;
                response_data.push({"id": id,
                                    "name": name,
                                    "backdrop_path": backdrop_path,
                                    "media_type": media_type});
                cnt+=1
            }
            else continue;   
        }
        response.json(response_data);
        // console.log(response_data);
    })
    .catch(err => {
        console.log(err.message);
    });
});

app.get("/apis/movieSearch/:type", (request, response) => {
    var url = "";
    if (request.params.type === 'popular') url = popular_movies_url + api_key + end_url + "&page=1";
    else if (request.params.type === 'top-rated') url = top_rated_movies_url + api_key + end_url + "&page=1";
    else if (request.params.type === 'trending') url = trending_movies_url + api_key;
    var response_data = [];
    // console.log(url);
    axios.get(url)
    .then(res => {
        for (var i=0; i<res.data['results'].length; i++) {
            if (i === 20) break;
            var poster_path = res.data['results'][i].poster_path;
            if (poster_path !== null) {
                response_data.push({"id": res.data['results'][i].id,
                                    "name": res.data['results'][i].title,
                                    "poster_path": "https://image.tmdb.org/t/p/w780" + poster_path});
            }
        }
        response.json(response_data);
        // console.log(response_data.length)
    })
    .catch(err => {
        console.log(err.message);
    });
});

app.get("/apis/tvSearch/:type", (request, response) => {
    var url = '';
    if (request.params.type === 'popular') url = popular_tv_shows_url + api_key + end_url + "&page=1";
    else if (request.params.type === 'top-rated') url = top_rated_tv_shows_url + api_key + end_url + "&page=1";
    else if (request.params.type === 'trending') url = trending_tv_shows_url + api_key;
    var response_data = [];
    axios.get(url)
    .then(res => {
        for (var i=0; i<res.data['results'].length; i++) {
            if (i === 20) break;
            var poster_path = res.data['results'][i].poster_path;
            if (poster_path !== null){
                response_data.push({"id": res.data['results'][i].id,
                                    "name": res.data['results'][i].name,
                                    "poster_path": "https://image.tmdb.org/t/p/w780" + poster_path});
            }
        }
        response.json(response_data);
        // console.log(response_data.length)
    })
    .catch(err => {
        console.log(err.message);
    });
});

app.get("/apis/watch/:media_type/:id", (request, response) => {
    var trailer_url = movie_tv_details_url + request.params.media_type + "/" + request.params.id + "/videos?api_key=" + api_key + end_url + "&page=1";
    var details_url = movie_tv_details_url + request.params.media_type + "/" + request.params.id + "?api_key=" + api_key + end_url + "&page=1";
    var cast_crew_url = movie_tv_details_url + request.params.media_type + "/" + request.params.id + "/credits?api_key=" + api_key + end_url + "&page=1";
    var reviews_url = movie_tv_details_url + request.params.media_type + "/" + request.params.id + "/reviews?api_key=" + api_key + end_url + "&page=1";
    var response_data = {}
    // console.log(trailer_url)
    // console.log(details_url)
    // console.log(cast_crew_url)
    // console.log(reviews_url)
    axios.get(trailer_url)
    .then(res => {
        var trailer = '';
        if (res.data['results'].length !== 0) {
            for (var i=0; i<res.data['results'].length; i++) {
                if (res.data['results'][i]['type'] === 'Trailer' || res.data['results'][i]['type'] === 'trailer') {
                    trailer = res.data['results'][i]['key']
                    break
                }
                else if (i == res.data['results'].length - 1) trailer = res.data['results'][i]['key']
            }
        }
        else trailer = 'tzkWB85ULJY';
        response_data['trailer'] = trailer;
        return axios.get(details_url)
    })
    .then(res => {
        var title = '';
        if (request.params.media_type === 'movie') title = res.data['original_title'];
        else if (request.params.media_type === 'tv') title = res.data['name'];
        var tagline = res.data['tagline']
        var year = ''
        if (request.params.media_type === 'movie') year = res.data['release_date'].slice(0, 4)
        else if (request.params.media_type === 'tv') year = res.data['first_air_date'].slice(0, 4)
        var averageVote = res.data['vote_average']
        var runtime = '';
        if (request.params.media_type === 'movie') runtime  = res.data['runtime'];
        else if (request.params.media_type === 'tv') runtime  = res.data['episode_run_time'];
        var duration = '';
        if (Math.floor(runtime/60) === 0) duration = (runtime % 60) + 'mins'
        else if (Math.floor(runtime/60) === 1) duration = '1 hr ' + (runtime % 60) + 'mins'
        else duration = Math.floor(runtime/60) + 'hrs ' + (runtime % 60) + 'mins'
        var retGenres = res.data['genres']
        var genres = [];
        for (const genre in retGenres) {
            genres.push(retGenres[genre]['name'])
        }
        genres = genres.join(', ');
        var retSpokenLanguages = res.data['spoken_languages']
        var spokenLanguages = [];
        for (const language in retSpokenLanguages) {
            spokenLanguages.push(retSpokenLanguages[language]['english_name'])
        }
        spokenLanguages = spokenLanguages.join(', ');
        var overview = res.data['overview']
        var poster_path = "https://image.tmdb.org/t/p/w780" + res.data['poster_path']
        var id = res.data['id']
        response_data['title'] = title;
        response_data['tagline'] = tagline;
        response_data['year'] = year;
        response_data['averageVote'] = averageVote;
        response_data['duration'] = duration;
        response_data['genres'] = genres;
        response_data['spokenLanguages'] = spokenLanguages;
        response_data['overview'] = overview;
        response_data['poster_path'] = poster_path;
        response_data['id'] = id
        return axios.get(cast_crew_url)
    })
    .then(res => {
        var cast = [];
        for (var i=0; i<res.data['cast'].length; i++) {
            var profile_path = res.data['cast'][i]['profile_path'];
            if (profile_path !== null) {
                cast.push({'id': res.data['cast'][i]['id'],
                           'name': res.data['cast'][i]['name'],
                           'character': res.data['cast'][i]['character'],
                           'profile_path': "https://image.tmdb.org/t/p/w500" + res.data['cast'][i]['profile_path']})
            }
        }
        response_data['cast'] = cast
        return axios.get(reviews_url)
    })
    .then(res => {
        var reviews = [];
        for (var i=0; i<res.data['results'].length; i++) {
            if (i === 10) break;
            var avatar_path = res.data['results'][i]['author_details']['avatar_path'];
            if (avatar_path === null) avatar_path = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU"
            else if (!avatar_path.includes("https")) avatar_path = "https://image.tmdb.org/t/p/original" + avatar_path
            else avatar_path = avatar_path.slice(1,);
            reviews.push({'author': res.data['results'][i]['author'],
                          'content': res.data['results'][i]['content'],
                          'created_at': res.data['results'][i]['created_at'],
                          'url': res.data['results'][i]['url'],
                          'rating': res.data['results'][i]['author_details']['rating'] !== null ? res.data['results'][i]['author_details']['rating']: 0,
                          'avatar_path': avatar_path,
                          'id': res.data['results'][i]['id']})
        }
        response_data['reviews'] = reviews;
        response.json(response_data);
    })
    .catch(err => {
        console.log(err.message);
    })
    
})

app.get("/apis/movie/:type/:id", (request, response) => {
    var url = '';
    if (request.params.type === 'recommended') url = movie_tv_details_url + "movie/" + request.params.id + "/recommendations?api_key=" + api_key + end_url + "&page=1";
    else if (request.params.type === 'similar') url = movie_tv_details_url + "movie/" + request.params.id + "/similar?api_key=" + api_key + end_url + "&page=1";
    var response_data = [];
    axios.get(url)
    .then(res => {
        for (var i=0; i<res.data['results'].length; i++) {
            if (i === 20) break;
            var poster_path = res.data['results'][i].poster_path;
            if (poster_path !== null) {
                response_data.push({"id": res.data['results'][i].id,
                                    "name": res.data['results'][i].title,
                                    "poster_path": "https://image.tmdb.org/t/p/w780" + poster_path});
            }
        }
        response.json(response_data);
    })
    .catch(err => {
        console.log(err.message);
    });
})

app.get("/apis/tv/:type/:id", (request, response) => {
    var url = '';
    if (request.params.type === 'recommended') url = movie_tv_details_url + "tv/" + request.params.id + "/recommendations?api_key=" + api_key + end_url + "&page=1";
    else if (request.params.type === 'similar') url = movie_tv_details_url + "tv/" + request.params.id + "/similar?api_key=" + api_key + end_url + "&page=1";
    var response_data = [];
    axios.get(url)
    .then(res => {
        for (var i=0; i<res.data['results'].length; i++) {
            if (i === 20) break;
            response_data.push({"id": res.data['results'][i].id,
                                "name": res.data['results'][i].title,
                                "poster_path": "https://image.tmdb.org/t/p/w780" + res.data['results'][i].poster_path});
        }
        response.json(response_data);
    })
    .catch(err => {
        console.log(err.message);
    });
})

app.get("/apis/person/:person_id", (request, response) => {
    var details_url = movie_tv_details_url + 'person/' + request.params.person_id + "?api_key=" + api_key + end_url + "&page=1";
    var external_id_url = movie_tv_details_url + 'person/' + request.params.person_id + "/external_ids?api_key=" + api_key + end_url + "&page=1";
    var response_data = {};
    axios.get(details_url)
    .then(res => {
        response_data['birthday'] = res.data['birthday']
        response_data['birth_place'] = res.data['place_of_birth']
        if (res.data['gender'] === 1) response_data['gender'] = 'Female'
        else if (res.data['gender'] === 2) response_data['gender'] = 'Male'
        response_data['known_for'] = res.data['known_for_department']
        response_data['also_known_as'] = res.data['also_known_as'].join(', ')
        response_data['biography'] = res.data['biography']
        response_data['homepage'] = res.data['homepage']
        return axios.get(external_id_url)
    })
    .then(res => {
        var ids = [];
        res.data['imdb_id'] !== null ? ids.push({'imdb': res.data['imdb_id']}) : ids.push({'imdb': null})
        res.data['facebook_id'] !== null ? ids.push({'fb': res.data['facebook_id']}) : ids.push({'fb': null})
        res.data['instagram_id'] !== null ? ids.push({'insta': res.data['instagram_id']}) : ids.push({'insta': null})
        res.data['twitter_id'] !== null ? ids.push({'twitter': res.data['twitter_id']}) : ids.push({'twitter': null})
        response_data['ids'] = ids;
        response.json(response_data)
    })
    .catch(err => {
        console.log(err.message);
    })
})

app.use('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/MoviesDB-AngularFrontend/index.html'))
})

app.listen(8080 , () => console.log("Server started on port 8080"));