const API_KEY = 'AIzaSyAsQ7E02xCW3qAdxwHK2PLj-pppMfm9fBw';
const ipadWrap = document.getElementById('ipad-wrap');
const ipadYoutubeApp = document.getElementById('ipad-youtube-app');
const ipadGamesApp = document.getElementById('ipad-games-app');
const ipadSocialApp = document.getElementById('ipad-social-app');
const ipadWatchpartyApp = document.getElementById('ipad-watchparty-app');
const ipadDeviceSwitcherApp = document.getElementById('ipad-device-switcher-app');
const ipadYoutubeContainer = document.getElementById('ipad-youtube-container');
const ipadGamesContainer = document.getElementById('ipad-games-container');
const ipadSocialContainer = document.getElementById('ipad-social-container');
const ipadWatchpartyContainer = document.getElementById('ipad-watchparty-container');
const ipadDeviceSwitcherContainer = document.getElementById('ipad-device-switcher-container');
const ipadYoutubeSearchButton = document.getElementById('ipad-youtube-search-button');
const ipadGamesSearchButton = document.getElementById('ipad-games-search-button');
const ipadSocialSearchButton = document.getElementById('ipad-social-search-button');
const ipadWatchpartySearchButton = document.getElementById('ipad-watchparty-search-button');
const ipadYoutubeSearchInput = document.getElementById('ipad-youtube-search-input');
const ipadGamesSearchInput = document.getElementById('ipad-games-search-input');
const ipadSocialSearchInput = document.getElementById('ipad-social-search-input');
const ipadWatchpartySearchInput = document.getElementById('ipad-watchparty-search-input');
const searchBar = document.getElementById('search-bar');
const searchInput = document.getElementById('search-input');
const bottomBar = document.getElementById('bottom-bar');

// App Interactions
function openApp(containerId) {
    document.getElementById('appGrid').classList.remove('show');
    document.getElementById(containerId).classList.add('active');
    document.getElementById('inAppBar').style.bottom = '0';
    document.getElementById('inAppBar').style.pointerEvents = 'all';
    if (containerId === 'ipad-games-container' || containerId === 'ipad-watchparty-container') {
        document.getElementById(containerId).querySelector('.sub-grid').classList.add('active');
    }
    searchBar.classList.remove('active');
    searchInput.value = '';
    bottomBar.classList.add('active');
}

function closeApp(containerId) {
    document.getElementById(containerId).classList.remove('active');
    document.getElementById('appGrid').classList.add('show');
    document.getElementById('inAppBar').style.bottom = '-8%';
    document.getElementById('inAppBar').style.pointerEvents = 'none';
    if (containerId === 'ipad-games-container' || containerId === 'ipad-watchparty-container') {
        document.getElementById(containerId).querySelector('.sub-grid').classList.remove('active');
    }
    searchBar.classList.remove('active');
    searchInput.value = '';
    bottomBar.classList.add('active');
}

ipadYoutubeApp.addEventListener('click', () => openApp('ipad-youtube-container'));
ipadGamesApp.addEventListener('click', () => openApp('ipad-games-container'));
ipadSocialApp.addEventListener('click', () => openApp('ipad-social-container'));
ipadWatchpartyApp.addEventListener('click', () => openApp('ipad-watchparty-container'));
ipadDeviceSwitcherApp.addEventListener('click', () => openApp('ipad-device-switcher-container'));

// YouTube Functionality
ipadYoutubeSearchButton.addEventListener('click', () => {
    const query = ipadYoutubeSearchInput.value;
    searchYouTube(query, 'ipad-youtube-video-list', 'ipad-youtube-iframe');
});

ipadYoutubeSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchYouTube(ipadYoutubeSearchInput.value, 'ipad-youtube-video-list', 'ipad-youtube-iframe');
    }
});

