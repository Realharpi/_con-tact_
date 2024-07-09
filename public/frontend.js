let contacts = []; let getName; let eachName; let eachNumber;

// Pulling from backend
fetch("/contacts.json")
  .then((response) => response.json())
  .then((data) => {
    contacts = data.sort((a, b) => a.name.localeCompare(b.name));
    displayContacts(contacts);      // Calling a function
  })
  .catch((error) => console.error("Error fetching the contacts data:", error));

// Creating the section
createIISection();
function createIISection() {
  let newSectionContainer = document.createElement("section");
  newSectionContainer.setAttribute("class", "iisection-container");
  document.body.appendChild(newSectionContainer);
}

// Function to display the contacts from JSON
function displayContacts(contacts) {
  getSection = document.querySelector(".iisection-container")
  getSection.innerHTML = "";     // Removing existing contacts when we update the contacts, we want only the new contacts to appear that's why we removed all the existing contacts 
  
  
  contacts.forEach((eachContact, index) => {
    eachName = eachContact.name;
    eachNumber = eachContact.phone;

    let firstLetter = eachName[0];

    // Creating all the divs, h3 and list
    // if First letter container (A-container) doesn't exist, then create it.
    if (!document.querySelector(`.${firstLetter}-container`)) {
      let newDivParentContainer = document.createElement("div");
      newDivParentContainer.setAttribute("class", "parent-container");
      getSection.appendChild(newDivParentContainer);

      let newDivLetterContainer = document.createElement("div");
      newDivLetterContainer.setAttribute("class", `${firstLetter}-container`);
      newDivParentContainer.appendChild(newDivLetterContainer);

      let newLetterTitle = document.createElement("h3");
      newLetterTitle.innerText = firstLetter;
      newDivLetterContainer.appendChild(newLetterTitle);

      let newUnorderedList = document.createElement("ul");
      newUnorderedList.setAttribute("class", "unordered-list");
      newDivLetterContainer.appendChild(newUnorderedList);

      const newList = document.createElement("li");
      const newText = document.createTextNode(eachName);
      newList.appendChild(newText);
      newUnorderedList.appendChild(newList);

      // Add Event listner to each list and it will listen for a click.
      newList.addEventListener("click", showOptions);

      // Add a data attribute to identify the contact
      newList.setAttribute('data-index', index);

      createEditBar(newList, eachNumber);

      // If first letter container exists then only create the list and append it to the that container.
    } else {
      const newList = document.createElement("li");
      const newText = document.createTextNode(eachName);
      newList.appendChild(newText);
      document.querySelector(`.${firstLetter}-container .unordered-list`).appendChild(newList);

      // Add Event listner to each list and it will listen for a click.
      newList.addEventListener("click", showOptions);

      // Add a data attribute to identify the contact
      newList.setAttribute('data-index', index);

      createEditBar(newList, eachNumber);

      // Save the current opened name so we can delete it if the delete is clicked.
      
    }
  });

  // Creating all the icons in the edit bar
  function createEditBar(list, number) {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "hide");
    list.appendChild(newDiv);

    let iParagraph = document.createElement("p");
    iParagraph.setAttribute("class", "phoneNumber");
    iParagraph.innerText = number;
    newDiv.appendChild(iParagraph);

    let iiParagraph = document.createElement("p");
    iiParagraph.setAttribute("class", "list-icons phone");
    newDiv.appendChild(iiParagraph);

    let iSpan = document.createElement("span");
    iSpan.innerText = "Call";
    iiParagraph.appendChild(iSpan);

    let iIcon = document.createElement("i");
    iIcon.setAttribute("class", "fa-solid fa-phone");
    iiParagraph.appendChild(iIcon);

    // When phone icon is clicked,
    iIcon.addEventListener("click", () => {
      currentModal = modalCalling;
      addAnimation(currentModal);
      currentModal.addEventListener("click", removeModal);
    });

    let iiiParagraph = document.createElement("p");
    iiiParagraph.setAttribute("class", "list-icons message");
    newDiv.appendChild(iiiParagraph);

    let iiSpan = document.createElement("span");
    iiSpan.innerText = "Message";
    iiiParagraph.appendChild(iiSpan);

    let iiIcon = document.createElement("i");
    iiIcon.setAttribute("class", "fa-solid fa-message");
    iiiParagraph.appendChild(iiIcon);

    iiIcon.addEventListener("click", () => {
      currentModal = modalUnavailable;
      addAnimation(currentModal);
      currentModal.addEventListener("click", removeModal);
    });

    let ivParagraph = document.createElement("p");
    ivParagraph.setAttribute("class", "list-icons edit");
    newDiv.appendChild(ivParagraph);

    let iiiSpan = document.createElement("span");
    iiiSpan.innerText = "Edit";
    ivParagraph.appendChild(iiiSpan);

    let iiiIcon = document.createElement("i");
    iiiIcon.setAttribute("class", "fa-solid fa-pen-to-square");
    ivParagraph.appendChild(iiiIcon);

    iiiIcon.addEventListener("click", () => {
      currentModal = modalEdit;
      addAnimation(currentModal);
    });

    let vParagraph = document.createElement("p");
    vParagraph.setAttribute("class", "list-icons trash");
    newDiv.appendChild(vParagraph);

    let ivSpan = document.createElement("span");
    ivSpan.innerText = "Delete";
    vParagraph.appendChild(ivSpan);

    let ivIcon = document.createElement("i");
    ivIcon.setAttribute("class", "fa-solid fa-trash");
    vParagraph.appendChild(ivIcon);

    ivIcon.addEventListener("click", () => {
      currentModal = modalDelete;
      addAnimation(currentModal);
    });
  }

  // Show Options by clicking on the name.
  function showOptions(event) {
    // Passing down the newList using event.
    const newList = event.currentTarget

    getName = newList

    newList.classList.toggle("height");
    newList.lastChild.classList.toggle("hide");

    // If clicked on different item than current, open the new item and close the current item
    getAllList = document.querySelectorAll("li");
    getAllList.forEach((eachList) => {
      if (eachList !== newList) {
        eachList.classList.remove("height");
        eachList.lastChild.classList.add("hide");
      }
    });
  }
}


