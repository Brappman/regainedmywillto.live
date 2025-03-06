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

            // Show player list with avatars
            let playerList = document.getElementById("player-list");
            playerList.innerHTML = "";
            if (data.players.list) {
                data.players.list.forEach(player => {
                    let playerDiv = document.createElement("div");
                    playerDiv.classList.add("player");
                    playerDiv.innerHTML = `<img src="https://minotar.net/helm/${player}/40.png" alt="${player}"> ${player}`;
                    playerList.appendChild(playerDiv);
                });
            }
        } else {
            document.getElementById("server-status").textContent = "Offline ❌";
            document.getElementById("player-count").textContent = "0";
            document.getElementById("player-list").innerHTML = "";
        }
    } catch (error) {
        console.error("Error fetching server status:", error);
        document.getElementById("server-status").textContent = "Error ❌";
        document.getElementById("player-count").textContent = "N/A";
    }
}

// Refresh server status every 30 seconds
setInterval(fetchServerStatus, 30000);
fetchServerStatus();

// Copy server IP when clicking the button
document.getElementById("join-server").addEventListener("click", () => {
    const serverIP = `${SERVER_IP}:${SERVER_PORT}`;
    navigator.clipboard.writeText(serverIP).then(() => {
        alert(`Server IP copied to clipboard: ${serverIP}`);
    }).catch(err => {
        console.error("Failed to copy:", err);
    });
});
