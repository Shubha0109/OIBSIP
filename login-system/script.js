function register() {
    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value.trim();

    if (user === "" || pass === "") {
        showMessage("Please fill all fields!", "red");
        return;
    }

    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);

    showMessage("Registered Successfully! Now login.", "green");

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function login() {
    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value.trim();

    let storedUser = localStorage.getItem("username");
    let storedPass = localStorage.getItem("password");

    if (user === "" || pass === "") {
        showMessage("Please enter login details!", "red");
        return;
    }

    if (user === storedUser && pass === storedPass) {
        showMessage("Welcome " + user + " 🎉", "green");
    } else {
        showMessage("Invalid Username or Password!", "red");
    }
}

// Message styling
function showMessage(msg, color) {
    let message = document.getElementById("message");
    message.innerText = msg;
    message.style.color = color;
}

// Show/Hide Password
function togglePassword() {
    let passField = document.getElementById("password");
    if (passField.type === "password") {
        passField.type = "text";
    } else {
        passField.type = "password";
    }
}
