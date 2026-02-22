const API_BASE = '/api';

// --- State Variables for Editing ---
let editUserId = null;
let editCategoryId = null;
let editPriorityId = null;
let editTaskId = null;

document.addEventListener('DOMContentLoaded', () => {
    loadAllData();
});

function loadAllData() {
    fetchUsers();
    fetchCategories();
    fetchPriorities();
    fetchTasks();
}

// --- Navigation Logic ---
function showSection(sectionId) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(sectionId).classList.remove('hidden');
    event.currentTarget.classList.add('active');
}

// ================= USERS API =================
function fetchUsers() {
    fetch(`${API_BASE}/users`).then(res => res.json()).then(data => {
        const tbody = document.getElementById('userTableBody');
        const select = document.getElementById('taskUser');
        tbody.innerHTML = ''; select.innerHTML = '<option value="">Select User</option>';

        data.forEach(user => {
            tbody.innerHTML += `<tr>
                <td>${user.id}</td><td>${user.name}</td><td>${user.email}</td>
                <td>
                    <button class="btn edit" onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Edit</button>
                    <button class="btn danger" onclick="deleteUser(${user.id})">Delete</button>
                </td></tr>`;
            select.innerHTML += `<option value="${user.id}">${user.name}</option>`;
        });
    });
}

function editUser(id, name, email) {
    editUserId = id;
    document.getElementById('userName').value = name;
    document.getElementById('userEmail').value = email;
    document.querySelector('#userForm button[type="submit"]').textContent = 'Update User';
    document.getElementById('userName').focus();
}

function saveUser(e) {
    e.preventDefault();
    const payload = { name: document.getElementById('userName').value, email: document.getElementById('userEmail').value };
    const method = editUserId ? 'PUT' : 'POST';
    const url = editUserId ? `${API_BASE}/users/${editUserId}` : `${API_BASE}/users`;

    fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(() => {
            document.getElementById('userForm').reset();
            document.querySelector('#userForm button[type="submit"]').textContent = 'Add User';
            editUserId = null;
            fetchUsers();
        });
}

function deleteUser(id) {
    if(confirm('Delete user?')) fetch(`${API_BASE}/users/${id}`, { method: 'DELETE' }).then(() => fetchUsers());
}

// ================= CATEGORIES API =================
function fetchCategories() {
    fetch(`${API_BASE}/categories`).then(res => res.json()).then(data => {
        const tbody = document.getElementById('categoryTableBody');
        const select = document.getElementById('taskCategory');
        tbody.innerHTML = ''; select.innerHTML = '<option value="">Select Category</option>';

        data.forEach(cat => {
            tbody.innerHTML += `<tr>
                <td>${cat.id}</td><td>${cat.name}</td>
                <td>
                    <button class="btn edit" onclick="editCategory(${cat.id}, '${cat.name}')">Edit</button>
                    <button class="btn danger" onclick="deleteCategory(${cat.id})">Delete</button>
                </td></tr>`;
            select.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
        });
    });
}

function editCategory(id, name) {
    editCategoryId = id;
    document.getElementById('categoryName').value = name;
    document.querySelector('#categoryForm button[type="submit"]').textContent = 'Update Category';
    document.getElementById('categoryName').focus();
}

function saveCategory(e) {
    e.preventDefault();
    const payload = { name: document.getElementById('categoryName').value };
    const method = editCategoryId ? 'PUT' : 'POST';
    const url = editCategoryId ? `${API_BASE}/categories/${editCategoryId}` : `${API_BASE}/categories`;

    fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(() => {
            document.getElementById('categoryForm').reset();
            document.querySelector('#categoryForm button[type="submit"]').textContent = 'Add Category';
            editCategoryId = null;
            fetchCategories();
        });
}

function deleteCategory(id) {
    if(confirm('Delete category?')) fetch(`${API_BASE}/categories/${id}`, { method: 'DELETE' }).then(() => fetchCategories());
}

// ================= PRIORITIES API =================
function fetchPriorities() {
    fetch(`${API_BASE}/priorities`).then(res => res.json()).then(data => {
        const tbody = document.getElementById('priorityTableBody');
        const select = document.getElementById('taskPriority');
        tbody.innerHTML = ''; select.innerHTML = '<option value="">Select Priority</option>';

        data.forEach(pri => {
            tbody.innerHTML += `<tr>
                <td>${pri.id}</td><td>${pri.level}</td>
                <td>
                    <button class="btn edit" onclick="editPriority(${pri.id}, '${pri.level}')">Edit</button>
                    <button class="btn danger" onclick="deletePriority(${pri.id})">Delete</button>
                </td></tr>`;
            select.innerHTML += `<option value="${pri.id}">${pri.level}</option>`;
        });
    });
}

