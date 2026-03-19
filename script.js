// --- Cinema Floor Plan Configuration ---
// 'null' creates a physical aisle/space.
// Update this array exactly how Ayala Malls Cinema 2 looks!
const cinemaLayout = [
    ['A1', 'A2', 'A3', null, 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', null, 'A11', 'A12', 'A13', 'A14', 'A15'],
    ['B1', 'B2', 'B3', null, 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', null, 'B11', 'B12', 'B13', 'B14', 'B15'],
    ['C1', 'C2', 'C3', null, 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', null, 'C11', 'C12', 'C13', 'C14', 'C15'],
    ['D1', 'D2', 'D3', null, 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', null, 'D11', 'D12', 'D13', 'D14', 'D15'],
    ['E1', 'E2', 'E3', null, 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', null, 'E11', 'E12', 'E13', 'E14', 'E15'],
    ['F1', 'F2', 'F3', null, 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', null, 'F11', 'F12', 'F13', 'F14', 'F15'],
    ['G1', 'G2', 'G3', null, 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', null, 'G11', 'G12', 'G13', 'G14', 'G15'],
    ['H1', 'H2', 'H3', null, 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', null, 'H11', 'H12', 'H13', 'H14', 'H15'],
    ['I1', 'I2', 'I3', null, 'I4', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10', null, 'I11', 'I12', 'I13', 'I14', 'I15'],
    ['J1', 'J2', 'J3', null, 'J4', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10', null, 'J11', 'J12', 'J13', 'J14', 'J15'],
    ['K1', 'K2', 'K3', null, 'K4', 'K5', 'K6', 'K7', 'K8', 'K9', 'K10', null, 'K11', 'K12', 'K13', 'K14', 'K15'],
    ['L1', 'L2', 'L3', null, 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', null, 'L11', 'L12', 'L13', 'L14', 'L15'],
    ['M1', 'M2', 'M3', null, 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', null, 'M11', 'M12', 'M13', 'M14', 'M15'],
    ['N1', 'N2', 'N3', null, 'N4', 'N5', 'N6', 'N7', 'N8', 'N9', 'N10', null, 'N11', 'N12', 'N13', 'N14', 'N15'],
    ['O1', 'O2', 'O3', null, 'O4', 'O5', 'O6', 'O7', 'O8', 'O9', 'O10', null, 'O11', 'O12', 'O13', 'O14', 'O15']
];

const seatGrid = document.getElementById('seating-grid');
const resetBtn = document.getElementById('resetBtn');

// Load saved data as an Object instead of an Array (e.g. { "A1": 0, "B4": 2 })
let seats = JSON.parse(localStorage.getItem('cityHopeCinemaLayout')) || {};

function saveSeats() {
    localStorage.setItem('cityHopeCinemaLayout', JSON.stringify(seats));
}

function renderSeats() {
    seatGrid.innerHTML = ''; 
    
    // Loop through the layout array row by row
    cinemaLayout.forEach(rowArr => {
        const rowEl = document.createElement('div');
        rowEl.classList.add('row');

        // Loop through the seats in the current row
        rowArr.forEach(seatId => {
            if (seatId === null) {
                // If it's a null, render an invisible aisle spacer
                const aisle = document.createElement('div');
                aisle.classList.add('aisle');
                rowEl.appendChild(aisle);
            } else {
                // Set default state to 0 (vacant) if it's the first time loading
                if (seats[seatId] === undefined) {
                    seats[seatId] = 0;
                }

                const seatEl = document.createElement('div');
                seatEl.classList.add('seat');
                seatEl.textContent = seatId;

                const state = seats[seatId];
                if (state === 1) seatEl.classList.add('assigned');
                if (state === 2) seatEl.classList.add('occupied');

                seatEl.addEventListener('click', () => {
                    // Cycle: 0 -> 1 -> 2 -> 0
                    seats[seatId] = (seats[seatId] + 1) % 3;
                    saveSeats();
                    renderSeats(); 
                });

                rowEl.appendChild(seatEl);
            }
        });
        
        seatGrid.appendChild(rowEl);
    });
}

// --- Modal Logic ---
const confirmModal = document.getElementById('confirmModal');
const cancelBtn = document.getElementById('cancelBtn');
const confirmClearBtn = document.getElementById('confirmClearBtn');

resetBtn.addEventListener('click', () => {
    confirmModal.classList.add('active');
});

cancelBtn.addEventListener('click', () => {
    confirmModal.classList.remove('active');
});

confirmClearBtn.addEventListener('click', () => {
    // Reset all specific seat IDs to 0
    for (let key in seats) {
        seats[key] = 0;
    }
    saveSeats();
    renderSeats();
    confirmModal.classList.remove('active');
});

// Initial render
renderSeats();