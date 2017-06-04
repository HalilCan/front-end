var reqUrl = "https://wind-bow.gomix.me/twitch-api";
var well = document.getElementById("status-well-inner");
var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    
function btnFun() {
  well.append("Bleh");
  /*getId('dallasnchains');*/
  channels.forEach(function(element){
    constructStatus(element);
  })
 /* constructStatus("freecodecamp");*/
}

function getId(name) {
  $.ajax({
    type: "GET",
    url: "https://wind-bow.gomix.me/twitch-api/users/" + name,
    /*data:{get_param:'value'},*/
    dataType: "jsonp",
    success: function(data) {
      var id = data._id;
      constructStatus(id);
    }
  });
}

function constructStatus(id) {
  var game;
  var status;
  var status2;
  var name;
  var logo;
  var url;

  $.ajax({
    type: "GET",
    url: "https://wind-bow.gomix.me/twitch-api/streams/" + id,
    dataType: "jsonp",
    success: function(data) {
      if (data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Account Closed";
        status = "offline";
      } else {
        game = data.stream["game"];
        status = "online";
      }
    }
  });
  $.ajax({
    type: "GET",
    url: "https://wind-bow.gomix.me/twitch-api/channels/" + id,
    dataType: "jsonp",
    success: function(data) {
      name = data.display_name;
      status2 = data.status;
      url = data.url;
      logo = data.url;
      appendObject(name, game, status, status2, logo, url);
    }
  });
}

function appendObject(name, game, status, status2, logo, url) {
  if (game == undefined || game == null) {
    game = "Offline";
  }
  var streamObject =
    "<span class = 'stream-box'><div class = 'row'><div class = 'col-xs-3 col-sm-3 col-md-3 col-lg-3'><span class = 'logo'><img></img>img links broken</span></div><div class = 'col-xs-9 col-sm-9 col-md-9 col-lg-9'><span class = 'text-box'><strong> " +
    name +
    "</strong><br><span> Status: " +
    status +
    "<br><a href = "+ '"' +url+ '">' +
    status2 +
    "</a><br>Stream: " +
    game +
    " </span></span></div></div></span><br>";
  streamObject.className += "stream-box";
  well.insertAdjacentHTML("beforeend", streamObject);
}