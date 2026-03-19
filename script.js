// --- Ayala Malls Cinema 2 Layout ---
// 'aisle' creates a walkway.
// 'gap' creates an invisible seat to force the columns to align perfectly.
// Row A is the back of the cinema (top of the image), Row M is the front (near stage).

const cinemaLayout = [
    // Rows A & B (Back rows, extending fully to the left)
    ['A1','A2','A3','A4','A5','A6', 'aisle', 'A7','A8','A9','A10','A11','A12','A13','A14', 'aisle', 'A15','A16','A17','A18','A19','A20'],
    ['B1','B2','B3','B4','B5','B6', 'aisle', 'B7','B8','B9','B10','B11','B12','B13','B14', 'aisle', 'B15','B16','B17','B18','B19','B20'],
    
    // Rows C through K (Left section indents by 2 seats)
    ['gap','gap','C1','C2','C3','C4', 'aisle', 'C5','C6','C7','C8','C9','C10','C11','C12', 'aisle', 'C13','C14','C15','C16','C17','C18'],
    ['gap','gap','D1','D2','D3','D4', 'aisle', 'D5','D6','D7','D8','D9','D10','D11','D12', 'aisle', 'D13','D14','D15','D16','D17','D18'],
    ['gap','gap','E1','E2','E3','E4', 'aisle', 'E5','E6','E7','E8','E9','E10','E11','E12', 'aisle', 'E13','E14','E15','E16','E17','E18'],
    ['gap','gap','F1','F2','F3','F4', 'aisle', 'F5','F6','F7','F8','F9','F10','F11','F12', 'aisle', 'F13','F14','F15','F16','F17','F18'],
    ['gap','gap','G1','G2','G3','G4', 'aisle', 'G5','G6','G7','G8','G9','G10','G11','G12', 'aisle', 'G13','G14','G15','G16','G17','G18'],
    ['gap','gap','H1','H2','H3','H4', 'aisle', 'H5','H6','H7','H8','H9','H10','H11','H12', 'aisle', 'H13','H14','H15','H16','H17','H18'],
    ['gap','gap','I1','I2','I3','I4', 'aisle', 'I5','I6','I7','I8','I9','I10','I11','I12', 'aisle', 'I13','I14','I15','I16','I17','I18'],
    ['gap','gap','J1','J2','J3','J4', 'aisle', 'J5','J6','J7','J8','J9','J10','J11','J12', 'aisle', 'J13','J14','J15','J16','J17','J18'],
    ['gap','gap','K1','K2','K3','K4', 'aisle', 'K5','K6','K7','K8','K9','K10','K11','K12', 'aisle', 'K13','K14','K15','K16','K17','K18'],
    
    // Rows L & M (Front rows, right section indents by 2 seats based on the image)
    ['gap','gap','L1','L2','L3','L4', 'aisle', 'L5','L6','L7','L8','L9','L10','L11','L12', 'aisle', 'L13','L14','L15','L16', 'gap','gap'],
    ['gap','gap','M1','M2','M3','M4', 'aisle', 'M5','M6','M7','M8','M9','M10','M11','M12', 'aisle', 'M13','M14','M15','M16', 'gap','gap']
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
                // Renders an invisible seat to keep the grid aligned
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
                if (state === 3) seatEl.classList.add('damaged'); // New damaged state

                seatEl.addEventListener('click', () => {
                    // Cycle: 0 (Vacant) -> 1 (Assigned) -> 2 (Occupied) -> 3 (Damaged) -> 0
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
    // Reset all specific seat IDs to 0, EXCEPT if they are marked damaged (3)
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