import { Ron } from './../js/ron.js';

$(document).ready(function() {
  $('#ron').click(function(){
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url =  `http://ron-swanson-quotes.herokuapp.com/v2/quotes`;
      request.onload = function() {
        if(this.status === 200) {
          resolve(request.response)
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      console.log(response);
      const newSentence = response.slice(1, response.length-1);
      let quote = newSentence;
      $('.showQuote').text(quote);
    });



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
