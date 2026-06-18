const slides = [
    "assets/images/celesia_ataque_amplo.png",
    "assets/images/celesia_colosso_terrano.png",
    "assets/images/celesia_visao_das_ondas.png",
    "assets/images/celesia_harpias_das_nuvens.png"
];

const bg1 = document.querySelector(".hero-bg-1");
const bg2 = document.querySelector(".hero-bg-2");

let current = 0;
let activeLayer = 1;

function changeSlide() {

    const slide = slides[current];

    if (slide === null) {

        // Fade para o fundo roxo
        bg1.style.opacity = 0;
        bg2.style.opacity = 0;

    } else {

        const targetLayer =
            activeLayer === 1
                ? bg2
                : bg1;

        const oldLayer =
            activeLayer === 1
                ? bg1
                : bg2;

        targetLayer.style.backgroundImage =
            `url("${slide}")`;

        targetLayer.style.opacity = 1;
        oldLayer.style.opacity = 0;

        activeLayer =
            activeLayer === 1
                ? 2
                : 1;
    }

    current++;

    if (current >= slides.length) {
        current = 0;
    }
}

changeSlide();

setInterval(changeSlide, 3000);

document.querySelectorAll('.nav-link').forEach(link => {

    link.addEventListener('click', function (event) {

        event.preventDefault();

        const targetId = this.getAttribute('href');

        const targetSection = document.querySelector(targetId);

        targetSection.scrollIntoView({
            behavior: 'smooth'
        });

    });

});

const menuButton =
    document.querySelector('.menu-toggle');

const nav =
    document.querySelector('nav');

menuButton.addEventListener('click', () => {

    nav.classList.toggle('active');

});

document.querySelectorAll('.nav-link')
.forEach(link => {

    link.addEventListener('click', () => {

        nav.classList.remove('active');

    });

});

function updateImage() {
    const img = document.getElementById("banner-logo");

    if (window.innerWidth <= 768) {
        img.src = "assets/images/celesia_cristal.png";
    } else {
        img.src = "assets/images/LOGO_Celesia_site-02.png";
    }
}

updateImage();
window.addEventListener("resize", updateImage);

const domain =
    window.location.hostname || 'localhost';

document
    .getElementById('twitch-player')
    .src =
    `https://player.twitch.tv/?channel=celesiacg&parent=${domain}`;