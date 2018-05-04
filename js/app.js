$(document).ready(function() {
  $('body').bootstrapMaterialDesign();
});

function AppViewModel() {
  var self = this;

  this.infoWindow = null;
  this.filterText = ko.observable("");
  this.markers = [];
  this.map = null;

  this.initMap = function() {
    // Constructor creates a new map - only center and zoom are required.
    self.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7413549, lng: -73.9980244},
      zoom: 13
    });

    // These are the real estate listings that will be shown to the user.
    // Normally we'd have these in a database instead.

    self.infoWindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < stadiums.length; i++) {
      // Get the position from the location array.
      var position = {lat: stadiums[i].lat, lng: stadiums[i].lng};
      var title = stadiums[i].title;
      // Create a marker per location, and put into markers array.
      var marker = new google.maps.Marker({
        map: self.map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
      });
      // Push the marker to our array of markers.
      this.markers.push(marker);
      // Create an onclick event to open an infowindow at each marker.
      marker.addListener('click', function() {
        self.populateInfoWindow(this);
      });
      bounds.extend(this.markers[i].position);
    }
    // Extend the boundaries of the map for each marker
    self.map.fitBounds(bounds);
  };

  this.initMap();
  toastr.options.preventDuplicates = true; // prevent duplicate toastr notifications

  // This function populates the infowindow when the marker is clicked. We'll only allow
  // one infowindow which will open at the marker that is clicked, and populate based
  // on that markers position.
  this.populateInfoWindow = function(marker) {
    // Close the drawer, if open
    $('.bmd-drawer-in').removeClass('bmd-drawer-in');

    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout((function() {
      this.setAnimation(null);
    }).bind(marker), 1400);
    // Check to make sure the infowindow is not already opened on this marker.
    if (self.infoWindow.marker != marker) {
      $.ajax({
        headers: { 'X-Auth-Token': '8bd0a761d21348afb36af2463011629c' },
        url: 'http://api.football-data.org/v1/teams/' + stadiums[marker.id].api_id,
        dataType: 'json',
        type: 'GET',
        success: function(response) {
          self.infoWindow.marker = marker;
          self.infoWindow.setContent('<div><p class="team-stadium">' + marker.title + '</p><img src="' + response.crestUrl + '" height="40" width="40"><span>&nbsp;' + response.name + '</span></div>');
          self.infoWindow.open(self.map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          self.infoWindow.addListener('closeclick',function(){
            self.infoWindow.setMarker = null;
          });
        },
        error: function(error) {
          toastr.error('Unable to retrieve team data.  Please try again');
          self.infoWindow.marker = marker;
          self.infoWindow.setContent('<div><p class="team-stadium">' + marker.title + '</p></div>');
          self.infoWindow.open(self.map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          self.infoWindow.addListener('closeclick',function(){
            self.infoWindow.setMarker = null;
          });
        }
      });
    } else {
      self.infoWindow.open(self.map, marker);
    }
  };

  this.filteredStadiums = ko.computed(function() {
    var markerList = [];
    var i;
    var marker;
    for (i = 0; i < this.markers.length; i++) {
      marker = this.markers[i];
      if(marker.title.toLowerCase().includes(this.filterText().toLowerCase()) ||
        stadiums[i].team.toLowerCase().includes(this.filterText().toLowerCase())) {
        markerList.push(marker);
        this.markers[i].setVisible(true);
      } else {
        this.markers[i].setVisible(false);
      }
    }
    return markerList;
  }, this);
}

function gmapError() {
  try {
    toastr.error('Sorry, google maps failed to load.  Please refresh the page and try again.');
  } catch {
    alert('Sorry, google maps failed to load.  Please refresh the page and try again.');
  }
}

function initApp() {
  ko.applyBindings(new AppViewModel());
}