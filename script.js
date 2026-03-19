// Adjust this number to match the cinema's actual capacity
const TOTAL_SEATS = 120; 
const seatGrid = document.getElementById('seating-grid');
const resetBtn = document.getElementById('resetBtn');

// State legend: 0 = Vacant, 1 = Assigned, 2 = Occupied
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

// Reset button logic with a safety confirmation
resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all seating assignments for the next service?')) {
        seats = Array(TOTAL_SEATS).fill(0);
        saveSeats();
        renderSeats();
    }
});

// Initial render on page load
renderSeats();