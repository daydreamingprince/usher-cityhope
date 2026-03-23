const cinemaLayout = [
    ['A1', 'A2', 'gap', 'A3', 'aisle', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'aisle', 'A11', 'A12', 'A13', 'A14'],
    ['B1', 'B2', 'B3', 'B4', 'aisle', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'aisle', 'B12', 'B13', 'B14', 'B15'],
    ['C1', 'C2', 'C3', 'C4', 'aisle', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'aisle', 'C12', 'C13', 'C14', 'C15'],
    ['D1', 'D2', 'D3', 'D4', 'aisle', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'aisle', 'D12', 'D13', 'D14', 'D15'],
    ['E1', 'E2', 'E3', 'E4', 'aisle', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'aisle', 'E12', 'E13', 'E14', 'E15'],
    ['F1', 'F2', 'F3', 'F4', 'aisle', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'aisle', 'F12', 'F13', 'F14', 'F15'],
    ['G1', 'G2', 'G3', 'G4', 'aisle', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'aisle', 'G12', 'G13', 'G14', 'G15'],
    ['H1', 'H2', 'H3', 'H4', 'aisle', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'H11', 'aisle', 'H12', 'H13', 'H14', 'H15'],
    ['I1', 'I2', 'I3', 'I4', 'aisle', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10', 'I11', 'aisle', 'I12', 'I13', 'I14', 'I15'],
    ['J1', 'J2', 'J3', 'J4', 'aisle', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10', 'J11', 'aisle', 'J12', 'J13', 'J14', 'J15'],
    ['K1', 'K2', 'K3', 'K4', 'aisle', 'K5', 'K6', 'K7', 'K8', 'K9', 'K10', 'K11', 'aisle', 'K12', 'K13', 'K14', 'K15'],
    ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'aisle', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12', 'L13', 'aisle', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19'],
    ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'aisle', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14', 'aisle', 'M15', 'M16', 'M17', 'M18', 'M19', 'M20', 'M21']
];

const seatGrid = document.getElementById('seating-grid');
const resetBtn = document.getElementById('resetBtn');

const countVacantEl = document.getElementById('countVacant');
const countOccupiedEl = document.getElementById('countOccupied');

let seats = JSON.parse(localStorage.getItem('cityHopeCinemaLayout')) || {};

let activeSeatId = null; 
const seatActionMenu = document.getElementById('seatActionMenu');
const selectedSeatTitle = document.getElementById('selectedSeatTitle');
const closeActionMenu = document.getElementById('closeActionMenu');
const actionBtns = document.querySelectorAll('.action-btn');

function saveSeats() {
    localStorage.setItem('cityHopeCinemaLayout', JSON.stringify(seats));
}

// --- NEW FIX: Strictly count only valid layout seats ---
function updateCounters() {
    let vacantCount = 0;
    let occupiedCount = 0;

    cinemaLayout.forEach(rowArr => {
        rowArr.forEach(seatId => {
            if (seatId !== 'aisle' && seatId !== 'gap') {
                const state = seats[seatId] !== undefined ? seats[seatId] : 0;
                if (state === 0) vacantCount++;
                if (state === 2) occupiedCount++;
            }
        });
    });

    countVacantEl.textContent = vacantCount;
    countOccupiedEl.textContent = occupiedCount;
}

function renderSeats() {
    seatGrid.innerHTML = ''; 
    
    cinemaLayout.forEach(rowArr => {
        const rowEl = document.createElement('div');
        rowEl.classList.add('row');

        const sections = [];
        let currentSection = [];
        rowArr.forEach(item => {
            if (item === 'aisle') {
                sections.push(currentSection);
                currentSection = [];
            } else {
                currentSection.push(item);
            }
        });
        sections.push(currentSection); 

        const sectionClasses = ['left', 'mid', 'right'];

        sections.forEach((secArr, index) => {
            const secEl = document.createElement('div');
            secEl.classList.add('section', sectionClasses[index]);

            secArr.forEach(seatId => {
                if (seatId === 'gap') {
                    const gap = document.createElement('div');
                    gap.classList.add('hidden-seat');
                    secEl.appendChild(gap);
                } else {
                    if (seats[seatId] === undefined) { seats[seatId] = 0; }

                    const seatEl = document.createElement('div');
                    seatEl.classList.add('seat');
                    seatEl.textContent = seatId;

                    const state = seats[seatId];
                    if (state === 1) seatEl.classList.add('assigned');
                    if (state === 2) seatEl.classList.add('occupied');
                    if (state === 3) seatEl.classList.add('damaged');

                    seatEl.addEventListener('click', () => {
                        activeSeatId = seatId;
                        selectedSeatTitle.textContent = `Seat ${seatId}`;
                        seatActionMenu.classList.add('active');
                    });

                    secEl.appendChild(seatEl);
                }
            });
            rowEl.appendChild(secEl);
        });
        
        seatGrid.appendChild(rowEl);
    });

    updateCounters();
}

// Action Menu Logic
actionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (activeSeatId) {
            const newState = parseInt(e.target.getAttribute('data-state'));
            seats[activeSeatId] = newState;
            saveSeats();
            renderSeats();
            seatActionMenu.classList.remove('active');
            activeSeatId = null;
        }
    });
});

closeActionMenu.addEventListener('click', () => { 
    seatActionMenu.classList.remove('active'); 
    activeSeatId = null;
});

// Clear All Logic
const confirmModal = document.getElementById('confirmModal');
const cancelBtn = document.getElementById('cancelBtn');
const confirmClearBtn = document.getElementById('confirmClearBtn');

resetBtn.addEventListener('click', () => { confirmModal.classList.add('active'); });
cancelBtn.addEventListener('click', () => { confirmModal.classList.remove('active'); });

confirmClearBtn.addEventListener('click', () => {
    // NEW FIX: Only clears valid seats in the current layout, ignoring ghost data
    cinemaLayout.forEach(rowArr => {
        rowArr.forEach(seatId => {
            if (seatId !== 'aisle' && seatId !== 'gap') {
                if (seats[seatId] !== 3) { // Leaves damaged seats untouched
                    seats[seatId] = 0;
                }
            }
        });
    });
    saveSeats();
    renderSeats();
    confirmModal.classList.remove('active');
});

// Close Modals by Clicking the Dark Background
window.addEventListener('click', (e) => {
    if (e.target === confirmModal) { confirmModal.classList.remove('active'); }
    if (e.target === seatActionMenu) {
        seatActionMenu.classList.remove('active');
        activeSeatId = null;
    }
});

// Initial render
renderSeats();