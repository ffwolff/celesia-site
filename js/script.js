const slides = [
    "assets/images/celesia-agulha-petrea.png",
    "assets/images/celesia-arco-de-precisao.png",
    "assets/images/celesia-armadura-dourada.png",
    "assets/images/celesia-arma-escondida.png",
    "assets/images/celesia-ataque-amplo.png",
    "assets/images/celesia-bola-de-fogo.png",
    "assets/images/celesia-botanico.jpg",
    "assets/images/celesia-cajado-de-mogno.png",
    "assets/images/celesia-chicote-aquatico.png",
    "assets/images/celesia-chuva-de-flechas.png",
    "assets/images/celesia-colar-da-nobreza.jpg",
    "assets/images/celesia-colosso-terrano.png",
    "assets/images/celesia-compressao-da-mente.png",
    "assets/images/celesia-consonancia-dos-ventos.png",
    "assets/images/celesia-desforra-fluida.png",
    "assets/images/celesia-despojar-sem-borda.png",
    "assets/images/celesia-disparo-arcano.jpg",
    "assets/images/celesia-drakar-o-lutador.png",
    "assets/images/celesia-elara.png",
    "assets/images/celesia-elmo-de-ferro.png",
    "assets/images/celesia-elyra.png",
    "assets/images/celesia-esconder-nas-sombras.jpg",
    "assets/images/celesia-espada-curta.jpg",
    "assets/images/celesia-explorar-arredores.png",
    "assets/images/celesia-furia-flamejante.png",
    "assets/images/celesia-gorn.png",
    "assets/images/celesia-grevas-de-ferro.png",
    "assets/images/celesia-harpia-das-nuvens.png",
    "assets/images/celesia-ilusionista-itinerante.jpg",
    "assets/images/celesia-investida-devastadora.png",
    "assets/images/celesia-mago.png",
    "assets/images/celesia-manipulador-de-cordas.png",  
    "assets/images/celesia-martir-terreno.png",
    "assets/images/celesia-mistura-instavel.png",
    "assets/images/celesia-ofuscamento-ardiloso.png",
    "assets/images/celesia-olho-do-ciclone.png",
    "assets/images/celesia-orador.jpg",
    "assets/images/celesia-ordem.png",
    "assets/images/celesia-pastora.png",
    "assets/images/celesia-punhos-incandescentes.png",
    "assets/images/celesia-reuniao-de-conselho.png",
    "assets/images/celesia-rugido.png",
    "assets/images/celesia-salamandra.png",
    "assets/images/celesia-sede-de-sangue.png",
    "assets/images/celesia-serpe-do-abismo.png",
    "assets/images/celesia-sopro-de-zefiro.png",
    "assets/images/celesia-substrato-celesiano.png",
    "assets/images/celesia-terreno-movedico.png",
    "assets/images/celesia-tiro-certeiro.png",
    "assets/images/celesia-transmutacao-subaquatica.png",
    "assets/images/celesia-visao-das-ondas.png",
    "assets/images/celesia-zara-a-eloquente.png"
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