function editPriority(id, level) {
    editPriorityId = id;
    document.getElementById('priorityLevel').value = level;
    document.querySelector('#priorityForm button[type="submit"]').textContent = 'Update Priority';
    document.getElementById('priorityLevel').focus();
}

function savePriority(e) {
    e.preventDefault();
    const payload = { level: document.getElementById('priorityLevel').value };
    const method = editPriorityId ? 'PUT' : 'POST';
    const url = editPriorityId ? `${API_BASE}/priorities/${editPriorityId}` : `${API_BASE}/priorities`;

    fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(() => {
            document.getElementById('priorityForm').reset();
            document.querySelector('#priorityForm button[type="submit"]').textContent = 'Add Priority';
            editPriorityId = null;
            fetchPriorities();
        });
}

function deletePriority(id) {
    if(confirm('Delete priority?')) fetch(`${API_BASE}/priorities/${id}`, { method: 'DELETE' }).then(() => fetchPriorities());
}

// ================= TASKS API =================
function fetchTasks() {
    fetch(`${API_BASE}/tasks`).then(res => res.json()).then(data => {
        const tbody = document.getElementById('taskTableBody');
        tbody.innerHTML = '';

        const statusList = ['PENDING', 'IN_PROGRESS', 'DONE'];

        data.forEach(task => {
            // Build the live status dropdown
            let statusSelect = `<select onchange="updateTaskStatus(${task.id}, this.value)" class="status-select">`;
            statusList.forEach(opt => {
                statusSelect += `<option value="${opt}" ${task.status === opt ? 'selected' : ''}>${opt.replace('_', ' ')}</option>`;
            });
            statusSelect += `</select>`;

            tbody.innerHTML += `<tr>
                <td><strong>${task.title}</strong><br><small style="color:var(--text-muted)">${task.description}</small></td>
                <td>${statusSelect}</td>
                <td>${task.user ? task.user.name : 'Unassigned'}</td>
                <td>${task.category ? task.category.name : 'N/A'}</td>
                <td>${task.priority ? task.priority.level : 'N/A'}</td>
                <td>
                    <button class="btn edit" onclick="editTask(${task.id}, '${task.title}', '${task.description}', ${task.user?.id}, ${task.category?.id}, ${task.priority?.id})">Edit</button>
                    <button class="btn danger" onclick="deleteTask(${task.id})">Delete</button>
                </td>
            </tr>`;
        });
    });
}

function editTask(id, title, desc, userId, categoryId, priorityId) {
    editTaskId = id;
    document.getElementById('taskTitle').value = title;
    document.getElementById('taskDesc').value = desc;
    if(userId) document.getElementById('taskUser').value = userId;
    if(categoryId) document.getElementById('taskCategory').value = categoryId;
    if(priorityId) document.getElementById('taskPriority').value = priorityId;

    document.querySelector('#taskForm button[type="submit"]').textContent = 'Update Task';
    document.getElementById('taskTitle').focus();
}

function saveTask(e) {
    e.preventDefault();
    const payload = {
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDesc').value,
        userId: document.getElementById('taskUser').value,
        categoryId: document.getElementById('taskCategory').value,
        priorityId: document.getElementById('taskPriority').value
    };

    const method = editTaskId ? 'PUT' : 'POST';
    const url = editTaskId ? `${API_BASE}/tasks/${editTaskId}` : `${API_BASE}/tasks`;

    fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(() => {
            document.getElementById('taskForm').reset();
            document.querySelector('#taskForm button[type="submit"]').textContent = 'Create Task';
            editTaskId = null;
            fetchTasks();
        });
}

// Special PUT function exclusively for changing the status enum via @RequestParam
function updateTaskStatus(id, newStatus) {
    // Calling the /{id}/status?status=... endpoint exactly as mapped in your controller
    fetch(`${API_BASE}/tasks/${id}/status?status=${newStatus}`, { method: 'PUT' })
        .then(() => {
            console.log(`Task ${id} status updated to ${newStatus}`);
        })
        .catch(err => alert("Failed to update status"));
}

function deleteTask(id) {
    if(confirm('Delete task?')) fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' }).then(() => fetchTasks());
}