// API Base URL (change port if needed)
const API_BASE = "http://localhost:5084/api";

// Decode JWT token
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}

// REGISTER USER
async function register() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password,
            role
        })
    });

    if(response.ok){
        alert("User registered successfully");
        window.location.href = "login.html";
    } else {
        alert("Registration failed");
    }
}



// LOGIN USER
async function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    if(!response.ok){
        alert("Invalid login");
        return;
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);

    alert("Login successful");

    window.location.href = "dashboard.html";
}



// LOGOUT
function logout(){

    localStorage.removeItem("token");

    window.location.href = "login.html";
}



// APPLY LEAVE
async function applyLeave(){

    const leaveType = document.getElementById("leaveType").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const reason = document.getElementById("reason").value;

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5084/api/leave/apply", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            leaveType: leaveType,
            startDate: startDate,
            endDate: endDate,
            reason: reason
        })
    });

    if(response.ok){
        alert("Leave applied successfully");
    }else{
        alert("Error applying leave");
    }
}



// LOAD MY LEAVES (Employee)
async function loadLeaves(){

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE}/leave/my-leaves`, {
        headers:{
            "Authorization": "Bearer " + token
        }
    });

    const leaves = await response.json();

    let rows = "";

    leaves.forEach(l => {

        rows += `
        <tr>
            <td>${l.leaveType}</td>
            <td>${l.startDate}</td>
            <td>${l.endDate}</td>
            <td>${l.status}</td>
        </tr>
        `;
    });

    document.getElementById("leaveTable").innerHTML = rows;
}



// LOAD ALL LEAVES (Manager)
async function loadAllLeaves(){

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE}/leave/all`, {
        headers:{
            "Authorization":"Bearer " + token
        }
    });

    const leaves = await response.json();

    let rows = "";

    leaves.forEach(l => {

        rows += `
        <tr>
            <td>${l.employeeId}</td>
            <td>${l.leaveType}</td>
            <td>${l.startDate}</td>
            <td>${l.endDate}</td>
            <td>${l.status}</td>
            <td>
                <button onclick="approveLeave(${l.id})">Approve</button>
                <button onclick="rejectLeave(${l.id})">Reject</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("leaveTable").innerHTML = rows;
}



// APPROVE LEAVE (Manager)
async function approveLeave(id){

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE}/leave/approve/${id}`, {
        method:"PUT",
        headers:{
            "Authorization":"Bearer " + token
        }
    });

    if(response.ok){
        alert("Leave approved");
        loadAllLeaves();
    } else {
        alert("Error approving leave");
    }
}



// REJECT LEAVE (Manager)
async function rejectLeave(id){

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE}/leave/reject/${id}`, {
        method:"PUT",
        headers:{
            "Authorization":"Bearer " + token
        }
    });

    if(response.ok){
        alert("Leave rejected");
        loadAllLeaves();
    } else {
        alert("Error rejecting leave");
    }
}

function loadDashboard(){

    const token = localStorage.getItem("token");

    if(!token){
        window.location.href="login.html";
        return;
    }

    const decoded = parseJwt(token);

    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    const employeeSection = document.getElementById("employeeSection");
    const managerSection = document.getElementById("managerSection");
    const adminSection = document.getElementById("adminSection");

    if(role === "Employee"){
        employeeSection.style.display = "block";
    }

    if(role === "Manager"){
        managerSection.style.display = "block";
    }

    if(role === "Admin"){
        adminSection.style.display = "block";
    }
}

async function loadEmployees(){

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5084/api/admin/employees",{
        headers:{
            "Authorization":"Bearer "+token
        }
    });

    const employees = await response.json();

    let rows="";

    employees.forEach(e=>{

        rows+=`
        <tr>
        <td>${e.id}</td>
        <td>${e.username}</td>
        <td>${e.role}</td>
        <td>
        <button onclick="deleteEmployee(${e.id})">Delete</button>
        </td>
        </tr>
        `;
    });

    document.getElementById("employeeTable").innerHTML=rows;
}


async function deleteEmployee(id){

    const token=localStorage.getItem("token");

    await fetch(`http://localhost:5084/api/admin/delete/${id}`,{
        method:"DELETE",
        headers:{
            "Authorization":"Bearer "+token
        }
    });

    alert("Employee deleted");

    loadEmployees();
}