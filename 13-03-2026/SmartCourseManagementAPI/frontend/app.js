const API="http://localhost:5181/api"

function token(){
return localStorage.getItem("token")
}

/* LOGIN */

async function login(){

const data={
email:document.getElementById("loginEmail").value,
password:document.getElementById("loginPassword").value
}

const res=await fetch(API+"/auth/login",{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify(data)
})

const result=await res.json()

localStorage.setItem("token",result.token)
localStorage.setItem("role",result.role)

if(result.role==="Admin")
window.location="admin.html"
else
window.location="student.html"
}

/* REGISTER */

async function register(){

const data={
name:document.getElementById("name").value,
email:document.getElementById("email").value,
phone:document.getElementById("phone").value,
password:document.getElementById("password").value
}

await fetch(API+"/auth/register",{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify(data)
})

alert("Registered successfully")
}

/* LOAD COURSES */

async function loadCourses(){

const res=await fetch(API+"/course")
const courses=await res.json()

renderCourses(courses,true)
}

/* SEARCH */

async function searchCourses(){

const keyword=document.getElementById("search").value

const res=await fetch(API+`/course/search?keyword=${keyword}`)
const courses=await res.json()

renderCourses(courses,true)
}

/* MY COURSES */

async function myCourses(){

const res=await fetch(API+"/enrollment/my-courses",{
headers:{Authorization:"Bearer "+token()}
})

const courses=await res.json()

renderCourses(courses,false)
}

/* RENDER */

function renderCourses(courses,allowEnroll){

const container=document.getElementById("courses")

container.innerHTML=courses.map(c=>`

<div class="course-card">

<h3>${c.course?.courseName || c.courseName}</h3>

<p>Seats: ${c.seatsAvailable ?? ""}</p>

${allowEnroll ?
`<button onclick="enroll(${c.courseId})">Enroll</button>` :
`<button onclick="drop(${c.courseId})">Drop</button>`
}

</div>

`).join("")
}

/* ENROLL */

async function enroll(id){

await fetch(API+"/enrollment/enroll",{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:"Bearer "+token()
},
body:JSON.stringify({courseId:id})
})

alert("Enrolled")
loadCourses()
}

/* DROP */

async function drop(id){

await fetch(API+`/enrollment/drop/${id}`,{
method:"POST",
headers:{Authorization:"Bearer "+token()}
})

alert("Dropped")
myCourses()
}

/* ADMIN */

async function addCourse(){

const data={
courseName:document.getElementById("courseName").value,
departmentId:parseInt(document.getElementById("deptId").value),
credits:parseInt(document.getElementById("credits").value),
totalSeats:parseInt(document.getElementById("seats").value)
}

await fetch(API+"/course",{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:"Bearer "+token()
},
body:JSON.stringify(data)
})

alert("Course added")
}

/* VIEW ENROLLMENTS */

async function viewEnrollments(){

const res=await fetch(API+"/enrollment/all",{
headers:{Authorization:"Bearer "+token()}
})

const data=await res.json()

document.getElementById("courses").innerHTML=data.map(e=>`

<div class="course-card">

<h3>${e.course.courseName}</h3>

<p>Student: ${e.student.name}</p>

<p>Status: ${e.status}</p>

</div>

`).join("")
}

/* LOGOUT */

function logout(){
localStorage.clear()
window.location="index.html"
}