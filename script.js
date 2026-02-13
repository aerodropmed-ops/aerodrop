const form = document.getElementById("orderForm");
const statusBox = document.getElementById("statusBox");
const statusText = document.getElementById("statusText");
const receivedBtn = document.getElementById("receivedBtn");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    localStorage.setItem("floor", floor.value);
    localStorage.setItem("room", room.value);
    localStorage.setItem("patient", patient.value);
    localStorage.setItem("medicine", medicine.value);
    localStorage.setItem("emergency", emergency.checked);
    localStorage.setItem("orderStatus", "placed");

    form.style.display = "none";
    statusBox.style.display = "block";
    statusText.innerText = "⏳ Order placed. Waiting for pharmacy...";
});
function placeOrder() {
    const patientName = document.getElementById("patientName").value;
    const medicine = document.getElementById("medicine").value;

    if (patientName === "" || medicine === "") {
        alert("Please fill all fields");
        return;
    }

    const ordersRef = ref(window.database, "orders");

    push(ordersRef, {
        patientName: patientName,
        medicine: medicine,
        status: "Pending"
    });

    alert("Order Placed Successfully!");
}

// Check status every second
setInterval(() => {
    let status = localStorage.getItem("orderStatus");

    if (status === "processing") {
        statusText.innerText = "⚙️ Order accepted. Drone preparing...";
    }
    if (status === "delivering") {
        statusText.innerText = "🚁 Delivery in process...";
        receivedBtn.style.display = "block";
    }
    if (status === "completed") {
        statusText.innerText = "✅ Order completed. Thank you!";
        receivedBtn.style.display = "none";
    }
}, 1000);

// Patient confirms delivery
receivedBtn.addEventListener("click", () => {
    localStorage.setItem("orderStatus", "completed");
});

