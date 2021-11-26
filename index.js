// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    var player;
    player = new YT.Player("ytplayer", {
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  }
  //
function onPlayerStateChange(event) {
  if (event.data === 0) {
    event.target.playVideo()
  }

  if (event.data === 1) {
    event.target.setVolume(45);
  }
}
