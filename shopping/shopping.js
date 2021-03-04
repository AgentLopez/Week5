
const newStoreToAdd = document.getElementById("newStoreToAdd")
const newStoreAddress = document.getElementById("newStoreAddress")
const addStoreButton = document.getElementById("addStoreButton")

const listOfStores = document.getElementById("listOfStores")


const storeItemsTitle = document.getElementById("storeItemsTitle")
const storeItems = document.getElementById("storeItems")
const storeDropdown = document.getElementById("storeDropdown")
const newStoreItem = document.getElementById("newStoreItem")
const addNewItem = document.getElementById("addNewItem")

function showStoreItems(docID) {
    let parent = docID
    db.collection('stores').doc(`${docID}`).collection('items')
        .get()
        .then((snapshot) => {
            storeItems.innerHTML = ""

            snapshot.forEach((doc) => {
                let data = doc.data()
                let store = `<li>${data.item}</li>
                <button onClick="removeItem('${parent}', '${doc.id}')">remove</button>`
                storeItems.insertAdjacentHTML('beforeend', store)
            })
        })
}

addNewItem.addEventListener('click', function () {
    let docID = storeDropdown.value
    let item = newStoreItem.value
    let storeName = docID.innerHTML
    console.log(storeName)

    db.collection('stores').doc(`${docID}`).collection('items')
    .add({
        item: item
    })
    .then (function () {
        showStoreItems(docID)
    })

})


addStoreButton.addEventListener('click', function () {
    const newStore = newStoreToAdd.value
    const storeAdd = newStoreAddress.value
    db.collection('stores')
        .add({
            name: newStore,
            address: storeAdd
        })
        .then(function () {
            getStores()
        })
})

function getStores() {
    db.collection("stores")
        .get()
        .then((snapshot) => {
            displayStores(snapshot)
        })
}

function removeStore(docID) {
    db.collection('stores')
        .doc(docID)
        .delete()
        .then(() => {
            getStores()
        })
}

function removeItem(parent, child) {
    db.collection('stores').doc(parent).collection('items')
    .doc(child)
    .delete()
    .then(() => {
        showStoreItems(parent)
    })
}


function displayStores(snapshot) {
    listOfStores.innerHTML = ""
    storeDropdown.innerHTML = ""

    snapshot.forEach((doc) => {
        let data = doc.data()
        console.log(data)
        let store = `<li class="oneStore"><a href="#" onClick="showStoreItems('${doc.id}')">${data.name}</a></li>
        <li>${data.address}</li>
        <button onClick="removeStore('${doc.id}')">remove</button>`
        listOfStores.insertAdjacentHTML('beforeend', store)
        let storeoption = `
        <option value="${doc.id}">${data.name}</option>
        `
        storeDropdown.insertAdjacentHTML('beforeend', storeoption)
        // showStoreItems(doc.id, data.name)
    })
    

}

getStores()