// ******* Toggle between Add & Search Inputs ********
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

// ******* Toggle between Add & Search Inputs ********
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

function capitalizeFirstLetter(parameter) {
  let uniformWord = parameter.toString().toLowerCase()
  return uniformWord.charAt(0).toUpperCase() + uniformWord.slice(1)
}

// Add New Name
let getAddName = document.querySelector("#addName")
let getAddNumber = document.querySelector("#addNumber")
getAddName.addEventListener("keypress", hitEnter)
getAddNumber.addEventListener("keypress", hitEnter)
function hitEnter(event) {
  if (event.key === "Enter") {

    // Trim() is used to remove any leading/trailing whitespace
    const newName = capitalizeFirstLetter(getAddName.value.trim());
    const newNumber = getAddNumber.value.trim();

    console.log(newName)
    console.log(newNumber)

    // If a new name and number was added then execute this...
    if (newName && newNumber) {
      // Hide the add input & setting it's value to nothing
      event.currentTarget.parentNode.classList.toggle("add-container")
      getAddName.value = '';  getAddNumber.value = '';

      // const newContact = { name: newName, phone: newNumber };
      contacts.push({ name: newName, phone: newNumber }); // Add new contact to local array

      console.log(contacts)

      displayContacts(contacts); // Update UI

      updateContactsOnServer(contacts); // Update contacts on server
    }

    currentModal = modalDone
    showModal()
  }
}

// Search Name or Number - Filter
const filterInput = document.querySelector("#filterInput");
filterInput.addEventListener("keyup", filterContats);        // Here we call a function every time something is typed in input.

function filterContats() {
    // Here we access the value of Input. Convert it to String then to lower case.
    let filterValue = filterInput.value.toString().toLowerCase()

    const filteredContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filterValue) || contact.phone.includes(filterValue);
    });

    // Update UI with filtered contacts
    displayContacts(filteredContacts);
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

backdrop = document.querySelector('.backdrop')
modalDelete = document.querySelector('.iiisection-container .delete')
modalEdit = document.querySelector('.iiisection-container .edit')
modalDone = document.querySelector('.iiisection-container .done')
modalCalling = document.querySelector('.iiisection-container .calling')
modalUnavailable = document.querySelector('.iiisection-container .unavailable')

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

function showModalDelay(getModal) {
  currentModal = getModal;
  removeModal();
  setTimeout(nameAdded, 500);
  function nameAdded() {
    currentModal = modalDone;
    showModal();
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
  deleteItem = getName.innerText

  for(let i=0; i<contacts.length; i++){
    if(contacts[i].name === deleteItem){
      contacts.splice(i, 1)
    }
  }
  displayContacts(contacts)
  deleteListItem(deleteItem)
  showModalDelay(modalDelete)
  console.log(contacts)
  updateContactsOnServer(contacts);
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

  for(let i=0; i<eachName.length; i++){
    if(eachName[i] === deleteItem){
      eachName.splice(i, 1)
    }
  }
  deleteListItem(deleteItem)
  showModalDelay(modalEdit)
}


// Function to update contacts on the server (requires backend implementation)
function updateContactsOnServer(updatedContacts) {
  fetch("/update_contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedContacts)
  })
  .then(response => response.text())
  .then(data => {
    console.log("Contacts updated:", data);
  })
  .catch(error => console.error("Error updating contacts:", error));
}
