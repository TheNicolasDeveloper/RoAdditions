// Define a function to add the button to each game card container

function createButton(parent, label, onClick, classes, style) {
    var button = document.createElement("button");
    button.innerHTML = label;
    button.addEventListener("click", onClick);
    if (classes) {
        // If classes are specified, add them to the button element
        classes.split(" ").forEach(function (className) {
            button.classList.add(className);
        });
    }
    if (style) {
        for (var prop in style) {
            button.style[prop] = style[prop];
        }
    }
    parent.appendChild(button);
}

function dothebuttonthing() {
    var parents = document.querySelectorAll(".game-card-container");
    parents.forEach(function (parent) {
        if (!parent.querySelector(".playBtnRoAdd")) {
            createButton(
                parent,
                "Play",
                function () {
                    var url = parent.querySelector("a").getAttribute("href");
                    var startIndex = url.indexOf("games/") + 6; // add 5 to skip "game/"
                    var endIndex = url.indexOf("/", startIndex);
                    var gameId = url.substring(startIndex, endIndex);
                    window.Roblox.GameLauncher.joinMultiplayerGame(gameId);
                },
                "btn-full-width btn-growth-sm playBtnRoAdd",
                {
                    bottom: "-20px",
                    position: "absolute",
                }
            );
        }
    });
}

function addButtonToContainers() {
    // Call the addButtonToContainers function when the window has finished loading
    console.log("adding buttons");
    // Find the parent elements where you want to add the button

    // Loop through each parent element and add a button to it
    dothebuttonthing();
    setInterval(dothebuttonthing, 3000);
}

// Define a function to be called when the DOM is mutated
function onDOMMutation(mutationsList, observer) {
    for (var mutation of mutationsList) {
        if (mutation.type === "childList") {
            mutation.removedNodes.forEach(function (node) {
                if (node.classList && node.classList.contains("shimmer")) {
                    addButtonToContainers();
                }
            });
        }
    }
}

// Create a new MutationObserver and start observing the DOM for changes
var observer = new MutationObserver(onDOMMutation);
observer.observe(document.body, { childList: true, subtree: true });

// Call the addButtonToContainers function when the window has finished loading
addButtonToContainers();
