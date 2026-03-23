const cinemaLayout = [
    ['A14', 'A13', 'gap', 'A12', 'aisle', 'A11', 'A10', 'A9', 'A8', 'A7', 'A6', 'A5', 'aisle', 'A4', 'A3', 'A2', 'A1'],
    ['B15', 'B14', 'B13', 'B12', 'aisle', 'B11', 'B10', 'B9', 'B8', 'B7', 'B6', 'B5', 'aisle', 'B4', 'B3', 'B2', 'B1'],
    ['C15', 'C14', 'C13', 'C12', 'aisle', 'C11', 'C10', 'C9', 'C8', 'C7', 'C6', 'C5', 'aisle', 'C4', 'C3', 'C2', 'C1'],
    ['D15', 'D14', 'D13', 'D12', 'aisle', 'D11', 'D10', 'D9', 'D8', 'D7', 'D6', 'D5', 'aisle', 'D4', 'D3', 'D2', 'D1'],
    ['E15', 'E14', 'E13', 'E12', 'aisle', 'E11', 'E10', 'E9', 'E8', 'E7', 'E6', 'E5', 'aisle', 'E4', 'E3', 'E2', 'E1'],
    ['F15', 'F14', 'F13', 'F12', 'aisle', 'F11', 'F10', 'F9', 'F8', 'F7', 'F6', 'F5', 'aisle', 'F4', 'F3', 'F2', 'F1'],
    ['G15', 'G14', 'G13', 'G12', 'aisle', 'G11', 'G10', 'G9', 'G8', 'G7', 'G6', 'G5', 'aisle', 'G4', 'G3', 'G2', 'G1'],
    ['H15', 'H14', 'H13', 'H12', 'aisle', 'H11', 'H10', 'H9', 'H8', 'H7', 'H6', 'H5', 'aisle', 'H4', 'H3', 'H2', 'H1'],
    ['I15', 'I14', 'I13', 'I12', 'aisle', 'I11', 'I10', 'I9', 'I8', 'I7', 'I6', 'I5', 'aisle', 'I4', 'I3', 'I2', 'I1'],
    ['J15', 'J14', 'J13', 'J12', 'aisle', 'J11', 'J10', 'J9', 'J8', 'J7', 'J6', 'J5', 'aisle', 'J4', 'J3', 'J2', 'J1'],
    ['K15', 'K14', 'K13', 'K12', 'aisle', 'K11', 'K10', 'K9', 'K8', 'K7', 'K6', 'K5', 'aisle', 'K4', 'K3', 'K2', 'K1'],
    ['L19', 'L18', 'L17', 'L16', 'L15', 'L14', 'aisle', 'L13', 'L12', 'L11', 'L10', 'L9', 'L8', 'L7', 'aisle', 'L6', 'L5', 'L4', 'L3', 'L2', 'L1'],
    ['M21', 'M20', 'M19', 'M18', 'M17', 'M16', 'aisle', 'M15', 'M14', 'M13', 'M12', 'M11', 'M10', 'M9', 'M8', 'aisle', 'M7', 'M6', 'M5', 'M4', 'M3', 'M2', 'M1']
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