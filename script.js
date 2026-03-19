// Adjust this number to match the cinema's actual capacity
const TOTAL_SEATS = 120; 
const seatGrid = document.getElementById('seating-grid');
const resetBtn = document.getElementById('resetBtn');

// Load saved seats from local storage, or create a fresh batch of vacant seats
let seats = JSON.parse(localStorage.getItem('cityHopeSeats')) || Array(TOTAL_SEATS).fill(0);

function saveSeats() {
    localStorage.setItem('cityHopeSeats', JSON.stringify(seats));
}

function renderSeats() {
    seatGrid.innerHTML = ''; // Clear grid before redrawing
    
    seats.forEach((state, index) => {
        const seatEl = document.createElement('div');
        seatEl.classList.add('seat');
        seatEl.textContent = index + 1; // Seat numbering

        // Apply visual classes based on state
        if (state === 1) seatEl.classList.add('assigned');
        if (state === 2) seatEl.classList.add('occupied');

        // Handle tap/click
        seatEl.addEventListener('click', () => {
            // Cycle through states: 0 -> 1 -> 2 -> back to 0
            seats[index] = (seats[index] + 1) % 3;
            saveSeats();
            renderSeats(); // Re-render to show changes
        });

        seatGrid.appendChild(seatEl);
    });
}

// --- NEW: Modal Logic ---
const confirmModal = document.getElementById('confirmModal');
const cancelBtn = document.getElementById('cancelBtn');
const confirmClearBtn = document.getElementById('confirmClearBtn');

// Show the modal when "Clear All" is clicked
resetBtn.addEventListener('click', () => {
    confirmModal.classList.add('active');
});

// Hide the modal if they click "Cancel"
cancelBtn.addEventListener('click', () => {
    confirmModal.classList.remove('active');
});

// Actually clear the seats if they click "Yes, Clear"
confirmClearBtn.addEventListener('click', () => {
    seats = Array(TOTAL_SEATS).fill(0);
    saveSeats();
    renderSeats();
    confirmModal.classList.remove('active'); // Hide modal after clearing
});

// Initial render on page load
renderSeats();