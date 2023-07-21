function submitTimeLimits() {
    const entHours = parseInt(document.getElementById("ent-h").value);
    const entMinutes = parseInt(document.getElementById("ent-m").value);
    const shHours = parseInt(document.getElementById("sh-h").value);
    const shMinutes = parseInt(document.getElementById("sh-m").value);
    const edHours = parseInt(document.getElementById("ed-h").value);
    const edMinutes = parseInt(document.getElementById("ed-m").value);
    const neHours = parseInt(document.getElementById("ne-h").value);
    const neMinutes = parseInt(document.getElementById("ne-m").value);

    const entTimeLimit = (entHours * 60 * 60 + entMinutes * 60) * 1000;
    const shTimeLimit = (shHours * 60 * 60 + shMinutes * 60) * 1000;
    const edTimeLimit = (edHours * 60 * 60 + edMinutes * 60) * 1000;
    const neTimeLimit = (neHours * 60 * 60 + neMinutes * 60) * 1000;

    const timeLimits = {
        education: edTimeLimit || DEFAULT_TIME_LIMIT,
        shopping: shTimeLimit || DEFAULT_TIME_LIMIT,
        entertainment: entTimeLimit || DEFAULT_TIME_LIMIT,
        news: neTimeLimit || DEFAULT_TIME_LIMIT,
    };

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { type: "setTimeLimits", timeLimits: timeLimits });
    });
}

document.getElementById("ent-sub").addEventListener("click", submitTimeLimits);
document.getElementById("sh-sub").addEventListener("click", submitTimeLimits);
document.getElementById("ed-sub").addEventListener("click", submitTimeLimits);
document.getElementById("ne-sub").addEventListener("click", submitTimeLimits);
