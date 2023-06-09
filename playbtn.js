console.log("[RoAdditions] Injected play button adder script")

// Define a function to add the button to each game card container

function createButton(parent, label, onClick, classes, style) {
    const button = document.createElement("button");
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
    const parents = document.querySelectorAll(".game-card-container");
    parents.forEach(function (parent) {
        if (!parent.querySelector(".playBtnRoAdd")) {
            if (
                parent.parentElement.parentElement.classList.contains(
                    "games"
                ) ||
                parent.parentElement.classList.contains("game-carousel") ||
                parent.parentElement.parentElement.parentElement.classList.contains(
                    "group-games"
                )
            ) {
                createButton(
                    parent,
                    "Play",
                    function () {
                        const url = parent
                            .querySelector("a")
                            .getAttribute("href");
                        const startIndex = url.indexOf("games/") + 6; // add 5 to skip "game/"
                        const endIndex = url.indexOf("/", startIndex);
                        const gameId = url.substring(startIndex, endIndex);
                        window.Roblox.GameLauncher.joinMultiplayerGame(
                            gameId
                        );
                        console.log(gameId);
                    },
                    "btn-growth-sm place-btn playBtnRoAdd",
                    {
                        position: "relative",
                        display: "block",
                        "margin-left": "auto",
                        "margin-right": "auto",
                    }
                );
            }
        }
    });
}

function addButtonToContainers() {
    // Call the addButtonToContainers function when the window has finished loading
    console.log("[RoAdditions] adding buttons");
    // Find the parent elements where you want to add the button

    // Loop through each parent element and add a button to it
    dothebuttonthing();
    setInterval(dothebuttonthing, 400);
}

addButtonToContainers();