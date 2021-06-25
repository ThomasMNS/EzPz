var shouldShowPopup = true;
var popupCountries = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
"HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI",
"ES", "SE", "GB"];

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
    fetch('https://ipinfo.io/json')
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log("Country " + data["country"])
        if (popupCountries.includes(data["country"]) == true) {
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
        console.log("Enabling analytics");
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
          });
    }
    if (localStorage.getItem("EzPz_adsense") == "true") {
        console.log("Enabling adsense");
        (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0;
        (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0;
    }
}

function showPrefsLink() {
    document.getElementById("cookiePrefs").classList.remove("hidden");
}

function errorFunction() {
    console.log("Ads are blocked");
}
