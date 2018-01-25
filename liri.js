//require the api 'twittr', Omdb  npm package
var Twitter = require("twitter");
//grab info from keys.js,omdb.js files and store in var
var keys = require("./keys.js"); // "keys and secrets"
var fs = require('fs')
var client = new Twitter(keys)
var params = {screen_name: 'thefutureseered'};

function getTweets(){

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if(error) {
      console.log(error);
    }
    if (!error) {
    
      fs.appendFile('twitterLog.txt', ( " Twitter Log: " + tweets[0].text), function (err) {
        if (err) {
          // append failed
        } else {
          // done
          console.log('Most recent Tweet sent to log!')
        }
      })
   //   for(var i=0; i<tweets.length ; i++);
    console.log("TWITTER: " + tweets[0].text);
     // console.log([i].text);
    }
    
  });
}
getTweets();
 
//omdb starts here
var request = require("request");

// run the request module on a URL with a JSON
request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=40e9cece", function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {

    // To print out the imdbRating
    console.log("Movie rating: " + JSON.parse(body).imdbRating);
    console.log("Movie title: " + JSON.parse(body).Title);
 //how do get source?   
  }
});

//  request npm package 
//var request = require("request");

// Grab the movieName which will always be the third node argument.
var movieName = process.argv[2];

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Release Year: " + JSON.parse(body).Year);
    
  }
});
// Spotify starts here:

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: 'f8587ba41adc4933a72eee1d6eade2e2',
  secret: 'cb18f68dfd434c90a374f523cb9a117b'
});
 
spotify.search({ type: 'track', query: 'The sign', artist:'artist', query: 'Ace of base'}, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

  var firstTrack = data.tracks.items[0];
  
  // console.log(firstTrack.album.artists);
  console.log(firstTrack.album.name);  
  console.log(firstTrack.album.artists);
  // console.log(typeof firstTrack.album.name);
 
  // console.log(data.album.artist.name);
  //  console.log(data.preview_url);
  //console.log(data.album[0]);
}); 