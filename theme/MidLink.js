var bannerLink = document.createElement('a');
bannerLink.href = "http://bit.ly/ezpz-brave"
bannerLink.target = "_blank"

var banner = document.createElement('IMG');
banner.src = 'https://www.ezpz.gg/theme/MidBanner.png';
banner.id = "mid-banner";

bannerLink.appendChild(banner)

var mainContent = document.getElementById("page-content");
var contentParas = mainContent.getElementsByTagName('P')
var numberOfParas = contentParas.length
if (numberOfParas >= 8) {
	mainContent.insertBefore(bannerLink, contentParas[5].nextSibling)
}