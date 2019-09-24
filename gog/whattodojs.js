statements = [
    "demands", 
    "suggests", 
    "recommends",
    "requests",
    "commands",
    "orders",
    "insists",
    "urges"
]

suggestions = [
    "Train woodcutting", 
    "Train melee focus", 
    "Train fletching",
    "Train melee power",
    "Train mining",
    "Train melee defense",
    "Train smithing",
    "Train ranged focus",
    "Train fishing",
    "Train ranged power",
    "Train cooking",
    "Train ranged defense",
    "Train firemaking",
    "Train magic focus",
    "Train alchemy",
    "Train magic power",
    "Train crafting",
    "Train magic defense",
    "Train construction",
    "Train thieving",

    "Kill chickens",
    "Kill rats",
    "Kill goblins", 
    "Kill wizards",
    "Kill guards",

    "Play the obelisk minigame",
    "Kill the wolf boss",
    "Make some cash",

    "Incinerate some items",
    "Collect collection tomes",
    "Make some bags",
    "Collect some flax",

    "Make a full set of armour",
    "Mine one of every ore",


    "Run from Bodiam to Fiewon and back",
    "Run from Hyril to Cadgwith and back",
    "Count how many trees there are in the world",
    "Drop items to make a smiley face",
    "Make smalltalk in chat",
    "Create a nice looking outfit",
    "Create an ugly looking outfit",
    "Compliment the developer",
    "Unequip all your clothes",
    "Switch to the other server",
    "Fill a building with fires"
]

buttons = [
    "Nah, what else", 
    "Give me something better", 
    "No thanks, next idea", 
    "I'd rather not. Next suggestion",
    "That's not me. Next",
    "Anything but this",
    "That's a terrible idea"
]

// Helpers 
function chooseRandom(list) {
    return list[Math.floor(Math.random()*list.length)];
}

function newRandom(item, list) {
    new_item = chooseRandom(list);
    while (new_item == item) {
        new_item = chooseRandom(list)
    }    
    return new_item;
}

var statement = chooseRandom(statements);
var suggestion = chooseRandom(suggestions);
var button = chooseRandom(buttons);

function populate() {
    document.getElementById("statement").innerHTML = statement;
    document.getElementById("suggestion-para").innerHTML = suggestion;
    document.getElementById("button").innerHTML = button;
}

function randomize() {
    statement = newRandom(statement, statements);
    suggestion = newRandom(suggestion, suggestions);
    button = newRandom(button, buttons);

    populate();
}

populate();