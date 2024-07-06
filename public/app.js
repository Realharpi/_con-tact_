// *******LIST********
let contacts = ["Liam", "Olivia", "Noah", "Emma", "Oliver", "Charlotte", "Elijah", "Amelia", "James", "Ava", "William", "Sophia", "Benjamin", "Karen", "Isabella", "Lucas", "Mia", "Henry", "Evelyn", "Theodore", "Harper", "Mary", "David", "Michael", "John", "Robert", "Richard", "Charles", "Christopher", "Daniel", "Lisa", "Sarah", "Susan", "Linda", "Elizabeth", "Jennifer", "Andrew", "Anthony", "Mark", "Kevin", "Emily", "Sandra", "Carol", "Amanda", "Bethany", "Edward", "Ronald", "Ryan", "Cynthia", "Laura", "Amy", "Gary", "Eric", "Barbara", "Andy", "George", "Harvey", "Mike", "Louis", "Adam", "Jerry", "Tom", "Norton"]


// Pulling from backend

fetch("contacts.json")
  .then((response) => response.json())
  .then((data) => {
    displayContacts(data);
    console.log(data[0]);
  })
  .catch((error) => console.error("Error fetching the contacts data:", error));



// Function to display the burgers from JSON
function displayContacts(contacts) {
  
  contacts.forEach(contact => {

  });
}















let eachContact
let firstLetter

contacts.sort()

// Creating the section
createIISection()
function createIISection() {
  let newSectionContainer = document.createElement("section")
  newSectionContainer.setAttribute("class", "iisection-container")
  document.body.appendChild(newSectionContainer)
}

runForEachItem()
function runForEachItem() {
  contacts.forEach(arrayItem => {
    eachContact = arrayItem
    firstLetter = arrayItem[0]
    checkNCreate()
  })
}

// Creating the all the divs, h3 and list
function checkNCreate() {
  if(!document.querySelector(`.${firstLetter}-container`)) {
    let newDivParentContainer = document.createElement("div")
    newDivParentContainer.setAttribute("class", "parent-container")
    document.querySelector(".iisection-container").appendChild(newDivParentContainer)

    let newDivLetterContainer = document.createElement("div")
    newDivLetterContainer.setAttribute("class", `${firstLetter}-container`)
    newDivParentContainer.appendChild(newDivLetterContainer)

    let newLetterTitle = document.createElement("h3")
    newLetterTitle.innerText = firstLetter
    newDivLetterContainer.appendChild(newLetterTitle)

    let newUnorderedList = document.createElement("ul")
    newUnorderedList.setAttribute("class", "unordered-list")
    newDivLetterContainer.appendChild(newUnorderedList)

    const newList = document.createElement("li")
    const newText = document.createTextNode(eachContact)
    newList.appendChild(newText)
    newUnorderedList.appendChild(newList)

    createEditBar(newList)

  } else {
    const newList = document.createElement("li");
    const newText = document.createTextNode(eachContact);
    newList.appendChild(newText);
    document.querySelector(`.${firstLetter}-container .unordered-list`).appendChild(newList)

    createEditBar(newList)
  }
}


// *******Input********
let searchBtn = document.querySelector(".search")

searchBtn.addEventListener("click", showInput)

function showInput(event) {
  const getParent = event.currentTarget.parentNode
  if(!document.querySelector(".add-container")) {
    getParent.classList.toggle("search-container")
    if(window.innerWidth < 580){
      document.querySelector(".main-title").style.color = "#e1e1e1"
    }
  } else {
    getParent.classList.toggle("add-container")
    getParent.classList.toggle("search-container")
    if(window.innerWidth < 580){
      document.querySelector(".main-title").style.color = "#e1e1e1"
    }
  }
  if(window.innerWidth < 580){
    if(!document.querySelector(".search-container") && !document.querySelector(".add-container")) {
    document.querySelector(".main-title").style.color = "black"
    }
  }
}


let filterInput = document.querySelector("#filterInput")
// Here we call a function every time something is typed in input.
filterInput.addEventListener("keyup", filterNames)
let i

