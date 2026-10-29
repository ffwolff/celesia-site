const RESOURCE_CONFIG = {
    life: {
        name: "Vida",
        icon: "assets/icons/CCG_Icones_VIDA_BRANCO.png"
    },

    power: {
        name: "Poder",
        icon: "assets/icons/CCG_Icones_PODER_BRANCO.png"
    },

    channeling: {
        name: "Canalização",
        icon: "assets/icons/CCG_Icones_DEFESA_BRANCO.png"
    }
};


function getOrientation(index, count) {
    const isTouchDevice = window.matchMedia(
        "(hover: none) and (pointer: coarse)"
    ).matches;

    if (!isTouchDevice) return 0;

    const orientations = {
        1: [0],
        2: [180, 0],
        3: [90, -90, 90],
        4: [90, -90, 90, -90]
    };

    return orientations[count]?.[index] ?? 0;
}


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

function updatePlayerToolbar(count) {
    const removeButton = document.getElementById("remove-player");
    const addButton = document.getElementById("add-player");

    if (removeButton) {
        removeButton.disabled = count <= 1;
    }

    if (addButton) {
        addButton.disabled = count >= 4;
    }
}

function createResourceButton(player, resource, amount) {

    const button = document.createElement("button");

    button.type = "button";
    button.className = "counter-button";
    button.classList.add(
        amount > 0 ? "counter-button-plus" : "counter-button-minus"
    );

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

function createCounter(player, resource) {

    const config = RESOURCE_CONFIG[resource];

    const counter = document.createElement("div");

    counter.className = `counter counter-${resource}`;

    if (resource === "life") {
        counter.style.gridArea = "1 / 1 / 2 / 3";
    }

    if (resource === "power") {
        counter.style.gridArea = "2 / 1";
    }

        
    const icon = document.createElement("img");

    icon.className = "counter-icon";
    icon.src = config.icon;
    icon.alt = "";
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

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "counter-buttons";

    buttonsContainer.append(
        increaseButton,
        decreaseButton
    );

    valueContainer.append(
        number,
        buttonsContainer
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





function createInitiativeIndicator(player) {
    const indicator = document.createElement("div");

    indicator.className = "initiative";

    if (player.initiative) {
        indicator.classList.add("active");
    }

    indicator.setAttribute("role", "button");
    indicator.setAttribute("tabindex", "0");
    indicator.setAttribute("aria-label", "Passar iniciativa");

    const symbol = document.createElement("img");

    symbol.className = "initiative-symbol";
    symbol.src = "assets/icons/celesia_cristal.png";
    symbol.alt = "";

    indicator.appendChild(symbol);

    function passInitiative() {
        nextInitiative();
    }

    indicator.addEventListener("click", passInitiative);

    indicator.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            passInitiative();
        }
    });

    return indicator;
}



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


function createPlayer(player) {
    const panel = document.createElement("article");

    panel.className = "player";
    panel.dataset.playerId = player.id;

    applyPlayerBackground(panel, player.background);

    const content = document.createElement("div");
    content.className = "player-content";

    const life = createCounter(player, "life");
    const power = createCounter(player, "power");

    const initiative = createInitiativeIndicator(player);
    initiative.style.gridArea = "2 / 2";

    content.append(
        life,
        power,
        initiative
    );

    panel.appendChild(content);

    return panel;
}


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

window.addEventListener("resize", () => {

    if (typeof players !== "undefined") {
        renderBoard(players);
    }

});