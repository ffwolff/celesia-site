const MIN_PLAYERS = 1;
const MAX_PLAYERS = 6;

const INITIAL_PLAYERS = 2;

// Paleta de cores padrão dos jogadores
const PLAYER_COLORS = [
    "#25234C",
    "#5483B6",
    "#C516C4",
    "#3D3D3D",
    "#70ABE0",
    "#EA659B"
];


const players = [];

let nextPlayerId = 1;


function initializeApp() {

    players.length = 0;
    nextPlayerId = 1;

    for (let i = 0; i < INITIAL_PLAYERS; i++) {

        const player = new Player(
            nextPlayerId,
            {
                type: "solid",
                value: PLAYER_COLORS[i]
            }
        );

        nextPlayerId++;

        players.push(player);

    }

    players[0].setInitiative(true);

    setupToolbar();

    renderApp();

}

function setupToolbar() {

    const addButton = document.getElementById("add-player");

    const removeButton = document.getElementById("remove-player");

    const initiativeButton = document.getElementById("next-initiative");

    addButton.addEventListener("click", addPlayer);

    removeButton.addEventListener("click", removePlayer);

    initiativeButton.addEventListener("click", nextInitiative);

}

function renderApp() {

    renderBoard(players);

}

function addPlayer() {

    if (players.length >= MAX_PLAYERS) {
        return;
    }

    const colorIndex = players.length % PLAYER_COLORS.length;

    const player = new Player(
        nextPlayerId,
        {
            type: "solid",
            value: PLAYER_COLORS[colorIndex]
        }
    );

    nextPlayerId++;

    players.push(player);

    if (players.length === 2) {
        players[0].setInitiative(true);
        players[1].setInitiative(false);
    }

    renderApp();

}

function removePlayer() {

    if (players.length <= MIN_PLAYERS) {
        return;
    }

    const removedPlayer = players.pop();

    if (removedPlayer.initiative) {

        const nextPlayer = players[players.length - 1];

        players.forEach(player => {
            player.setInitiative(false);
        });

        nextPlayer.setInitiative(true);

    }

    renderApp();

}


function nextInitiative() {
    if (players.length === 0) {
        return;
    }

    // Com apenas um jogador, alterna entre mostrar e esconder.
    if (players.length === 1) {
        players[0].setInitiative(!players[0].initiative);
        renderApp();
        return;
    }

    // Com vários jogadores, passa a iniciativa normalmente.
    const currentIndex = players.findIndex(
        player => player.initiative
    );

    const nextIndex =
        (currentIndex + 1) % players.length;

    players.forEach((player, index) => {
        player.setInitiative(index === nextIndex);
    });

    renderApp();
}


function updateResource(playerId, resource, amount) {

    const player = players.find(
        player => player.id === playerId
    );

    if (!player) {
        return;
    }

    const methods = {

        life: {
            add: "addLife",
            remove: "removeLife"
        },

        power: {
            add: "addPower",
            remove: "removePower"
        },

        channeling: {
            add: "addChanneling",
            remove: "removeChanneling"
        }

    };

    const config = methods[resource];

    if (!config) {
        return;
    }

    if (amount > 0) {

        player[config.add](amount);

    } else if (amount < 0) {

        player[config.remove](Math.abs(amount));

    }

    renderApp();

}

document.addEventListener("DOMContentLoaded", initializeApp);