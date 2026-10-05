
/*
 * CELESIA Companion
 * Responsável por criar e atualizar a interface dos jogadores.
 */


/* ==========================================================
   CONFIGURAÇÃO DOS RECURSOS
========================================================== */

const RESOURCE_CONFIG = {
    life: {
        name: "Vida",
        icon: "♥"
    },

    power: {
        name: "Poder",
        icon: "⚔"
    },

    channeling: {
        name: "Canalização",
        icon: "✦"
    }
};


/* ==========================================================
   ORIENTAÇÃO DOS JOGADORES
========================================================== */

/*
 * 0    = em pé / parte inferior
 * 180  = de cabeça para baixo / parte superior
 * 90   = lateral esquerda
 * -90  = lateral direita
 */

function getOrientation(index, count) {

    const isMobile = window.matchMedia(
        "(max-width: 900px)"
    ).matches;

    if (!isMobile) {
        return 0;
    }

    const orientations = {

        1: [0],

        2: [180, 0],

        3: [180, -90, 0],

        4: [90, -90, 90, -90],

        5: [90, -90, 90, -90, 0],

        6: [90, -90, 90, -90, 90, -90]

    };

    return orientations[count]?.[index] ?? 0;
}

/* ==========================================================
   ROTAÇÃO DO PAINEL COMPLETO
========================================================== */

function applyPlayerOrientation(panel, orientation) {

    const content = panel.querySelector(".player-content");

    if (!content) {
        return;
    }

    const width = panel.clientWidth;
    const height = panel.clientHeight;

    if (!width || !height) {
        return;
    }

    content.style.position = "absolute";
    content.style.left = "50%";
    content.style.top = "50%";
    content.style.transformOrigin = "center center";

    /*
     * Para rotações laterais, invertemos largura e altura
     * antes de girar o painel.
     */

    if (orientation === 90 || orientation === -90) {

        content.style.width = `${height}px`;
        content.style.height = `${width}px`;

    } else {

        content.style.width = "100%";
        content.style.height = "100%";

    }

    content.style.transform =
        `translate(-50%, -50%) rotate(${orientation}deg)`;
}


function applyBoardOrientations() {

    const board = document.getElementById("board");

    if (!board) {
        return;
    }

    const panels = board.querySelectorAll(".player");

    panels.forEach((panel, index) => {

        const orientation = getOrientation(
            index,
            panels.length
        );

        applyPlayerOrientation(
            panel,
            orientation
        );

    });
}


/* ==========================================================
   BOTÕES DA TOOLBAR
========================================================== */

function updatePlayerToolbar(count) {

    const removeButton = document.getElementById("remove-player");
    const addButton = document.getElementById("add-player");

    if (removeButton) {
        removeButton.hidden = count <= 1;
    }

    if (addButton) {
        addButton.hidden = count >= 6;
    }
}


/* ==========================================================
   BOTÕES DOS RECURSOS
========================================================== */

function createResourceButton(player, resource, amount) {

    const button = document.createElement("button");

    button.type = "button";
    button.className = "counter-button";

    button.textContent = amount > 0 ? "+" : "−";

    button.setAttribute(
        "aria-label",
        `${amount > 0 ? "Aumentar" : "Diminuir"} ${RESOURCE_CONFIG[resource].name}`
    );

    button.addEventListener("click", () => {

        updateResource(
            player.id,
            resource,
            amount
        );

    });

    return button;
}


/* ==========================================================
   CONTADOR
========================================================== */

function createCounter(player, resource) {

    const config = RESOURCE_CONFIG[resource];

    const counter = document.createElement("div");

    counter.className = `counter counter-${resource}`;

    if (resource === "life") {
        counter.style.gridArea = "1 / 1";
    }

    if (resource === "power") {
        counter.style.gridArea = "2 / 1";
    }

    if (resource === "channeling") {
        counter.style.gridArea = "2 / 2";
    }

    const icon = document.createElement("span");

    icon.className = "counter-icon";
    icon.textContent = config.icon;
    icon.setAttribute("aria-hidden", "true");

    const valueContainer = document.createElement("div");

    valueContainer.className = "counter-value";

    const decreaseButton = createResourceButton(
        player,
        resource,
        -1
    );

    const number = document.createElement("span");

    number.className = "counter-number";
    number.textContent = player[resource];

    number.setAttribute("aria-live", "polite");

    number.setAttribute(
        "aria-label",
        `${config.name}: ${player[resource]}`
    );

    const increaseButton = createResourceButton(
        player,
        resource,
        1
    );

    valueContainer.append(
        decreaseButton,
        number,
        increaseButton
    );

    const inner = document.createElement("div");

    inner.className = "counter-inner";

    inner.append(
        icon,
        valueContainer
    );

    counter.appendChild(inner);

    return counter;
}


/* ==========================================================
   INICIATIVA
========================================================== */

function createInitiativeIndicator(player) {

    const indicator = document.createElement("div");

    indicator.className = "initiative";

    if (player.initiative) {
        indicator.classList.add("active");
    }

    indicator.setAttribute("aria-hidden", "true");

    const symbol = document.createElement("span");

    symbol.className = "initiative-symbol";
    symbol.textContent = "✦";

    indicator.appendChild(symbol);

    return indicator;
}


/* ==========================================================
   FUNDO DO JOGADOR
========================================================== */

function applyPlayerBackground(element, background) {

    if (!background || !background.value) {

        element.style.background = "#25234C";

        return;
    }

    if (background.type === "gradient") {

        element.style.background = background.value;

        return;
    }

    element.style.backgroundColor = background.value;
}


/* ==========================================================
   CRIAÇÃO DO JOGADOR
========================================================== */

function createPlayer(player) {

    const panel = document.createElement("article");

    panel.className = "player";

    panel.dataset.playerId = player.id;

    applyPlayerBackground(
        panel,
        player.background
    );

    const initiative = createInitiativeIndicator(player);

    const content = document.createElement("div");

    content.className = "player-content";

    const life = createCounter(
        player,
        "life"
    );

    const power = createCounter(
        player,
        "power"
    );

    const channeling = createCounter(
        player,
        "channeling"
    );

    content.append(
        life,
        power,
        channeling
    );

    panel.append(
        initiative,
        content
    );

    return panel;
}


/* ==========================================================
   RENDERIZAÇÃO DO TABULEIRO
========================================================== */

function renderBoard(players) {

    const board = document.getElementById("board");

    if (!board) {

        console.error(
            'Elemento com id "board" não encontrado.'
        );

        return;
    }

    board.innerHTML = "";

    board.className = `board players-${players.length}`;

    players.forEach((player) => {

        const panel = createPlayer(player);

        board.appendChild(panel);

    });

    updatePlayerToolbar(players.length);

    requestAnimationFrame(() => {
        applyBoardOrientations();
    });
}


/* ==========================================================
   REDIMENSIONAMENTO
========================================================== */

window.addEventListener("resize", () => {

    if (typeof players !== "undefined") {
        renderBoard(players);
    }

});