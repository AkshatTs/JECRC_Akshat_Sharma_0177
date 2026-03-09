const API = "http://localhost:5034/api/Todo";

async function loadTasks(){

const response = await fetch(API);

const tasks = await response.json();

renderTasks(tasks);

}

function renderTasks(tasks){

const list = document.getElementById("taskList");

list.innerHTML="";

tasks.forEach(task => {

const li = document.createElement("li");

const checkbox = document.createElement("input");

checkbox.type="checkbox";

checkbox.checked=task.isCompleted;

checkbox.onchange=()=>updateTask(task.id,task.title,checkbox.checked,task.priority);

const text=document.createElement("span");

text.textContent = task.title + " ("+task.priority+")";

if(task.isCompleted){

text.classList.add("completed");

}

const editBtn=document.createElement("button");

editBtn.textContent="Edit";

editBtn.classList.add("edit-btn");

editBtn.onclick=()=>{

const newTitle=prompt("Edit task",task.title);

if(newTitle){

updateTask(task.id,newTitle,task.isCompleted,task.priority);

}

};

const delBtn=document.createElement("button");

delBtn.textContent="Delete";

delBtn.classList.add("delete-btn");

delBtn.onclick=()=>deleteTask(task.id);

li.appendChild(checkbox);

li.appendChild(text);

li.appendChild(editBtn);

li.appendChild(delBtn);

list.appendChild(li);

});

}

async function addTask(){

const title=document.getElementById("taskInput").value;

const priority=document.getElementById("priority").value;

await fetch(API,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

title:title,

isCompleted:false,

priority:priority

})

});

document.getElementById("taskInput").value="";

loadTasks();

}

async function updateTask(id,title,isCompleted,priority){

await fetch(`${API}/${id}`,{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

id:id,

title:title,

isCompleted:isCompleted,

priority:priority

})

});

loadTasks();

}

async function deleteTask(id){

await fetch(`${API}/${id}`,{

method:"DELETE"

});

loadTasks();

}

async function searchTasks(){

const query=document.getElementById("searchBox").value;

if(query===""){

loadTasks();

return;

}

const response=await fetch(`${API}/search?query=${query}`);

const tasks=await response.json();

renderTasks(tasks);

}

async function loadActive(){

const response=await fetch(`${API}/active`);

const tasks=await response.json();

renderTasks(tasks);

}

async function loadCompleted(){

const response=await fetch(`${API}/completed`);

const tasks=await response.json();

renderTasks(tasks);

}

function toggleDarkMode(){

document.body.classList.toggle("dark-mode");

}

loadTasks();