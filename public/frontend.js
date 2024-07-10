let contacts = []; let getName; let eachName; let eachNumber; let currentList; let currentListName; // currentListName is which name-list is selected or opened


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
  getFavorite = document.querySelector(".favorite")
  getSection.innerHTML = "";     // Removing existing contacts when we update the contacts, we want only the new contacts to appear that's why we removed all the existing contacts 
  let favoriteCalled = 0;       // If favoriteCalled is 0 meaning, favorite features haven't been created. But if it's 1, it's been created and we can skip creating them again.
  
  contacts.forEach((eachContact, index) => {
    eachName = eachContact.name;
    eachNumber = eachContact.phone;
    let firstLetter = eachName[0];        // for creating a Alphabet sections

    // Checking and creating favorite container.
    if (eachContact.favorite && eachContact.favorite === "Y") {
      if (favoriteCalled === 0) {
        let newDivParentContainer = document.createElement("div");
        newDivParentContainer.setAttribute("class", "parent-container");
        getSection.appendChild(newDivParentContainer);

        let newDivFavorite = document.createElement("div");
        newDivFavorite.setAttribute("class", "favorite");
        newDivParentContainer.appendChild(newDivFavorite);

        let newLetterTitle = document.createElement("h3");
        newLetterTitle.innerText = "Favorites";
        newDivFavorite.appendChild(newLetterTitle);

        let newUnorderedList = document.createElement("ul");
        newUnorderedList.setAttribute("class", "unordered-list");
        newDivFavorite.appendChild(newUnorderedList);

        const newList = document.createElement("li");
        const newText = document.createTextNode(eachName);
        newList.appendChild(newText);
        newUnorderedList.appendChild(newList);

        // Add Event listner to each list and it will listen for a click.
        newList.addEventListener("click", showOptions)

        // Add a data attribute to identify the contact
        newList.setAttribute('data-index', index);

        createEditBar(newList, eachNumber);
        favoriteCalled++;
      } else if (favoriteCalled >= 0){
        newUnorderedList = document.querySelector(".favorite .unordered-list")
        const newList = document.createElement("li");
        const newText = document.createTextNode(eachName);
        newList.appendChild(newText);
        newUnorderedList.appendChild(newList);

        // Add Event listner to each list and it will listen for a click.
        newList.addEventListener("click", showOptions);

        // Add a data attribute to identify the contact
        newList.setAttribute('data-index', index);

        createEditBar(newList, eachNumber);
      }
    }

    // Creating all the Alphabet container, Title and Name's list.
    // if First-letter container (A-container) doesn't exist, then create it and then add names in it.
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
    } // if First-letter container exists, then only add names in it.
    else if (document.querySelector(`.${firstLetter}-container`)){
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

  // Show Options by clicking on the name.
  function showOptions(event) {
    // Passing down the newList using event.
    currentList = event.currentTarget
    currentListName = currentList.innerText

    currentList.classList.toggle("height");
    currentList.lastChild.classList.toggle("hide");

    // If clicked on different item than current, open the new item and close the current item
    getAllList = document.querySelectorAll("li");
    getAllList.forEach((eachList) => {
      if (eachList !== currentList) {
        eachList.classList.remove("height");
        eachList.lastChild.classList.add("hide");
      }
    });
  }

  // Creating all the icons in the edit bar
  function createEditBar(list, number) {
    // Container
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "hide");
    list.appendChild(newDiv);

    // Phone number
    let numberPara = document.createElement("p");
    numberPara.setAttribute("class", "phoneNumber");
    numberPara.innerText = number;
    newDiv.appendChild(numberPara);

    // Phone Icon
    let phonePara = document.createElement("p");
    phonePara.setAttribute("class", "list-icons phone");
    newDiv.appendChild(phonePara);

    let phoneSpan = document.createElement("span");
    phoneSpan.innerText = "Call";
    phonePara.appendChild(phoneSpan);

    let phoneIcon = document.createElement("i");
    phoneIcon.setAttribute("class", "fa-solid fa-phone");
    phonePara.appendChild(phoneIcon);

    // When the phone icon is clicked,...
    phoneIcon.addEventListener("click", () => {
      currentModal = modalCalling;
      addAnimation(currentModal);
      currentModal.addEventListener("click", removeModal);
    });

    // Message Icon
    let messagePara = document.createElement("p");
    messagePara.setAttribute("class", "list-icons message");
    newDiv.appendChild(messagePara);

    let messageSpan = document.createElement("span");
    messageSpan.innerText = "Message";
    messagePara.appendChild(messageSpan);

    let messageIcon = document.createElement("i");
    messageIcon.setAttribute("class", "fa-solid fa-message");
    messagePara.appendChild(messageIcon);

    // When the message icon is clicked,...
    messageIcon.addEventListener("click", () => {
      currentModal = modalUnavailable;
      addAnimation(currentModal);
      currentModal.addEventListener("click", removeModal);
    });

    // Favorite Icon
    let favoritePara = document.createElement("p");
    favoritePara.setAttribute("class", "list-icons favorite");
    newDiv.appendChild(favoritePara);

    let favoriteSpan = document.createElement("span");
    favoriteSpan.innerText = "Edit";
    favoritePara.appendChild(favoriteSpan);

    let favoriteIcon = document.createElement("i");
    favoriteIcon.setAttribute("class", "fa-solid fa-heart");
    favoritePara.appendChild(favoriteIcon);

    // When the favorite icon is clicked,...
    favoriteIcon.addEventListener("click", ()=> {

      // Find the contact object by name
      const contact = contacts.find(c => c.name === currentListName);

      if(!contact.favorite || contact.favorite === "N") {
        contact["favorite"] = "Y";

        displayContacts(contacts); // Update UI
        updateContactsOnServer(contacts); // Update contacts on server
        
        // Showing Modal
        currentModal = modalDone;
        addAnimation(currentModal);
      } else if (contact.favorite === "Y") {
        contact.favorite = "N";
        displayContacts(contacts); // Update UI
        updateContactsOnServer(contacts); // Update contacts on server
      }
      
    });

    // Edit Icon
    let editPara = document.createElement("p");
    editPara.setAttribute("class", "list-icons edit");
    newDiv.appendChild(editPara);

    let editSpan = document.createElement("span");
    editSpan.innerText = "Edit";
    editPara.appendChild(editSpan);

    let editIcon = document.createElement("i");
    editIcon.setAttribute("class", "fa-solid fa-pen-to-square");
    editPara.appendChild(editIcon);

    // When the edit icon is clicked,...
    editIcon.addEventListener("click", () => {
      currentModal = modalEdit;
      addAnimation(currentModal);
    });

    // Delete Icodelete
    let deletePara = document.createElement("p");
    deletePara.setAttribute("class", "list-icons trash");
    newDiv.appendChild(deletePara);

    let deleteSpan = document.createElement("span");
    deleteSpan.innerText = "Delete";
    deletePara.appendChild(deleteSpan);

    let deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "fa-solid fa-trash");
    deletePara.appendChild(deleteIcon);

    // When the delete icon is clicked,...
    deleteIcon.addEventListener("click", () => {
      currentModal = modalDelete;
      addAnimation(currentModal);
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
function deleteContact() {
  getName = currentList.innerText
  for(let i=0; i<contacts.length; i++){
    if(contacts[i].name === getName){
      contacts.splice(i, 1)
    }
  }
  displayContacts(contacts)
  deleteListItem(getName)
  console.log(contacts)
  showModalDelay(modalDelete)
  updateContactsOnServer(contacts);
}
  
function deleteListItem(current){
  let getAllList = document.querySelectorAll(".unordered-list li")

  getAllList.forEach((eachList) => {
    if(eachList.textContent === current){
      eachList.parentElement.removeChild(eachList)
    }
  })
}

function deleteContactEdit() {
  current = getList.textContent

  for(let i=0; i<eachName.length; i++){
    if(eachName[i] === current){
      eachName.splice(i, 1)
    }
  }
  deleteListItem(current)
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
