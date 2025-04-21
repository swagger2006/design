        // Sample coaches data
        const coaches = [
            {
                id: 1,
                name: "Abhinandan kumar",
                specialty: "fitness",
                rating: 4.8,
                price: "$50/hour",
                image: "https://randomuser.me/api/portraits/men/1.jpg"
            },
            {
                id: 2,
                name: "Shubham Gupta",
                specialty: "yoga Expert",
                rating: 4.9,
                price: "$100/hour",
                image: "https://randomuser.me/api/portraits/men/2.jpg"
            },
            {
                id: 3,
                name: "Rohan Pandey",
                specialty: "Kabbadi ",
                rating: 4.7,
                price: "$75/hour",
                image: "https://randomuser.me/api/portraits/men/3.jpg"
            },
            {
                id: 4,
                name: "Nihal Kumar",
                specialty: "Atheletic Coach",
                rating: 4.9,
                price: "$100/hour",
                image: "https://randomuser.me/api/portraits/men/4.jpg"
            },
            {
                id: 5,
                name: "Anshuman Singh Rajput",
                specialty: "Basketball coach",
                rating: 4.9,
                price: "$100/hour",
                image: "https://randomuser.me/api/portraits/men/5.jpg"
            },
            {
                id: 6,
                name: "Smit",
                specialty: "Sprinter coach",
                rating: 4.9,
                price: "$100/hour",
                image: "https://randomuser.me/api/portraits/men/6.jpg"
            },
            {
                id: 7,
                name: "Ankit Singh",
                specialty: "tennis coach",
                rating: 4.9,
                price: "$100/hour",
                image: "https://randomuser.me/api/portraits/men/7.jpg"
            },
            {
                id: 8,
                name: "Aakash deep",
                specialty: "Football",
                rating: 4.9,
                price: "$100/hour",
                image: "https://randomuser.me/api/portraits/men/8.jpg"
            },
            {
                id: 9,
                name: "Ribhu Yadav",
                specialty: "Personal Trainner",
                rating: 4.9,
                price: "$100/hour",
                image: "https://randomuser.me/api/portraits/men/9.jpg"
            },
            {
                id: 10,
                name: "Muskan Singh",
                specialty: "Vollyball coach",
                rating: 4.9,
                price: "$100/hour",
                image: "https://randomuser.me/api/portraits/women/1.jpg"
            },
            {
                id: 11,
                name: "Anshu Aggarwal",
                specialty: "Umpire",
                rating: 4.9,
                price: "$100/hour",
                image: "https://randomuser.me/api/portraits/women/2.jpg"
            },
            {
                id: 12,
                name: "Rohit",
                specialty: "pitch expert",
                rating: 4.9,
                price: "$90/hour",
                image: "https://randomuser.me/api/portraits/men/10.jpg"
            }
        ];

        // Function to create coach cards
        function createCoachCard(coach) {
            return `
                <div class="coach-card" data-specialty="${coach.specialty}">
                    <div class="coach-image">
                        <img src="${coach.image}" alt="${coach.name}">
                    </div>
                    <div class="coach-info">
                        <h3 class="coach-name">${coach.name}</h3>
                        <p class="coach-specialty">${coach.specialty.charAt(0).toUpperCase() + coach.specialty.slice(1)} Coach</p>
                        <div class="coach-rating">⭐ ${coach.rating}</div>
                        <div class="coach-price">${coach.price}</div>
                        <button class="book-button" onclick="openBookingModal(${coach.id})">Book a Session</button>
                    </div>
                </div>
            `;
        }

        // Function to render coaches
        function renderCoaches(filteredCoaches = coaches) {
            const coachesGrid = document.getElementById('coachesGrid');
            coachesGrid.innerHTML = filteredCoaches.map(coach => createCoachCard(coach)).join('');
        }

        // Filter functionality
        document.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                document.querySelector('.filter-button.active').classList.remove('active');
                button.classList.add('active');

                // Filter coaches
                const filter = button.dataset.filter;
                const filteredCoaches = filter === 'all' 
                    ? coaches 
                    : coaches.filter(coach => coach.specialty === filter);
                
                renderCoaches(filteredCoaches);
            });
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredCoaches = coaches.filter(coach => 
                coach.name.toLowerCase().includes(searchTerm) ||
                coach.specialty.toLowerCase().includes(searchTerm)
            );
            renderCoaches(filteredCoaches);
        });

        // Specialty filter functionality
        document.getElementById('specialtyFilter').addEventListener('change', (e) => {
            const specialty = e.target.value;
            const filteredCoaches = specialty === 'all' 
                ? coaches 
                : coaches.filter(coach => coach.specialty === specialty);
            renderCoaches(filteredCoaches);
        });

        // Modal functionality
        function openBookingModal(coachId) {
            const modal = document.getElementById('booking-modal');
            modal.style.display = 'flex';
        }

        document.querySelector('.close-modal').addEventListener('click', () => {
            document.getElementById('booking-modal').style.display = 'none';
        });

        document.getElementById('bookingForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Booking submitted successfully!');
            document.getElementById('booking-modal').style.display = 'none';
        });

        // Initial render
        renderCoaches();
    
