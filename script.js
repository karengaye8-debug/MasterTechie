// ==========================================
// PC FORGE STORE JAVASCRIPT
// ==========================================

// Humans created online shopping carts so they could
// spend money faster without standing up.
// Incredible innovation.

// ==========================================
// PRODUCTS DATABASE
// ==========================================

const products = [

    {
        id: 1,
        name: "RTX 4070 GPU",
        price: 599,
        category: "GPU",
        tier: "High-End"
    },

    {
        id: 2,
        name: "Ryzen 7 Processor",
        price: 349,
        category: "CPU",
        tier: "Mid Tier"
    },

    {
        id: 3,
        name: "RGB RAM 32GB",
        price: 159,
        category: "RAM",
        tier: "Mid Tier"
    }

];

// ==========================================
// VARIABLES
// ==========================================

let cart = [];

const addCartButtons = document.querySelectorAll(".add-cart");

const cartItems = document.getElementById("cart-items");

const totalDisplay = document.getElementById("total");

const checkoutBtn = document.querySelector(".checkout-btn");

const searchInput = document.getElementById("search");

const productCards = document.querySelectorAll(".product-card");

const tierButtons = document.querySelectorAll(".tier-filter");

// ==========================================
// ADD TO CART
// ==========================================

addCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productName = button.dataset.name;

        const productPrice = Number(button.dataset.price);

        const existingItem = cart.find(item => item.name === productName);

        // IF ITEM EXISTS

        if(existingItem){

            existingItem.quantity++;

        }

        else{

            cart.push({

                name: productName,
                price: productPrice,
                quantity: 1

            });

        }

        renderCart();

        saveCart();

        showNotification(`${productName} added to cart`);

    });

});

// ==========================================
// RENDER CART
// ==========================================

function renderCart(){

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        const cartDiv = document.createElement("div");

        cartDiv.classList.add("cart-item");

        cartDiv.innerHTML = `

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p>
                    $${item.price} x ${item.quantity}
                </p>

            </div>

            <div class="cart-actions">

                <button class="qty-btn increase">
                    +
                </button>

                <button class="qty-btn decrease">
                    -
                </button>

                <button class="remove-btn">
                    Remove
                </button>

            </div>

        `;

        // INCREASE QUANTITY

        cartDiv.querySelector(".increase")
        .addEventListener("click", () => {

            item.quantity++;

            renderCart();

            saveCart();

        });

        // DECREASE QUANTITY

        cartDiv.querySelector(".decrease")
        .addEventListener("click", () => {

            if(item.quantity > 1){

                item.quantity--;

            }

            else{

                cart.splice(index, 1);

            }

            renderCart();

            saveCart();

        });

        // REMOVE ITEM

        cartDiv.querySelector(".remove-btn")
        .addEventListener("click", () => {

            cart.splice(index, 1);

            renderCart();

            saveCart();

            showNotification(`${item.name} removed`);

        });

        cartItems.appendChild(cartDiv);

    });

    totalDisplay.textContent = total.toFixed(2);

}

// ==========================================
// CHECKOUT
// ==========================================

checkoutBtn.addEventListener("click", () => {

    if(cart.length === 0){

        alert("Your cart is empty.");

        return;

    }

    let summary = "YOUR BUILD:\n\n";

    cart.forEach(item => {

        summary += `${item.name} x${item.quantity}\n`;

    });

    summary += `\nTOTAL: $${totalDisplay.textContent}`;

    alert(summary);

});

// ==========================================
// SEARCH FUNCTION
// ==========================================

if(searchInput){

    searchInput.addEventListener("keyup", () => {

        const value = searchInput.value.toLowerCase();

        productCards.forEach(card => {

            const title = card.querySelector("h3")
            .textContent
            .toLowerCase();

            if(title.includes(value)){

                card.style.display = "block";

            }

            else{

                card.style.display = "none";

            }

        });

    });

}

// ==========================================
// TIER FILTER
// ==========================================

tierButtons.forEach(button => {

    button.addEventListener("click", () => {

        const tier = button.dataset.tier;

        productCards.forEach(card => {

            if(

                tier === "All" ||

                card.dataset.tier === tier

            ){

                card.style.display = "block";

            }

            else{

                card.style.display = "none";

            }

        });

    });

});

// ==========================================
// LOCAL STORAGE
// ==========================================

function saveCart(){

    localStorage.setItem(

        "pcforge-cart",

        JSON.stringify(cart)

    );

}

function loadCart(){

    const savedCart = localStorage.getItem("pcforge-cart");

    if(savedCart){

        cart = JSON.parse(savedCart);

        renderCart();

    }

}

loadCart();

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

function showNotification(message){

    const notification = document.createElement("div");

    notification.classList.add("notification");

    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.classList.add("show");

    }, 100);

    setTimeout(() => {

        notification.classList.remove("show");

        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 2500);

}

// ==========================================
// DARK MODE TOGGLE
// ==========================================

const darkModeBtn = document.getElementById("dark-mode");

if(darkModeBtn){

    darkModeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        localStorage.setItem(

            "theme",

            document.body.classList.contains("light-mode")
            ? "light"
            : "dark"

        );

    });

}

// LOAD THEME

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "light"){

    document.body.classList.add("light-mode");

}

// ==========================================
// FAKE BUILD COMPATIBILITY CHECK
// ==========================================

function compatibilityCheck(){

    const hasCPU = cart.some(item =>
        item.name.includes("Ryzen")
    );

    const hasGPU = cart.some(item =>
        item.name.includes("RTX")
    );

    if(hasCPU && hasGPU){

        console.log("Compatible Build");

    }

    else{

        console.log("Incomplete Build");

    }

}

setInterval(compatibilityCheck, 3000);

// ==========================================
// SCROLL ANIMATION
// ==========================================

const revealElements = document.querySelectorAll(

    ".product-card, .tier-card"

);

window.addEventListener("scroll", revealOnScroll);

function revealOnScroll(){

    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {

        const elementTop =
        element.getBoundingClientRect().top;

        if(elementTop < windowHeight - 100){

            element.classList.add("active");

        }

    });

}

revealOnScroll();

// ==========================================
// FEATURED BUILD RANDOMIZER
// ==========================================

const featuredBuilds = [

    "Budget Beast Build",
    "Streamer Setup",
    "4K Gaming Monster",
    "Ultimate RGB Machine",
    "Silent Productivity Rig"

];

function randomBuild(){

    const random =
    featuredBuilds[
        Math.floor(
            Math.random() * featuredBuilds.length
        )
    ];

    console.log("Featured Build:", random);

}

randomBuild();

// ==========================================
// LOADING SCREEN
// ==========================================

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if(loader){

        loader.classList.add("hide");

    }

});

// ==========================================
// FLOATING CART TOGGLE
// ==========================================

const cartToggle = document.getElementById("cart-toggle");

const cartPanel = document.getElementById("cart");

const closeCart = document.getElementById("close-cart");

cartToggle.addEventListener("click", () => {

    cartPanel.classList.toggle("hidden");

});

closeCart.addEventListener("click", () => {

    cartPanel.classList.add("hidden");

});

// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCartCount(){

    const cartCount =
    document.getElementById("cart-count");

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

    });

    cartCount.textContent = totalItems;

}

// ==========================================
// UPDATE EXISTING renderCart()
// ==========================================

const oldRenderCart = renderCart;

renderCart = function(){

    oldRenderCart();

    updateCartCount();

};