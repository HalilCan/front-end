$.getScript("http://platform.twitter.com/widgets.js");

function getQuote() {
  var random = Math.floor(Math.random() * 100);
  $.getJSON(
    "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=" +
      random +
      "&callback=",
    function(a) {
      $("#quote").html(a[0].content + "<p><em>— " + a[0].title + "</em></p>");
      var author = a[0].title;
      var quote = a[0].content.replace(/<(?:.|\n)*?>/gm, '');
      
  var elem = document.getElementById("tweet-container");
      elem.innerHTML = "";
      twttr.widgets.createShareButton(
  "https:\/\/halilcanmemoglu.com",
  document.getElementById("tweet-container"),
  {
    size: "normal",
    text: quote + "-" + author,
    hashtags: "design,quote",
    via: "",
    related: ""
  }
);
    }
  );
}

$(document).ready(function () {
    getQuote();
});


$("#getQuotebtn").on("click", function(e) {
  e.preventDefault();
  getQuote();
});