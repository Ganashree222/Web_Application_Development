
// 1. Reusable Toast Notification Function
function showToast(message) {
    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}


// 2. Smooth Scrolling to Booking Form
document.querySelectorAll(".book-button").forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        const bookingForm = document.getElementById("booking");

        if (bookingForm) {
            bookingForm.scrollIntoView({
                behavior: "smooth"
            });

            showToast("Let's book your IPL tickets!");
        } else {
            showToast("Booking section not found!");
        }
    });
});


// 3. Select Booking Form Elements Using DOM Selectors
const matchSelect = document.getElementById("match");
const standSelect = document.querySelector("#stand");
const ticketInput = document.getElementById("tickets");

const summaryMatch = document.getElementById("summaryMatch");
const summaryStand = document.getElementById("summaryStand");
const summaryTickets = document.getElementById("summaryTickets");
const summaryTotal = document.getElementById("summaryTotal");
const summaryMessage = document.getElementById("summaryMessage");


// 4. Function to Update Booking Summary
function updateBookingSummary() {

    const selectedMatch = matchSelect.value;
    const selectedStand = standSelect.value;
    const quantity = Number(ticketInput.value);

    const selectedOption = standSelect.options[standSelect.selectedIndex];

    const price = Number(selectedOption.dataset.price) || 0;

    // Update selected details
    summaryMatch.textContent = selectedMatch || "Not selected";

    summaryStand.textContent = selectedStand || "Not selected";

    summaryTickets.textContent = quantity;

    // Calculate total price
    const total = price * quantity;

    if (selectedMatch && selectedStand && quantity >= 1 && quantity <= 10) {

        summaryTotal.textContent = "₹" + total.toLocaleString("en-IN");

        summaryMessage.textContent = "Your ticket selection is ready!";

    } else {

        summaryTotal.textContent = "₹0";

        summaryMessage.textContent = "Select your match and stand to see your summary.";
    }
}


// 5. Add Change Event Listeners
matchSelect.addEventListener("change", function () {
    updateBookingSummary();
    showToast("Match selection updated!");
});

standSelect.addEventListener("change", function () {
    updateBookingSummary();
    showToast("Stand category updated!");
});

ticketInput.addEventListener("change", function () {
    updateBookingSummary();
    showToast("Ticket quantity updated!");
});


// 6. Display Initial Booking Summary
updateBookingSummary();


// 7. Prevent Page Reload on Form Submission
document.getElementById("bookingForm").addEventListener("submit", function (event) {
    event.preventDefault();

    updateBookingSummary();

    if (
        !matchSelect.value ||
        !standSelect.value ||
        ticketInput.value < 1 ||
        ticketInput.value > 10
    ) {
        showToast("Please select valid booking details!");
        return;
    }

    showToast("Booking summary confirmed!");
});


/* Responsive Hamburger Menu */

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });
    }
});


/* ACTIVITY - TEAM FILTER AND GRID/LIST VIEW */

document.addEventListener("DOMContentLoaded", function () {

    const teamFilter = document.getElementById("teamFilter");
    const matchGrid = document.getElementById("matchGrid");
    const gridButton = document.getElementById("gridView");
    const listButton = document.getElementById("listView");

    if (!teamFilter || !matchGrid || !gridButton || !listButton) {
        return;
    }

    const matchCards = matchGrid.querySelectorAll(".match-card");

    // 1. Filter matches by team
    teamFilter.addEventListener("change", function () {

        const selectedTeam = teamFilter.value;

        matchCards.forEach(function (card) {

            const teams = card.dataset.team.split(" ");

            if (selectedTeam === "all" || teams.includes(selectedTeam)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

        if (typeof showToast === "function") {
            showToast(
                selectedTeam === "all"
                    ? "Showing all matches!"
                    : "Showing " + selectedTeam + " matches!"
            );
        }
    });

    // 2. Switch to Grid View
    gridButton.addEventListener("click", function () {

        matchGrid.classList.remove("list-view");

        gridButton.classList.add("active");
        listButton.classList.remove("active");

        showToast("Grid view activated!");
    });

    // 3. Switch to List View
    listButton.addEventListener("click", function () {

        matchGrid.classList.add("list-view");

        listButton.classList.add("active");
        gridButton.classList.remove("active");

        showToast("List view activated!");
    });

    // Default view
    gridButton.classList.add("active");

});
