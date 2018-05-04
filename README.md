# Neighborhood Map
A responsive web app using `knockout.js` to show the location of every 2017-18 English Premier League team's stadium on a map.

## Code
#### Libraries Used
- `Bootstrap Material Design` v4.1.1 (drawer and navbar design)
- `toastr.js` v2.1.4 (shows growl-like notifications on errors)
- `knockout.js` v3.4.2 (MVVM framework to make the page dynamic)
- `jQuery` v 3.2.1 (ensures a responsive map size, also required for bootstrap)
- `popper.js` v1.12.6 (required for bootstrap)

#### JS files included in the project
- `app.js` (contains the `knockout.js` and Google Maps logic)
- `map-correction.js` (properly sizes the map as the screen size changes)
- `markers.js` (all of the stadium information for each team)

## Features
You can click on any of the 20 markers on the page to see more information about the team and their stadium name.

Clicking the hamburger icon at the top-left will pop open a drawer from the left side of the page.  This drawer can be used to select any stadium.

The text box in the drawer will filter the list as you type.  The list will filter based on the team's name or the stadium name.  Ex. typing 'che' will filter out all but 3 (the stadiums for Chelsea, Manchester city, and Manchester United).

## APIs Used
Google Maps - Shows the map along with markers for the location of each EPL team's stadium.

Football-data.org - Retrieves the team's logo and team name and displays it in the info window when a marker is clicked or selected from the drawer.

## Running the code
1. Clone or download this repo.
2. Open index.html in a web browser.