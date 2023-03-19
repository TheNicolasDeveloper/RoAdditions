// Define a function to add the button to each game card container
function addButtonToContainers() {
    // Call the addButtonToContainers function when the window has finished loading
    console.log("adding buttons");
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

    // Find the parent elements where you want to add the button
    var parents = document.querySelectorAll(".game-card-container");

    // Loop through each parent element and add a button to it
    parents.forEach(function (parent) {
        createButton(
            parent,
            "Play",
            function () {
                var url = parent.querySelector("a").getAttribute("href");
                var startIndex = url.indexOf("games/") + 6; // add 5 to skip "game/"
                var endIndex = url.indexOf("/", startIndex);
                var gameId = url.substring(startIndex, endIndex);
                Roblox.GameLauncher.joinMultiplayerGame(gameId);
            },
            "btn-full-width btn-growth-sm",
            {
                "margin-top": "auto",
            }
        );
    });
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
