/**
 * Once the page loads, create the notches for each bar (day of year, etc.),
 * then update them every second.
 */
document.addEventListener("DOMContentLoaded", () => {
    buildMonthOfYearNotches();
    updateProgress();
    setInterval(updateProgress, 1000);
});

let monthOfYearNotches = [];

function buildMonthOfYearNotches() {
    // 12 notches total
    const container = document.getElementById("monthOfYearSegments");
    container.innerHTML = "";
    monthOfYearNotches = createSegments(container, 12);
}

function createSegments(container, count) {
    const segmentFills = [];
    for (let i = 0; i < count; i++) {
        const seg = document.createElement("div");
        seg.classList.add("segment");

        const fill = document.createElement("div");
        fill.classList.add("segment-fill");

        seg.appendChild(fill);
        container.appendChild(seg);
        segmentFills.push(fill);
    }
    return segmentFills;
}

function updateProgress() {
    const now = new Date();
    // Calculate year progress percentage
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const yearProgress = ((now - startOfYear) / (1000 * 60 * 60 * 24)) / (isLeapYear(now.getFullYear()) ? 366 : 365);
    
    // Use the same yearProgress for both the segments and the percentage display
    fillSegments(monthOfYearNotches, yearProgress * 12); // Scale to 12 months
    
    // Display year progress percentage
    document.getElementById("monthOfYearValue").textContent = (yearProgress * 100).toFixed(2);
}

function fillSegments(segmentFills, unitsCompleted) {
    const total = segmentFills.length;
    if (unitsCompleted < 0) unitsCompleted = 0;
    if (unitsCompleted > total) unitsCompleted = total;

    const fullUnits = Math.floor(unitsCompleted);
    const remainder = unitsCompleted - fullUnits; // 0..1

    for (let i = 0; i < total; i++) {
        if (i < fullUnits) {
            // fully fill
            segmentFills[i].style.width = "100%";
        } else if (i === fullUnits) {
            // partially fill
            segmentFills[i].style.width = (remainder * 100) + "%";
        } else {
            // empty
            segmentFills[i].style.width = "0%";
        }
    }
}

function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
  