
//Selectors
const todoInput=document.querySelector(".todo-input");
const todoButton=document.querySelector(".todo-button");
const todoList=document.querySelector(".todo-list");
const filterOption=document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event)
{
    event.preventDefault();
   // console.log("hello");
   const todoDiv=document.createElement("div");
   todoDiv.classList.add("todo");
   //Create LI
   const newTodo=document.createElement("li");
   newTodo.innerText=todoInput.value;
   saveLocalTodos(todoInput.value);
   newTodo.classList.add("todo-item");
   newTodo.classList.add("rodo-item");
   todoDiv.appendChild(newTodo);
   //Clear the Input
    todoInput.value="";
   //Create Complete or checked button
   const completedButton=document.createElement("button");
   completedButton.innerHTML='<i class="fas fa-check"></i>';
   completedButton.classList.add("completed-btn");
   todoDiv.appendChild(completedButton);
   //Create Trash button
   const trashButton=document.createElement("button");
   trashButton.innerHTML='<i class="fas fa-trash"></i>';
   trashButton.classList.add("trash-btn");
   todoDiv.appendChild(trashButton);
   //Append to List
   todoList.appendChild(todoDiv);
 
 
   
}
function deleteTodo(event){
    const item=event.target;
    //delete the todo
    if(item.classList[0]==="trash-btn")
    {
        const todo=item.parentElement;
        //Animations
        todo.classList.add("fall");
        //todo.remove();
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function()
        {
            todo.remove();
        })
    }
   
  
    //CHECK MARK
    if(item.classList[0]==="completed-btn")
    {
    const todo=item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
    }

}
function filterTodo(event){
    const todos=todoList.childNodes;
 todos.forEach(function(todo)
 {
     switch(event.target.value)
     {
         case "all":
             todo.style.display="flex";
             break;

         case "completed":
             if(todo.classList.contains('completed'))
             {
                 todo.style.display="flex";
                 
             }  
             else{
                 todo.style.display="none";
             }  
             break;
         case "uncompleted":
             if(!todo.classList.contains('completed'))
             {
                 todo.style.display="flex";
                 
             }  
             else{
                 todo.style.display="none";
             }    
             

     }
 });

}
function saveLocalTodos(todo)
{
    //CHECK IF I ALREADY HAVE THINGS THERE
    let todos;
    if(localStorage.getItem("todos")=== null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    
}
function removeLocalTodos(todo)
 {
    let todos;
    if(localStorage.getItem("todos")===null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex=todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem("todos", JSON.stringify(todos));

 }

function getTodos(){
    
     //CHECK IF I ALREADY HAE=VE THINGS THERE
     let todos;
     if(localStorage.getItem("todos")===null)
     {
         todos=[];
     }
     else{
         todos=JSON.parse(localStorage.getItem("todos"));
     }
todos.forEach(function(todo)
{
    
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo=document.createElement("li");
    newTodo.innerText=todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    
    //Create Complete or checked button
    const completedButton=document.createElement("button");
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);
    //Create Trash button
    const trashButton=document.createElement("button");
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to List
    todoList.appendChild(todoDiv);
});
 }
 


