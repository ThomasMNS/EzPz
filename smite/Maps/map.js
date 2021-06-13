var bounds = [[11022.556901, -8277.510648], [-11012.443099, 8672.489352]];
var image = L.imageOverlay('Maps/Conquest Map.png', bounds);
var kills = L.geoJSON("Maps/CamelotKingsKills.json");

var map = L.map('mapid', {
    crs: L.CRS.Simple,
    minZoom: -50, 
    maxZoom: 50,
    layers: [image, kills]
});

map.fitBounds(bounds);