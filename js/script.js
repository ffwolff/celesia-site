const slides = [
    "assets/images/celesia_ataque_amplo.png",
    "assets/images/celesia_colosso_terrano.png",
    "assets/images/celesia_visao_das_ondas.png",
    "assets/images/celesia_harpias_das_nuvens.png",
    "assets/images/celesia_chicote_aquatico.png",
    "assets/images/celesia_drakar_o_lutador.png",
    "assets/images/celesia_esconder_nas_sombras.jpg",
    "assets/images/celesia_investida_devastadora.png",
    "assets/images/celesia_ordem.png",
    "assets/images/celesia_mistura_instavel.png",
    "assets/images/celesia_reuniao_de_conselho.png",
    "assets/images/celesia_sede_de_sangue.png",
    "assets/images/celesia_tiro_certeiro.png",
    "assets/images/celesia_furia_flamejante.png",
    "assets/images/celesia_punhos_flamejantes.png",
    "assets/images/celesia_compressao_da_mente.png",
    "assets/images/celesia_sopro_de_zefiro.png",
    "assets/images/celesia_martir_terreno.png",
    "assets/images/celesia_chuva_de_flechas.png",
    "assets/images/celesia_gorn.png",
    "assets/images/celesia_agulha_petrea.png",
    "assets/images/celesia_final.png.png"

    
];

const bg1 = document.querySelector(".hero-bg-1");
const bg2 = document.querySelector(".hero-bg-2");

let deck = [];
let current = 0;
let lastSlide = null;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function resetDeck() {
    deck = shuffle([...slides]);
    current = 0;

    // evita repetição imediata entre ciclos
    if (deck[0] === lastSlide && deck.length > 1) {
        [deck[0], deck[1]] = [deck[1], deck[0]];
    }
}

resetDeck();

let activeLayer = 1;

function changeSlide() {
    const slide = deck[current];

    const targetLayer = activeLayer === 1 ? bg2 : bg1;
    const oldLayer = activeLayer === 1 ? bg1 : bg2;

    targetLayer.style.backgroundImage = `url("${slide}")`;
    targetLayer.style.opacity = 1;
    oldLayer.style.opacity = 0;

    activeLayer = activeLayer === 1 ? 2 : 1;

    lastSlide = slide;
    current++;

    if (current >= deck.length) {
        resetDeck();
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