function searchYouTube(query, listId, iframeId) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${API_KEY}`;
    const videoList = document.getElementById(listId);

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            videoList.innerHTML = '';
            data.items.forEach(item => {
                const videoItem = document.createElement('div');
                videoItem.className = 'video-item bg-gray-700 rounded-lg overflow-hidden';
                videoItem.innerHTML = `
                    <img alt="${item.snippet.title}" src="${item.snippet.thumbnails.medium.url}" class="w-full"/>
                    <div class="p-2">
                        <h3 class="font-bold text-sm">${item.snippet.title}</h3>
                        <p class="text-gray-400 text-xs">${item.snippet.channelTitle}</p>
                    </div>
                `;
                videoItem.addEventListener('click', () => playYouTubeVideo(item.id.videoId, iframeId));
                videoList.appendChild(videoItem);
            });
        })
        .catch(error => console.error('Error fetching YouTube videos:', error));
}

function playYouTubeVideo(videoId, iframeId) {
    const iframe = document.getElementById(iframeId);
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.classList.remove('hidden');
}

// Games Functionality (Placeholder)
ipadGamesSearchButton.addEventListener('click', () => {
    const query = ipadGamesSearchInput.value;
    searchGames(query, 'ipad-games-list');
});

ipadGamesSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchGames(ipadGamesSearchInput.value, 'ipad-games-list');
    }
});

function searchGames(query, listId) {
    const gamesList = document.getElementById(listId);
    gamesList.innerHTML = '<p class="text-white text-center">Game search not implemented</p>';
}

// Social Functionality (Placeholder)
ipadSocialSearchButton.addEventListener('click', () => {
    const query = ipadSocialSearchInput.value;
    searchSocial(query, 'ipad-social-list');
});

ipadSocialSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchSocial(ipadSocialSearchInput.value, 'ipad-social-list');
    }
});

function searchSocial(query, listId) {
    const socialList = document.getElementById(listId);
    socialList.innerHTML = '<p class="text-white text-center">Social search not implemented</p>';
}

// Watch Party Functionality (Placeholder)
ipadWatchpartySearchButton.addEventListener('click', () => {
    const query = ipadWatchpartySearchInput.value;
    searchWatchparty(query, 'ipad-watchparty-list');
});

ipadWatchpartySearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWatchparty(ipadWatchpartySearchInput.value, 'ipad-watchparty-list');
    }
});

function searchWatchparty(query, listId) {
    const watchpartyList = document.getElementById(listId);
    watchpartyList.innerHTML = '<p class="text-white text-center">Watch party search not implemented</p>';
}

// Device Switching
function switchDevice(device) {
    const buttons = document.querySelectorAll('.device-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.target.classList.contains('device-button')) {
        event.target.classList.add('active');
    }
    if (device === 'pc') {
        document.documentElement.style.setProperty('--sizeVar', '80vmin');
    } else if (device === 'phone') {
        document.documentElement.style.setProperty('--sizeVar', '50vmin');
    } else {
        document.documentElement.style.setProperty('--sizeVar', '95vmin');
    }
}

// Search Functionality
function toggleSearch() {
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
        searchInput.focus();
    } else {
        searchInput.value = '';
        performSearch();
    }
}

function closeSearchOnClick(event) {
    if (!searchBar.contains(event.target) && searchBar.classList.contains('active')) {
        searchBar.classList.remove('active');
        searchInput.value = '';
        performSearch();
    }
}

function performSearch() {
    const query = searchInput.value.toLowerCase();
    const apps = document.querySelectorAll('.appGrid .logo');
    apps.forEach(app => {
        const appName = app.querySelector('p').textContent.toLowerCase();
        if (appName.includes(query)) {
            app.style.display = 'block';
        } else {
            app.style.display = 'none';
        }
    });
}

// iPad Functionality
let powerVar = 0;

function powerMe() {
    document.getElementById("inAppBar").style.bottom = "-8%";
    document.getElementById("inAppBar").style.pointerEvents = "none";
    document.getElementsByClassName("wallpaper")[0].style.backgroundImage =
        "url('https://assets.codepen.io/2722301/bg.jpg')";
    if (powerVar == 1) {
        document.getElementsByClassName("ipadScreen")[0].style.opacity = 1;
        document.getElementsByClassName("ipadScreen")[0].style.pointerEvents = "all";
        powerVar = 0;
        document.getElementsByClassName("lockScreen")[0].style.transition =
            "top 800ms ease-in 0s, backdrop-filter 200ms ease-in 0s";
        document.getElementById("appGrid").style.transition = "opacity 400ms ease-in-out";
        bottomBar.classList.remove('active');
    } else {
        document.getElementsByClassName("ipadScreen")[0].style.opacity = 0;
        document.getElementsByClassName("ipadScreen")[0].style.pointerEvents = "none";
        powerVar = 1;
        setTimeout(function () {
            document.getElementsByClassName("lockScreen")[0].style.transition = "none";
            document.getElementById("appGrid").style.transition = "none";
            document.getElementsByClassName("lockScreen")[0].style.backdropFilter = "blur(0)";
            document.getElementsByClassName("lockScreen")[0].style.top = "0";
            document.getElementById("appGrid").classList.remove("show");
            ipadYoutubeContainer.classList.remove('active');
            ipadGamesContainer.classList.remove('active');
            ipadSocialContainer.classList.remove('active');
            ipadWatchpartyContainer.classList.remove('active');
            ipadDeviceSwitcherContainer.classList.remove('active');
            searchBar.classList.remove('active');
            searchInput.value = '';
            bottomBar.classList.remove('active');
        }, 300);
    }
}

function lockClick() {
    document.getElementsByClassName("lockScreen")[0].style.backdropFilter = "blur(2vh) brightness(1.2)";
    document.getElementsByClassName("lockScreen")[0].style.top = "-110%";
    document.getElementById("appGrid").classList.add("show");
    searchBar.classList.remove('active');
    searchInput.value = '';
    bottomBar.classList.add('active');
}

function checkTime() {
    var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    d = new Date();
    if (d.getMinutes() < 10) {
        minTime = "0" + d.getMinutes();
    } else {
        minTime = d.getMinutes();
    }
    document.getElementsByClassName("lockTime")[0].innerHTML =
        d.getHours() + ":" + minTime + "<br/>" + day[d.getDay()] + ", " + month[d.getMonth()] + " " + d.getDate();
    setTimeout(function () {
        checkTime();
    }, 500);
}

function goHome() {
    document.getElementById("inAppBar").style.bottom = "-8%";
    document.getElementById("inAppBar").style.pointerEvents = "none";
    document.getElementsByClassName("wallpaper")[0].style.backgroundImage =
        "url('https://assets.codepen.io/2722301/bg.jpg')";
    document.getElementById("appGrid").classList.add("show");
    ipadYoutubeContainer.classList.remove('active');
    ipadGamesContainer.classList.remove('active');
    ipadSocialContainer.classList.remove('active');
    ipadWatchpartyContainer.classList.remove('active');
    ipadDeviceSwitcherContainer.classList.remove('active');
    document.querySelectorAll('.sub-grid').forEach(grid => grid.classList.remove('active'));
    searchBar.classList.remove('active');
    searchInput.value = '';
    performSearch();
    bottomBar.classList.add('active');
}

// Initialize iPad screen
setTimeout(() => {
    document.getElementsByClassName('ipadScreen')[0].style.opacity = 1;
}, 1000);

// Search bar input event
searchInput.addEventListener('input', performSearch);
