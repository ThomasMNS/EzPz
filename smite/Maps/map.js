var bounds = [[-8277.510648, 11022.556901], [8672.489352, -11012.443099]];
var image = L.imageOverlay('Maps/Conquest Map.png', bounds);

var map = L.map('mapid', {
    crs: L.CRS.Simple,
    minZoom: -50, 
    maxZoom: 50,
    layers: [image]
});

map.fitBounds(bounds);