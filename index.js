import menuArray from "./data.js";


const foodItemContainer = document.getElementById("food-item-container")
const orderContainer = document.getElementById("order-container")
const modalContainer = document.getElementById("modal-container")
const exitModalBtn = document.getElementById("exit-modal-btn")
const form = document.querySelector('form')

const foodItemHtml = menuArray.map(item => {
    return `
    <div class="food-item-container">
        <div class="food-item-emoji-container">
            <h1 class="food-item-emoji">${item.emoji}</h1>
        </div>

        <div class="food-item-text-container">
            <h2 class="food-item-title">${item.name}</h2>
            <h4 class="food-item-ingredients">${item.ingredients.join(", ")}</h4>
            <h3 class="food-item-price">$${item.price}</h3>
        </div>
            
        <div  class="food-item-button-container">
            <button id="${item.id}" class="add-item-button"></button>
        </div>
    </div>
    <hr>

    `
}).join("")


foodItemContainer.innerHTML = foodItemHtml

let OrderArray = []


document.addEventListener('click', (e) => {
 if(e.target.id) {
    if(e.target.id === "0") {
        OrderArray.push(menuArray[0])
    } else if (e.target.id === "1") {
        OrderArray.push(menuArray[1])
    } else if (e.target.id === "2") {
        OrderArray.push(menuArray[2])
    }
    
    renderOrder()
 
}


    })



    function renderOrder() {

        if (OrderArray[0]) {


            orderContainer.innerHTML = `
            <h2 class="order-title">Your Order</h2>
            
            <div id="order">
                
    
           
            <div>
            
            `

            const orderdiv = document.getElementById('order')
    
            const orderHtml = OrderArray.map((item, index) => {

                return `
                <div class="order-food-item-container">
                    <div class="order-food-item">
                        <span class="order-food-name">${item.name}</span>
                        <button class="remove-btn" data-index="${index}">remove</button>
                    </div>
                    <span class="order">$${item.price}</span>
                </div>
                
                `
                
                
            }).join("")
    
    
            orderdiv.innerHTML = orderHtml

            let total = OrderArray.reduce((total, currentItem) => {
                return total + currentItem.price
            }, 0)
             
            orderContainer.innerHTML +=`
            <hr>
            <div class="price-container">
                <span>Total Price:</span>
                <span>$${total}</span>
            </div>
            <div class="order-btn-container">
            <button class="order-btn" id="complete-order-btn">Complete Order</button>
            </div>
             
                `

                if (orderContainer.innerHTML) {
        
                    const orderButton = document.getElementById("complete-order-btn")
            
                    orderButton.addEventListener('click', () => {
                        modalContainer.style.display = "block"
                    })
                }
           
    
        } else {
            orderContainer.innerHTML = ''
        }
    

    }

    orderContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.dataset.index
            OrderArray.splice(index, 1)
            renderOrder()

        }
    });
 
    exitModalBtn.addEventListener('click', () => {
        modalContainer.style.display = "none"
        
    })

    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const formData = new FormData(form)

       const name = formData.get('card-name')

        modalContainer.style.display = "none"

        orderContainer.innerHTML = `
        <div class="order-complete-container">
            <h2 id="order-complete-text"></h2>
        </div>
        `
    

        document.getElementById("order-complete-text").textContent = `Thanks, ${name}! Your order is on its way!`

        OrderArray = []

    })
   

  

  


