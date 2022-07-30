//Global variable
let $mainConteiner = document.querySelector('.main_row_task_content')
let $newTaskColumn = document.querySelector('#new')
let $newTaskColumnItems = document.querySelector('.new_task')
let $processTaskColumn = document.querySelector('#in_process')
let $endTaskColumn = document.querySelector('#end_task')

let $addFormButton = document.querySelector('.add_task')

let tasks = []

let $addTaskFormDiv


//test localStorage
function inLocalStorage() {
    localStorage.clear()
    tasks.map((task, index) => {
        let key = index
        localStorage.setItem(key, JSON.stringify(task))
    })
}
function outLocalStorage() {
    for(i = 0; i < localStorage.length; i++){
        tasks.push(JSON.parse(localStorage.getItem(i)))
    }
    renderTaskItem()
}


//Functions
function renderForm() {
    let taskFormDiv
    taskFormDiv = document.createElement('div')
    taskFormDiv.classList.add('task_add_form')

    let taskForm = document.createElement('form')

    let labelZag = document.createElement('label')
    labelZag.textContent = 'Заголовок:'

    let inputZag = document.createElement('input')
    inputZag.setAttribute('type', 'text')
    inputZag.setAttribute('id', 'zag')
    inputZag.setAttribute('placeholder', 'Введите заголовок')
    
    let labelDescription = document.createElement('label')
    labelDescription.classList.add('label_description')
    labelDescription.textContent = 'Описание задачи:'

    let textareaDescription = document.createElement('textarea')
    textareaDescription.setAttribute('name', 'descriprion')
    textareaDescription.setAttribute('id', 'descript')
    textareaDescription.setAttribute('cols', '30')
    textareaDescription.setAttribute('rows', '3')
    textareaDescription.setAttribute('placeholder', 'Опишите задачу')
    textareaDescription.setAttribute('value', ' ')

    let rowBtn = document.createElement('div')
    rowBtn.classList.add('row_btn')

    let confirnButton = document.createElement('button')
    confirnButton.classList.add('add_btn')
    confirnButton.textContent = 'Добавить'
    confirnButton.setAttribute('id', 'add_btn')

    let cancelButton = document.createElement('button')
    cancelButton.classList.add('cancel_btn')
    cancelButton.setAttribute('id', 'cancel_btn')
    cancelButton.textContent = 'Отменить'

    rowBtn.append(confirnButton, cancelButton)
    taskForm.append(labelZag, inputZag, labelDescription, textareaDescription)
    taskFormDiv.append(taskForm, rowBtn)

    $newTaskColumn.append(taskFormDiv)

    $addTaskFormDiv = taskFormDiv
}

function renderTaskItem(){
    $newTaskColumnItems.innerHTML = ''
    $processTaskColumn.innerHTML = ''   
    $endTaskColumn.innerHTML = ''

    inLocalStorage()
    
    tasks.map((task, index) => {
        // console.log('Мой Таск ' + task.name + ' ' + 'мой Индекс ' + index);
        let name = task.name
        let descriprion = task.descriprion
        let itemStatus = task.status
        createTask(name, descriprion, index, itemStatus)
    })
}


function addTasktoBase(){
    let name = document.querySelector('#zag').value
    let descriprion = document.querySelector('#descript').value

    let task = {name: name, descriprion: descriprion, status: 'new'}
    tasks.push(task)

    tasks.map((elem, index) => {
        // console.log('Елемент ' + elem + 'Индекс ' + index)
        elem.id = index
    })
    inLocalStorage()
}

