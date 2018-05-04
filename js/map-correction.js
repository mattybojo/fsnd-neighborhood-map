$(document).ready(function() {
  function setMapDimensions() {
    windowHeight = window.screen.height;
    windowWidth = window.screen.width;
    $('#map').css('min-height', windowHeight);
    $('#map').css('min-width', windowWidth);
  };

  setMapDimensions();

  $(window).resize(function() {
    setMapDimensions();
  });
});