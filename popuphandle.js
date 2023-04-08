function getSetting(name) {
    return new Promise(function (resolve, reject) {
        // Load user's preferences
        chrome.storage.sync.get(name, function (result) {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
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

// Attach an event listener to all switch inputs with class "my-switch"
$(".setting-switch").on("change", function () {
    // Get the ID and value of the switch input that was changed
    let settingatrib = $(this).attr("setting");
    let switchValue = $(this).is(":checked");

    setSetting(settingatrib, switchValue);
    // Do something with the switch value
    console.log("[RoAdditions] Changed option: ", settingatrib, " To: ", switchValue);
});

// Get all Bootstrap switches
let switches = document.querySelectorAll(".setting-switch");

// Set value for each switch
for (const element of switches) {
    let settingatrib = element.getAttribute("setting");
    getSetting(settingatrib)
        .then(function (value) {
            console.log("[RoAdditions] Setting value:", value);
            $(element).prop("checked", value);
        })
        .catch(function (error) {
            console.error("[RoAdditions] Error loading setting:", error);
        });
}
