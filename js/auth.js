// REGISTER
function register() {
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;

  if (!username || !password) {
    showPopup("Please fill all fields", "error");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.find(user => user.username === username);

  if (userExists) {
    showPopup("User already exists", "error");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  showPopup("Registration successful! Redirecting...", "success");

  setTimeout(() => {
    window.location.href = "index.html"; // redirect to login
  }, 1500);
}

// LOGIN
function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const validUser = users.find(user =>
    user.username === username && user.password === password
  );

  if (!validUser) {
    showPopup("Invalid credentials", "error");
    return;
  }

  localStorage.setItem("currentUser", username);

  showPopup("Login successful! Redirecting...", "success");

  setTimeout(() => {
    window.location.href = "dashboard.html"; // redirect to dashboard
  }, 1500);
}

// 🔥 Custom popup function
function showPopup(message, type) {
  let popup = document.createElement("div");
  popup.className = `popup ${type}`;
  popup.textContent = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 2000);
}