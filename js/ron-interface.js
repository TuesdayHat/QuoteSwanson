import { Ron } from './../js/ron.js';
var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#ron').click(function(){


    function ronCall() {
      return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        let url =  `http://ron-swanson-quotes.herokuapp.com/v2/quotes`;

        request.onload = function() {
          if(this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        }
        request.open("GET", url, true);
        request.send();
      });
    }

    function imageCall() {
      return new Promise(function(resolve, reject){
        let request = new XMLHttpRequest();
        let url = `https://api.unsplash.com/photos.random?count=1&client_id=${apiKey}`

        request.onload = function() {
          if(this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        }
        request.open("GET", url, true);
        request.send();
      });
    }

    Promise.all([ronCall(), imageCall()])
    .then(function(response) {
      const quote = response[0];
      const newSentence = quote.slice(1, quote.length-1);
      console.log(quote);
      $('.showQuote').text(newSentence);

      let image = JSON.parse(response[1])[0]["urls"]["regular"];
      $('.showQuote').append('</br>' + `<img src='${image}'>`);
    })
    // .then(function(response) {
    // });



    // $.ajax({
    //   url: `http://ron-swanson-quotes.herokuapp.com/v2/quotes`,
    //   type: 'GET',
    //   data: {
    //     format: 'json'
    //   },
    //   success: function(response) {
    //     let quote = response[0];
    //     $('.showQuote').text(quote);
    //   },

  });
});
