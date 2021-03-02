const emailBox = document.getElementById("emailBox")
const typeBox = document.getElementById("typeBox")
const sizeBox = document.getElementById("sizeBox")
const priceBox = document.getElementById("priceBox")
const addCoffeeOrder = document.getElementById("addCoffeeOrder")

const refreshOrders = document.getElementById("refreshOrders")
const currentOrders = document.getElementById("currentOrders")

const findOrderEmail = document.getElementById("findOrderEmail")
const submitEmailSearch = document.getElementById("submitEmailSearch")

submitEmailSearch.addEventListener('click', function() {
    event.preventDefault()

    const orderemail = findOrderEmail.value
    let checkOrder = new XMLHttpRequest()

    checkOrder.addEventListener('load', function() {
        let oneCoffeeOrder = JSON.parse(this.responseText)
        console.log(oneCoffeeOrder)
        let oneOrder = `
        <li class="orderItem"><div class="emailDisplay">
        ${oneCoffeeOrder.email}</div><div class="orderAndSize">${oneCoffeeOrder.type}  -  ${oneCoffeeOrder.size}</div> 
        <div class="priceAndDeleteBox"><div class="priceAndDelete">$ ${oneCoffeeOrder.price}</div><div class="priceAndDelete"><button id="completedButton" onClick="completed('${oneCoffeeOrder.email}')">COMPLETED</button></div></div>
        </li>
        
        `
        currentOrders.innerHTML = oneOrder
    })

    
    


    checkOrder.open('GET',`https://troubled-peaceful-hell.glitch.me/orders/${orderemail}`)
    checkOrder.send()
})

addCoffeeOrder.addEventListener('click', function() {

    event.preventDefault()

    let sendOrder = new XMLHttpRequest()

    sendOrder.addEventListener('load', function() {
        displayOrders()
    })

    const email = emailBox.value
    const type = typeBox.value
    const size = sizeBox.value
    const price = priceBox.value

    const coffeeOrder = {
        email: email,
        type: type,
        size: size,
        price: parseFloat(price)
    }

    sendOrder.open('POST', 'https://troubled-peaceful-hell.glitch.me/orders')
    sendOrder.setRequestHeader('Content-Type', 'application/json')
    sendOrder.send(JSON.stringify(coffeeOrder))

})

function displayOrders() {
    let getOrders = new XMLHttpRequest()

    getOrders.addEventListener('load', function () {
        printToClient(this.responseText)
    })


    getOrders.open('GET','https://troubled-peaceful-hell.glitch.me/orders')
    getOrders.send()
}

function printToClient(orders) {
    let CoffeeOrders = JSON.parse(orders)
    let listCoffeeItmes = CoffeeOrders.map(function (order) {
        return `
        <li class="orderItem"><div class="emailDisplay">
        ${order.email}</div><div class="orderAndSize">${order.type}  -  ${order.size}</div> 
        <div class="priceAndDeleteBox"><div class="priceAndDelete">$ ${order.price}</div><div class="priceAndDelete"><button id="completedButton" onClick="completed('${order.email}')">COMPLETED</button></div></div>
        </li>
        
        `
    })

    currentOrders.innerHTML = listCoffeeItmes.join("")

}

refreshOrders.addEventListener('click', function () {
    displayOrders()
})

function completed(orderToRemove) {
    let completedOrder = new XMLHttpRequest()

    completedOrder.addEventListener('load', function() {
        displayOrders()
    })
    completedOrder.open('DELETE',`https://troubled-peaceful-hell.glitch.me/orders/${orderToRemove}`)
    completedOrder.send()

}

displayOrders()