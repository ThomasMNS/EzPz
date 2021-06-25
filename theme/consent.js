if (localStorage.getItem("EzPz_test") == "true") {

var shouldShowPopup = true;
var popupCountries = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece",
"Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia",
"Spain", "Sweden", "United Kingdom"];

// Check whether to display the popup

// Has the user already set their cookie preferences?
// User has already set their preferences
if (localStorage.getItem("EzPz_prefs_chosen") == "true") {
    shouldShowPopup = false;
    enableFunction();
    showPrefsLink();
    console.log("User has already set their preferences");
}
// User has not made a decision
else {
    console.log("User has not made a decision");
    // Check if the user requires cookie consent  
    fetch('http://www.geoplugin.net/json.gp')
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log("Country " + data["geoplugin_countryName"])
        if (popupCountries.includes(data["geoplugin_countryName"]) == true) {
            console.log("Country is in EU")
            popupFunction();
            showPrefsLink();
        }
    })
}

// Show the popup
function popupFunction() {
    console.log("Showing popup")
    document.getElementById("consent-background").classList.remove("hidden");
}

// Called when the user clicks the accept all button
function acceptFunction() {
    localStorage.setItem("EzPz_prefs_chosen", "true")
    localStorage.setItem("EzPz_analytics", "true")
    localStorage.setItem("EzPz_adsense", "true")
    enableFunction()
    document.getElementById("consent-background").classList.add("hidden")
}

// Called when user clicks the manage preferences button 
function manageFunction() {
    document.getElementById("consent-popup").classList.add("hidden");
    document.getElementById("manage-popup").classList.remove("hidden");
}

// Called when the user clicks the accept selected button
function selectedFunction() {
    localStorage.setItem("EzPz_prefs_chosen", "true")
    if (document.getElementById("allowedAnalytics").checked == true) {
        localStorage.setItem("EzPz_analytics", "true")
        console.log("User allowed analytics")
    }
    else {
        localStorage.setItem("EzPz_analytics", "false")
    }
    if (document.getElementById("allowedAdSense").checked == true) {
        localStorage.setItem("EzPz_adsense", "true")
        console.log("User allowed AdSense")
    }
    else {
        localStorage.setItem("EzPz_adsense", "false")
    }
    document.getElementById("consent-background").classList.add("hidden")
    enableFunction();
}

// Enable the selected JS (if any)
function enableFunction() {
    console.log("Enabling scripts")
    if (localStorage.getItem("EzPz_analytics") == "true") {
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
          });
    }
    if (localStorage.getItem("EzPz_adsense") == "true") {
        var adSense = document.createElement("script");
        adSense.innerHTML = "alert('Adsense running!');"
        document.head.appendChild(adSense);
    }
}

function showPrefsLink() {
    document.getElementById("cookiePrefs").classList.remove("hidden");
}

}
