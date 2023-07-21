const hereco = async (url) => {
    const cohereApiKey = 'YOUR API KEY';
    const cohereEndpointUrl = 'https://api.cohere.ai/classify';

    const cohereReq = {
        model: 'fb532845-9e54-40cb-bdfa-20ab37c36ef5-ft',
        inputs: [url]
    };

    const reqBody = JSON.stringify(cohereReq);

    const response = await fetch(cohereEndpointUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${cohereApiKey}`,
            'Content-Type': 'application/json',
            "Cohere-Version":"2022-12-06"
        },
        body: reqBody
    });

    const responseBody = await response.json();

    return(responseBody.classifications[0].prediction);
};

const DEFAULT_TIME_LIMIT = 5 * 60 * 60 * 1000;

let timeLimits = JSON.parse(localStorage.getItem("timeLimits")) || {
    education: DEFAULT_TIME_LIMIT,
    shopping: DEFAULT_TIME_LIMIT,
    entertainment: DEFAULT_TIME_LIMIT,
    news: DEFAULT_TIME_LIMIT,
};

let blockedGenres = JSON.parse(localStorage.getItem("blockedGenres")) || [];

function blockCurrentTabIfBlocked(genre) {
    if (blockedGenres.includes(genre)) {
        chrome.tabs.executeScript({
            code: "document.body.innerHTML = '<h1>This website is blocked.</h1>'"
        });
    }
}

function addTimeSpentOnCurrentTab(genre) {
    if (timeLimits[genre] === 0 && !blockedGenres.includes(genre)) {
        blockedGenres.push(genre);
        localStorage.setItem("blockedGenres", JSON.stringify(blockedGenres));
        blockCurrentTabIfBlocked(genre);
        return;
    }

    const currentTime = Date.now();
    const timeElapsed = currentTime - lastTabChangeTime;
    timeLimits[genre] -= timeElapsed;
    lastTabChangeTime = currentTime;

    if (timeLimits[genre] <= 0 && !blockedGenres.includes(genre)) {
        blockedGenres.push(genre);
        localStorage.setItem("blockedGenres", JSON.stringify(blockedGenres));
        blockCurrentTabIfBlocked(genre);
    }
}

let lastTabChangeTime = Date.now();
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active) {
        const genre = await hereco(tab.url);
        addTimeSpentOnCurrentTab(genre);
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "setTimeLimits") {
        timeLimits = request.timeLimits;
        localStorage.setItem("timeLimits", JSON.stringify(timeLimits));
    }
});

chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const activeTab = tabs[0];
    const genre = await hereco(activeTab.url);
    addTimeSpentOnCurrentTab(genre);
});