function filterNames() {
    // Here we access the value of Input. Convert it to String then to lower case.
    let filterValue = document.getElementById("filterInput").value.toString().toLowerCase()

    // Here we access the li with collection-item class as a Nodelist.
    let allList  = document.querySelectorAll(".unordered-list li")

    // Here we reset the visibility of all container.
    let getParenter= document.querySelectorAll(".iisection-container .parent-container")
    for(i=0; i<getParenter.length; i++) {
      getParenter[i].style.display = 'block'
    }

    for(let i=0; i<allList.length; i++){
        // Here we get access the innerText of the list which stores the names. Convert it to a string and lowercase.
        let getContact = allList[i].innerText.toString().toLowerCase()
        console.log(allList[i])

        // If input letter 'filterValue' matches the contact letter 'getContacts', the 'indexOf' value will be 0.
        // If input letter 'filterValue' doesn't match the contact letter 'getContacts', the 'indexOf' value will be -1.
        if(getContact.indexOf(filterValue) > -1) {
            allList[i].style.display = 'block'
        }
        else {
            allList[i].style.display = 'none'
        }
    }
    
    // Here we will remove the container which is empty. First we get all the parent containers.
    // Run loop to get access all one by one and get their height. An empty container has height of 70. 
    for(i=0; i<getParenter.length; i++) {
      let checkHeight = getParenter[i].clientHeight
      
      // Container smaller than 71 are removed. But the problem is that they stay removed even if we type something else.
      // So I decided to reset all the container to visible at the beginning of the function.
      if(checkHeight < 71) {
        getParenter[i].style.display = 'none'
      } else {
        getParenter[i].style.display = 'block'
      }
    }
}




// *******ADD Contacts********
let addBtn = document.querySelector(".add")
addBtn.addEventListener("click", showAdd)
function showAdd(event) {
  const getParent = event.currentTarget.parentNode
  if(!document.querySelector(".search-container")) {
    getParent.classList.toggle("add-container")
    if(window.innerWidth < 580){
      document.querySelector(".main-title").style.color = "#e1e1e1"
    }
  } else {
    getParent.classList.toggle("search-container")
    getParent.classList.toggle("add-container")
    if(window.innerWidth < 580){
      document.querySelector(".main-title").style.color = "#e1e1e1"
    }
  }
  if(window.innerWidth < 580){
    if(!document.querySelector(".search-container") && !document.querySelector(".add-container")) {
    document.querySelector(".main-title").style.color = "black"
    }
  }
}

function capitalizeFirstLetter(parameter) {
  let uniformWord = parameter.toString().toLowerCase()
  return uniformWord.charAt(0).toUpperCase() + uniformWord.slice(1)
}

let getAddInput = document.querySelector("#addInput")
getAddInput.addEventListener("keypress", hitEnter)
function hitEnter(event) {
  if (event.key === "Enter") {
    addName(getAddInput.value)
    event.currentTarget.parentNode.classList.toggle("add-container")
    getAddInput.value = ''

    currentModal = modalDone
    showModal()
    createFeatures()
    createIcons()
  }
}

// This function will be called directly from HTML when we press the save button on Edit modal.
function editName() {
  let getEditInput = document.querySelector(".edit-input")
  addName(getEditInput.value)
  getEditInput.value = ''
  deleteContactEdit()
  createFeatures()
  createIcons()
}

function addName(input) {
  // Remove 2nd section
  let getSection = document.querySelector(".iisection-container")
  getSection.parentNode.removeChild(getSection)
  // Add the name
  contacts.push(capitalizeFirstLetter(input))
  contacts.sort()
  createIISection()
  runForEachItem()
}

function showModalDelay(getModal){
  currentModal = getModal
  removeModal()
  setTimeout(nameAdded, 500)
  function nameAdded(){
    currentModal = modalDone
    showModal()
  }
}

// *******Features on List********
let getAllList
let getList
createFeatures()
function createFeatures (){
  getAllList = document.querySelectorAll("li")
  getAllList.forEach((eachList) => {
    eachList.addEventListener("click", showMore)
  })
}

function showMore(event) {
  getList = event.currentTarget
  getList.classList.toggle("height")
  getList.lastChild.classList.toggle("hide")

  getAllList.forEach((eachListAgain) => {
    if (eachListAgain !== getList) {
      eachListAgain.classList.remove("height")
      eachListAgain.lastChild.classList.add("hide")
    }
  })
}

