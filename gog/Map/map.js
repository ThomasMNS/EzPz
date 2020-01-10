// Transform between GoG coordinates and pixel coordinates
// Firstly, co-ordinates in GoG are given in the form [x, y], but Leaflet takes them as [y, x]
// This function takes 2 numbers, and returns them as an array swapped
// Secondly, each tile in GoG is 7.68 pixels in the image, so the co-ordinate is multiplied by 7.68. 
// We could account for this when setting the image bounds, but this prevents zooming to the original resolution.
// To-do: Investigate doing this using a custom CRS scale.
var xy = function(x, y) {
    if (L.Util.isArray(x))  {
        return [x[1] * 7.68, x[0] * 7.68];
    }
    return [y * 7.68, x * 7.68];
}

var xyGoG = function(x, y) {
    if (L.Util.isArray(x))  {
        return [Math.round(x[1] / 7.68), Math.round(x[0] / 7.68)];
    }
    if (typeof y == "undefined") {
        return Math.round(x / 7.68);
    }
    return [Math.round(y / 7.68), Math.round(x / 7.68)];
}

// Icons
var GoGIcon = L.Icon.extend({
    options: {
        iconSize:     [34, 47],
        iconAnchor:   [17, 47],
        popupAnchor:  [0, -35]
    }
});

// Keep track of ALL the layers - not just the ones in the layer control or that are activated
// This allows us to switch between dungeon and overworld views
var allLayers = {
    "Overworld": {},
    "Dungeons": {}
}

// // Keep track of the activated layers, so they can be remembered when switching between basemaps
// To-do - find a way of distinguishing between manual removal, and removal triggered when 
// layer is removed from control
// var activatedLayers = {
//     "Overworld": {},
//     "Underworld": {}
// }

// Keep track of current level 
// var currentLevel;

var blankIcon = new GoGIcon({iconUrl: 'Markers/marker.png'})

// Helper function to remove some boilerplate when adding layers
var addLayer = function(layername, level, locations, itemName, description, iconUrl) {
    var mapIcon = new GoGIcon({iconUrl: iconUrl})
    var group = L.layerGroup();
    for (loc of locations) {
        group.addLayer(L.marker(loc, {icon: mapIcon}).bindPopup("<b>" + itemName + "</b>" + " (" + xyGoG(loc[0]) + ", " + xyGoG(loc[1]) + ")" + "<br>" + description));
    }
    allLayers[level][layername] = group;
}

// For adding layers where markers can have different icons and titles
var addUniqueLayer = function(layername, level, items, description, icons) {
    var group = L.layerGroup();
    for (item of items) {
        if (item["name"] in icons) {
            var mapIcon = new GoGIcon({iconUrl: icons[item["name"]]});
        }
        else {
            var mapIcon = new GoGIcon({iconUrl: '/Map/marker.png'})
        }

        group.addLayer(L.marker(item["location"], {icon: mapIcon}).bindPopup("<b>" + item["name"] + "</b>" + " (" + xyGoG(item["location"][0]) + ", " + xyGoG(item["location"][1]) + ")" + "<br>" + description));
        // console.log(item);
    }
    allLayers[level][layername] = group;
}

// Cities
// This requires some custom code to make the popups stay open, so it's done without the helpers
var cities = [
    {
        name: "Fiewon", 
        location: xy(32, 36)
    },

    {
        name: "Hyril",
        location: xy(32, 170)
    }, 

    {
        name: "Wizard's Tower", 
        location: xy(68, 93)
    },

    {
        name: "Cadgwith",
        location: xy(152, 11)
    },

    {
        name: "Volcano", 
        location: xy(157, 90)
    },

    {
        name: "Woodcutting Guild",
        location: xy(341, 66)
    },

    {
        name: "Bodiam",
        location: xy(179, 181)
    },

    {
        name: "Battlefield", 
        location: xy(218, 222)
    },

    {
        name: "Goblin Stronghold",
        location: xy(234, 269)
    },

    {
        name: "Mining Guild",
        location: xy(61, 354)
    },

    {
        name: "Island",
        location: xy(9, 97)
    },

    {
        name: "Goblin Outpost",
        location: xy(84, 119)
    }
]

