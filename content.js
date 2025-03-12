let timerDiv = document.createElement("div");
timerDiv.innerHTML = "00:00";
timerDiv.style.position = "fixed";
timerDiv.style.top = "10px";
timerDiv.style.right = "10px";
timerDiv.style.background = "black";
timerDiv.style.color = "white";
timerDiv.style.padding = "10px";
timerDiv.style.borderRadius = "5px";
timerDiv.style.zIndex = "10000"; // Ensure it stays above other elements
document.body.appendChild(timerDiv);

let seconds = 0;
let interval = null;

// Function to update timer display
function updateTimerDisplay() {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    timerDiv.innerHTML = `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "startTimer") {
        if (!interval) {
            interval = setInterval(() => {
                seconds++;
                updateTimerDisplay();
            }, 1000);
        }
    } else if (message.action === "stopTimer") {
        clearInterval(interval);
        interval = null; // Reset the interval variable
    }
});
