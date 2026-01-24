// Constants
const PROJECT_ID = "iepfencdlffojzakpldr";
const API_KEY = "sb_publishable_sMYrdznP3isU_zxfZgr_SQ_Y8vk5l92";

// Get the leaderboard div
let leaderboard_entries = document.querySelector("#leaderboard-entries");

// Load leaderboard data when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    load_leaderboard();
});

// Load leaderboard data from JSON file
async function load_leaderboard() {
    
    // Clear existing leaderboard entries
    leaderboard_entries.innerHTML = "";

    // Get the leaderboard data
    fetch(`https://${PROJECT_ID}.supabase.co/rest/v1/leaderboard?select=*`, {
        headers: {
            "apikey": API_KEY,
            "Authorization": `Bearer ${API_KEY}`
        }
    })
    .then(res => res.json())
    .then(data => {
        // Iterate through the data and create leaderboard entries
        for (let i = 0; i < data.length; i++) {
            let entry = getRankedTime(data, i + 1);
            createLeaderboardEntry(entry, i + 1);
        }
    });
}

// Get the entry with the specified rank
function getRankedTime(data, rank) {
    let sortedData = data.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
    return sortedData[rank - 1];
}

// Create leaderboard entry
function createLeaderboardEntry(entry, index) {
    let entryDiv = document.createElement("div");
    entryDiv.classList.add("leaderboard-entry");

    let rankDiv = document.createElement("div");
    rankDiv.classList.add("leaderboard-rank");
    rankDiv.textContent = index;

    let usernameDiv = document.createElement("div");
    usernameDiv.classList.add("leaderboard-username");
    usernameDiv.textContent = entry.username;

    let timeDiv = document.createElement("div");
    timeDiv.classList.add("leaderboard-time");
    timeDiv.textContent = entry.time;

    let dateDiv = document.createElement("div");
    dateDiv.classList.add("leaderboard-date");
    dateDiv.textContent = entry.date;

    let statusDiv = document.createElement("div");
    statusDiv.classList.add("leaderboard-status");
    statusDiv.textContent = entry.status;

    entryDiv.appendChild(rankDiv);
    entryDiv.appendChild(usernameDiv);
    entryDiv.appendChild(timeDiv);
    entryDiv.appendChild(dateDiv);
    entryDiv.appendChild(statusDiv);

    leaderboard_entries.appendChild(entryDiv);
}