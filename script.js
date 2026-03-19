// --- Cinema Floor Plan Configuration ---
// Every row is padded with 'gap' so they all equal exactly 23 slots.
// This forces the aisles into perfectly straight vertical columns.

const cinemaLayout = [
    // Row A: Left (6), Aisle, Center (8), Aisle, Right (7)
    ['gap', 'gap', 'A1', 'A2', 'gap', 'A3', 'aisle', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'gap', 'aisle', 'A11', 'A12', 'A13', 'A14', 'gap', 'gap', 'gap'],
    
    // Rows B-K: Pad left with 2 gaps, center with 1 gap, right with 3 gaps
    ['gap', 'gap', 'B1', 'B2', 'B3', 'B4', 'aisle', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'gap', 'aisle', 'B12', 'B13', 'B14', 'B15', 'gap', 'gap', 'gap'],
    ['gap', 'gap', 'C1', 'C2', 'C3', 'C4', 'aisle', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'gap', 'aisle', 'C12', 'C13', 'C14', 'C15', 'gap', 'gap', 'gap'],
    ['gap', 'gap', 'D1', 'D2', 'D3', 'D4', 'aisle', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'gap', 'aisle', 'D12', 'D13', 'D14', 'D15', 'gap', 'gap', 'gap'],
    ['gap', 'gap', 'E1', 'E2', 'E3', 'E4', 'aisle', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'gap', 'aisle', 'E12', 'E13', 'E14', 'E15', 'gap', 'gap', 'gap'],
    ['gap', 'gap', 'F1', 'F2', 'F3', 'F4', 'aisle', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'gap', 'aisle', 'F12', 'F13', 'F14', 'F15', 'gap', 'gap', 'gap'],
    ['gap', 'gap', 'G1', 'G2', 'G3', 'G4', 'aisle', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'gap', 'aisle', 'G12', 'G13', 'G14', 'G15', 'gap', 'gap', 'gap'],
    ['gap', 'gap', 'H1', 'H2', 'H3', 'H4', 'aisle', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'H11', 'gap', 'aisle', 'H12', 'H13', 'H14', 'H15', 'gap', 'gap', 'gap'],
    ['gap', 'gap', 'I1', 'I2', 'I3', 'I4', 'aisle', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10', 'I11', 'gap', 'aisle', 'I12', 'I13', 'I14', 'I15', 'gap', 'gap', 'gap'],
    ['gap', 'gap', 'J1', 'J2', 'J3', 'J4', 'aisle', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10', 'J11', 'gap', 'aisle', 'J12', 'J13', 'J14', 'J15', 'gap', 'gap', 'gap'],
    ['gap', 'gap', 'K1', 'K2', 'K3', 'K4', 'aisle', 'K5', 'K6', 'K7', 'K8', 'K9', 'K10', 'K11', 'gap', 'aisle', 'K12', 'K13', 'K14', 'K15', 'gap', 'gap', 'gap'],
    
    // Row L: Left is full (6), pad center with 1 gap, pad right with 1 gap
    ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'aisle', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12', 'L13', 'gap', 'aisle', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19', 'gap'],
    
    // Row M: Full 23 slots, no padding needed
    ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'aisle', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14', 'aisle', 'M15', 'M16', 'M17', 'M18', 'M19', 'M20', 'M21']
];

const seatGrid = document.getElementById('seating-grid');
const resetBtn = document.getElementById('resetBtn');

let seats = JSON.parse(localStorage.getItem('cityHopeCinemaLayout')) || {};

function saveSeats() {
    localStorage.setItem('cityHopeCinemaLayout', JSON.stringify(seats));
}

function renderSeats() {
    seatGrid.innerHTML = ''; 
    
    cinemaLayout.forEach(rowArr => {
        const rowEl = document.createElement('div');
        rowEl.classList.add('row');

        rowArr.forEach(seatId => {
            if (seatId === 'aisle') {
                const aisle = document.createElement('div');
                aisle.classList.add('aisle');
                rowEl.appendChild(aisle);
            } else if (seatId === 'gap') {
                const gap = document.createElement('div');
                gap.classList.add('hidden-seat');
                rowEl.appendChild(gap);
            } else {
                if (seats[seatId] === undefined) {
                    seats[seatId] = 0;
                }

                const seatEl = document.createElement('div');
                seatEl.classList.add('seat');
                seatEl.textContent = seatId;

                const state = seats[seatId];
                if (state === 1) seatEl.classList.add('assigned');
                if (state === 2) seatEl.classList.add('occupied');
                if (state === 3) seatEl.classList.add('damaged');

                seatEl.addEventListener('click', () => {
                    seats[seatId] = (seats[seatId] + 1) % 4;
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
    for (let key in seats) {
        if (seats[key] !== 3) {
            seats[key] = 0;
        }
    }
    saveSeats();
    renderSeats();
    confirmModal.classList.remove('active');
});

// Initial render
renderSeats();