var citiesGroup = L.layerGroup();
for (city of cities) {
    citiesGroup.addLayer(L.marker(city["location"], {icon: blankIcon}).bindPopup(city["name"], {closeOnClick: false, autoClose: false, autoPan: false}));
}

allLayers["Overworld"]["Cities"] = citiesGroup;

// Open the popups by default
citiesGroup.on('add', function() {
    citiesGroup.eachLayer(function(layer) {
        layer.openPopup();
    });
})

addLayer("Anvils", "Overworld", [xy(36, 34), xy(175, 172), xy(21, 167), xy(21, 169), xy(264, 275), xy(85, 349)], "Anvil", "Hammer metal bars in to weapons and armour.<br>More information at <a href='https://gogzone.com/skills/smithing.html' target='_blank'>GoGZone</a>", '/Map/anvil_marker.png')
addLayer("Banks", "Overworld", [xy(42, 35), xy(139, 7), xy(353, 58), xy(179, 173), xy(21, 174), xy(65, 342)], "Bank", "You can store your items here.", '/Map/bank_marker.png');
addLayer("Furnaces", "Overworld", [xy(26, 8), xy(36, 31), xy(23, 165), xy(174, 172), xy(84, 347), xy(260, 275)], "Furnace", "<a href='https://gogzone.com/skills/smithing.html' target='_blank'>Smelt metal bars</a> and <a href='https://gogzone.com/skills/crafting.html' target='_blank'>fire pots</a>.", '/Map/furnace_marker.png')
addLayer("Furnaces", "Dungeons", [xy(82, 122), xy(21, 165), xy(97, 164)], "Furnace", "<a href='https://gogzone.com/skills/smithing.html' target='_blank'>Smelt metal bars</a> and <a href='https://gogzone.com/skills/crafting.html' target='_blank'>fire pots</a>.", '/Map/furnace_marker.png')
addLayer("Incinerators", "Overworld", [xy(71, 94), xy(162, 71)], "Incinerator", "Incinerate items to get shards to use in alchemy.<br><a href='https://gogzone.com/skills/firemaking.html' target='_blank'>GoGZone Firemaking guide</a>.", "/Map/incinerator_marker.png")
addLayer("Incinerators", "Dungeons", [xy(23, 165)], "Incinerator", "Incinerate items to get shards to use in alchemy.<br><a href='https://gogzone.com/skills/firemaking.html' target='_blank'>GoGZone Firemaking guide</a>.", "/Map/incinerator_marker.png")
addLayer("Pottery Wheels", "Overworld", [xy(24, 8), xy(189, 179), xy(69, 203)], "Pottery Wheel", "Shape clay in to unfired pots.<br><a href='https://gogzone.com/skills/crafting.html' target='_blank'>GoGZone Crafting guide</a>.", '/Map/pottery_wheel_marker.png')
addLayer("Spinning Wheels", "Overworld", [xy(62, 77), xy(45, 174), xy(185, 179)], "Spinning Wheel", "Spin flax in to bowstrings or drawstrings.<br><a href='https://gogzone.com/skills/crafting.html' target='_blank'>GoGZone Crafting guide</a>.", "/Map/spinning_wheel_marker.png")

// Stores
var stores = [
    {
        name: "General Store",
        location: xy(30, 32)
    },
    {
        name: "General Store", 
        location: xy(42, 169)
    }, 
    {
        name: "General Store",
        location: xy(174, 180)
    }, 
    {
        name: "Melee Store",
        location: xy(179, 185)
    },
    {
        name: "Archery Store", 
        location: xy(161, 5)
    },
    {
        name: "Archery Store", 
        location: xy(172, 185)
    },
    {
        name: "Magic Store", 
        location: xy(156, 14)
    },
    {
        name: "Magic Store", 
        location: xy(39, 172)
    },
    {
        name: "Fishing Store",
        location: xy(152, 5)
    },
    {
        name: "Woodcutting Store",
        location: xy(33, 38)
    },
    {
        name: "Woodcutting Store",
        location: xy(24, 169)
    },
    {
        name: "Mining Store",
        location: xy(186, 185)
    },
    {
        name: "Crafting Store",
        location: xy(42, 172)
    },
    {
        name: "Crafting Store",
        location: xy(184, 180)
    },
    {
        name: "Alchemy Store",
        location: xy(168, 16)
    },
    {
        name: "Metalsmith Store",
        location: xy(33, 32)
    },
    {
        name: "Metalsmith Store",
        location: xy(21, 169)
    },
    {
        name: "Metalsmith Store",
        location: xy(174, 180)
    },
    {
        name: "Clothing Store",
        location: xy(30, 38)
    },
    {
        name: "Mining Store",
        location: xy(37, 351)
    },
    {
        name: "Mining Store",
        location: xy(45, 351)
    },
    {
        name: "General Store",
        location: xy(39, 356)
    },
    {
        name: "Woodcutting Store",
        location: xy(344, 80)
    },
    {
        name: "Woodcutting Store",
        location: xy(351, 73)
    }
]

