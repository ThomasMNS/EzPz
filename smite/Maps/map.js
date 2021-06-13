var bounds = [[-8277.510648, 11022.556901], [8672.489352, -11012.443099]];
var image = L.imageOverlay('Maps/Conquest Map.png', bounds);

var map = L.map('mapid', {
    crs: L.CRS.Simple,
    minZoom: -3, 
    maxZoom: 3,
    maxBounds: bounds,
    layers: [image]
});
