const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")
const emptyMessage = document.getElementById("empty-message");
const taskCounter = document.getElementById("task-counter");

function AddTask(){
    if(inputBox.value === ''){
        alert("Please write your task");
    }
    else{
        let li = document.createElement("li")
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        AddTask();
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
    updateTaskInfo();
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
    updateTaskInfo();
}
showTask();

function updateTaskInfo() {
    const tasks = listContainer.querySelectorAll("li");
    const remainingTasks = listContainer.querySelectorAll("li:not(.checked)").length;

    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";

    taskCounter.textContent =
        remainingTasks + (remainingTasks === 1 ? " task remaining" : " tasks remaining");
}







