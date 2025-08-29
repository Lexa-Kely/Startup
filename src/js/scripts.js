document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");

    document.addEventListener("mousemove", (e) => {
        if (!header) return;

        // розраховуємо відцентрове зміщення
        const x = (e.clientX / window.innerWidth - 0.5) * 20; // 20 пікселів максимум
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        header.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    });
    const burger = document.getElementById("burger");
    const menu = document.querySelector(".menu");
    const navLinks = document.querySelectorAll(".menu a");

    // ---------- BURGER MENU ----------
    burger.addEventListener("click", () => {
        menu.classList.toggle("active");
        burger.classList.toggle("active");
    });

    // ---------- FIXED MENU ON SCROLL ----------
    const headerOffset = header.offsetTop;
    window.addEventListener("scroll", () => {
        if (window.scrollY > headerOffset) {
            header.classList.add("fixed");
        } else {
            header.classList.remove("fixed");
        }
    });

    // ---------- SCROLL TO SECTIONS ----------
    const links = document.querySelectorAll(".menu a");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").replace("#", "");
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                const yOffset = -60; // якщо фіксоване меню
                const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        });
    });


    const startBtn = document.querySelector(".center button");
    const popup = document.getElementById("popupAuth");
    const blocks = document.querySelectorAll(".block");
    const checkBtn = document.getElementById("checkSequence");
    let dragged = null;

    // Відкриття попапу
    startBtn.addEventListener("click", () => {
        popup.style.display = "flex";
    });

    // DRAG & DROP блоки
    blocks.forEach(block => {
        block.setAttribute("draggable", true);

        block.addEventListener("dragstart", () => {
            dragged = block;
            block.classList.add("dragging");
        });

        block.addEventListener("dragend", () => {
            dragged = null;
            block.classList.remove("dragging");
        });

        block.addEventListener("dragover", e => e.preventDefault());

        block.addEventListener("drop", e => {
            e.preventDefault();
            if (dragged && dragged !== block) {
                const parent = block.parentNode;
                parent.insertBefore(dragged, block);
            }
        });
    });

    // Перевірка правильної послідовності
    checkBtn.addEventListener("click", () => {
        const sequence = Array.from(blocks).map(b => b.getAttribute("data-order")).join("");
        if (sequence === "123") {
            alert("Login successful!");
            popup.style.display = "none";
            document.querySelector(".logo h1").textContent = "Welcome, Alex!"; // змінюємо заголовок
        } else {
            alert("Wrong sequence, try again.");
        }
    });
    const cards = document.querySelectorAll(".cards .cardTop");
    if (cards.length < 3) return; // перевірка наявності трьох карток

    const middleCard = cards[1]; // середня картка (індекс 1)
    let clickCount = 0;
    let clickTimer = null;

    middleCard.addEventListener("click", () => {
        clickCount++;

        if (clickCount === 1) {
            // старт таймера для відліку потрійного кліку
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 600); // 600ms для трьох кліків
        }

        if (clickCount === 3) {
            clearTimeout(clickTimer);
            clickCount = 0;

            // змінюємо всі три підзаголовки
            cards.forEach(card => {
                const span = card.querySelector("span");
                span.textContent = "Im A GHOUL";
                span.style.color = "red";
                span.style.fontWeight = "bold";
            });
        }
    });
    const track = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slider-track .cardHuman");
    const prevBtn = document.querySelector(".slider .prev");
    const nextBtn = document.querySelector(".slider .next");

    if (!track || slides.length === 0) return;

    let index = 0;
    const slideWidth = slides[0].offsetWidth + 20; // враховуємо відступи
    const totalSlides = slides.length;

    // Безмежна карусель: клонування для циклу
    slides.forEach(slide => track.appendChild(slide.cloneNode(true)));

    function updateSlider() {
        track.style.transform = `translateX(-${index * slideWidth}px)`;
        track.style.transition = "transform 0.5s ease";
    }

    prevBtn.addEventListener("click", () => {
        index--;
        if (index < 0) index = totalSlides - 1;
        updateSlider();
    });

    nextBtn.addEventListener("click", () => {
        index++;
        if (index >= totalSlides) index = 0;
        updateSlider();
    });

    // Свайп на мобільних
    let startX = 0;
    let isDragging = false;

    track.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    track.addEventListener("touchmove", e => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        if (diff > 30) { nextBtn.click(); isDragging = false; }
        if (diff < -30) { prevBtn.click(); isDragging = false; }
    });

    track.addEventListener("touchend", () => {
        isDragging = false;
    });
    const cart = []; // твій існуючий кошик
    const cardss = document.querySelectorAll(".shop .cardMain");

    // Кнопки додавання до кошика
    cardss.forEach(card => {
        const btn = card.querySelector("button");
        btn.addEventListener("click", () => {
            const itemName = card.querySelector("h3").textContent;
            const itemCategory = card.querySelector("span").textContent;
            cart.push({ name: itemName, category: itemCategory });
            alert(`${itemName} додано до кошика!`);
        });
    });

    // Створюємо кнопку перегляду кошика
    const viewCartBtn = document.createElement("button");
    viewCartBtn.textContent = "Переглянути кошик";
    document.querySelector(".shop").appendChild(viewCartBtn);

    // Попап для кошика
    const cartPopup = document.createElement("div");
    cartPopup.style.position = "fixed";
    cartPopup.style.top = "50%";
    cartPopup.style.left = "50%";
    cartPopup.style.transform = "translate(-50%, -50%)";
    cartPopup.style.backgroundColor = "white";
    cartPopup.style.padding = "20px";
    cartPopup.style.border = "2px solid black";
    cartPopup.style.display = "none";
    cartPopup.style.zIndex = 1000;
    document.body.appendChild(cartPopup);

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Закрити";
    cartPopup.appendChild(closeBtn);

    closeBtn.addEventListener("click", () => {
        cartPopup.style.display = "none";
    });

    viewCartBtn.addEventListener("click", () => {
        cartPopup.innerHTML = "<h3>Ваш кошик:</h3>";
        if (cart.length === 0) {
            cartPopup.innerHTML += "<p>Кошик порожній.</p>";
        } else {
            cart.forEach((item, idx) => {
                cartPopup.innerHTML += `<p>${idx + 1}. ${item.name} (${item.category})</p>`;
            });
        }
        cartPopup.appendChild(closeBtn); // додаємо кнопку закриття
        cartPopup.style.display = "block";
    });
    const contactBtn = document.querySelector(".talking button");
    const contactForm = document.querySelector(".form");

    if (contactBtn && contactForm) {
        contactBtn.addEventListener("click", () => {
            contactForm.scrollIntoView({ behavior: "smooth" });
        });
    }

    // Паралакс для форми та цитат при руху миші
    const parallaxAreas = document.querySelectorAll(".form, .qwe");

    parallaxAreas.forEach(area => {
        area.addEventListener("mousemove", e => {
            const rect = area.getBoundingClientRect();
            const offsetX = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // -10% до +10%
            const offsetY = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

            area.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });

        area.addEventListener("mouseleave", () => {
            area.style.transform = `translate(0px, 0px)`;
        });
    });
    const posts = document.querySelectorAll(".blockPost");

    posts.forEach(post => {
        const readBtn = post.querySelector(".read");
        const textP = post.querySelector("p");

        readBtn.addEventListener("click", e => {
            e.preventDefault();

            // Перевіряємо, чи вже показаний повний текст
            if (!post.classList.contains("expanded")) {
                textP.style.maxHeight = "none"; // показуємо весь текст
                post.classList.add("expanded");
                readBtn.textContent = "Сховати";
            } else {
                textP.style.maxHeight = "80px"; // обрізаємо назад
                post.classList.remove("expanded");
                readBtn.textContent = "Read more";
            }
        });
    });

    const tracks = document.querySelector(".companys");
    const clone = tracks.innerHTML;
    tracks.innerHTML += clone; // дублюємо елементи для безкінечного скролу

    let scrollPos = 0;
    const speed = 1; // швидкість прокрутки

    function moveBrands() {
        scrollPos += speed;
        if (scrollPos >= tracks.scrollWidth / 2) scrollPos = 0; // зациклювання
        tracks.style.transform = `translateX(-${scrollPos}px)`;
    }

    setInterval(moveBrands, 20); // частота оновлення
    const form = document.querySelector(".form form");
    const inputs = form.querySelectorAll("input, textarea");

    // Заповнення полів із локального сховища
    inputs.forEach(input => {
        const saved = localStorage.getItem(input.name);
        if (saved) input.value = saved;
    });

    form.addEventListener("submit", e => {
        e.preventDefault();

        // Попап підтвердження
        const confirmPopup = document.createElement("div");
        confirmPopup.style.position = "fixed";
        confirmPopup.style.top = "50%";
        confirmPopup.style.left = "50%";
        confirmPopup.style.transform = "translate(-50%, -50%)";
        confirmPopup.style.background = "white";
        confirmPopup.style.padding = "30px";
        confirmPopup.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
        confirmPopup.style.zIndex = "9999";
        confirmPopup.innerHTML = `
        <p>Підтвердити дані?</p>
        <button id="accept">Прийняти</button>
        <button id="decline">Відхилити</button>
      `;
        document.body.appendChild(confirmPopup);

        const removePopup = () => document.body.removeChild(confirmPopup);

        confirmPopup.querySelector("#accept").addEventListener("click", () => {
            inputs.forEach(input => localStorage.setItem(input.name, input.value));
            removePopup();
            alert("Дані збережено!");
            form.reset();
        });

        confirmPopup.querySelector("#decline").addEventListener("click", () => {
            removePopup();
        });
    });
    const filterRadios = document.querySelectorAll('.latwork input[type="radio"]');
    const cardsa = document.querySelectorAll('.shop .cardMain');

    // Відновлення останнього вибору з localStorage
    const lastFilter = localStorage.getItem('lastFilter');
    if (lastFilter) {
        const radio = document.getElementById(lastFilter);
        if (radio) radio.checked = true;
        filterCards(lastFilter);
    }

    // Функція фільтрації
    function filterCards(category) {
        cardsa.forEach(card => {
            const cardCategory = card.querySelector('span').textContent;
            if (category === "All" || cardCategory.includes(category)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Зміна фільтру
    filterRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            filterCards(radio.value);
            localStorage.setItem('lastFilter', radio.value);
        });
    });

    // Кошик
    cardsa.forEach(card => {
        const button = card.querySelector("button");
        button.addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const item = card.querySelector("h3").textContent;
            if (!cart.includes(item)) cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${item} додано до кошика!`);
        });
    });
});