// Creating all the icons in the edit bar
function createEditBar(list) {
  let newDiv = document.createElement("div")
    newDiv.setAttribute("class", "hide")
    list.appendChild(newDiv)

    let iParagraph = document.createElement("p")
    iParagraph.setAttribute("class", "list-icons phone")
    newDiv.appendChild(iParagraph)

    let iSpan = document.createElement("span")
    iSpan.innerText = "Call"
    iParagraph.appendChild(iSpan)

    let iIcon = document.createElement("i")
    iIcon.setAttribute("class", "fa-solid fa-phone")
    iParagraph.appendChild(iIcon)

    let iiParagraph = document.createElement("p")
    iiParagraph.setAttribute("class", "list-icons message")
    newDiv.appendChild(iiParagraph)

    let iiSpan = document.createElement("span")
    iiSpan.innerText = "Message"
    iiParagraph.appendChild(iiSpan)

    let iiIcon = document.createElement("i")
    iiIcon.setAttribute("class", "fa-solid fa-message")
    iiParagraph.appendChild(iiIcon)

    let iiiParagraph = document.createElement("p")
    iiiParagraph.setAttribute("class", "list-icons edit")
    newDiv.appendChild(iiiParagraph)

    let iiiSpan = document.createElement("span")
    iiiSpan.innerText = "Edit"
    iiiParagraph.appendChild(iiiSpan)

    let iiiIcon = document.createElement("i")
    iiiIcon.setAttribute("class", "fa-solid fa-pen-to-square")
    iiiParagraph.appendChild(iiiIcon)

    let ivParagraph = document.createElement("p")
    ivParagraph.setAttribute("class", "list-icons trash")
    newDiv.appendChild(ivParagraph)

    let ivSpan = document.createElement("span")
    ivSpan.innerText = "Delete"
    ivParagraph.appendChild(ivSpan)

    let ivIcon = document.createElement("i")
    ivIcon.setAttribute("class", "fa-solid fa-trash")
    ivParagraph.appendChild(ivIcon)
}

// *****Add Icons in Features*****
let getAllIcons
let backdrop
let modalDelete
let modalEdit
let modalDone
let currentModal
let modalCalling
let modalUnavailable
createIcons()
function createIcons(){
  getAllIcons = document.querySelectorAll(".list-icons")
  backdrop = document.querySelector('.backdrop')
  modalDelete = document.querySelector('.iiisection-container .delete')
  modalEdit = document.querySelector('.iiisection-container .edit')
  modalDone = document.querySelector('.iiisection-container .done')
  modalCalling = document.querySelector('.iiisection-container .calling')
  modalUnavailable = document.querySelector('.iiisection-container .unavailable')
  getAllIcons.forEach((eachIcon) => {
    eachIcon.addEventListener("click", openIcon)
  })
}

function openIcon(event) {
  let getIcon = event.currentTarget.classList[1]

  if(getIcon === "phone") {
    currentModal = modalCalling
    addAnimation(currentModal)
    currentModal.addEventListener("click", removeModal)
  }

  if(getIcon === "message") {
    currentModal = modalUnavailable
    addAnimation(currentModal)
    currentModal.addEventListener("click", removeModal)
  }
  
  if(getIcon === "edit") {
    currentModal = modalEdit
    addAnimation(currentModal)
  }

  if(getIcon === "trash") {
    currentModal = modalDelete
    addAnimation(currentModal)
  }
}

// *******Modals & Animation*********
function showModal() {
  setTimeout(showModalDone, 1)
  function showModalDone() {
    addAnimation(currentModal)

    setTimeout(stopModal, 2000)

    function stopModal() {
      removeModal()
      setTimeout(timeOut, 3000)
    }
  }
}

function addAnimation(currentModal) {
  currentModal.classList.add("animIn")
  backdrop.classList.add("animIn")
}

backdrop.addEventListener('click', removeModal)

function removeModal() {  
  currentModal.classList.add("animOut")
  backdrop.classList.add("animOut")

  setTimeout(timeOut, 500)
}

function timeOut() {      
  currentModal.classList.remove("animIn")
  backdrop.classList.remove("animIn")
  currentModal.classList.remove("animOut")
  backdrop.classList.remove("animOut")
}

// ****** Delete Contact*******
let deleteItem
function deleteContact() {
  deleteItem = getList.textContent

  for(let i=0; i<contacts.length; i++){
    if(contacts[i] === deleteItem){
      contacts.splice(i, 1)
    }
  }
  deleteListItem(deleteItem)
  showModalDelay(modalDelete)
}

function deleteListItem(deleteItem){
  let getAllList = document.querySelectorAll(".unordered-list li")

  getAllList.forEach((eachList) => {
    if(eachList.textContent === deleteItem){
      eachList.parentElement.removeChild(eachList)
    }
  })
}

function deleteContactEdit() {
  deleteItem = getList.textContent

  for(let i=0; i<contacts.length; i++){
    if(contacts[i] === deleteItem){
      contacts.splice(i, 1)
    }
  }
  deleteListItem(deleteItem)
  showModalDelay(modalEdit)
}