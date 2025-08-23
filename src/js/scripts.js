const burger = document.getElementById( "burger ") 
const menu = document.querySelector( ".menu ") 

burger.addEventListener( "click ", () => {
    menu.classList.toggle( "open ") 
}) 


const header = document.querySelector( ".header ") 
window.addEventListener( "scroll ", () => {
    if (window.scrollY > 50) {
        header.classList.add( "sticky ") 
    } else {
        header.classList.remove( "sticky ") 
    }
}) 


document.querySelectorAll( 'a[href="#"]').forEach(link => {
    link.addEventListener( "click ", function (e) {
        e.preventDefault() 
        let id = this.getAttribute( "href ") 
        let block = document.querySelector(id) 
        if (block) {
            block.scrollIntoView({ behavior:  "smooth " }) 
        }
    }) 
}) 

const startBtn = document.querySelector( ".welcome button ") 

startBtn.addEventListener( "click ", () => {
    alert( "Тут буде попап авторизації ") 
}) 


const serviceCards = document.querySelectorAll( ".cardTop span ") 
if (serviceCards.length >= 3) {
    let middle = serviceCards[1] 
    middle.addEventListener( "click ", (e) => {
        if (e.detail === 3) {
            serviceCards.forEach(span => {
                span.textContent =  "Hack This Site " 
                span.style.color =  "red " 
                span.style.fontWeight =  "bold " 
            }) 
        }
    }) 
}

let humans = document.querySelectorAll( ".cardHuman ") 
let current = 0 
function showHuman(n) {
    humans.forEach((h, i) => {
        h.style.display = i === n ?  "block " :  "none " 
    }) 
}
if (humans.length) {
    showHuman(0) 
    setInterval(() => {
        current = (current + 1) % humans.length 
        showHuman(current) 
    }, 3000) 
}

const filters = document.querySelectorAll( '.latwork input[type="radio"]') 
const cards = document.querySelectorAll( ".cardMain ") 

filters.forEach(radio => {
    radio.addEventListener( "change ", () => {
        let val = radio.value 
        localStorage.setItem( "lastFilter ", val) 
        cards.forEach(card => {
            if (val ===  "All " || card.textContent.includes(val)) {
                card.style.display =  "block " 
            } else {
                card.style.display =  "none " 
            }
        }) 
    }) 
}) 

let saved = localStorage.getItem( "lastFilter ") 
if (saved) {
    let radio = document.getElementById(saved) 
    if (radio) {
        radio.checked = true 
        radio.dispatchEvent(new Event( "change ")) 
    }
}

const touchBtn = document.querySelector( ".talking button ") 
const contactForm = document.querySelector( ".footer ") 
if (touchBtn && contactForm) {
    touchBtn.addEventListener( "click ", () => {
        contactForm.scrollIntoView({ behavior:  "smooth " }) 
    }) 
}


document.querySelectorAll( ".read ").forEach(btn => {
    btn.addEventListener( "click ", e => {
        alert("More info") 
    }) 
}) 


