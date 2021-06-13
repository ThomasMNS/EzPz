var bounds = [[11022.556901, -8277.510648], [-11012.443099, 8672.489352]];
var image = L.imageOverlay('Maps/Conquest Map.png', bounds);
var killsJSON = {
    "type": "FeatureCollection",
    "name": "CamelotKingsKillsQGIS",
    "features": [
    { "type": "Feature", "properties": { "SourceOwne": "Genetics", "SourcePlay": "Camelot Kings", "Target": "PolarBearMike", "TargetPlay": "Jade Dragons", "X": -923, "Y": 2374, "Time": 211.58 }, "geometry": { "type": "Point", "coordinates": [ -923.0, 2374.0 ] } },
    { "type": "Feature", "properties": { "SourceOwne": "BigManTingz", "SourcePlay": "Camelot Kings", "Target": "sam4soccer2", "TargetPlay": "Jade Dragons", "X": 2277, "Y": -3286, "Time": 577.99 }, "geometry": { "type": "Point", "coordinates": [ 2277.0, -3286.0 ] } },
    { "type": "Feature", "properties": { "SourceOwne": "BigManTingz", "SourcePlay": "Camelot Kings", "Target": "Hurriwind", "TargetPlay": "Jade Dragons", "X": 2451, "Y": -1433, "Time": 588.49 }, "geometry": { "type": "Point", "coordinates": [ 2451.0, -1433.0 ] } },
    { "type": "Feature", "properties": { "SourceOwne": "BigManTingz", "SourcePlay": "Camelot Kings", "Target": "PolarBearMike", "TargetPlay": "Jade Dragons", "X": 2457, "Y": -1989, "Time": 591.99 }, "geometry": { "type": "Point", "coordinates": [ 2457.0, -1989.0 ] } },
    { "type": "Feature", "properties": { "SourceOwne": "Netrioid", "SourcePlay": "Camelot Kings", "Target": "fineokay", "TargetPlay": "Jade Dragons", "X": 2689, "Y": 1091, "Time": 601.49 }, "geometry": { "type": "Point", "coordinates": [ 2689.0, 1091.0 ] } },
    { "type": "Feature", "properties": { "SourceOwne": "Netrioid", "SourcePlay": "Camelot Kings", "Target": "PandaCat", "TargetPlay": "Jade Dragons", "X": -7015, "Y": 1656, "Time": 1160.01 }, "geometry": { "type": "Point", "coordinates": [ -7015.0, 1656.0 ] } },
    { "type": "Feature", "properties": { "SourceOwne": "CaptainTwig", "SourcePlay": "Camelot Kings", "Target": "Hurriwind", "TargetPlay": "Jade Dragons", "X": 3144, "Y": 1662, "Time": 1424.75 }, "geometry": { "type": "Point", "coordinates": [ 3144.0, 1662.0 ] } },
    { "type": "Feature", "properties": { "SourceOwne": "BigManTingz", "SourcePlay": "Camelot Kings", "Target": "PandaCat", "TargetPlay": "Jade Dragons", "X": 2750, "Y": 1596, "Time": 1454.28 }, "geometry": { "type": "Point", "coordinates": [ 2750.0, 1596.0 ] } },
    { "type": "Feature", "properties": { "SourceOwne": "BigManTingz", "SourcePlay": "Camelot Kings", "Target": "sam4soccer2", "TargetPlay": "Jade Dragons", "X": 5421, "Y": -3381, "Time": 1646.48 }, "geometry": { "type": "Point", "coordinates": [ 5421.0, -3381.0 ] } },
    { "type": "Feature", "properties": { "SourceOwne": "BigManTingz", "SourcePlay": "Camelot Kings", "Target": "PolarBearMike", "TargetPlay": "Jade Dragons", "X": 6111, "Y": -2597, "Time": 1655.99 }, "geometry": { "type": "Point", "coordinates": [ 6111.0, -2597.0 ] } },
    { "type": "Feature", "properties": { "SourceOwne": "Genetics", "SourcePlay": "Camelot Kings", "Target": "sam4soccer2", "TargetPlay": "Jade Dragons", "X": 5315, "Y": -1134, "Time": 2033.35 }, "geometry": { "type": "Point", "coordinates": [ 5315.0, -1134.0 ] } },
    { "type": "Feature", "properties": { "SourceOwne": "CaptainTwig", "SourcePlay": "Camelot Kings", "Target": "Hurriwind", "TargetPlay": "Jade Dragons", "X": 4974, "Y": -820, "Time": 2044.82 }, "geometry": { "type": "Point", "coordinates": [ 4974.0, -820.0 ] } },
    { "type": "Feature", "properties": { "SourceOwne": "Genetics", "SourcePlay": "Camelot Kings", "Target": "PandaCat", "TargetPlay": "Jade Dragons", "X": 4093, "Y": 129, "Time": 2052.82 }, "geometry": { "type": "Point", "coordinates": [ 4093.0, 129.0 ] } },
    { "type": "Feature", "properties": { "SourceOwne": "Variety", "SourcePlay": "Camelot Kings", "Target": "sam4soccer2", "TargetPlay": "Jade Dragons", "X": 4596, "Y": -277, "Time": 2540.82 }, "geometry": { "type": "Point", "coordinates": [ 4596.0, -277.0 ] } }
    ]
    }

var kills = L.geoJSON(killsJSON);

var map = L.map('mapid', {
    crs: L.CRS.Simple,
    minZoom: -50, 
    maxZoom: 50,
    layers: [image, kills]
});

map.fitBounds(bounds);