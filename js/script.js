var users = [
  { name: "aya", isStudent: true, id: 1 },
  { name: "ali", isStudent: false, id: 2 },
  { name: "ahmed", isStudent: false, id: 3 },
  { name: "ali", isStudent: true, id: 4 },
];

////////////////////////////////////////for of

// for(var person of x){
//  console.log(person.isStudent)
// }

// for(var user of users){
//  console.log(user.isStudent)
// }

///////////////////////////////////////filter

// var filteredUsers = users.filter(function(user){
//     return user.isStudent==true
// })

// console.log(filteredUsers)

///////////////////////////////////findindex

// var findIndex = users.findIndex(function(user){
//     return user.id==3
// })
// console.log(findIndex)

// var findIndex = users.findIndex(function(user){
//     return user.id==1000
// })
// console.log(findIndex)

//ternary operator


///////////////////////////////////////////////////////start workshop/////////////////////////////////////////

//--------------------------select elements-----------------------------------------------------------

var taskInputfield = document.getElementById("taskInput");
console.log(taskInputfield);
var todoAddBtn = document.getElementById("addBtn");
var mySelect =document.getElementById('mySelect');
var searchInput = document.getElementById('searchInput');

console.log(todoAddBtn);
var allTodos = [];
todoAddBtn.onclick = addTodo;

if (localStorage.getItem("allTodos") != null) {
allTodos= JSON.parse(localStorage.getItem("allTodos"))
display(allTodos)
}

function print() {
  console.log("kkk");
}

function addTodo() {
  var task = {
    taskDetails: taskInputfield.value,
    isCompleted: false,
    id: `${Math.random() * 10000}-${Math.random() * 10000}`,
  };

  allTodos.push(task);
  localStorage.setItem('allTodos',JSON.stringify(allTodos))
  console.log(allTodos);
  display(allTodos);
  clear()
}

function display(arr) {
  var cartoona = ``;
  for (var task of arr) {
    cartoona += `<div class="tasks my-3 rounded text-light d-flex justify-content-between px-3 py-2 align-items-center ${
      task.isCompleted == true ? 'bg-task':''}">
 <div class="task d-flex">
     <i class="fa-regular fa-circle-check" onclick="beCompleted('${
       task.id
     }')"></i>
     <p class="task-text m-0 p-0 align-self-center ${
       task.isCompleted == true ? "completed" : " "
     }">${task.taskDetails}</p>
 </div>
 <div>
     <i class="fa-solid fa-trash mx-2" onclick="deletedTodo('${
       task.id
     }')"></i>
 </div> 
 </div>
 `;
  }
  document.getElementById("tasks").innerHTML = cartoona;
}

function beCompleted(id) {
  console.log(id);
  var foundedIndex = allTodos.findIndex(function (task) {
    return task.id == id;
  });
  console.log(foundedIndex);
  allTodos[foundedIndex].isCompleted=allTodos[foundedIndex].isCompleted == true ? false:true;
  localStorage.setItem("allTodos",JSON.stringify(allTodos))
  displayAccordingSelectValue()
}

mySelect.onchange =function(){
    // console.log(mySelect.options[0].value)
    console.log(mySelect.options[mySelect.options.selectedIndex].value)
    displayAccordingSelectValue()
}

function displayAccordingSelectValue(){
  switch(mySelect.options[mySelect.options.selectedIndex].value){
    case 'all':
        display(allTodos);
        break;
    case 'completed':
       var completedTask = allTodos.filter(function(task){
            return task.isCompleted == true;
        })
        display(completedTask);
        break;
        case 'uncompleted':
        var unCompletedTask = allTodos.filter(function(task){
            return task.isCompleted == false;
        })
        display(unCompletedTask);
        break;

}
}

function deletedTodo(id) {
    console.log(id)
   var index = allTodos.findIndex(function(task){
    return task.id == id
})
   allTodos.splice(index,1)
   display(allTodos)
   localStorage.setItem("allTodos",JSON.stringify(allTodos))

}

searchInput.addEventListener('input',function(e){
console.log(e.target.value)
var searchResult = [];
for(var i=0;i<allTodos.length;i++){
  if(allTodos[i].taskDetails.toLowerCase().includes(e.target.value.toLowerCase()))
    searchResult.push(allTodos[i])
}
display(searchResult)
})



// var todos=[
//   {task:'hello1'},
//   {task:'hello2'},
//   {task:'run'}
// ]
// //l

// var result =[
//   {task:'hello1'},
//   {task:'hekllo2'}
// ]

function clear(){
  taskInputfield.value =''
}
