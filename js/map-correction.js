$(document).ready(function() {

  /**
   * Gets the window dimensions and sets the map to fill the screen
   */
  function setMapDimensions() {
    windowHeight = window.screen.height;
    windowWidth = window.screen.width;
    $('#map').css('min-height', windowHeight);
    $('#map').css('min-width', windowWidth);
  };

  // Set the dimensions on startup
  setMapDimensions();

  // Set the map size when the screen is re-sized
  $(window).resize(function() {
    setMapDimensions();
  });
});