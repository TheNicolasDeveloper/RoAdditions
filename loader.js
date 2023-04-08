const script = document.createElement("script");
script.src = chrome.runtime.getURL("index.js");
document.body.appendChild(script);

console.log("[RoAdditions] running roadditions extension on local side :D");

function getSetting(name) {
    return new Promise(function (resolve, reject) {
        // Load user's preferences
        chrome.storage.sync.get(name, function (result) {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
                console.log(
                    "[RoAdditions] looks like it failed... insufficient perms maybe???"
                );
            } else {
                // Return the setting value
                resolve(result[name]);
            }
        });
    });
}

function setSetting(name, val) {
    // Save user's preferences
    let obj = {};
    obj[name] = val;

    chrome.storage.sync.set(obj, function () {
        console.log("[RoAdditions] Setting saved:", obj);
    });
}

getSetting("playbtn")
    .then(function (value) {
        // Use candoplaybtn here
        if (value) {
            const script = document.createElement("script");
            script.src = chrome.runtime.getURL("playbtn.js");
            document.body.appendChild(script);
        }

        console.log("[RoAdditions] playbtn setting value:", value);
    })
    .catch(function (error) {
        console.error("[RoAdditions] Error loading setting:", error);
    });

