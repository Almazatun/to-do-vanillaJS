//Selectors
const todoInput = document.querySelector('.input_todo')
const todoBtn = document.querySelector('.todo_btn')
const todoList = document.querySelector('.todo_list')
const selectDiv = document.querySelector('.select')

//Select
const filters = ['ALL','ACTIVE','DONE']
let [ALL, ACTIVE, DONE] = filters
const textBtnDelete = '❤'
const textBtnEdit = 'rename'
const arr = [
    {text: 'All', value: ALL},
    {text: 'Active', value: ACTIVE},
    {text: 'Done', value: DONE},
]
const selectList = document.createElement('select')
selectList.classList.add('todo_filter')
selectDiv.appendChild(selectList)

// //Create option element inside selectList
arr.forEach(el => {
    const option = document.createElement('option')
    option.value = el.value
    option.text = el.text
    selectList.appendChild(option)
})
//Filter selector
const filterOption = document.querySelector('.todo_filter')


//Event listener
document.addEventListener('DOMContentLoaded', getTodosFromLocalStorage)
todoBtn.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteAndCheckTodo)
todoList.addEventListener('click', editTodo)
filterOption.addEventListener('change', filterTodoList)


//Functions
function addTodo(event) {

    event.preventDefault()
    if (todoInput.value.trim() !== '' || event.keyCode === 13) {
        //Save localStorage to-do
        saveLocalStorageTodos(todoInput.value)

        //Create to-do div element
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')

        //Create li elements
        const newTodo = document.createElement('li')
        newTodo.classList.add('todo_item')
        const spanTodo = document.createElement('span')
        spanTodo.innerText = todoInput.value
        spanTodo.classList.add('todo_span')
        newTodo.appendChild(spanTodo)

        //Put on li tag inside the todoDiv
        todoDiv.appendChild(newTodo)

        //Button delete to-do
        const deleteBtn = document.createElement('button')
        const imgBtnDelete = document.createElement('img')
        imgBtnDelete.src = "https://ddo0fzhfvians.cloudfront.net/uploads/icons/png/19969543341557740370-64.png"
        imgBtnDelete.height = 20
        imgBtnDelete.width = 20
        imgBtnDelete.classList.add('imgDelete')
        deleteBtn.appendChild(imgBtnDelete)
        deleteBtn.classList.add('delete_todo_btn')
        todoDiv.appendChild(deleteBtn)

        //Button edit to-do
        const editBtn = document.createElement('button')
        editBtn.innerHTML = `<img alt="edit image" class="imgEdit" height="20px" width="20px" src="https://ddo0fzhfvians.cloudfront.net/uploads/icons/png/17257663471537355603-64.png">`
        editBtn.classList.add('edit_todo_btn')
        todoDiv.appendChild(editBtn)

        //Put on to-do DIV element inside the to-do list UL element
        todoList.appendChild(todoDiv)
        todoInput.value = ''
    } else {
        alert('Field should be required 🎅')
        todoInput.value = ''
    }
}

function deleteAndCheckTodo(event) {
    const item = event.target
    //Delete to-do
    if (item.classList[0] === 'imgDelete') {
        const todo = item.parentElement.parentElement;
        todo.classList.add('fall_down')
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
        //Delete to-do from local storage
        removeTodoItemFromLocalStorage(todo)
    } else if (item.classList[0] === 'delete_todo_btn') {
        const todo = item.parentElement;
        todo.classList.add('fall_down')
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
        //Delete to-do from local storage
        removeTodoItemFromLocalStorage(todo)
    }

    if (item.classList[0] === 'todo_item') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
        const todoItem = item.parentNode.querySelector('li > span')
        todoItem.classList.toggle('completedItem')
    }
}

function filterTodoList(event) {
    const todos = todoList.childNodes
    todos.forEach((todo) => {
        switch (event.target.value) {
            case ALL:
                if (todo.nodeName !== '#text') {
                    todo.style.display = 'flex'
                }
                break;
            case ACTIVE:
                if (todo.nodeName !== '#text') {
                    if (todo.classList.contains('completed')) {
                        todo.style.display = 'none'
                    } else {
                        todo.style.display = 'flex'
                    }
                }
                break;
            case DONE:
                if (todo.nodeName !== '#text') {
                    if (!todo.classList.contains('completed')) {
                        todo.style.display = 'none'
                    } else {
                        todo.style.display = 'flex'
                    }
                }
                break;
        }
    })
}

function editTodo(event) {
    const item = event.target
    const todoCompleted = item.parentElement.classList[1]
    const todoCompletedImg = item.parentElement.parentElement.classList[1]
    if (item.classList[0] === 'edit_todo_btn') {
        if (!todoCompleted) {
            const todoItem = item.parentNode.querySelector('li > span')
            const title = prompt('Please enter new name', '')
            if (title && title.trim() !== '') {
                todoItem.innerText = title
            } else {
                alert('Field should be required')
            }
        } else {
            alert ('Todo done. Sorry not possible to rename todo ✳')
        }
    } else if (item.classList[0] === 'imgEdit') {
        console.log('Success')
        if (!todoCompletedImg) {
            const todoItem = item.parentNode.parentNode.querySelector('li > span')
            const title = prompt('Please enter new name', '')
            if (title && title.trim() !== '') {
                renameTodoItemLocalStorage(todoItem, title)
                todoItem.innerText = title
            }
        } else {
            alert ('Todo done that mean you can not rename. Sorry ✳')
        }
    }
}

let todos;

//Save localStorage
function saveLocalStorageTodos(todoTitle){
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else  {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos = [...todos,todoTitle]
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodosFromLocalStorage(){
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else  {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(itemValue => {
        //Recreate todos and get data from localStorage
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')

        //Create li elements
        const newTodo = document.createElement('li')
        newTodo.classList.add('todo_item')
        const spanTodo = document.createElement('span')
        spanTodo.innerText = itemValue
        spanTodo.classList.add('todo_span')
        newTodo.appendChild(spanTodo)

        //Put on li tag inside the todoDiv
        todoDiv.appendChild(newTodo)

        //Button delete to-do
        const deleteBtn = document.createElement('button')
        const imgBtnDelete = document.createElement('img')
        imgBtnDelete.src = "https://ddo0fzhfvians.cloudfront.net/uploads/icons/png/19969543341557740370-64.png"
        imgBtnDelete.height = 20
        imgBtnDelete.width = 20
        imgBtnDelete.classList.add('imgDelete')
        deleteBtn.appendChild(imgBtnDelete)
        deleteBtn.classList.add('delete_todo_btn')
        todoDiv.appendChild(deleteBtn)

        //Button edit to-do
        const editBtn = document.createElement('button')
        editBtn.innerHTML = `<img alt="edit image" class="imgEdit" height="20px" width="20px" src="https://ddo0fzhfvians.cloudfront.net/uploads/icons/png/17257663471537355603-64.png">`
        editBtn.classList.add('edit_todo_btn')
        todoDiv.appendChild(editBtn)

        //Put on to-do DIV element inside the to-do list UL element
        todoList.appendChild(todoDiv)
    })
}

function removeTodoItemFromLocalStorage(todo){
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else  {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText
   todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function renameTodoItemLocalStorage(todo, newTitle){
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else  {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const indexTodo = todos.indexOf(todo.innerText)
    todos[indexTodo] = newTitle
    localStorage.setItem('todos', JSON.stringify(todos))
}