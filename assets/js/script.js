var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

var todos = [];



init();

function renderTodos() {
  // Clear todoList element and update todoCountSpan
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  // Render a new li for each todo
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var chkbox = document.createElement('input');
    chkbox.type = 'checkbox';
    chkbox.name = 'myCheckbox';

    //debugger;
    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Remove";

    li.appendChild(chkbox);
    li.appendChild(button);
    todoList.appendChild(li);

 

     // Create a label element
    // const label = document.createElement('label');
    // label.htmlFor = 'myCheckbox';
    // label.textContent = 'My Checkbox Label';

    // Append the checkbox and label to the container
    // const container = document.getElementById('container');
    // container.appendChild(checkbox);
    // container.appendChild(label);
    
    // li.appendChild(checkbox);
    // todoList.appendChild(label);
    
    


    // Set checkbox as initially checked
   // checkbox.checked = true;

    // Handle change events
    // checkbox.addEventListener('change', function() {
    //   if (checkbox.checked) {
    //     console.log('Checkbox is checked');
    //   } else {
    //     console.log('Checkbox is unchecked');
    //   }
    // });
  }
}

function init() {
  // Get stored todos from localStorage
  // Parsing the JSON string to an object
  var storedTodos = JSON.parse(localStorage.getItem("todos"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedTodos !== null) {
    todos = storedTodos;
  }

  // Render todos to the DOM
  renderTodos();
}

function storeTodos() {
  // Stringify and set "todos" key in localStorage to todos array
  localStorage.setItem("todos", JSON.stringify(todos));
}

// When form is submitted...
todoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var todoText = todoInput.value.trim();

  // Return from function early if submitted todoText is blank
  if (todoText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  todos.push(todoText);
  todoInput.value = "";

  // Store updated todos in localStorage, re-render the list
  storeTodos();
  renderTodos();
});

// When a element inside of the todoList is clicked...
todoList.addEventListener("click", function(event) {
  var element = event.target;

  // If that element is a button...
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);

    // Store updated todos in localStorage, re-render the list
    storeTodos();
    renderTodos();
  }
});
