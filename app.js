
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
