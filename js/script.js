
$(document).ready(function() {
    var text = "Wedding day";
    var speed = 100;
    var contentLoaded = false;

    // Функция для анимации набора текста
    function typeWriter(text, i, fnCallback) {
        if (i < text.length) {
            $('#preloader-quote').html(text.substring(0, i + 1));
            setTimeout(function() {
                typeWriter(text, i + 1, fnCallback);
            }, speed);
        } else {
            fnCallback();
        }
    }

    // Функция для запуска анимации
    function startAnimation() {
        typeWriter(text, 0, function() {
            // Определяем время исчезновения прелоадера в зависимости от загрузки контента
            var fadeOutTime = contentLoaded ? 3000 : 5000;
            setTimeout(function() {
                $('#preloader').fadeOut('slow');
            }, fadeOutTime);
        });
    }

    // Запуск анимации
    startAnimation();

    // Обработчик события для загрузки окна
    $(window).on('load', function() {
        contentLoaded = true;
    });
});






let isStarted = false; // Флаг для проверки, запускали ли уже аудио

function toggleMusic() {
    let audio = document.getElementById("bgMusic");
    let button = document.getElementById("musicToggle");
    let icon = button.querySelector("i");
    let text = document.getElementById("musicText");

    if (audio.paused) {
        audio.play().then(() => {
            if (!isStarted) {
                audio.currentTime = 45.5; // Устанавливаем 45 секунд только после успешного воспроизведения
                isStarted = true;
            }
            icon.classList.remove("fa-music");
            icon.classList.add("fa-pause");
            text.style.display = "none";
        }).catch(error => {
            console.log("Ошибка воспроизведения:", error);
        });
    } else {
        audio.pause();
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-music");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("musicToggle").addEventListener("click", toggleMusic);
});


// Функция для проверки, попал ли элемент в область видимости
function isElementInView(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Функция для добавления класса active при попадании в область видимости
function handleScroll() {
    const blocks = document.querySelectorAll('.dresscode-info-block');
    blocks.forEach(block => {
        if (isElementInView(block)) {
            block.classList.add('active');
        }
    });
}

// Слушаем событие scroll
window.addEventListener('scroll', handleScroll);

// Инициализация при загрузке страницы, чтобы анимация сработала сразу, если элементы уже видимы
handleScroll();











document.querySelector(".wedding-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Останавливаем стандартную отправку формы

    // 🔹 ЗАМЕНИТЬ НА СВОИ ДАННЫЕ!
    const TOKEN = "7644603205:AAHP68FDVDVowQhLnkeCxdqOR0565Pggtns";
    const CHAT_ID = "390335723";
    const API_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    const fieldNames = {
        attendance: "Присутствие",
        fullname: "Имя и фамилия",
        drink: "Предпочтение по напиткам",
        wishes: "Пожелания",
    };
    // Собираем данные из формы
    const formData = new FormData(this);
    let message = "<b>Новая заявка на свадьбу 🎉</b>\n\n";
    let drinks = [];

    for (let [key, value] of formData.entries()) {
        if (key === "drink") {
            drinks.push(value); // Добавляем в массив, не отправляем сразу
        } else {
            let fieldName = fieldNames[key] || key;
            message += `<b>${fieldName}:</b> ${value}\n`;
        }
    }
    if (drinks.length > 0) {
        message += `<b>Предпочтение по напиткам:</b> ${drinks.join(", ")}\n`;
    }
    // Отправляем запрос в Telegram
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "HTML",
        }),
    });

    if (response.ok) {
        alert("Форма успешно отправлена!");
        this.reset(); // Очистка формы
    } else {
        alert("Ошибка при отправке. Попробуйте еще раз.");
    }
});

function startCountdown(targetDate) {
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            document.getElementById("countdown").innerHTML = "Событие началось!";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
}

// Устанавливаем дату окончания
const targetDate = new Date("September 18, 2025 12:00:00").getTime();
startCountdown(targetDate);



document.addEventListener("DOMContentLoaded", () => {
    const hiddenElements = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    hiddenElements.forEach(element => observer.observe(element));
});

document.addEventListener("DOMContentLoaded", () => {
    const hiddenElements = document.querySelectorAll(".hid");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    hiddenElements.forEach(element => observer.observe(element));
});


document.addEventListener("DOMContentLoaded", function () {
    const parallax = document.querySelector(".parallax-bg");

    window.addEventListener("scroll", function () {
        let scrollPosition = window.scrollY;
        parallax.style.transform = `scale(1.1) translateY(${scrollPosition * 0.2}px)`;
    });
});


// document.addEventListener("DOMContentLoaded", function () {
//     const parallax = document.querySelector(".parallax-window");
//     const imageSrc = parallax.getAttribute("data-image-src");
//
//     // Добавляем фон через ::before
//     parallax.style.position = "relative";
//     parallax.style.overflow = "hidden";
//     parallax.style.background = "none";
//
//     const bg = document.createElement("div");
//     bg.style.position = "absolute";
//     bg.style.top = "0";
//     bg.style.left = "0";
//     bg.style.width = "100%";
//     bg.style.height = "130%"; // Чуть больше, чтобы плавно двигалось
//     bg.style.backgroundImage = ``;
//     bg.style.backgroundSize = "cover";
//     bg.style.backgroundPosition = "center";
//     bg.style.willChange = "transform";
//     parallax.appendChild(bg);
//
//     function updateParallax() {
//         let scrollTop = window.scrollY;
//         let parallaxSpeed = 0.3; // Чем меньше, тем медленнее
//
//         bg.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
//     }
//
//     window.addEventListener("scroll", updateParallax);
// });


document.addEventListener("DOMContentLoaded", function () {
    const dresscodeBlock = document.querySelector(".dresscode-info-blocks");

    function checkVisibility() {
        const rect = dresscodeBlock.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) { // Проверяем, не находится ли блок уже в зоне видимости
            dresscodeBlock.classList.add("active");
            window.removeEventListener("scroll", checkVisibility); // Убираем обработчик после появления
        }
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Проверка при загрузке (если блок уже виден)
});
