/*
==========================================================
CELESIA Companion
Player Model
==========================================================
*/

class Player {

    constructor(id, background = null) {

        this.id = id;

        // Recursos
        this.life = 20;
        this.power = 0;
        this.channeling = 0;

        // Apenas um jogador pode possuir a iniciativa
        this.initiative = false;

        // Cor / Gradiente do painel
        this.background = background ?? {
            type: "solid",
            value: "#25234C"
        };

    }

    /* ======================================================
       VIDA
    ====================================================== */

    addLife(amount = 1) {

        this.life += amount;

    }

    removeLife(amount = 1) {

        this.life = Math.max(0, this.life - amount);

    }

    /* ======================================================
       PODER
    ====================================================== */

    addPower(amount = 1) {

        this.power += amount;

    }

    removePower(amount = 1) {

        this.power = Math.max(0, this.power - amount);

    }

    /* ======================================================
       CANALIZAÇÃO
    ====================================================== */

    addChanneling(amount = 1) {

        this.channeling += amount;

    }

    removeChanneling(amount = 1) {

        this.channeling = Math.max(0, this.channeling - amount);

    }

    /* ======================================================
       INICIATIVA
    ====================================================== */

    setInitiative(active) {

        this.initiative = active;

    }

    /* ======================================================
       BACKGROUND
    ====================================================== */

    setBackground(background) {

        this.background = background;

    }

    /* ======================================================
       SERIALIZAÇÃO
    ====================================================== */

    toJSON() {

        return {

            id: this.id,

            life: this.life,

            power: this.power,

            channeling: this.channeling,

            initiative: this.initiative,

            background: this.background

        };

    }

    static fromJSON(data) {

        const player = new Player(
            data.id,
            data.background
        );

        player.life = data.life ?? 20;
        player.power = data.power ?? 0;
        player.channeling = data.channeling ?? 0;

        player.initiative = data.initiative ?? false;

        return player;

    }

}