function createTask(name, descriprion, index, itemStatus) {
    let taskItem = document.createElement('div')
    taskItem.classList.add('task')
    taskItem.setAttribute('id', index)//ATANTION возможно нужно расспарсить в текст
    taskItem.setAttribute('data', itemStatus)


    let taskContent = document.createElement('div')
    taskContent.classList.add('task_content')
    
    let taskHeader = document.createElement('p')
    taskHeader.classList.add('task_zag')
    taskHeader.textContent = name//ATANTION

    let taskDescription = document.createElement('p')
    taskDescription.classList.add('task_description')
    taskDescription.textContent = descriprion//ATANTION


    let rowBtn = document.createElement('div')
    rowBtn.classList.add('row_btn')


    let startButton = document.createElement('button')
    startButton.classList.add('add_btn')
    startButton.textContent = 'Приступить'
    startButton.setAttribute('data', index)
    startButton.setAttribute('name', 'start_btn')

    let deleteButton = document.createElement('button')
    deleteButton.classList.add('cancel_btn')
    deleteButton.setAttribute('data', 'delete_btn')
    deleteButton.setAttribute('name', 'delete_btn')
    deleteButton.setAttribute('id', index)
    deleteButton.textContent = 'Удалить'


    taskContent.append(taskHeader, taskDescription)
    rowBtn.append(startButton, deleteButton)
    taskItem.append(taskContent, rowBtn)

    if (itemStatus === 'new'){
        $newTaskColumnItems.append(taskItem)//ATANTION
    }

    if (itemStatus === 'inProcess'){
        $processTaskColumn.append(taskItem)//ATANTION

        startButton.textContent = 'Завершить'
        startButton.setAttribute('name', 'end_btn')
        startButton.style.backgroundColor = '#76C750'

        deleteButton.textContent = 'Отменить'
        deleteButton.style.backgroundColor = '#69A3FA'
        deleteButton.setAttribute('name', 'stop_process')

        taskItem.style.backgroundColor = '#FFFCAE'
    }

    if (itemStatus === 'end'){
        $endTaskColumn.append(taskItem)//ATANTION

        startButton.textContent = 'Удалить'
        startButton.setAttribute('name', 'delete_task')
        startButton.style.backgroundColor = '#FA9469'

        deleteButton.textContent = 'Доработать'
        deleteButton.style.backgroundColor = '#FFFCAE'
        deleteButton.setAttribute('name', 'break_end')
        deleteButton.setAttribute('data', index)
        deleteButton.style.color = '#000'

        taskItem.style.backgroundColor = '#C0EFA9'
    }
}

function deleteTask(id){
    tasks.splice(id, 1)
}

function startProcess(id){
    tasks[id].status = 'inProcess'
}

function stopProcess(id){
    tasks[id].status = 'new'
}

function finishTask(id){
    tasks[id].status = 'end'
}



function checkClik(element){
    let itemID = element.target.id
    // console.log(itemID)
    let itemClass = element.target.classList.value
    // console.log(itemClass)
    let itemData = element.target.getAttribute('data')
    let buttonAttribute = element.target.getAttribute('name')
    // console.log(itemClass)

    if (itemID === 'add_task' || itemID === 'add_task_btn'){
        renderForm()
        $addFormButton.classList.add('hide')
    }

    if (itemID === 'cancel_btn'){
        $addTaskFormDiv.remove()
        // renderTaskItem()
        $addFormButton.classList.remove('hide')
    }

    if (itemID === 'add_btn'){
        let nameCheck = document.querySelector('#zag').value
        if (!nameCheck){
            alert('Введите заголовок')
            return null
        }
        addTasktoBase()
        $addTaskFormDiv.remove()
        renderTaskItem()
        $addFormButton.classList.remove('hide')
    }

    if (buttonAttribute === 'delete_btn') {// THIS
        itemID = itemID
        deleteTask(itemID)
        renderTaskItem()
    }

    if (buttonAttribute === 'start_btn') { // start proccess
        itemID = itemData
        startProcess(itemID)
        renderTaskItem()
    }

    if (buttonAttribute === 'stop_process') {
        itemID = element.target.id
        stopProcess(itemID)
        renderTaskItem()
    }

    if (buttonAttribute === 'end_btn') {
        itemID = itemData
        finishTask(itemID)
        renderTaskItem()
    }

    if (buttonAttribute === 'break_end') {
        itemID = itemID
        startProcess(itemID)
        renderTaskItem()
    }

    if (buttonAttribute === 'delete_task') {
        itemID = itemData
        deleteTask(itemID)
        renderTaskItem()
    }
}




//Proccess
outLocalStorage()
$mainConteiner.addEventListener('click', checkClik)