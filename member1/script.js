const storageKey = "meetMyFacultyUsers";

const form = document.getElementById("registrationForm");
const message = document.getElementById("message");
const userTableBody = document.getElementById("userTableBody");
const searchInput = document.getElementById("searchInput");
const clearDataButton = document.getElementById("clearDataButton");

function getUsers() {
  return JSON.parse(localStorage.getItem(storageKey)) || [];
}

function saveUsers(users) {
  localStorage.setItem(storageKey, JSON.stringify(users));
}

function escapeHtml(value) {
  const text = String(value);
  return text.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;"
  }[character]));
}

function statusClass(status) {
  return status.toLowerCase().replace(" ", "-");
}

function renderUsers() {
  const searchText = searchInput.value.trim().toLowerCase();
  const users = getUsers().filter((user) =>
    user.name.toLowerCase().includes(searchText) || user.email.toLowerCase().includes(searchText)
  );

  if (users.length === 0) {
    userTableBody.innerHTML = '<tr><td class="empty" colspan="5">No registered users found.</td></tr>';
    return;
  }

  userTableBody.innerHTML = users.map((user) => `
    <tr>
      <td><strong>${escapeHtml(user.name)}</strong><br><small>${escapeHtml(user.email)}</small></td>
      <td>${escapeHtml(user.role)}</td>
      <td>${escapeHtml(user.department)}</td>
      <td><span class="status ${statusClass(user.status)}">${escapeHtml(user.status)}</span></td>
      <td>${getActionButtons(user)}</td>
    </tr>
  `).join("");
}

function getActionButtons(user) {
  if (user.status === "Pending") {
    return `
      <button class="small approve" onclick="changeStatus('${user.id}', 'Approved')">Approve</button>
      <button class="small reject" onclick="changeStatus('${user.id}', 'Rejected')">Reject</button>
    `;
  }
  if (user.status === "Approved") {
    return `<button class="small reject" onclick="changeStatus('${user.id}', 'Inactive')">Deactivate</button>`;
  }
  return `<button class="small approve" onclick="changeStatus('${user.id}', 'Approved')">Reactivate</button>`;
}

function changeStatus(id, newStatus) {
  const users = getUsers();
  const user = users.find((item) => item.id === id);
  if (!user) return;

  user.status = newStatus;
  saveUsers(users);
  renderUsers();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const users = getUsers();

  if (users.some((user) => user.email === email)) {
    message.textContent = "An account with this email already exists.";
    message.style.color = "#b42318";
    return;
  }

  const user = {
    id: String(Date.now()),
    name: document.getElementById("fullName").value.trim(),
    email,
    role: document.getElementById("role").value,
    department: document.getElementById("department").value.trim(),
    identity: document.getElementById("identity").value.trim(),
    password: document.getElementById("password").value,
    status: "Pending"
  };

  users.push(user);
  saveUsers(users);
  form.reset();
  message.textContent = "Registration successful. Your account is waiting for admin approval.";
  message.style.color = "#14804a";
  renderUsers();
});

searchInput.addEventListener("input", renderUsers);

clearDataButton.addEventListener("click", () => {
  if (confirm("Remove all demo accounts?")) {
    localStorage.removeItem(storageKey);
    message.textContent = "Demo data has been cleared.";
    renderUsers();
  }
});

renderUsers();
