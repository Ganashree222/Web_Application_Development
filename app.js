
// 1. Reusable Toast Notification Function
function showToast(message) {
    const toast = document.getElementById("toast");

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
