// Sample matches data
const matches = [
    {
        id: 1,
        sport: "Football",
        team1: "FC Barcelona",
        team2: "Real Madrid",
        date: "2024-03-15",
        time: "20:00",
        venue: "Camp Nou",
        status: "Upcoming",
        image1: "https://randomuser.me/api/portraits/men/11.jpg",
        image2: "https://randomuser.me/api/portraits/men/12.jpg"
    },
    {
        id: 2,
        sport: "Tennis",
        player1: "Novak Djokovic",
        player2: "Rafael Nadal",
        date: "2024-03-16",
        time: "15:00",
        venue: "Wimbledon",
        status: "Upcoming",
        image1: "https://randomuser.me/api/portraits/men/13.jpg",
        image2: "https://randomuser.me/api/portraits/men/14.jpg"
    },
    {
        id: 3,
        sport: "Basketball",
        team1: "LA Lakers",
        team2: "Boston Celtics",
        date: "2024-03-17",
        time: "19:30",
        venue: "Staples Center",
        status: "Upcoming",
        image1: "https://randomuser.me/api/portraits/men/15.jpg",
        image2: "https://randomuser.me/api/portraits/men/16.jpg"
    },
    {
        id: 4,
        sport: "Cricket",
        team1: "India",
        team2: "Australia",
        date: "2024-03-18",
        time: "14:00",
        venue: "MCG",
        status: "Upcoming",
        image1: "https://randomuser.me/api/portraits/men/17.jpg",
        image2: "https://randomuser.me/api/portraits/men/18.jpg"
    }
];

// Function to create match cards
function createMatchCard(match) {
    return `
        <div class="match-card">
            <div class="match-header">
                <h3>${match.sport}</h3>
                <span class="match-status ${match.status.toLowerCase()}">${match.status}</span>
            </div>
            <div class="match-teams">
                <div class="team">
                    <img src="${match.image1}" alt="${match.team1 || match.player1}">
                    <h4>${match.team1 || match.player1}</h4>
                </div>
                <div class="vs">VS</div>
                <div class="team">
                    <img src="${match.image2}" alt="${match.team2 || match.player2}">
                    <h4>${match.team2 || match.player2}</h4>
                </div>
            </div>
            <div class="match-details">
                <p><i class="fas fa-calendar"></i> ${match.date}</p>
                <p><i class="fas fa-clock"></i> ${match.time}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${match.venue}</p>
            </div>
            <button class="book-ticket">Book Tickets</button>
        </div>
    `;
}

// Function to render matches
function renderMatches() {
    const matchesContainer = document.getElementById('matchesGrid');
    if (matchesContainer) {
        matchesContainer.innerHTML = matches.map(match => createMatchCard(match)).join('');
    }
}

// Initial render
document.addEventListener('DOMContentLoaded', renderMatches); 