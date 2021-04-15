'use strict'

// read existing todos from local storage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        if (todosJSON !== null) {
            return JSON.parse(todosJSON)
        } else {
            return []
        }
    } catch (error) {
        return []
    }
}

// save todos to local storage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// remove a todo from the list
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => {
        return todo.id === id
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// toggle the completed value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => {
        return todo.id === id
    })

    if (todo !== undefined) {
        todo.completed = !todo.completed
    }
}

// render application todos
const renderTodos = (todos, filters) => {
    const todoElement = document.querySelector('#todos')

    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        debugger
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    todoElement.innerHTML = ''

    if (filteredTodos.length > 0) {
        todoElement.appendChild(generateSummaryDOM(incompleteTodos))

        filteredTodos.forEach((todo) => {
            todoElement.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageElement = document.createElement('p')
        messageElement.classList.add('empty-message')
        messageElement.textContent = 'No todo\'s to show...'
        todoElement.appendChild(messageElement)
    }
}

// generate the DOM structure for a todo
const generateTodoDOM = (todo) => {
    const todoElement = document.createElement('label')
    const containerElement = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerElement.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // setup todo text
    todoText.textContent = todo.text
    containerElement.appendChild(todoText)

    // setup container
    todoElement.classList.add('list-item')
    containerElement.classList.add('list-item__container')
    todoElement.appendChild(containerElement)

    // setup remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoElement.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoElement
}

// generate the dom elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const plural = incompleteTodos.length === 1 ? '' : 's'

    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`
    return summary
}