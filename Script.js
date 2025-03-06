const SERVER_IP = "71.90.122.34";
const SERVER_PORT = "25575";

// Function to copy IP to clipboard and show popup
function copyServerIP() {
    const fullIP = `${SERVER_IP}:${SERVER_PORT}`;
    navigator.clipboard.writeText(fullIP).then(() => {
        document.getElementById("copied-ip").textContent = fullIP;
        showPopup();
    }).catch(err => {
        console.error("Failed to copy IP:", err);
    });
}

// Show the popup message
function showPopup() {
    const popup = document.getElementById("popup-message");
    popup.style.display = "block";

    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);
}

// Fetch Minecraft Server Status & Player List
async function fetchServerStatus() {
    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
        const data = await response.json();

        if (data.online) {
            document.getElementById("server-status").textContent = "Online ✅";
            document.getElementById("player-count").textContent = data.players.online;

            // Show player list
            const playerListDiv = document.getElementById("player-list");
            playerListDiv.innerHTML = ""; // Clear old data

            if (data.players.online > 0 && data.players.list) {
                data.players.list.forEach(player => {
                    const playerCard = document.createElement("div");
                    playerCard.classList.add("player-card");

                    const playerAvatar = document.createElement("img");
                    playerAvatar.src = `https://minotar.net/avatar/${player}/50.png`;
                    playerAvatar.alt = `${player}'s Avatar`;
                    playerAvatar.classList.add("player-avatar");

                    const playerName = document.createElement("span");
                    playerName.textContent = player;

                    playerCard.appendChild(playerAvatar);
                    playerCard.appendChild(playerName);
                    playerListDiv.appendChild(playerCard);
                });
            } else {
                playerListDiv.innerHTML = "<p>No players online.</p>";
            }
        } else {
            document.getElementById("server-status").textContent = "Offline ❌";
        }
    } catch (error) {
        console.error("Error fetching server status:", error);
    }
}

// Refresh server status every 30 seconds
setInterval(fetchServerStatus, 30000);
fetchServerStatus();
