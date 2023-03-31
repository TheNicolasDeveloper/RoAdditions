console.log("running roadditions extension :D");

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
                        window.Roblox.GameLauncher.joinMultiplayerGame(gameId);
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
    console.log("adding buttons");
    // Find the parent elements where you want to add the button

    // Loop through each parent element and add a button to it
    dothebuttonthing();
    setInterval(dothebuttonthing, 400);
}

addButtonToContainers();



// Get all the toggle buttons on the page
const toggleButtons = document.querySelectorAll('.btn-toggle');

// Loop through each toggle button and add event listeners for smooth transitions
toggleButtons.forEach(btn => {
  // Add a click event listener to each toggle button
  btn.addEventListener('click', () => {
    // Add the "animating" class to the button to trigger the transition effect
    btn.classList.add('animating');

    // Toggle the "on" class on the button
    btn.classList.toggle('on');

    // Get the toggle flip element and toggle the "on" class on it
    const toggleFlip = btn.querySelector('.toggle-flip');
    toggleFlip.classList.toggle('on');

    // Get the toggle on and off elements and toggle their visibility classes
    const toggleOn = btn.querySelector('#toggle-on');
    const toggleOff = btn.querySelector('#toggle-off');
    if (btn.classList.contains('on')) {
      toggleOn.classList.add('visible');
      toggleOff.classList.remove('visible');
    } else {
      toggleOn.classList.remove('visible');
      toggleOff.classList.add('visible');
    }

    // Remove the "animating" class after the transition is complete
    setTimeout(() => {
      btn.classList.remove('animating');
    }, 300);
  });
});
