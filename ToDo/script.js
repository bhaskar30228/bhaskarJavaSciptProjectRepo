console.log("Hello")
const input=document.getElementById("todo-input");
const addButton=document.getElementById("add-button");
const todolist=document.getElementById("todo-list")
addButton.addEventListener("click",function addTask(){
    if(input.value==""){
        alert("Enter the text first")
    }
    else{
        let list=document.createElement("li")
        list.innerHTML=input.value;
        todolist.appendChild(list);
        let span=document.createElement("span")
        span.innerHTML="\u00d7";
        list.appendChild(span)
    }
    input.value=""
    saveData()
})

todolist.addEventListener("click",function(e){
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("completed",)
    }

    else if(e.target.tagName==="SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
},false)

function saveData(){
    localStorage.setItem("data",todolist.innerHTML)
}

function showData(){
    todolist.innerHTML=localStorage.getItem("data")
}

showData()