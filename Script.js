const SERVER_IP = "71.90.122.34";
const SERVER_PORT = "25575";

// Fetch Minecraft Server Status
async function fetchServerStatus() {
    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
        const data = await response.json();

        if (data.online) {
            document.getElementById("server-status").textContent = "Online ✅";
            document.getElementById("player-count").textContent = data.players.online;
            updatePlayerList(data.players.list);
        } else {
            document.getElementById("server-status").textContent = "Offline ❌";
            document.getElementById("player-count").textContent = "0";
            document.getElementById("players").innerHTML = "<p>No players online</p>";
        }
    } catch (error) {
        console.error("Error fetching server status:", error);
        document.getElementById("server-status").textContent = "Error ❌";
        document.getElementById("player-count").textContent = "N/A";
    }
}

// Update Player List
function updatePlayerList(players) {
    const playerContainer = document.getElementById("players");
    playerContainer.innerHTML = "";

    if (players && players.length > 0) {
        players.forEach(player => {
            const playerImg = document.createElement("img");
            playerImg.src = `https://minotar.net/avatar/${player}/50`;
            playerImg.alt = player;
            playerContainer.appendChild(playerImg);
        });
    } else {
        playerContainer.innerHTML = "<p>No players online</p>";
    }
}

// Copy Server IP when clicking "Survive and Thrive" button
document.getElementById("join-server").addEventListener("click", () => {
    const ip = `${SERVER_IP}:${SERVER_PORT}`;
    navigator.clipboard.writeText(ip).then(() => {
        alert(`Server IP copied: ${ip}`);
    });
});

// Refresh server status every 30 seconds
setInterval(fetchServerStatus, 30000);
fetchServerStatus();