addUniqueLayer("Stores", "Overworld", stores, "Buy and sell items.<br>View items and prices at <a href='https://gogzone.com/npcs/stores.html' target='_blank'>GoGZone</a>", {"General Store": '/Map/general_store_marker.png',
"Melee Store": '/Map/general_store_marker.png',
"Archery Store": '/Map/archery_store_marker.png',
"Magic Store": "/Map/magic_store_marker.png",
"Fishing Store": "/Map/fishing_store_marker.png",
"Woodcutting Store": "/Map/woodcutting_store_marker.png",
"Mining Store": "/Map/mining_store_marker.png",
"Crafting Store": "/Map/crafting_store_marker.png",
"Alchemy Store": "/Map/alchemy_store_marker.png",
"Metalsmith Store": "/Map/metalsmith_store_marker.png",
"Clothing Store": "/Map/clothing_store_marker.png"})

// Map settings
// Extend CRS.Simple to make the origin the top left (as is done in GoG), rather than bottom left
var mapCRS = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(1, 0, 1, 0)
});

var bounds = [[0,0], [3072, 3072]];
var image = L.imageOverlay('/Map/guilds-of-gods-map.png', bounds);
var dungeonimage = L.imageOverlay('/Map/guilds-of-gods-dungeons-map.png', [[0, 0], [3072, 3072]]);

var map = L.map('mapid', {
    crs: mapCRS,
    minZoom: -3, 
    maxZoom: 3,
    maxBounds: [[-200, -200], [3272, 3272]],
    layers: [citiesGroup, image]
});

map.setView(xy(180, 183), 0);

var baseMaps = {
    "Overworld": image,
    "Dungeons": dungeonimage
}

var layerControl = L.control.layers(baseMaps).addTo(map);

map.on('click', function(e) {
    alert("Location: " + xyGoG(e.latlng.lng) + ", " + xyGoG(e.latlng.lat))
});

// map.on('click', function(e) {
//     alert(map.getZoom())
// });

// map.on('click', function(e) {
//     for (layer in allLayers["overworld"]) {
//         layerControl.removeLayer(allLayers["overworld"][layer]);
//     }
// });

// When the base map is changed, remove all layers from the map, remove all layers from the legend, add layers to legend based on current level
map.on('baselayerchange', function(e) {
    // currentLevel = e["name"]

    for (layer in allLayers["Overworld"]) {
        map.removeLayer(allLayers["Overworld"][layer]);
        test = layerControl.removeLayer(allLayers["Overworld"][layer]);
    }
    for (layer in allLayers["Dungeons"]) {
        map.removeLayer(allLayers["Dungeons"][layer]);
        layerControl.removeLayer(allLayers["Dungeons"][layer]);
    }

    for (layer in allLayers[e["name"]]) {
        layerControl.addOverlay(allLayers[e["name"]][layer], layer);
    }

  });

// map.on("overlayadd", function(e) {
//     activatedLayers[currentLevel][e["name"]] = e["layer"];
//     console.log(activatedLayers);
// })

// map.on("overlayremove", function(e) {
//     console.log("An overlay has been removed.")
//     console.log(e["name"])
//     // delete activatedLayers[currentLevel][e["name"]];
//     // console.log(activatedLayers);
// })

// map.panTo([0, 0]);
// map.setZoom(0);

// Add the cities layer on first load
map.addLayer(allLayers["Overworld"]["Cities"]);

// Add overworld layers to legend on first load
for (layer in allLayers["Overworld"]) {
    layerControl.addOverlay(allLayers["Overworld"][layer], layer);
}
